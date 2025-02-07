import { useState, useEffect } from "react";

interface AccessToken {
    claims: {
        sub: string;
        userType: string;
    };
    accessToken: string;
}

interface AuthState {
    isAuthenticated: boolean;
    accessToken: AccessToken | null;
}

export const useOktaAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        accessToken: null
    });

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            setAuthState({
                isAuthenticated: token ? true : false,
                accessToken: {
                    claims: {
                        sub: "testuser",
                        userType: "user"
                    },
                    accessToken: token
                }
            });
        }
    }, []);

    const login = async (username: string, password: string) => {
        const response = await fetch("https://localhost:8443/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const responseJson = await response.json();
        const responseAccessToken = responseJson.token;

        localStorage.setItem("accessToken", responseAccessToken);

        setAuthState({
            isAuthenticated: true,
            accessToken: {
                claims: {
                    sub: username,
                    userType: "user"
                },
                accessToken: responseAccessToken
            }
        });
    };

    const register = async (username: string, password: string) => {
        const response = await fetch("https://localhost:8443/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error("Registration failed");
        }
    };

    return {
        authState,
        oktaAuth: {
            signOut: () => {
                localStorage.removeItem("accessToken");
                setAuthState({
                    isAuthenticated: false,
                    accessToken: null
                });
            },
            login,
            register
        }
    };
};
