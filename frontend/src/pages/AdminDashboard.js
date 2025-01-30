import React, { useState, useEffect } from 'react';
import { request } from '../util/Axios';
import Spinner from "../components/Loader";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import logo from "../img/SoulConnect.png";
import { useNavigate } from "react-router";

const AdminDashboard = () => {
    const [prices, setPrices] = useState([]);
    const { t } = useTranslation();
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        value: '',
        title: '',
        total_days: '',
        description: ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [expandedUserId, setExpandedUserId] = useState(null);

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
        fetchPrices();
        fetchUsersWithPayments();
    }, []);

    const fetchPrices = async () => {
        setLoading(true);
        try {
            const response = await request({
                method: 'GET',
                url: '/prices',
            });
            setPrices(response || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching prices:', error);
            setLoading(false);
        }
    };
    const banUser = async (userId) => {
        try {
            await request({
                method: 'PUT',
                url: `/admin/ban/${userId}`,
            });

            fetchUsersWithPayments();
        } catch (error) {
            console.error('Error banning user:', error);
        }
    };

    const unbanUser = async (userId) => {
        try {
            await request({
                method: 'PUT',
                url: `/admin/unban/${userId}`,
            });

            fetchUsersWithPayments();
        } catch (error) {
            console.error('Error unbanning user:', error);
        }
    };



    const fetchUsersWithPayments = async () => {
        setLoading(true);
        try {
            const response = await request({
                method: 'GET',
                url: `/user/payments`,
            });
            setUsers(response);
            console.log(response)

            setLoading(false);
        } catch (error) {
            console.error('Error fetching users with payments:', error);
            setLoading(false);
        }
    };

    const toggleUserPayments = (userId) => {
        setExpandedUserId(expandedUserId === userId ? null : userId);
    };

    const updatePrice = async () => {
        try {
            await request({
                method: 'PUT',
                url: `admin/update-price`,
                data: formData,
            });
            setMessage('Price updated successfully');
            fetchPrices(); // Refresh prices after update
            setEditingId(null); // Exit editing mode
        } catch (error) {
            setMessage('Error updating price');
            console.error('Error updating price:', error);
        }
    };

    const createPrice = async () => {
        try {
            await request({
                method: 'POST',
                url: 'admin/create',
                data: formData,
            });
            setMessage('Price created successfully');
            fetchPrices(); // Refresh prices after creation
            setFormData({ id: '', value: '', title: '', total_days: '', description: '' }); // Reset form data
        } catch (error) {
            setMessage('Error creating price');
            console.error('Error creating price:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEdit = (price) => {
        setFormData(price);
        setEditingId(price.id);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await updatePrice();
        } else {
            await createPrice();
        }
    };



    return (

        <div className="flex min-h-screen bg-gray-100">
            <div className="absolute top-4 left-4 flex items-center z-10">
                <img src={logo} alt="SoulConnect Logo" className="w-12 h-12 object-contain" />
                <h1 className="text-3xl font-bold ml-2 text-purple-700">Administrator</h1>
            </div>

            {/* Main Content */}

            <div className="flex mt-24 flex-1 flex-col shadow-md  h-screen p-6 z-10">
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="w-full flex flex-col items-center">
                        {/* Page Title */}
                        <h1 className="text-2xl font-bold text-center mb-10">
                            Admin Dashboard - Prijzen
                        </h1>

                        {/* Prices Section */}
                        <div className="w-full mb-10">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b text-left">ID</th>
                                        <th className="py-2 px-4 border-b text-left">Title</th>
                                        <th className="py-2 px-4 border-b text-left">Value</th>
                                        <th className="py-2 px-4 border-b text-left">Total Days</th>
                                        <th className="py-2 px-4 border-b text-left">Description</th>
                                        <th className="py-2 px-4 border-b text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prices.map((price) => (
                                        <tr key={price.id}>
                                            <td className="py-2 px-4 border-b">{price.id}</td>
                                            <td className="py-2 px-4 border-b">
                                                {editingId === price.id ? (
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        value={formData.title}
                                                        onChange={handleChange}
                                                        className="w-full p-2 border border-gray-300 rounded-md"
                                                    />
                                                ) : (
                                                    price.title
                                                )}
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                {editingId === price.id ? (
                                                    <input
                                                        type="text"
                                                        name="value"
                                                        value={formData.value}
                                                        onChange={handleChange}
                                                        className="w-full p-2 border border-gray-300 rounded-md"
                                                    />
                                                ) : (
                                                    `€${price.value.toFixed(2)}`
                                                )}
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                {editingId === price.id ? (
                                                    <input
                                                        type="text"
                                                        name="total_days"
                                                        value={formData.total_days}
                                                        onChange={handleChange}
                                                        className="w-full p-2 border border-gray-300 rounded-md"
                                                    />
                                                ) : (
                                                    price.total_days
                                                )}
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                {editingId === price.id ? (
                                                    <input
                                                        type="text"
                                                        name="description"
                                                        value={formData.description}
                                                        onChange={handleChange}
                                                        className="w-full p-2 border border-gray-300 rounded-md"
                                                    />
                                                ) : (
                                                    price.description
                                                )}
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                {editingId === price.id ? (
                                                    <button
                                                        onClick={handleSubmit}
                                                        className="bg-green-500 text-white px-4 py-2 rounded"
                                                    >
                                                        Save
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleEdit(price)}
                                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {/* New Price Row */}
                                    <tr>
                                        <td className="py-2 px-4 border-b"></td>
                                        <td className="py-2 px-4 border-b">
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                placeholder="Title"
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <input
                                                type="text"
                                                name="value"
                                                value={formData.value}
                                                onChange={handleChange}
                                                placeholder="Value"
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <input
                                                type="text"
                                                name="total_days"
                                                value={formData.total_days}
                                                onChange={handleChange}
                                                placeholder="Total Days"
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <input
                                                type="text"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                placeholder="Description"
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <button
                                                onClick={handleSubmit}
                                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                            >
                                                Create
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Users Section */}
                        <h1 className="text-2xl font-bold  mb-10">
                            Gebruikers en Abonnementen
                        </h1>
                        <div className="w-full">

                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b text-left">User ID</th>
                                        <th className="py-2 px-4 border-b text-left">Username</th>
                                        <th className="py-2 px-4 border-b text-left">Email</th>
                                        <th className="py-2 px-4 border-b text-left">Actions</th>
                                        <th className="border-b text-left"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <React.Fragment key={user.id}>
                                            {/* Main User Row */}
                                            <tr className="hover:bg-gray-50 transition duration-200">
                                                <td className="py-3 px-6 border-b text-gray-700 font-medium">{user.id}</td>
                                                <td className="py-3 px-6 border-b text-gray-700">{user.username}</td>
                                                <td className="py-3 px-6 border-b text-gray-700">{user.email}</td>
                                                <td className="py-3 px-6 border-b flex flex-wrap gap-2">

                                                    {user.is_suspended ? (
                                                        <button
                                                            onClick={() => unbanUser(user.id)}
                                                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
                                                        >
                                                            Unban User
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => banUser(user.id)}
                                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                                                        >
                                                            Ban User
                                                        </button>
                                                    )}
                                                    <button className='bg-blue-200 p-2 rounded-md' onClick={() => createChat(user.id)}>Go to chat</button>
                                                </td>
                                                <td className='border-b text-gray-700'>
                                                    {expandedUserId === user.id ? (

                                                        <FaChevronUp className="w-5 h-5 mr-2 cursor-pointer" onClick={() => toggleUserPayments(user.id)} />


                                                    ) : (

                                                        <FaChevronDown className="w-5 h-5 mr-2 cursor-pointer" onClick={() => toggleUserPayments(user.id)} />


                                                    )}
                                                </td>
                                            </tr>

                                            {/* Payments Table Row */}
                                            {expandedUserId === user.id && user.payments && (
                                                <tr>
                                                    <td colSpan="4" className="py-4 px-6 border-b bg-gray-100 rounded-lg">
                                                        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
                                                            <thead>
                                                                <tr className="bg-gray-200 text-gray-700">

                                                                    <th className="py-3 px-4 text-left">Subscription Title</th>
                                                                    <th className="py-3 px-4 text-left">Paid</th>
                                                                    <th className="py-3 px-4 text-left">Created At</th>
                                                                    <th className="py-3 px-4 text-left">Days</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {Array.isArray(user.payments) ? (
                                                                    user.payments.length > 0 ? (
                                                                        user.payments.map((payment) => (
                                                                            <tr key={payment.id} className="hover:bg-gray-50 transition">
                                                                                <td className="py-3 px-4 border-b text-gray-700">{payment.title}</td>
                                                                                <td className="py-3 px-4 border-b text-gray-700">€{payment.paid.toFixed(2)}</td>
                                                                                <td className="py-3 px-4 border-b text-gray-700">
                                                                                    {new Date(payment.created_at).toLocaleDateString()}
                                                                                </td>
                                                                                <td className="py-3 px-4 border-b text-gray-700">{payment.days}</td>
                                                                            </tr>
                                                                        ))
                                                                    ) : (
                                                                        <tr>
                                                                            <td colSpan="4" className="py-4 text-center text-gray-500">
                                                                                No payments found
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                ) : (
                                                                    <tr className="hover:bg-gray-50 transition">
                                                                        <td className="py-3 px-4 border-b text-gray-700">{user.payments.title}</td>
                                                                        <td className="py-3 px-4 border-b text-gray-700">€{user.payments.paid.toFixed(2)}</td>
                                                                        <td className="py-3 px-4 border-b text-gray-700">
                                                                            {new Date(user.payments.created_at).toLocaleDateString()}
                                                                        </td>
                                                                        <td className="py-3 px-4 border-b text-gray-700">{user.payments.days}</td>
                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>


                            </table>
                        </div>
                    </div>
                )}
                {message && <div className="mt-4 text-center text-red-500">{message}</div>}
            </div>
        </div>
    );
};

export default AdminDashboard;
