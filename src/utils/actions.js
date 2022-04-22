import { actionTypes } from './constants';

export const setIsAuthLoading = (payload) => ({
  payload,
  type: actionTypes.SET_IS_AUTH_LOADING
});

export const loginSuccess = (payload) => ({
  payload,
  type: actionTypes.LOGIN
});

export const resetAuth = () => ({ type: actionTypes.RESET_AUTH });
