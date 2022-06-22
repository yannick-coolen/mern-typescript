import axios from 'axios';

const API_URL = '/api/users/';

/**
 * Checks if the authentication of the user is verfied to true and sends a token string to the
 * local storage to complete the user registration.
 * @returns A token to verify that the user is authenticated.
 */
const register = async (userData: unknown) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

/**
 * This fucntion will remove the token out of the local storage, which leads that the user will
 * be logged out.
 */
const logout = () => {
  localStorage.removeItem('user');
};

/**
 * Checks if the authentication of the user is verfied to true and sends a token string to the
 * local storage to grant access.
 * @returns A token to verify that the user is authenticated.
 */
const login = async (userData: unknown) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  register,
  logout,
  login
};

export default authService;
