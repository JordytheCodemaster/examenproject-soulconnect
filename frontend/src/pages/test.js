import { useState } from "react";
import Sidebar from "../components/sidebar"; // Adjust path as needed
import { request } from '../util/Axios';
import ClipLoader from "react-spinners/ClipLoader";

export default function App() {
    const [isSidebarExpanded, setSidebarExpanded] = useState(false);
    const [data, setData] = useState();
    const fetchData = async () => {
        try {
            const data = await request({
                method: 'GET',
                url: '/test/test',
            });
            console.log(data);
            setData(data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="min-h-screen bg-purple-50 flex">
            {/* Sidebar */}
            <Sidebar isSidebarExpanded={isSidebarExpanded} setSidebarExpanded={setSidebarExpanded} />

            {/* Main Content */}
            <div className="flex-1 p-6 ml-16">
                {data ? JSON.stringify(data) : <ClipLoader
                    color="black"
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />}
            </div>
        </div>
    );
}
