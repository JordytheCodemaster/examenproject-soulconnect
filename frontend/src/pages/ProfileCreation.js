import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Swal from "sweetalert2"; // Import SweetAlert2
import logo from "../img/SoulConnect.png";
import { request } from "../util/Axios"; // Import Axios utility
import MultiSelect from "../components/Multiselect";
import { useTranslation } from "react-i18next"; // Import useTranslation
import LanguageSwitcher from "../components/languageSwitch"; // Import LanguageSwitcher
import Alert from '../components/alert';
import { AiOutlineHeart } from "react-icons/ai";
export default function ProfileCreation() {
  const { t } = useTranslation(); // Initialize useTranslation
  const navigate = useNavigate(); // Initialize useNavigate
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [emailverified, setEmailverified] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const toastRef = useRef(null);

  const fetchData = async () => {
    try {
      const categories = await request({
        method: 'GET',
        url: '/cat/categories', // Adjust as needed based on your API
      });
      setCategories(categories); // Set categories

      const emailverified = await request({
        method: 'GET',
        url: '/user/emailverified', // Adjust as needed based on your API
      });
      setEmailverified(emailverified);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const toastMessage = localStorage.getItem("toastMessage");
    if (toastMessage) {
      toastRef.current.showToast(toastMessage);// Show the toast message
      localStorage.removeItem("toastMessage"); // Clear the message after showing it
    }
    fetchData();
  }, []);

  const handleSelectChange = (name, selected) => {
    setSelectedValues({
      ...selectedValues,
      [name]: selected
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validateRequiredFields = () => {
    const currentCategory = categories[currentStep];
    const categoryId = currentCategory?.id;
    const fieldName = `category-${categoryId}`;

    // If the field is required and no value is selected/entered
    if (currentCategory?.required && !selectedValues[fieldName]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `${currentCategory.name} ${t("isRequired")}`, // Show required error message
      }));
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const formattedData = [];

    Object.entries(selectedValues).forEach(([key, values]) => {
      const categoryId = key.split('-')[1];

      if (Array.isArray(values)) {
        values.forEach((value) => {
          formattedData.push({
            category_id: parseInt(categoryId, 10),
            value,
          });
        });
      } else {
        formattedData.push({
          category_id: parseInt(categoryId, 10),
          value: values,
        });
      }
    });

    console.log('Formatted data:', formattedData);

    try {
      await request({
        method: 'POST',
        url: 'http://localhost:5000/api/cat/users/categories',
        data: { categories: formattedData },
      });

      Swal.fire({
        title: t("success.title"), // Translated text
        text: t("success.text"),
        icon: "success",
        confirmButtonText: t("success.confirmButtonText"),
      }).then(() => {
        navigate('/home');
      });
    } catch (error) {
      console.error("Error submitting data:", error);

      Swal.fire({
        title: t("error.title"), // Translated text
        text: t("error.text"),
        icon: "error",
        confirmButtonText: t("error.confirmButtonText"),
      });
    }
  };

  const progressPercentage = ((currentStep + 1) / categories.length) * 100;

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col justify-center items-center p-6">
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
      <Alert ref={toastRef} title="Notification" />
      <LanguageSwitcher />
      <div className="absolute top-4 left-4 flex align-center">
        <img src={logo} alt="SoulConnect Logo" className="w-12 h-12 object-contain" />
        <h1 className="text-3xl">{t("soulConnect")}</h1>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md z-10">
        {emailverified.email_verified ? (
          categories.length > 0 && currentStep < categories.length && (
            <>
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                {categories[currentStep]?.name || t("loading")}
              </h1>

              {/* Category Form Fields */}
              <form className="space-y-4 overflow-y-auto" style={{ minHeight: "300px", maxHeight: "300px" }}>
                <div key={categories[currentStep]?.id}>
                  <label className="block font-medium text-gray-700 mb-2">
                    {categories[currentStep]?.name}
                    {!categories[currentStep]?.optional && <span>*</span>}
                  </label>
                  {categories[currentStep]?.multiple ? (
                    <MultiSelect
                      options={categories[currentStep]?.types || []}
                      name={`category-${categories[currentStep]?.id}`}
                      selectedValues={selectedValues[`category-${categories[currentStep]?.id}`] || []}
                      onChange={(selected) =>
                        handleSelectChange(`category-${categories[currentStep]?.id}`, selected)
                      }
                    />
                  ) : categories[currentStep]?.types?.length > 0 ? (
                    <select
                      className="w-full border border-gray-300 rounded-lg p-2"
                      name={`category-${categories[currentStep]?.id}`}
                      onChange={(e) => {
                        handleSelectChange(`category-${categories[currentStep]?.id}`, e.target.value);
                      }}
                    >
                      {categories[currentStep]?.types?.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg p-2"
                      name={`category-${categories[currentStep]?.id}`}
                      placeholder={`${categories[currentStep]?.name}`}
                      onChange={(e) =>
                        handleSelectChange(`category-${categories[currentStep]?.id}`, e.target.value)
                      }
                    />
                  )}
                  {errors[`category-${categories[currentStep]?.id}`] && (
                    <p className="text-red-500 text-sm">{errors[`category-${categories[currentStep]?.id}`]}</p>
                  )}
                </div>
              </form>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)} // Go to previous step
                    className="px-4 py-2 bg-gray-300 text-white rounded-md hover:bg-gray-400 transition"
                  >
                    {t("back")}
                  </button>
                )}
                <button
                  onClick={() => {
                    if (!validateRequiredFields()) {
                      return; // Prevent moving forward if required fields are not filled
                    }
                    if (currentStep === categories.length - 1) {
                      handleSubmit(); // Submit when on the last step
                    } else {
                      setCurrentStep(currentStep + 1); // Go to next step
                    }
                  }}
                  className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
                >
                  {currentStep === categories.length - 1 ? t("submit") : t("next")}
                </button>
              </div>
            </>
          )
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              {t("Verify Email")}
            </h1>
            <p>{t("An email has been sent to you. Click to link to verify your email")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
