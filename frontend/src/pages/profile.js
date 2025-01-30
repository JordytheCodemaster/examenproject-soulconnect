import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/sidebar";
import MultiSelect from "../components/Multiselect.js";
import Alert from '../components/alert';
import { request } from '../util/Axios';
import Spinner from "../components/Loader";
import Notifications from '../components/notifications';
import { useTranslation } from "react-i18next"; // Import the translation hook
import Swal from 'sweetalert2';


export default function SettingsPage() {
    const { t } = useTranslation(); // Get the translation function
    const [isSidebarExpanded, setSidebarExpanded] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedValues, setSelectedValues] = useState({});
    const [avatar_url, setAvatar] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const toastRef = useRef(null);

    const [profileImage, setProfileImage] = useState(null); // for the profile picture
    const [uploadedImages, setUploadedImages] = useState([null, null, null, null]); // for the other images

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleMultiSelectChange = (name, values) => {
        setSelectedValues((prevValues) => ({
            ...prevValues,
            [name]: values,
        }));
    };

    const handleSave = async () => {
        const formattedData = [];

        Object.entries(selectedValues).forEach(([key, values]) => {
            const categoryId = key.split('-')[1]; // Extract category ID

            if (Array.isArray(values)) {
                values.forEach((value) => {
                    // Check if the combination of category_id and value already exists
                    if (!formattedData.some(item => item.category_id === parseInt(categoryId, 10) && item.value === value)) {
                        formattedData.push({
                            category_id: parseInt(categoryId, 10),
                            value,
                        });
                    }
                });
            } else {
                // Check if the category_id and value already exists
                if (!formattedData.some(item => item.category_id === parseInt(categoryId, 10) && item.value === values)) {
                    formattedData.push({
                        category_id: parseInt(categoryId, 10),
                        value: values,
                    });
                }
            }
        });

        try {
            await request({
                method: 'PUT',
                url: '/cat/users/categories',
                data: formattedData,
            });
            console.log('Data saved successfully');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    useEffect(() => {
        if (Object.keys(selectedValues).length > 0) {
            handleSave();
        }
    }, [selectedValues]);
 

    const fetchData = async () => {
        try {
          // Fetch categories and types data
          const response = await request({
            method: 'GET',
            url: '/cat/users/categories/types',
          });
      
          const values = response;
          const selectedValues = {};
      
          values.forEach(category => {
            const key = `category-${category.id}`; // Extract category ID
            if (category.multiple) {
              if (!selectedValues[key]) {
                selectedValues[key] = [];
              }
              selectedValues[key].push(category.value);
            } else {
              selectedValues[key] = category.value;
            }
          });
      
          // Fetch categories from the backend
          const categoriesResponse = await request({
            method: 'GET',
            url: '/cat/categories',
          });
      
          // Fetch user data, including avatar_url
          const avatarResponse = await request({
            method: 'GET',
            url: '/user/users/me',
          });
      
          // Construct the full avatar URL if avatar_url is not empty
          const avatarImageUrl = avatarResponse.avatar_url
            ? `http://localhost:5000${avatarResponse.avatar_url}`
            : '';
      
          setAvatar(avatarImageUrl); // Set the full avatar URL
      
          const imagesResponse = await request({
            method: 'GET',
            url: '/user/images', // Correct endpoint to fetch user images
          });
      
          // Log the structure of imagesResponse to understand its format
          console.log("Full response:", imagesResponse);
      
          // Check if imagesResponse contains the images object
          if (imagesResponse.images && Array.isArray(imagesResponse.images)) {
            setUploadedImages(imagesResponse.images); // Set multiple images in the state
          } else {
            console.error("No images found in response.");
            setUploadedImages([null, null, null, null]); // Set default empty array if no images
          }
      
          // Set the categories and selected values
          setCategories(categoriesResponse);
          setSelectedValues(selectedValues);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        }
      };

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
        }
    };

    const handleImageChange = (index, e) => {
        console.log('hallo')
        const file = e.target.files[0];
        if (file) {
            const updatedImages = [...uploadedImages];
            updatedImages[index] = file;
            setUploadedImages(updatedImages);
        }
    };

    const uploadProfileImage = async () => {
        if (profileImage) {
            const formData = new FormData();
            formData.append("profile_image", profileImage);

            try {
                const response = await request({
                    method: 'POST',
                    url: '/user/upload-profile-image', // Your backend endpoint
                    data: formData,
                });

                // Set the full URL of the newly uploaded avatar
                const newAvatarUrl = response.avatar_url ? `http://localhost:5000${response.avatar_url}` : '';
                setAvatar(newAvatarUrl);
                toastRef.current.showToast("Successfully added profile picture")
                console.log('Profile image uploaded successfully');
                fetchData()
            } catch (error) {
                console.error('Error uploading profile image:', error);
            }
        }
    };

    const uploadImages = async () => {
        const formData = new FormData();
    
        // Loop through the uploaded images and append non-null files to the FormData
        uploadedImages.forEach((image, index) => {
            if (image) {
                formData.append('images', image); // Append each valid image file
            }
        });
    
        try {
            const response = await request({
                method: 'POST',
                url: '/user/images/upload', // Backend endpoint
                data: formData,
                headers: {
                    // Do not set 'Content-Type' header manually when using FormData
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            // On success, show a SweetAlert2 success toast
            Swal.fire({
                icon: 'success',
                title: 'Images uploaded successfully!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
    
            console.log('Images uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading images:', error);
    
            // Optional: Show an error toast if the upload fails
            Swal.fire({
                icon: 'error',
                title: 'Failed to upload images!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
    };
    
    
    

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="flex min-h-screen bg-purple-50 p-4">
            {/* Sidebar */}
            <Sidebar isSidebarExpanded={isSidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
            <Notifications />

            <div className="flex flex-col sm:flex-row flex-1 ml-16">
                {/* Left Half */}
                {isLoading ? (
                    <div>{t("loading")}</div>
                ) : (
                    <div className="w-full sm:w-1/2 p-6 bg-white shadow-md overflow-y-auto">
                        <div className="mb-4">
                            {/* Use the full URL for the avatar image */}
                            <img
                                src={
                                    avatar_url
                                        ? (avatar_url.startsWith('http') 
                                            ? avatar_url 
                                            : `http://localhost:5000${avatar_url}`)
                                        : "https://www.famme.nl/wp-content/uploads/2021/01/mannen-vrouw-kijkt-weg-van-camera.jpeg"
                                }
                                alt="User Avatar"
                                className="w-full h-60 object-cover rounded-lg shadow-md"
                            />

                            {/* Profile picture upload */}
                            <input
                                type="file"
                                onChange={handleProfileImageChange}
                                className="mt-2"
                            />
                            <button 
                                onClick={uploadProfileImage} 
                                className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition"
                            >
                                {t("uploadProfile")}
                            </button>
                        </div>

                    {/* Image Grid - Displaying the 4 images */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* Loop through the uploaded images and display them */}
                        {uploadedImages.map((image, index) => (
                            <div key={index} className="flex flex-col items-center">
                                {/* Show the uploaded image or placeholder */}
                                <img
                                    src={
                                        image instanceof File 
                                            ? URL.createObjectURL(image) // Preview the uploaded file
                                            : image || "https://via.placeholder.com/150" // Fallback to placeholder if no image
                                    }
                                    alt={`Uploaded ${index + 1}`}
                                    className="w-32 h-32 object-cover rounded-md shadow-md mb-2"
                                />
                                {/* Input to change the image */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(index, e)}
                                    className="mt-2"
                                />
                            </div>
                        ))}

                        {/* Fill remaining slots with placeholders if there are fewer than 4 images */}
                        {uploadedImages.length < 4 &&
                            [...Array(4 - uploadedImages.length)].map((_, index) => (
                                <div key={uploadedImages.length + index} className="flex flex-col items-center">
                                    <img
                                        src="https://i.seadn.io/gae/OGpebYaykwlc8Tbk-oGxtxuv8HysLYKqw-FurtYql2UBd_q_-ENAwDY82PkbNB68aTkCINn6tOhpA8pF5SAewC2auZ_44Q77PcOo870?auto=format&dpr=1&w=1000"
                                        alt={`Placeholder ${uploadedImages.length + index + 1}`}
                                        className="w-32 h-32 object-cover rounded-md shadow-md mb-2"
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(uploadedImages.length + index, e)}
                                        className="mt-2"
                                    />
                                </div>
                            ))}
                    </div>


                        {/* Button to Upload Images */}
                        <button 
                            onClick={uploadImages} 
                            className="w-full mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-700 transition"
                        >
                            Upload Images
                        </button>
        </div>
    )}

    {/* Right Half */}
    <div className="w-full sm:w-1/2 mt-4 sm:mt-0 sm:ml-2 overflow-y-auto h-screen">
        <Alert ref={toastRef} title={t("helloPeople")} />
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-purple-600 mb-6">{t("profile")}</h1>
            <form className="space-y-4">
                {isLoading ? (
                    <div>{t("loading")}</div>
                ) : (
                    categories.map((category) => (
                        <div key={category.id}>
                            <label
                                className="block font-medium text-gray-700 mb-2"
                                htmlFor={`category-${category.id}`}
                            >
                                {category.name}
                            </label>
                            {category.multiple ? (
                                <MultiSelect
                                    options={category.types || []}
                                    id={`category-${category.id}`}
                                    name={`category-${category.id}`}
                                    selectedValues={selectedValues[`category-${category.id}`] || []}
                                    onChange={(selected) =>
                                        handleMultiSelectChange(`category-${category.id}`, selected)
                                    }
                                />
                            ) : category.types && category.types.length > 0 ? (
                                <select
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    id={`category-${category.id}`}
                                    name={`category-${category.id}`}
                                    value={selectedValues[`category-${category.id}`] || ''}
                                    onChange={handleInputChange}
                                >
                                    {category.types.map((type, index) => (
                                        <option key={index} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    id={`category-${category.id}`}
                                    name={`category-${category.id}`}
                                    value={selectedValues[`category-${category.id}`] || ''}
                                    placeholder={category.name}
                                    onChange={handleInputChange}
                                />
                            )}
                        </div>
                    ))
                )}
            </form>
        </div>
    </div>
</div>

        </div>
    );
}
