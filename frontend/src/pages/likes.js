import React, { useState, useEffect, useRef } from "react";
import { request } from "../util/Axios";
import Sidebar from "../components/sidebar"; // Adjust path as needed
import Spinner from "../components/Loader";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import Alert from '../components/alert';
import Notifications from '../components/notifications';
import { useTranslation } from "react-i18next"; // Import useTranslation
import Profile from '../components/profile';
export default function LikesPage() {
    const { t } = useTranslation(); // Initialize useTranslation
    const [isSidebarExpanded, setSidebarExpanded] = useState(false);
    const [likedYou, setLikedYou] = useState([]);
    const [liked, setLiked] = useState([]);
    const [loading, setLoading] = useState(Boolean);
    const [view, setView] = useState("liked");
    const toastRef = useRef(null);
    const [max, setMax] = useState('10');
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
            // Fetch the likes given to the current user
            const LikedYou = await request({
                method: "GET",
                url: `/likes/likes/given?max=${max}`,
            });

            // Fetch the likes made by the current user
            const Liked = await request({
                method: "GET",
                url: `/likes/likes?max=${max}`,
            });

            setLoading(false);
            setLikedYou(LikedYou);
            setLiked(Liked);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    const isUserLiked = (user_id) => {
        return liked.some(user => user.liked_user_id === user_id);
    };

    const createLike = async (liked_user_id) => {
        try {
            const response = await request({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                url: '/likes/likes',
                data: {
                    liked_user_id,
                }
            });

            console.log('Like created:', response);
            fetchData();
            toastRef.current.showToast(t("likes.successfullyLiked"));
        } catch (error) {
            console.error('Error creating like:', error);
        }
    };

    const handleUnlike = async (liked_user_id) => {
        try {
            await request({
                method: 'DELETE',
                url: `/likes/likes/${liked_user_id}`,
            });
            fetchData();
            toastRef.current.showToast(t("likes.successfullyUnliked"));
        } catch (error) {
            console.error('Error unliking person:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [max]); // This ensures the data is fetched only once on component mount

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

                    <h1 className="text-2xl font-bold text-purple-600 mb-6">{t("likes.title")}</h1>

                    {/* Select Dropdown to Switch Views */}
                    <div className="mb-6 flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 w-full justify-between items-center">
                        <div className="flex items-center">
                            <select
                                id="view-select"
                                value={view}
                                onChange={(e) => setView(e.target.value)}
                                className="border border-gray-300 rounded-lg p-2"
                            >
                                <option value="liked">{t("likes.peopleYouLiked")}</option>
                                <option value="likedYou">{t("likes.peopleWhoLikedYou")}</option>
                            </select>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-700 ml-2">{t("maxResults")}: </span>
                            <select
                                id="max-select"
                                value={max}
                                onChange={(e) => setMax(e.target.value)}
                                className="border border-gray-300 rounded-lg ml-2 p-2"
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="500">500</option>

                            </select>
                        </div>
                    </div>



                    {/* Dynamic Section Based on Selected View */}
                    {view === "liked" && (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                {t("likes.peopleYouLiked")}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-6 gap-2">
                                {liked && liked.length > 0 ? (
                                    liked.map((user) => (

                                        <div
                                            key={user.liked_user_id}
                                            className="flex flex-col p-2 rounded-lg shadow hover:shadow-md transition-shadow max-w-48"
                                        >
                                            {isProfileOpen && <Profile userId={user.liked_user_id} onClose={closeProfile} />}
                                            <img onClick={openProfile}
                                                src={
                                                    user.avatar_url
                                                        ? (user.avatar_url.startsWith('http')
                                                            ? user.avatar_url
                                                            : `http://localhost:5000${user.avatar_url}`)
                                                        : '/default-avatar.png'
                                                }
                                                alt={user.username}
                                                className="w-full h-32 object-cover rounded-md mb-2 "
                                            />

                                            <div className="flex justify-between items-center">
                                                <h3 className="text-lg font-semibold text-gray-800">{user.username}</h3>
                                                <button
                                                    onClick={() => handleUnlike(user.liked_user_id)}
                                                    className={`p-2 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 z-30 bg-purple-300 text-white hover:bg-purple-600`}
                                                >
                                                    {isUserLiked(user.liked_user_id) ? <AiFillHeart size={20} /> : <AiOutlineHeart size={20} />}
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-600">{t("likes.noLikes")}</p>
                                )}
                            </div>
                        </div>
                    )}

                    {view === "likedYou" && (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                {t("likes.peopleWhoLikedYou")}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-6 gap-2">
                                {likedYou && likedYou.length > 0 ? (
                                    likedYou.map((user) => (
                                        <div
                                            key={user.user_id}
                                            className="flex flex-col p-2 rounded-lg shadow hover:shadow-md transition-shadow max-w-48"
                                        >

                                            {isProfileOpen && <Profile userId={user.user_id} onClose={closeProfile} />}
                                            <img onClick={openProfile}
                                                src={
                                                    user.avatar_url
                                                        ? (user.avatar_url.startsWith('http')
                                                            ? user.avatar_url
                                                            : `http://localhost:5000${user.avatar_url}`)
                                                        : '/default-avatar.png'
                                                }
                                                alt={user.username}
                                                className="w-full h-32 object-cover rounded-md mb-2 cursor-pointer"
                                            />

                                            <div className="flex justify-between items-center">
                                                <p className="text-purple-600 font-medium">
                                                    {user.username}
                                                </p>
                                                <button
                                                    onClick={() => isUserLiked(user.user_id) ? handleUnlike(user.user_id) : createLike(user.user_id)}
                                                    className={`p-2 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 z-30 bg-purple-300 text-white hover:bg-purple-600`}
                                                >
                                                    {isUserLiked(user.user_id) ? <AiFillHeart size={20} /> : <AiOutlineHeart size={20} />}
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-600">{t("likes.noLikes")}</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
