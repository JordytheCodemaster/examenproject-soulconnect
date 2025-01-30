import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
    withCredentials: true, // Required for cookies
});

export default socket;
