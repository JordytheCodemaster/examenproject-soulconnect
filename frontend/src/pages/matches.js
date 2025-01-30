import React, { useState, useEffect, useRef } from "react";
import { request } from "../util/Axios";
import Sidebar from "../components/sidebar"; // Adjust path as needed
import Spinner from "../components/Loader";
import { AiOutlineHeart } from "react-icons/ai";
import Alert from '../components/alert';
import Notifications from '../components/notifications';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation
import Profile from "../components/profile";
export default function MatchesPage() {
    const { t } = useTranslation(); // Initialize useTranslation
    const [isSidebarExpanded, setSidebarExpanded] = useState(false);
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(Boolean);
    const navigate = useNavigate();

    const toastRef = useRef(null);
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);



    const openProfile = (userId) => {
        setSelectedUserId(userId);
        setProfileOpen(true);
    };

    const closeProfile = () => {
        setProfileOpen(false);
        setSelectedUserId(null);
    };
    const fetchData = async () => {
        setLoading(true);
        try {
            const matches = await request({
                method: "GET",
                url: "/match/",
            });

            setLoading(false);
            setMatches(matches);

        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    const createChat = async (match_id) => {
        console.log("Attempting to start a chat with " + match_id);
        try {
            const response = await request({
                method: "POST",
                url: "/message/create",
                data: { su_UID: match_id },
            });
            console.log(response);
            setLoading(false);
            navigate("/chats");

        } catch (error) {
            console.error("Error creating chat:", error);
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="min-h-screen bg-purple-50 flex">
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
            <div className="flex-1 p-6 ml-16 z-10">
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <Sidebar
                        isSidebarExpanded={isSidebarExpanded}
                        setSidebarExpanded={setSidebarExpanded}
                    />
                    <Notifications />
                    <Alert ref={toastRef} title={t("notification")} />

                    <h1 className="text-2xl font-bold text-purple-600 mb-6">{t("matches.title")}</h1>

                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-6 gap-2">
                            {matches && matches.length > 0 ? (
                                matches.map((match) => {
                                    const birthDate = new Date(match.user.birth_date);
                                    const age = new Date().getFullYear() - birthDate.getFullYear();
                                    const category = match.user.categories.find((category) => category.category_id === 1);
                                    return (
                                        <div
                                            key={match.id}
                                            className="flex flex-col p-2 rounded-lg shadow hover:shadow-md transition-shadow max-w-48"
                                        >

                                            {isProfileOpen && <Profile userId={match.user.id} onClose={closeProfile} />}
                                            <img onClick={openProfile}
                                                src={
                                                    match.user.avatar_url
                                                        ? (match.user.avatar_url.startsWith('http')
                                                            ? match.user.avatar_url // Full URL
                                                            : `http://localhost:5000${match.user.avatar_url}`)
                                                        : '/default-avatar.png' // Fallback image if no avatar URL is found
                                                }
                                                alt={match.id || 'Default Avatar'}
                                                className="w-full h-32 object-cover rounded-md mb-2 cursor-pointer"
                                            />
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800">
                                                    {match.user.username}
                                                </h3>
                                                {category && (
                                                    <p>
                                                        <span key={category.category_id}>{category.value}</span>
                                                    </p>
                                                )}
                                                <p>{match.user.gender}, {age}</p>
                                            </div>
                                            <button
                                                onClick={() => createChat(match.user.id)}
                                                className="w-full py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
                                            >
                                                {t("matches.makeChat")}
                                            </button>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-gray-600">{t("matches.noMatches")}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
