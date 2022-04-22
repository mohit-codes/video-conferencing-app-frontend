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
  axiosRequest({ data, method: 'POST', url: '/user/auth/google' });
};

export async function createOrg(body) {
  const { response, error } = await axiosRequest({
    data: body,
    method: 'POST',
    url: '/org/create'
  });
  return { error, organization: response?.data };
}

export async function deleteOrg(body) {
  const { response, error } = await axiosRequest({
    data: body,
    method: 'DELETE',
    url: '/org/delete-org'
  });
  return { data: response?.data, error };
}

export async function addMember(body) {
  const { response, error } = await axiosRequest({
    data: body,
    method: 'POST',
    url: '/org/add-member'
  });
  return { data: response?.data, error };
}

export async function removeMember(body) {
  const { response, error } = await axiosRequest({
    data: body,
    method: 'PUT',
    url: '/org/remove-member'
  });
  return { data: response?.data, error };
}

export async function getUserOrganizations() {
  const { response, error } = await axiosRequest({
    data: null,
    method: 'GET',
    url: '/org/user-org'
  });
  return { data: response?.data, error };
}

export async function updateUrl(body) {
  const { response, error } = await axiosRequest({
    data: body,
    method: 'POST',
    url: '/user/update-url'
  });
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
  const { response, error } = await axiosRequest({
    data: body,
    method: 'GET',
    url: '/meet/create'
  });
  console.log(response);
  return { data: response, error };
}
