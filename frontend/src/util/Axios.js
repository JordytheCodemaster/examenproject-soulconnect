import axios from 'axios';

const axiosInstance = axios.create({
     baseURL: 'http://localhost:5000/api',
     timeout: 0,
     withCredentials: true, // Allow sending cookies
});

// Export the request function
export const request = async ({ method, url, data, params, headers }) => {
try {
     const response = await axiosInstance({
          method,
          url,
          data,
          params,
          headers: {
               ...axiosInstance.defaults.headers, // Merge default headers
               ...headers,
          },
     });
     return response.data; // Return only the data
} catch (error) {
     console.error('API Request Error:', error.response || error.message);
     throw error.response?.data || error.message; // Handle and throw errors
}
};

export default axiosInstance;
