import axios from 'axios';
import { BASE_URL } from './constants';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const fetcher = (...args) => axiosInstance.get(...args).then((res) => res.data);

export default fetcher;
