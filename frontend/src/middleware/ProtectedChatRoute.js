import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Loader";

const ProtectedChatRoute = ({ children }) => {
    const [hasSubscription, setHasSubscription] = useState(null);

    useEffect(() => {
        const checkSubscription = async () => {
            try {
                // Make a request to check subscription status
                const { data } = await axios.get("http://localhost:5000/api/payment/subscriptions", {
                    withCredentials: true, // Ensure cookies are included
                });

                // Check if rows exist in the response data
                if (data.length > 0) {
                    setHasSubscription(true); // Subscription exists
                } else {
                    setHasSubscription(false); // No subscription found
                    localStorage.setItem("toastMessage", "You have no subscriptions.");
                }
            } catch (error) {
                setHasSubscription(false); // Handle errors
                localStorage.setItem("toastMessage", "An error occurred while checking your subscription.");
            }
        };
        checkSubscription();
    }, []);

    if (hasSubscription === null) {
        return <Spinner />; // Show a loader while checking subscription
    }

    return hasSubscription ? children : <Navigate to="/subscriptions" />;
};

export default ProtectedChatRoute;
