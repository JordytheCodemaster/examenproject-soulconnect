const jwt = require('jsonwebtoken'); // Import JWT
const upload = require('../middleware/fileUpload'); // Import multer middleware
const db = require('../src/db'); // Adjust this to your database connection file

// This function handles the upload of images (placeholders or other types of images)
// Function to save image URLs to the database
const saveImageUrlsToDatabase = async (imageUrls, req) => {
  try {
    // Get the token from the cookies
    const token = req.cookies.token;
    if (!token) {
      throw new Error('Authentication token not found');
    }
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id; // Extract the user ID from the token
    // Prepare the query and values
    const query = `
      INSERT INTO images (user_id, image_url)
      VALUES ${imageUrls.map(() => '(?, ?)').join(', ')};
    `;
    const values = imageUrls.flatMap((url) => [userId, url]);
    // Execute the query
    await db.query(query, values);
  } catch (error) {
    console.error('Error saving image URLs to the database:', error);
    throw error; // Rethrow to propagate the error to the calling function
  }
};
// Function to handle image uploads
const uploadImages = async (req, res) => {
  try {
    console.log(req.files)
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded.' });
    }
    const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);
    // Save the uploaded image URLs to the database
    await saveImageUrlsToDatabase(imageUrls, req);

    // Send success response
    res.status(200).json({
      message: 'Images uploaded successfully',
      imageUrls,
    });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  uploadImages,
};