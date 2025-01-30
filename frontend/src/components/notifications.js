import React, { useRef, useState, useEffect } from 'react';
import { request } from '../util/Axios';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        fetchNotifications();
    }, []);


    const fetchNotifications = async () => {
        try {
            const response = await request({
                method: 'GET',
                url: '/noti', // Adjust based on your API
            });
            setNotifications(response || []);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };
    const deleteNotification = async (id) => {
        try {
            await request({
                method: 'DELETE',
                url: `/noti/${id}`,
            });
            setNotifications(notifications.filter(notification => notification.id !== id));
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="absolute top-10 right-10 z-50" ref={dropdownRef}>
            <button
                className="relative w-10 h-10 bg-purple-500 text-white rounded-full focus:outline-none"
                onClick={toggleDropdown}
            >
                {/* Red Dot for Notifications */}
                {notifications.length > 0 && (
                    <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                )}
                <svg
                    className="w-6 h-6 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    ></path>
                </svg>
            </button>
            {isDropdownVisible && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
                            Notifications
                        </h3>
                        {notifications.length === 0 ? (
                            <p className="text-gray-600 text-center py-4">No notifications</p>
                        ) : (
                            <ul>
                                {notifications.map((notification) => (
                                    <li
                                        key={notification.id}
                                        className="mb-4 last:mb-0 border-b pb-2 last:border-b-0 flex justify-between items-start"
                                    >
                                        <div>
                                            <p className="text-gray-900 font-medium">
                                                {notification.title}
                                            </p>
                                            <p className="text-gray-600 text-sm">
                                                {notification.text}
                                            </p>
                                            <p className="text-gray-500 text-xs mt-1">
                                                {new Date(notification.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => deleteNotification(notification.id)}
                                            className="text-red-500 hover:text-red-700 ml-4"
                                        >
                                            &times;
                                        </button>
                                    </li>
                                ))}
                            </ul>

                        )}
                    </div>

                </div>
            )}
        </div>
    );
};

export default Notifications;
