import { useEffect, useState } from "react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
import PaymentInfoRequest from "../../models/PaymentInfoRequest";
import { useAuthContext } from "../../context/AuthContext";

export const PaymentPage = () => {
    const { authState } = useAuthContext();
    const [httpError, setHttpError] = useState<string | null>(null);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [fees, setFees] = useState(0);
    const [loadingFees, setLoadingFees] = useState(true);

    const elements = useElements();
    const stripe = useStripe();

    useEffect(() => {
        const fetchFees = async () => {
            if (!authState || !authState.isAuthenticated) return;

            try {
                const url = `${process.env.REACT_APP_API}/payment/secure/fees`;
                const requestOptions = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    },
                };

                const response = await fetch(url, requestOptions);
                if (!response.ok) {
                    const errorDetails = await response.text(); // Read the response body
                    console.error("API error:", errorDetails);
                    throw new Error("Failed to fetch fees");
                }

                const amount = await response.json();
                setFees(amount);
            } catch (error: any) {
                setHttpError(error.message);
            } finally {
                setLoadingFees(false);
            }
        };

        fetchFees();
    }, [authState]);

    async function checkout() {
        if (!stripe || !elements?.getElement(CardElement)) {
            return;
        }

        setSubmitDisabled(true);

        const paymentInfo = new PaymentInfoRequest(
            Math.round(fees * 100), 
            "USD", 
            authState?.accessToken?.claims.email
        );

        try {
            const url = `${process.env.REACT_APP_API}/payment/secure/payment-intent`;
            const requestOptions = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(paymentInfo),
            };

            const stripeResponse = await fetch(url, requestOptions);
            if (!stripeResponse.ok) {
                throw new Error("Error creating payment intent");
            }

            const { client_secret } = await stripeResponse.json();

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                    billing_details: { email: authState?.accessToken?.claims.email },
                },
            });

            if (result.error) {
                alert("Payment failed: " + result.error.message);
                setSubmitDisabled(false);
                return;
            }

            // Complete the payment on backend
            const completeUrl = `${process.env.REACT_APP_API}/payment/secure/payment-complete`;
            const completeResponse = await fetch(completeUrl, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (!completeResponse.ok) {
                throw new Error("Error completing payment");
            }

            setFees(0);
        } catch (error: any) {
            setHttpError(error.message);
        } finally {
            setSubmitDisabled(false);
        }
    }

    if (loadingFees) return <SpinnerLoading />;
    if (httpError) return <div className="container m-5"><p>{httpError}</p></div>;

    return (
        <div className="container">
            {fees > 0 ? (
                <div className="card mt-3">
                    <h5 className="card-header">
                        Fees pending: <span className="text-danger">${fees}</span>
                    </h5>
                    <div className="card-body">
                        <h5 className="card-title mb-3">Credit Card</h5>
                        <CardElement id="card-element" />
                        <button 
                            disabled={submitDisabled} 
                            type="button" 
                            className="btn btn-md main-color text-white mt-3"
                            onClick={checkout}
                        >
                            Pay fees
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mt-3">
                    <h5>You have no fees!</h5>
                    <Link type="button" className="btn main-color text-white" to="/search">
                        Explore top books
                    </Link>
                </div>
            )}

            {submitDisabled && <SpinnerLoading />}
        </div>
    );
};
