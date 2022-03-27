/* eslint-disable require-atomic-updates */
import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import local from '../config/local';
import { AuthContext } from '../contexts/authContext';
import { axiosRequest } from '../utils/axiosInstance';

export const useAuth = () => {
  const { user, token, setToken, setUser } = useContext(AuthContext);
  const [authLoading, setAuthLoading] = useState(false);
  const navigate = useNavigate();

  async function loginWithUserCredentials(credentials) {
    setAuthLoading(true);
    const { response, error } = await axiosRequest({
      data: credentials,
      method: 'POST',
      url: '/user/login'
    });
    if (error) {
      return { error, success: false };
    } else {
      const {
        data: { email, name, token }
      } = response;
      setUser({ email, name });
      setToken(token);
      localStorage.setItem('user', JSON.stringify({ email, name }));
      localStorage.setItem('token', token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      return { success: true };
    }
  }

  /*
    Implement signup function here
 */
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    navigate('/');
  };

  return { loading: authLoading, loginWithUserCredentials, logout, token, user };
};
