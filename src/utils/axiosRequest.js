import axios from 'axios';

const axiosRequest = axios.create({
  baseURL: 'http://localhost:3001',
});

export default axiosRequest;
