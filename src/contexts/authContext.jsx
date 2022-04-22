/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useReducer } from 'react';
import { actionTypes } from '../utils/constants';

const { LOGIN, SET_IS_AUTH_LOADING, RESET_AUTH, UPDATE_PROFILE_IMG } = actionTypes;
const AuthContext = createContext();

const initState = {
  isAuthLoading: false,
  token: localStorage.getItem('token') ?? '',
  user: JSON.parse(localStorage.getItem('user')) ?? { email: '', imageUrl: '', name: '' }
};

const setUser = (state, { token, name, email, imageUrl }) => {
  localStorage.setItem('user', JSON.stringify({ email, imageUrl, name }));
  localStorage.setItem('token', token);
  return {
    ...state,
    token,
    user: { email, imageUrl, name }
  };
};

const actionMap = {
  [LOGIN]: (state, payload) => setUser(state, payload),
  [RESET_AUTH]: () => ({ isAuthLoading: '', token: null, user: null }),
  [SET_IS_AUTH_LOADING]: (state, payload) => ({ ...state, isAuthLoading: payload }),
  [UPDATE_PROFILE_IMG]: (state, payload) => {
    setUser(state, { email: state.email, imageUrl: payload, name: state.name, token: state.token });
    return {
      ...state,
      user: { ...state.user, imageUrl: payload }
    };
  }
};

const authReducer = (state, action) => {
  const newState = actionMap?.[action.type]?.(state, action.payload);
  return newState ?? state;
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initState);
  return <AuthContext.Provider value={{ dispatch, state }}>{children}</AuthContext.Provider>;
};

/**
 * @returns {{state:initState,dispatch}} context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  // context ==> { state, dispatch }
  return context;
};
