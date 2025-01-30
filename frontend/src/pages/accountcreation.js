import React, { useState, useRef } from "react";
import { request } from "../util/Axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next"; // Import useTranslation
import LanguageSwitcher from "../components/languageSwitch"; // Import LanguageSwitcher
import { AiOutlineHeart } from "react-icons/ai"; // Import AiOutlineHeart icon
import logo from "../img/SoulConnect.png"; // Import SoulConnect logo
const AccountCreation = () => {
  const { t } = useTranslation(); // Initialize useTranslation
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    birth_date: "",
    gender: "",
    accepted_user_agreement: 0,
  });

  const [errors, setErrors] = useState({});
  const [isAgreementOpen, setIsAgreementOpen] = useState(false);
  const [isAgreementAccepted, setIsAgreementAccepted] = useState(false);
  const agreementContentRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };


  const handleAccountCreation = async () => {
    const { username, password, email, birth_date, gender } = formData;
    let newErrors = {};

    if (!username) newErrors.username = t("usernameRequired");
    if (!password) newErrors.password = t("passwordRequired");
    if (password && password.length < 16) newErrors.password = t("passwordLengthError");
    if (!email) newErrors.email = t("emailRequired");
    if (!birth_date) newErrors.birth_date = t("birthDateRequired");
    if (!gender) newErrors.gender = t("genderRequired");

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await request({
        method: 'POST',
        url: '/user/create',
        data: formData,
      });

      console.log("Response from server:", response);
      if (response && response.user.insertId) {
        Swal.fire({
          title: t("success"),
          text: t("accountCreatedSuccessfully"),
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          setFormData({
            username: "",
            password: "",
            email: "",
            birth_date: "",
            gender: "",
            accepted_user_agreement: 0,
          });
          setErrors({});
          navigate('/profile-creation');
        });
      } else {
        Swal.fire({
          title: t("error"),
          text: response.data.message || t("failedToCreateAccount"),
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error creating account:", error);
      Swal.fire({
        title: t("error"),
        text: error.message || t("failedToCreateAccount"),
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleScroll = () => {
    const agreementContent = agreementContentRef.current;
    if (agreementContent.scrollTop + agreementContent.clientHeight >= agreementContent.scrollHeight - 10) {
      setIsAgreementAccepted(true);
    }
  };

  const handleAcceptAgreement = () => {
    setIsAgreementOpen(false);
    setFormData((prevData) => ({ ...prevData, accepted_user_agreement: 1 }));
  };

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
      <div className="absolute top-4 left-4 flex items-center z-10">
        <img src={logo} alt="SoulConnect Logo" className="w-12 h-12 object-contain" />
        <h1 className="text-3xl font-bold ml-2 text-purple-700">SoulConnect</h1>
      </div>

      <LanguageSwitcher /> {/* Add Language Switcher */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md z-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {t("createAccount")}
        </h2>

        {/* Username */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("username")}*
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder={t("username")}
          />
          {errors.username && <div className="text-red-500 text-sm">{errors.username}</div>}
        </div>
        {/* Email */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("email")}*
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder={t("email")}
          />
          {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("password")}*
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder={t("password")}
          />
          {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
          <p className="text-sm text-gray-500 mt-1">
            {t("passwordLengthHint")}
          </p>
        </div>


        {/* Birth Date */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("birthDate")}*
          </label>
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.birth_date && <div className="text-red-500 text-sm">{errors.birth_date}</div>}
        </div>

        {/* Gender */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("gender")}*
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="">{t("selectGender")}</option>
            <option value="Male">{t("male")}</option>
            <option value="Female">{t("female")}</option>
          </select>
          {errors.gender && <div className="text-red-500 text-sm">{errors.gender}</div>}
        </div>

        {/* User Agreement Checkbox */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <input
              type="checkbox"
              checked={formData.accepted_user_agreement === 1}
              onChange={() => setIsAgreementOpen(true)}
              className="mr-2"
            />
            {t("agreeToTerms")}
          </label>
        </div>
        <div className="text-center mb-2">
          <p className="text-sm text-gray-600">
            {t("alreadyHaveAccount")}{" "}
            <a
              href="/login"
              className="text-purple-500 hover:underline"
            >
              {t("login")}
            </a>
          </p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleAccountCreation}
          disabled={formData.accepted_user_agreement !== 1}
          className="w-full py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition disabled:bg-purple-300"
        >
          {t("createAccountButton")}
        </button>

        {/* Error message */}
        {errors.form && (
          <div className="mt-4 text-red-500 text-center">
            {errors.form}
          </div>
        )}
      </div>

      {/* User Agreement Modal */}
      {isAgreementOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("userAgreement")}
            </h2>
            <div
              ref={agreementContentRef}
              onScroll={handleScroll}
              className="overflow-y-auto flex-1 mb-4"
            >
              <p>
                {/* Insert your Terms of Service and Privacy Agreement text here */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p> <br />
              <p>
                {/* Insert your Terms of Service and Privacy Agreement text here */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p> <br />
              <p>
                {/* Insert your Terms of Service and Privacy Agreement text here */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p><br />
              <p>
                {/* Insert your Terms of Service and Privacy Agreement text here */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p><br />
              <p>
                {/* Insert your Terms of Service and Privacy Agreement text here */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p><br />
              <p>
                {/* Insert your Terms of Service and Privacy Agreement text here */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <button
              onClick={handleAcceptAgreement}
              disabled={!isAgreementAccepted}
              className="w-full py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition disabled:bg-purple-300"
            >
              {t("acceptAgreement")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountCreation;
