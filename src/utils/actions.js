import { actionTypes } from './constants';

/**
 * @param {boolean} payload
 */
export const setIsAuthLoading = (payload) => ({
  payload,
  type: actionTypes.SET_IS_AUTH_LOADING
});

/**
 * @param {object} payload
 * @param {string} payload.email
 * @param {string} payload.name
 * @param {string} payload.token
 * @returns
 */
export const loginSuccess = (payload) => ({
  payload,
  type: actionTypes.LOGIN
});

export const resetAuth = () => ({ type: actionTypes.RESET_AUTH });
