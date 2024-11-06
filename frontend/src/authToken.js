import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'https://cricslot-z9iu.vercel.app/api', // Set your API base URL
});

// Intercept requests to add the Bearer token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Set the token in the headers
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
