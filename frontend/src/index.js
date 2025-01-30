import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Login from './pages/Login';
import Landingpage from './pages/landingpage';
import Settings from './pages/settings';
import Likes from './pages/likes';
import Home from './pages/home';
import Chat from './pages/chats';
import Profile from './pages/profile';
import ProfileCreation from './pages/ProfileCreation';
import Accountcreation from './pages/accountcreation';
import ProtectedRoute from './middleware/ProtectedRoute';
import Subscriptions from './pages/subscriptions';
import Matches from './pages/matches';
import Pay from './pages/pay';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';


import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // Import i18n configuration
import ProtectedChatRoute from './middleware/ProtectedChatRoute';
import EmailVerifiedRoute from './middleware/EmailVerifiedRoute';
import AuthUserRedirect from './middleware/AuthUserRedirect';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <I18nextProvider i18n={i18n}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<AuthUserRedirect><Landingpage /></AuthUserRedirect>} />
          <Route path="/register" element={<AuthUserRedirect><Accountcreation /></AuthUserRedirect>} />
          <Route path="/login" element={<AuthUserRedirect><Login /></AuthUserRedirect>} />

          <Route path="/profile-creation" element={<ProtectedRoute><ProfileCreation /></ProtectedRoute>} />
          {/* Auth and Email protected Routes */}
          <Route path="/Home" element={<ProtectedRoute> <EmailVerifiedRoute><Home /></EmailVerifiedRoute></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><EmailVerifiedRoute><Settings /></EmailVerifiedRoute></ProtectedRoute>} />
          <Route path="/likes" element={<ProtectedRoute><EmailVerifiedRoute><Likes /></EmailVerifiedRoute></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><EmailVerifiedRoute><Profile /></EmailVerifiedRoute></ProtectedRoute>} />
          <Route path="/chats" element={<ProtectedChatRoute><EmailVerifiedRoute><Chat /></EmailVerifiedRoute></ProtectedChatRoute>} />
          <Route path="/subscriptions" element={<ProtectedRoute><EmailVerifiedRoute></EmailVerifiedRoute><Subscriptions /></ProtectedRoute>} />
          <Route path="/matches" element={<ProtectedRoute><EmailVerifiedRoute><Matches /></EmailVerifiedRoute></ProtectedRoute>} />
          <Route path="/pay" element={<ProtectedRoute><EmailVerifiedRoute><Pay /></EmailVerifiedRoute></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </I18nextProvider>
);