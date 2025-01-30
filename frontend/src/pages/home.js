import { useState, useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import Sidebar from "../components/sidebar";
import { request } from '../util/Axios';
import Spinner from "../components/Loader";
import Notifications from '../components/notifications';
import { Link } from "react-router-dom";
import Profile from '../components/profile';


export default function App() {
    const [isSidebarExpanded, setSidebarExpanded] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState(0); // Track the current partner
    const [partners, setPartners] = useState([]); // Top users data
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [showPreferences, setShowPreferences] = useState(false); // Modal state
    const [preferences, setPreferences] = useState({
        age: localStorage.getItem('_pref_age') || '18', // Load from localStorage
        gender: localStorage.getItem('_pref_gender') || 'Male', // Load from localStorage
    });
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
    // Fetch top users when the component mounts
    const fetchTopUsers = async () => {
        setIsLoading(true);
        try {
            const response = await request({
                method: 'POST',
                url: '/alg/randomUsersScore',
                data: {
                    ...(preferences.age && { age: preferences.age }), // Include only if set
                    ...(preferences.gender && { gender: preferences.gender }), // Include only if set
                },
            });

            if (response) {
                setPartners(response.top_users);
            }
        } catch (error) {
            console.error('Error fetching top users:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTopUsers();
    }, []);

    const createLike = async (liked_user_id) => {
        try {
            const response = await request({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                url: '/likes/likes',
                data: { liked_user_id },
            });

            console.log('Like created:', response);
        } catch (error) {
            console.error('Error creating like:', error);
        }
    };

    const handleLike = (liked_user_id) => {
        createLike(liked_user_id);

        if (selectedPartner < partners.length - 1) {
            setSelectedPartner((prev) => prev + 1);
            if (selectedPartner === 8) {
                fetchTopUsers();
                setSelectedPartner(0);
            }
        }
    };

    const handleDislike = () => {
        if (selectedPartner < partners.length - 1) {
            setSelectedPartner((prev) => prev + 1);
            if (selectedPartner === 8) {
                fetchTopUsers();
                setSelectedPartner(0);
            }
        }
    };

    const handlePreferenceChange = (event) => {
        const { name, value } = event.target;
        setPreferences((prev) => ({ ...prev, [name]: value }));
    };

    const savePreferences = () => {
        localStorage.setItem('_pref_age', preferences.age);
        localStorage.setItem('_pref_gender', preferences.gender);
        setShowPreferences(false);
        fetchTopUsers(); // Refresh with new preferences
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (!partners.length) {
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50 z-50">
                <Sidebar isSidebarExpanded={isSidebarExpanded} setSidebarExpanded={setSidebarExpanded} />

                <div>No partners found.<br /><Link to="/profile" className="underline">Edit your profile</Link></div>
            </div>
        );
    }

    const firstThreeInterests = partners[selectedPartner]?.interests?.slice(0, 3) || [];

    return (
        <div className="min-h-screen bg-purple-50 flex items-center justify-center relative overflow-hidden">
            {/* Background Icons */}

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

            <div className="flex flex-col justify-start items-center w-full max-w-7xl p-4 pl-16 sm:pl-0" >
                <div className="mb-2 z-50">
                    <button
                        onClick={() => setShowPreferences(true)}
                        className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-600 transition-all duration-300"
                    >
                        Preferences
                    </button>
                </div>
                <div className="relative h-[500px] w-[250px] sm:w-[600px] sm:h-[600px] bg-white rounded-2xl shadow-lg overflow-hidden flex justify-center items-center flex-col">
                    <img
                        src={
                            partners[selectedPartner]?.avatar_url
                                ? (partners[selectedPartner]?.avatar_url.startsWith('http')
                                    ? partners[selectedPartner]?.avatar_url
                                    : `http://localhost:5000${partners[selectedPartner]?.avatar_url}`)
                                : '/default-avatar.png' // Fallback if no avatar is found
                        }
                        alt={partners[selectedPartner]?.username || 'Default Avatar'}
                        className="absolute inset-0 w-full h-full object-cover rounded-2xl filter brightness-75"
                    />
                    {isProfileOpen && <Profile userId={partners[selectedPartner]?.id} onClose={closeProfile} />}
                    <div className="absolute top-4 left-4 flex flex-wrap space-x-2 z-20">
                        {firstThreeInterests.map((interest, index) => (
                            <span
                                key={index}
                                className="text-xs bg-white text-purple-700 px-3 py-1 rounded-full"
                            >
                                {interest.value}
                            </span>
                        ))}
                    </div>
                    <div>
                        {partners[selectedPartner].gender}
                    </div>
                    <div className="absolute bottom-8 w-full flex justify-between px-6 z-30">
                        <button
                            onClick={handleDislike}
                            className="bg-red-300 text-white p-4 rounded-full shadow-lg hover:bg-red-600 transform transition-all duration-300 hover:scale-110 z-30"
                        >
                            <RxCross1 size={30} />
                        </button>
                        <button
                            onClick={() => handleLike(partners[selectedPartner]?.id)}
                            className="bg-purple-300 text-white p-4 rounded-full shadow-lg hover:bg-purple-600 transform transition-all duration-300 hover:scale-110 z-30"
                        >
                            <AiOutlineHeart size={30} />
                        </button>
                    </div>
                    <div className="absolute bottom-24 w-full text-center z-20">
                        <h3 className="text-3xl font-bold text-white mb-2 underline cursor-pointer" onClick={openProfile}>
                            {partners[selectedPartner].username}
                        </h3>

                        <h3 className="text-xl text-white mb-2">
                            {partners[selectedPartner].gender} , {partners[selectedPartner].age}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Preferences Modal */}
            {showPreferences && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-[400px]">
                        <h2 className="text-xl font-bold mb-4">Set Preference</h2>
                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-col space-y-4">
                                <label>Gender</label>
                                <select
                                    name="gender"
                                    value={preferences.gender}
                                    onChange={handlePreferenceChange}
                                    className="p-2"
                                >
                                    <option value="">Any</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setShowPreferences(false)}
                                className="bg-gray-300 px-4 py-2 rounded-lg mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={savePreferences}
                                className="bg-purple-500 text-white px-4 py-2 rounded-lg"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
