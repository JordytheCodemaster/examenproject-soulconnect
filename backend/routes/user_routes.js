const express = require('express');
const router = express.Router();
const { userLogin, getUID, checkEmailVerified, userCreate, getUser, deleteUser, updateUserEmail, updateUserPassword, userLogout, updateUserProfilePicture, getAllUsers, getAllUsersWithPayments, getUserImages,  getOtherUserImages, } = require('../controller/user_controller');
const { uploadImages } = require('../controller/image_controller');
const upload = require('../middleware/fileUpload');
// Route to create a new user
router.post('/create', userCreate);
// Route to log in a user
router.post('/login', userLogin);
router.get('/users/me', getUser); // New route to get current user
// Route to get a user by ID
router.get('/users/:id', getUser);
router.post('/uid', getUID);



// Route to delete a user
router.delete('/users', deleteUser);
// Route to update a user's email
router.put('/users/me/email', updateUserEmail); // Update user email
router.put('/users/me/password', updateUserPassword); // Update user password

router.get('/emailverified', checkEmailVerified);

// Route to log out the user
router.post('/logout', userLogout);

router.post('/upload-profile-image', upload.single('profile_image'), updateUserProfilePicture);

// Route to get all users
router.get('/all', getAllUsers);

// get all payments from users
router.get('/payments', getAllUsersWithPayments); // Add the new route

router.post('/images/upload', upload.array('images', 4), uploadImages);

router.get('/images', getUserImages); 

router.get('/user/:userId/images', getOtherUserImages); 

module.exports = router;
