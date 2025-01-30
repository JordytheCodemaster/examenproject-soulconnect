import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/sidebar"; // Adjust path as needed
import { request } from '../util/Axios';
import { useNavigate } from 'react-router-dom';
import Notifications from '../components/notifications';
import Alert from '../components/alert';
import { useTranslation } from "react-i18next";

// LanguageSwitcher Component
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false); // Dropdown state
  const dropdownRef = useRef(null); // Ref to detect outside clicks

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setIsOpen(false); // Close dropdown after language is selected
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-10" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        🌐 {i18n.language.toUpperCase()} {/* Display current language */}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
          <button
            onClick={() => changeLanguage("en")}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
          >
            English
          </button>
          <button
            onClick={() => changeLanguage("fr")}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
          >
            Français
          </button>
          <button
            onClick={() => changeLanguage("nl")}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
          >
            Nederlands
          </button>
          <button
            onClick={() => changeLanguage("de")}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
          >
            Deutsch
          </button>
        </div>
      )}
    </div>
  );
};

// SettingsPage Component
export default function SettingsPage() {
  const { t } = useTranslation(); // Initialize useTranslation
  const navigate = useNavigate(); // Initialize useNavigate
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [username, setUsername] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const toastRef = useRef(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await request({
        method: 'GET',
        url: '/user/users/me',
      });
      if (response) {
        setUsername(response.username || '');
        setCurrentEmail(response.email || '');
        setBirthDate(response.birth_date || '');
        setGender(response.gender || '');
      } else {
        console.error('Response is undefined or invalid:', response);
      }
    } catch (error) {
      console.error('Error fetching current email:', error);
    }
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    try {
      const response = await request({
        method: 'PUT',
        url: '/user/users/me/email',
        data: { email: newEmail },
      });
      toastRef.current.showToast(t("emailUpdatedSuccessfully"));
      setCurrentEmail(newEmail);
    } catch (error) {
      console.error('Error updating email:', error);
      toastRef.current.showToast(t("failedToUpdateEmail"));
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const response = await request({
        method: 'PUT',
        url: '/user/users/me/password',
        data: { currentPassword, newPassword },
      });
      setCurrentPassword('');
      setNewPassword('');
      toastRef.current.showToast(t("passwordUpdatedSuccessfully"));
    } catch (error) {
      console.error('Error updating password:', error);
      toastRef.current.showToast(t("failedToUpdatePassword"));
    }
  };

  const handleLogout = async () => {
    try {
      await request({
        method: 'POST',
        url: '/user/logout',
      });
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmUnlike = window.confirm(t("confirmDeleteAccount"));
    if (confirmUnlike) {
      try {
        await request({
          method: 'DELETE',
          url: `/user/users/`,
        });
        navigate('/');
        toastRef.current.showToast(t("successfullyDeletedAccount"));
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-purple-50 flex">
      <Sidebar isSidebarExpanded={isSidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      <Notifications />
      <Alert ref={toastRef} title={t("notification")} />

      <div className="flex-1 p-6 ml-16 relative">
        <div className="flex-1">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-purple-600 mb-6">{t("settings")}</h1>

            <div className="mb-4">
              <div className="text-gray-600">
                <p className="mb-2"><strong>{t("username")}:</strong> {username}</p>
                <p className="mb-2"><strong>{t("email")}:</strong> {currentEmail}</p>
                <p className="mb-2"><strong>{t("birthDate")}:</strong> {new Date(birthDate).toLocaleDateString()}</p>
                <p className="mb-4"><strong>{t("gender")}:</strong> {gender}</p>
              </div>
            </div>

            {/* Change Email Section */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{t("changeEmail")}</h2>
              <form className="space-y-4 mt-4" onSubmit={handleEmailChange}>
                <div>
                  <label htmlFor="newEmail" className="block text-sm font-medium text-gray-700">
                    {t("newEmail")}
                  </label>
                  <input
                    id="newEmail"
                    type="email"
                    placeholder={t("newEmail")}
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="mt-1 block w-1/3 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700 transition duration-300"
                >
                  {t("saveChanges")}
                </button>
              </form>
            </div>

            {/* Change Password Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{t("changePassword")}</h2>
              <form onSubmit={handlePasswordChange} className="space-y-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t("currentPassword")}</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    autoComplete="current-password"
                    className="mt-1 block w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t("newPassword")}</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="new-password"
                    className="mt-1 block w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <button type="submit" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700 transition duration-300">{t("saveChanges")}</button>
              </form>
            </div>

            {/* Language Switcher */}
            <div className="mb-8">
              <LanguageSwitcher />
            </div>

            {/* Logout Section */}
            <div className="mb-8">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
              >
                {t("logout")}
              </button>
            </div>
            <div className="mb-8">
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
              >
                {t("deleteAccount")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
