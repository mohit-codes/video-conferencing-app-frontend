/* eslint-disable init-declarations */
/* eslint-disable one-var */
/* eslint-disable sort-vars */
import axios from 'axios';
import { config } from '../config';
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
      data: { email, name, token, imageUrl }
    } = response;
    return { payload: { email, imageUrl, name, token }, success: true };
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
  const { response, error } = await axiosRequest({
    data,
    method: 'POST',
    url: '/user/auth/google'
  });
  return { data: response?.data, error };
};

export async function createOrg(body) {
  let response,
    error = null;
  try {
    response = await axios({
      data: body,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      method: 'POST',
      url: `${config.apiBaseUrl}/org/create`
    });
  } catch (e) {
    error = e.message;
  }
  return { error, organization: response?.data };
}

export async function deleteOrg(body) {
  let response,
    error = null;
  try {
    response = await axios({
      data: body,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      method: 'DELETE',
      url: `${config.apiBaseUrl}/org/delete-org`
    });
  } catch (e) {
    error = e.message;
  }
  return { data: response?.data, error };
}

export async function addMember(body) {
  let response,
    error = null;
  try {
    response = await axios({
      data: body,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      method: 'POST',
      url: `${config.apiBaseUrl}/org/add-member`
    });
  } catch (e) {
    error = e.message;
  }
  return { data: response?.data, error };
}

export async function removeMember(body) {
  let response,
    error = null;
  try {
    response = await axios({
      data: body,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      method: 'PUT',
      url: `${config.apiBaseUrl}/org/remove-member`
    });
  } catch (e) {
    error = e.message;
  }
  return { data: response?.data, error };
}

export async function getUserOrganizations() {
  const { data } = await axios({
    data: null,
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    method: 'GET',
    url: `${config.apiBaseUrl}/org/user-org`
  });
  return { data, error: null };
}

export async function updateUrl(body) {
  let response,
    error = null;
  try {
    response = await axios({
      data: body,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      method: 'POST',
      url: `${config.apiBaseUrl}/user/update-url`
    });
  } catch (e) {
    error = e.message;
  }
  return { data: response?.data, error };
}

export async function fetchOrg(body) {
  const { response, error } = await axiosRequest({
    data: body,
    method: 'POST',
    url: '/org/fetch-org'
  });
  return { data: response, error };
}

export async function createMeet(body) {
  let response,
    error = null;
  try {
    response = await axios({
      data: body,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      method: 'POST',
      url: `${config.apiBaseUrl}/meet/create`
    });
  } catch (e) {
    error = e.message;
  }
  console.log(response, error);
  return { data: response?.data, error };
}
