import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Loader";

const EmailVerifiedRoute = ({ children }) => {
    const [hasEmailverified, setHasEmailverified] = useState(null);

    useEffect(() => {
        const checkEmailVerified = async () => {
            try {

                const { data } = await axios.get("http://localhost:5000/api/user/emailverified", {
                    withCredentials: true,
                });
                if (data.email_verified) {
                    setHasEmailverified(true);
                } else {
                    setHasEmailverified(false);
                    localStorage.setItem("toastMessage", "Your email is not verified.");
                }
            } catch (error) {
                setHasEmailverified(false);
                localStorage.setItem("toastMessage", "An error occurred while checking your email.");
            }
        };
        checkEmailVerified();
    }, []);

    if (hasEmailverified === null) {
        return <Spinner />; // Show a loader while checking subscription
    }

    return hasEmailverified ? children : <Navigate to="/profile-creation" />;
};

export default EmailVerifiedRoute;
