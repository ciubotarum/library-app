import { useState } from "react";
import { Navigate } from "react-router-dom";
import { SpinnerLoading } from "../layouts/Utils/SpinnerLoading";
import React from "react";
import { useAuthContext } from "../context/AuthContext";

const RegisterWidget = () => {
    const { authState, register, login } = useAuthContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // New confirm password state
    const [email, setEmail] = useState(""); // Email field state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Validate that password and confirmPassword match
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            await register(username, password, email);
            await login(username, password);
        } catch (err) {
            setError("Registration failed: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <SpinnerLoading />;
    }

    if (authState.isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-center">Register</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleRegister}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* New email input field */}
                                <div className="form-group mt-3">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* New password confirmation field */}
                                <div className="form-group mt-3">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {error && <div className="alert alert-danger mt-3">{error}</div>}
                                <button type="submit" className="btn btn-primary btn-block mt-3">
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterWidget;
