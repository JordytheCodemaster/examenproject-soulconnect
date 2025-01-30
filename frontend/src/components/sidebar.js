import React, { useState, useEffect  } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoSettings } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";

import { IoHome, IoHomeOutline } from "react-icons/io5"; // Solid and outline for home
import { IoChatboxEllipses } from "react-icons/io5";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";

import { AiFillDollarCircle } from "react-icons/ai";
import { AiOutlineDollar } from "react-icons/ai";

import { IoPeopleOutline } from "react-icons/io5";
import { IoPeople } from "react-icons/io5";

import { request } from "../util/Axios";

import logo from "../img/SoulConnect.png";

export default function Sidebar({ isSidebarExpanded, setSidebarExpanded }) {
    const [hoverTimeout, setHoverTimeout] = useState(null);
    const location = useLocation(); // Get the current route

    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        // Fetch the user's profile picture when the sidebar mounts
        const fetchProfilePicture = async () => {
            try {
                const response = await request({
                    method: "GET",
                    url: "/user/users/me",
                });

                // Construct the full avatar URL if `avatar_url` is not empty
                const avatarImageUrl = response.avatar_url
                    ? `http://localhost:5000${response.avatar_url}`
                    : "https://via.placeholder.com/150"; // Placeholder image if no avatar is available

                setAvatarUrl(avatarImageUrl);
            } catch (error) {
                console.error("Error fetching profile picture:", error);
                setAvatarUrl("https://via.placeholder.com/150"); // Fallback in case of error
            }
        };

        fetchProfilePicture();
    }, []);

    const handleMouseEnter = () => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            setHoverTimeout(null);
        }
        setSidebarExpanded(true);
    };

    const handleMouseLeave = () => {
        const timeout = setTimeout(() => {
            setSidebarExpanded(false);
        }, 100); // Delay before collapsing
        setHoverTimeout(timeout);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div
            className={`bg-white shadow-lg transition-all duration-300 ease-in-out ${isSidebarExpanded ? "w-48" : "w-16"} fixed top-0 left-0 h-full z-50`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex flex-col h-full justify-between">
                {/* Top Links Section */}
                <div className="flex flex-col items-start space-y-4 pt-6">
                    <div className="flex items-center">
                        <img
                            src={logo}
                            alt="SoulConnect Logo"
                            className="w-16 h-16"
                        />
                        <span
                            style={{
                                opacity: isSidebarExpanded ? 1 : 0,
                                visibility: isSidebarExpanded ? "visible" : "hidden",
                                transition: "opacity 0.3s ease, visibility 0.3s ease",
                            }}
                            className="text-lg text-left"
                        >

                        </span>
                    </div>

                    {/* Navigation Links */}
                    <Link to="/home" className="flex items-center pl-4">
                        {isActive("/home") ? (
                            <IoHome size={30} className="text-purple-500" />
                        ) : (
                            <IoHomeOutline size={30} className="text-purple-500" />
                        )}
                        <span
                            style={{
                                opacity: isSidebarExpanded ? 1 : 0,
                                visibility: isSidebarExpanded ? "visible" : "hidden",
                                transition: "opacity 0.3s ease, visibility 0.3s ease",
                                marginLeft: "1rem",
                            }}
                            className="text-lg text-purple-500 text-left"
                        >
                            Home
                        </span>
                    </Link>
                    <Link to="/chats" className="flex items-center pl-4">
                        {isActive("/chats") ? (
                            <IoChatboxEllipses size={30} className="text-purple-500" />
                        ) : (
                            <IoChatboxEllipsesOutline size={30} className="text-purple-500" />
                        )}
                        <span
                            style={{
                                opacity: isSidebarExpanded ? 1 : 0,
                                visibility: isSidebarExpanded ? "visible" : "hidden",
                                transition: "opacity 0.3s ease, visibility 0.3s ease",
                                marginLeft: "1rem",
                            }}
                            className="text-lg text-purple-500 text-left"
                        >
                            Chats
                        </span>
                    </Link>
                    <Link to="/likes" className="flex items-center pl-4">
                        {isActive("/likes") ? (
                            <IoIosHeart size={30} className="text-purple-500" />
                        ) : (
                            <IoIosHeartEmpty size={30} className="text-purple-500" />
                        )}
                        <span
                            style={{
                                opacity: isSidebarExpanded ? 1 : 0,
                                visibility: isSidebarExpanded ? "visible" : "hidden",
                                transition: "opacity 0.3s ease, visibility 0.3s ease",
                                marginLeft: "1rem",
                            }}
                            className="text-lg text-purple-500 text-left"
                        >
                            Likes
                        </span>
                    </Link>
                    <Link to="/matches" className="flex items-center pl-4">
                        {isActive("/matches") ? (
                            <IoPeople size={30} className="text-purple-500" />
                        ) : (
                            <IoPeopleOutline size={30} className="text-purple-500" />
                        )}
                        <span
                            style={{
                                opacity: isSidebarExpanded ? 1 : 0,
                                visibility: isSidebarExpanded ? "visible" : "hidden",
                                transition: "opacity 0.3s ease, visibility 0.3s ease",
                                marginLeft: "1rem",
                            }}
                            className="text-lg text-purple-500 text-left"
                        >
                            Matches
                        </span>
                    </Link>
                </div>

                {/* Bottom Links Section */}
                <div className="flex flex-col items-start space-y-4 pb-6">

                    <Link to="/subscriptions" className="flex items-center pl-4">
                        {isActive("/subscriptions") ? (
                            <AiFillDollarCircle size={30} className="text-purple-500" />
                        ) : (
                            <AiOutlineDollar size={30} className="text-purple-500" />
                        )}
                        <span
                            style={{
                                opacity: isSidebarExpanded ? 1 : 0,
                                visibility: isSidebarExpanded ? "visible" : "hidden",
                                transition: "opacity 0.3s ease, visibility 0.3s ease",
                                marginLeft: "1rem",
                            }}
                            className="text-lg text-purple-500 text-left"
                        >
                            Subscriptions
                        </span>
                    </Link>
                    <Link to="/settings" className="flex items-center pl-4">
                        {isActive("/settings") ? (
                            <IoSettings size={30} className="text-purple-500" />
                        ) : (
                            <IoSettingsOutline size={30} className="text-purple-500" />
                        )}
                        <span
                            style={{
                                opacity: isSidebarExpanded ? 1 : 0,
                                visibility: isSidebarExpanded ? "visible" : "hidden",
                                transition: "opacity 0.3s ease, visibility 0.3s ease",
                                marginLeft: "1rem",
                            }}
                            className="text-lg text-purple-500 text-left"
                        >
                            Settings
                        </span>
                    </Link>
                    <Link to="/profile" className="flex items-center pl-3 text-lg">
                        <div className="profile-section p-2 flex items-center">
                            <img
                                src={avatarUrl}
                                alt="User Avatar"
                                className="w-10 h-10 object-cover rounded-full shadow-md"
                            />
                            <span
                                style={{
                                    opacity: isSidebarExpanded ? 1 : 0,
                                    visibility: isSidebarExpanded ? "visible" : "hidden",
                                    transition: "opacity 0.3s ease, visibility 0.3s ease",
                                    marginLeft: "0.5rem",
                                }}
                                className={isActive("/profile") ? "text-purple-700 text-left" : "text-purple-500 text-left"}
                            >
                                Profile
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
