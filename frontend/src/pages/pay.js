import React, { useState, useEffect } from "react";
import { request } from "../util/Axios";
import logo from "../img/SoulConnect.png";
import { AiOutlineHeart } from "react-icons/ai";
import { useLocation, useNavigate } from 'react-router-dom';


export default function Login() {

    const location = useLocation();
    const navigate = useNavigate();
    const { price } = location.state || {};

    const handleConfirmPayment = async () => {
        try {

            const response = await request({
                method: "POST",
                url: "/payment/subscriptions",
                data: {
                    title: price.title,
                    days: price.total_days,
                    paid: price.value,
                    created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
                },
            });
            console.log("Subscription created:", response.data);
            navigate('/subscriptions'); // Navigate to subscriptions page after successful payment
        } catch (error) {
            console.error("Error confirming payment:", error);
        }
    };

    if (!price) {
        return <p className="text-center text-red-500">Geen prijsinformatie beschikbaar.</p>;
    }

    return (
        <div className="min-h-screen bg-purple-50 flex flex-col justify-center items-center p-6">
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

            <div className="absolute top-4 left-4 flex items-center z-10">
                <img src={logo} alt="SoulConnect Logo" className="w-12 h-12 object-contain" />
                <h1 className="text-3xl ml-2">SoulConnect</h1>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md z-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Betalingsdetails</h2>



                <div className="w-full flex flex-col items-center">
                    {/* Page Title */}

                    <div className="bg-gradient-to-br from-purple-300 to-purple-500 text-white flex flex-col justify-between items-center p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold text-center mb-6">
                            {price.title}
                        </h2>
                        <p className="text-4xl font-extrabold mb-4">
                            €{price.value.toFixed(2)}
                        </p>
                        <p className="text-xl font-semibold mb-6">
                            <span className="text-yellow-300">Looptijd:</span> {price.total_days} dagen
                        </p>
                        <p className="text-lg text-center leading-relaxed mb-6">
                            {price.description}
                        </p>
                        <button
                            onClick={handleConfirmPayment}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300"
                        >
                            Bevestig Betaling
                        </button>
                    </div>
                </div>


            </div>
        </div>
    );
}
