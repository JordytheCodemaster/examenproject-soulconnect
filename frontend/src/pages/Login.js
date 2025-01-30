import React, { useState } from "react";
import { request } from "../util/Axios";
import logo from "../img/SoulConnect.png";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { useTranslation } from "react-i18next"; // Import useTranslation
import LanguageSwitcher from "../components/languageSwitch"; // Import LanguageSwitcher

export default function Login() {
    const { t } = useTranslation(); // Use translation hook to get translated texts
    const [email, setEmail] = useState("noah.brown@gmail.com");
    const [password, setPassword] = useState("testtesttesttest");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await request({
                method: "POST",
                url: "/user/login",
                data: { email, password },
            });

            if (response.user.is_suspended) {
                setErrorMessage("Your account is suspended. Please contact an administrator or try again later." || t("errorMessage"));
            } else {
                if (response.user.avatar) {
                    localStorage.setItem('f-av', response.user.avatar);
                }
    
                navigate("/home");
                setSuccessMessage(t("successMessage"));
            }
        } catch (error) {
            console.log(error);
            setErrorMessage(error.message || t("errorMessage"));
        }
    };

    return (
        <div className="min-h-screen bg-purple-50 flex flex-col justify-center items-center p-6">
            <LanguageSwitcher />
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
                <h1 className="text-3xl font-bold ml-2 text-purple-700">SoulConnect</h1>
            </div>


            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md z-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{t("login")}</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            {t("email")}*
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
                            {t("password")}*
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
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            {t("dontHaveAccount")}{" "}
                            <a
                                href="/register"
                                className="text-purple-500 hover:underline"
                            >
                                {t("register")}
                            </a>
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
                    >
                        {t("login")}
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
}
