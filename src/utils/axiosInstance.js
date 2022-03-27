import axios from 'axios';
import { config } from '../config';

const axiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
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
