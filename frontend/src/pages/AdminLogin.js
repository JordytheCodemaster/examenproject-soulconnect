import React, { useState } from 'react';
import { request } from '../util/Axios';
import { useNavigate } from 'react-router-dom';
import logo from '../img/SoulConnect.png';
import { AiOutlineHeart } from 'react-icons/ai';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await request({
                method: 'POST',
                url: '/admin/adminlogin',
                data: { email, password },
            });
console.log(response);
            navigate('/admin-dash');
            setSuccessMessage('Login successful!');
            
        } catch (error) {
        }
    };

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
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Login</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
                    >
                        Login
                    </button>
                </form>

                {errorMessage && (
                    <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
                )}
                {successMessage && (
                    <p className="text-green-500 text-sm mt-4">{successMessage}</p>
                )}
            </div>
        </div>
    );
};

export default AdminLogin;
