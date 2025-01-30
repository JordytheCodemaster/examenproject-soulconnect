import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation
import Sidebar from "../components/sidebar";
import socket from "../util/socket";
import { request } from "../util/Axios";
import Spinner from "../components/Loader";

export default function ChatsPage() {
    const { t } = useTranslation(); // Translation hook
    const [isSidebarExpanded, setSidebarExpanded] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]); // Fetch from API
    const [selectedChat, setSelectedChat] = useState();
    const [secondUser, setSecondUser] = useState();
    const [loading, setLoading] = useState();
    const [usernameSecondUser, setUSU] = useState();
    const [uid, setUID] = useState();
    const messagesEndRef = useRef(null); // Create a ref for the messages container


    function formatDate(dateString) {
        const date = new Date(dateString);
    
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
    
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
    
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
    
        hours = hours % 12 || 12; // Convert to 12-hour format
    
        return `${month} ${day}, ${year}, ${hours}:${minutes} ${ampm}`;
    }

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        console.log("Socket connected:", socket.connected); // Should log `true`
        getUID();
    }, []);

    const getUID = async () => {
        const response = await request({
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            url: "/user/uid",
        });
        setUID(response);
    };

    useEffect(() => {
        setLoading(true); // Start loading
    
        const fetchChats = async () => {
            try {
                const response = await request({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    url: '/message/get',
                });
    
                if (response.success) {
                    const { result, secondUserChat } = response;
                    setChats(result);
                    setSecondUser(secondUserChat);
                    setLoading(false);

                } else {
                    setLoading(false);
                }

                
            } catch (error) {
                console.error("Error fetching chats:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchChats();
    }, []);
    

    useEffect(() => {

        if (selectedChat) {
            socket.emit("join-chat", { chatId: selectedChat });

            socket.on("chat-history", (history) => {
                if (Array.isArray(history)) {
                    setMessages(history);
                } else {
                    console.error("Invalid chat history format:", history);
                }
                scrollToBottom();
            });

            socket.on("receive-message", (newMessage) => {
                if (newMessage && newMessage.id && newMessage.text && newMessage.created_at) {
                    setMessages((prev) => [...prev, newMessage]);
                    scrollToBottom();
                }
            });

            socket.on("error", (errorMsg) => {
                alert(errorMsg);
            });
        }
        return () => {
            socket.off("chat-history");
            socket.off("receive-message");
            socket.off("error");
        };
    }, [selectedChat]);

    const handleMessageSend = () => {
        if (!selectedChat || !message.trim()) return;

        socket.emit("send-message", {
            chatId: selectedChat,
            text: message,
        });

        setMessage("");
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    if (loading) {
        return <Spinner />;
    }
    
    return (
        <div className="min-h-screen bg-purple-50 flex">
            <Sidebar isSidebarExpanded={isSidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
            <div className="flex-1 p-6 ml-16 flex">
                <div className={`rounded-lg shadow-md p-4 mr-6 bg-white ${selectedChat ? "w-80" : "w-full"}`}>
                    <h1 className="text-2xl font-bold text-purple-600 mb-6">{t("chats.title")}</h1>
                    {chats && chats.length > 0 ? (
                        chats.map((chat) => (
                            <div
                                key={chat.id}
                                onClick={() => setSelectedChat(chat.chat_id)}
                                className={`flex p-4 mb-2 rounded-lg cursor-pointer flex items-center space-x-4 ${
                                    selectedChat === chat.chat_id
                                        ? "bg-purple-400 text-white"
                                        : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            >
                                <img
                                    src={
                                        chat.secondUser_avatar
                                            ? (chat.secondUser_avatar.startsWith('http') 
                                                ? chat.secondUser_avatar 
                                                : `http://localhost:5000${chat.secondUser_avatar}`)
                                            : '/default-avatar.png'
                                    }
                                    alt={chat.secondUser_username}
                                    className="w-12 h-12 rounded-full object-cover"
                                />

                                <p className="text-lg font-semibold">{chat.secondUser_username}</p>
                            </div>
                        ))
                    ) : (
                        <h1>No chats yet.</h1>
                    )}
                </div>
                {selectedChat ? (
                    <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
                        <div className="overflow-auto h-[80vh] p-4 border border-gray-300 rounded-lg">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`mb-4 rounded-md p-2 ${
                                    msg.sender_id == uid ? "text-right bg-purple-200" : "bg-gray-100"
                                }`}
                            >
                                <p className="p-2 rounded-lg">{msg.text}</p>
                                <span className="text-xs text-gray-500">{formatDate(msg.created_at)}</span>
                            </div>
                        ))}
                        {!messages.length > 0 ? (<h1 className="text-xl p-4 text-center">Start a conversation</h1>) : (<></>)}

                            <div ref={messagesEndRef} />
                        </div>
                        <div className="flex items-center border-t pt-6">
                            <input
                                type="text"
                                className="flex-1 border border-gray-300 rounded-lg p-2 mr-2"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder={t("chats.placeholder")}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleMessageSend(); // Call the message send function
                                    }
                                }}
                            />
                            <button
                                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
                                onClick={handleMessageSend}
                            >
                                {t("chats.send")}
                            </button>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
