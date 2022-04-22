import axios from 'axios';
import { config } from '../config';

export const axiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  timeout: 5000
});
export const axiosRequest = async ({ method, url, data, otherOptions }) =>
  axiosInstance
    .request({
      data,
      method,
      url,
      ...otherOptions
    })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
