import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://192.53.172.221:3000/api/authaccount/test';

export const getPublicContent = () => {
    return axios.get(API_URL + "all");
  };

export const getUserBoard = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
};