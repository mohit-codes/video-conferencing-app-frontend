/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useReducer } from 'react';
import { actionTypes } from '../utils/constants';

const { LOGIN, SET_IS_AUTH_LOADING, RESET_AUTH } = actionTypes;
const AuthContext = createContext();

const initState = {
  isAuthLoading: false,
  token: localStorage.getItem('token') ?? '',
  user: JSON.parse(localStorage.getItem('user')) ?? { email: '', imageUrl: '', name: '' }
};

const setUser = (state, { token, name, email, imageUrl }) => ({
  ...state,
  token,
  user: { email, imageUrl, name }
});

const actionMap = {
  [LOGIN]: setUser,
  [RESET_AUTH]: () => initState,
  [SET_IS_AUTH_LOADING]: (state, payload) => ({ ...state, isAuthLoading: payload })
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
