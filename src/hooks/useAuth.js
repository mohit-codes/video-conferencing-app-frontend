/* eslint-disable require-atomic-updates */
import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';
import { BASE_URL } from '../utils/utility';

export const useAuth = () => {
  const { user, token, setToken, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function loginWithUserCredentials(credentials) {
    setLoading(true);
    const { data } = await axios.post(BASE_URL, credentials);
    if (data.success) {
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('user', user);
      localStorage.setItem('token', token);
      axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      return { err: null, success: true };
    }
    return { err: data.error, success: false };
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

  return { loading, loginWithUserCredentials, logout, token, user };
};
