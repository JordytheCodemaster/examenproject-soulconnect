import React, { useState, useEffect } from 'react';
import { request } from '../util/Axios';
import { useTranslation } from 'react-i18next';
import Spinner from "../components/Loader";

const Profile = ({ userId, onClose }) => {
    const { t } = useTranslation();
    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]); 
    const [loading, setLoading] = useState(true);

    const av = localStorage.getItem('f-av');


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await request({
                    method: 'GET',
                    url: `/cat/user/${userId}/categories`,
                });
                setUser(response);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user:', error);
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await request({
                    method: 'GET',
                    url: '/cat/categories',
                });
                setCategories(response);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchImages = async () => {
            try {
                const response = await request({
                    method: 'GET',
                    url: `/user/user/${userId}/images`,
                });
                setImages(response.images || []);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        
        fetchUser();
        fetchCategories();
        fetchImages();
    }, [userId]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
    <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow-lg w-full sm:w-[80%] max-w-4xl p-2 overflow-auto max-h-[90vh] relative">
        {/* Close Button */}
        <button
            className="absolute top-4 right-6 text-gray-500 hover:text-gray-700 text-3xl z-10"
            onClick={onClose} // This triggers the passed down close function
        >
            &times;
        </button>
        
        {/* Left Half - Profile Image Section */}
        <div className="flex flex-col items-center sm:w-1/3 sm:mr-6 overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-2">{user?.username}</h2>
            <p className="text-gray-500">{t('age')}: {new Date().getFullYear() - new Date(user?.birth_date).getFullYear()}</p>
            <p className="text-gray-500">{t('gender')}: {user?.gender}</p>

        </div>
        
        {/* Right Half - Category and Info Section */}
        <div className="sm:w-2/3 overflow-y-auto mt-6 sm:mt-0 max-h-[80vh] overflow-auto">
            <h3 className="text-2xl font-bold text-purple-600 mb-6">{t('Profile')}</h3>

            {/* Categories */}
            <div className="space-y-6">
    {categories.map((category) => {
        // Check if the category has a matching category_id in the user's categories
        const categoryValue = user?.categories?.find(cat => cat.category_id === category.id)?.value;

        // Only render if there's a value for this category
        if (!categoryValue) return null;

        return (
            <div key={category.id} className="space-y-2">
                <h4 className="text-lg font-medium text-gray-700">{category.name}</h4>
                <p className="text-gray-600">
                    {categoryValue}
                </p>
            </div>
        );
    })}
</div>
        </div>
    </div>
</div>

    );
};

export default Profile;
