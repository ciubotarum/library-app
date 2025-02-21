import React, { createContext, useContext, useState, useEffect } from "react";

// New: helper to parse JWT token
const parseJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

interface AccessToken {
    claims: {
        sub: string;
        userType: string;
        email: string;
    };
    accessToken: string;
}

interface AuthState {
    isAuthenticated: boolean;
    accessToken: AccessToken | null;
}

interface AuthContextProps {
    authState: AuthState;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, password: string, email: string) => Promise<void>;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        accessToken: null
    });

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            const claims = parseJwt(token);
            if(claims) {
                setAuthState({
                    isAuthenticated: true,
                    accessToken: {
                        claims: { 
                          sub: claims.sub, 
                          userType: claims.userType,
                          email: claims.email 
                        },
                        accessToken: token
                    }
                });
            }
        }
    }, []);

    const login = async (username: string, password: string) => {
        const response = await fetch("https://localhost:8443/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        if (!response.ok) throw new Error("Login failed");
        const data = await response.json();
        localStorage.setItem("accessToken", data.token);
        const claims = parseJwt(data.token);
        setAuthState({
            isAuthenticated: true,
            accessToken: {
                claims: { 
                  sub: claims ? claims.sub : username, 
                  userType: claims && claims.userType ? claims.userType.toUpperCase() : "USER",
                  email: claims ? claims.email : "" 
                },
                accessToken: data.token
            }
        });
    };

    const register = async (username: string, password: string, email: string) => {
        const response = await fetch("https://localhost:8443/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, email })
        });
        if (!response.ok) throw new Error("Registration failed");
    };

    const signOut = () => {
        localStorage.removeItem("accessToken");
        setAuthState({ isAuthenticated: false, accessToken: null });
    };

    return (
        <AuthContext.Provider value={{ authState, login, register, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuthContext must be used within an AuthProvider");
    return context;
};
