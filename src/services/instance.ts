import axios from 'axios';
import storage from './store';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use(
  config => {
    if (config.headers) {
      const token = storage.get('token');
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    console.error(error);
    return Promise.reject(error);
  }
);
