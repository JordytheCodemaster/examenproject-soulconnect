import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Loader";

const AuthUserRedirect = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.post("http://localhost:5000/api/test/test", {}, {
                    withCredentials: true,
                });
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <Spinner />; // Show a loader until the request is complete
    }

    return isAuthenticated ? <Navigate to="/home" /> : children;
};

export default AuthUserRedirect;