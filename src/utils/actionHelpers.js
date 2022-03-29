import axios from 'axios';
import { axiosRequest } from './axiosInstance';

export const loginUser = async (credentials) => {
  const { response, error } = await axiosRequest({
    data: credentials,
    method: 'POST',
    url: '/user/login'
  });
  if (error) {
    return { error };
  } else {
    const {
      data: { email, name, token }
    } = response;
    localStorage.setItem('user', JSON.stringify({ email, name }));
    localStorage.setItem('token', token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    return { payload: { email, name, token }, success: true };
  }
};

export const signupUser = async ({ name, email, password }) => {
  const { response, error } = await axiosRequest({
    data: { email, name, password },
    method: 'POST',
    url: '/user/signup'
  });
  if (error) {
    return { error };
  } else {
    const {
      data: { token }
    } = response;
    return { payload: { email, name, token }, success: true };
  }
};

export const notifyGoogleLogin = async (data) => {
  axiosRequest({ data, method: 'POST', url: '/user/auth/google' });
};
