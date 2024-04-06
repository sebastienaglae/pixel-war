import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;