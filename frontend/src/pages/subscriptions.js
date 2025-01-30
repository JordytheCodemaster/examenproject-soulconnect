import React, { useState, useEffect, useRef } from "react";
import { request } from "../util/Axios";
import Sidebar from "../components/sidebar"; // Adjust path as needed
import Spinner from "../components/Loader";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import Notifications from '../components/notifications';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import Alert from '../components/alert';


export default function PricesPage() {
    const { t, i18n } = useTranslation(); // Initialize translation
    const [isSidebarExpanded, setSidebarExpanded] = useState(false);
    const [prices, setPrices] = useState([]);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const toastRef = useRef(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const prices = await request({
                method: "GET",
                url: "/prices",
            });

            setPrices(Array.isArray(prices) ? prices : []);

            const payments = await request({
                method: "GET",
                url: "/payment/subscriptions",
            });

            setPayments(Array.isArray(payments) ? payments : []);
            setLoading(false);
        }
        catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    const handleCancelSubscription = async (id) => {
        const confirmed = window.confirm(t('cancelConfirmation'));
        if (confirmed) {
            try {
                await request({
                    method: "DELETE",
                    url: `/payment/subscriptions/${id}`,
                });
                fetchData(); // Refresh the list after cancellation
            } catch (error) {
                console.error("Error cancelling subscription:", error);
            }
        }
    };

    const handlePriceClick = (price) => {
        navigate('/pay', { state: { price } });
    };

    useEffect(() => {
        const toastMessage = localStorage.getItem("toastMessage");
        if (toastMessage) {
            toastRef.current.showToast(toastMessage);// Show the toast message
            localStorage.removeItem("toastMessage"); // Clear the message after showing it
        }
        fetchData();
    }, []);

    const calculateRemainingDays = (createdAt, days) => {
        const createdDate = new Date(createdAt.replace(' ', 'T')); // Ensure the date string is correctly parsed
        const expiryDate = new Date(createdDate.getTime() + days * 24 * 60 * 60 * 1000); // Add days in milliseconds
        const today = new Date();
        const remainingTime = expiryDate - today;
        const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
        return {
            remainingDays: remainingDays > 0 ? remainingDays : 0,
            expiryDate: expiryDate.toLocaleDateString()
        };
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="absolute inset-0 bg-purple-50 overflow-hidden flex flex-wrap">
                {[...Array(Math.floor(window.innerWidth / 30) * Math.floor(window.innerHeight / 30))].map((_, index) => (
                    <AiOutlineHeart
                        key={index}
                        className="text-purple-200"
                        style={{
                            fontSize: "20px",
                            margin: "7px",
                        }}
                    />
                ))}
            </div>
            <Sidebar isSidebarExpanded={isSidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
            <Notifications />
            <Alert ref={toastRef} title="Notification" />
            {/* Main Content */}
            <div className="ml-12 flex flex-1 flex-col shadow-md overflow-y-auto h-screen p-6 z-10">
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="w-full flex flex-col items-center">
                        {/* Page Title */}
                        <h1 className="text-4xl font-extrabold text-center mb-10 text-purple-800">
                            {t('pageTitle')}
                        </h1>

                        {/* Prices Section */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                            {prices.map((price, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-purple-300 to-purple-500 text-white flex flex-col justify-between items-center p-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 h-full cursor-pointer"
                                    onClick={() => handlePriceClick(price)}
                                >
                                    {/* Price Title */}
                                    <h2 className="text-2xl font-bold text-center mb-6">
                                        {price.title}
                                    </h2>

                                    {/* Price Value */}
                                    <p className="text-4xl font-extrabold mb-4">
                                        €{price.value.toFixed(2)}
                                    </p>

                                    {/* Total Days */}
                                    <p className="text-xl font-semibold mb-6">
                                        <span className="text-yellow-300">{t('durationLabel')}</span> {price.total_days} {i18n.language === 'nl' ? 'dagen' : 'days'}
                                    </p>

                                    {/* Price Description */}
                                    <p className="text-lg text-center leading-relaxed">
                                        {price.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {loading ? (
                    <Spinner />
                ) : (
                    <div className="w-full flex flex-col items-center">
                        {/* Page Title */}
                        <h1 className="text-xl font-extrabold text-center mt-10 text-purple-500 mb-4">
                            {t('subscriptionTitle')}
                        </h1>

                        {/* Payments Section */}
                        <div className="w-full">
                            {payments.length === 0 ? (
                                <p className="text-gray-600 text-center">{t('noSubscriptionsFound')}</p>
                            ) : (
                                <ul className="w-full">
                                    {payments.map((payment, index) => {
                                        const { remainingDays, expiryDate } = calculateRemainingDays(payment.created_at, payment.days);
                                        return (
                                            <li
                                                key={index}
                                                className={`bg-white p-6 mb-4 rounded-lg shadow-md border ${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'} hover:bg-gray-200 transition duration-300`}
                                            >
                                                <h2 className="text-lg font-semibold text-purple-700">{payment.title}</h2>
                                                <p className="text-sm text-gray-700">Paid: €{payment.paid.toFixed(2)}</p>
                                                <p className="text-sm text-gray-700">Remaining days: {remainingDays}</p>
                                                <p className="text-sm text-gray-700">Expiry Date: {expiryDate}</p>
                                                <button
                                                    onClick={() => handleCancelSubscription(payment.id)}
                                                    className="text-sm underline text-gray-700 transition duration-300"
                                                >
                                                    {t('cancelButton')}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
