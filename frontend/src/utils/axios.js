import axios from 'axios';
import { BASE_URL } from './constant';

const apiInstance = axios.create({
    baseURL: `${BASE_URL}/`,
    timeout: 500000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
});

export default apiInstance;