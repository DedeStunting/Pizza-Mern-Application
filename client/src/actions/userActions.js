import api from '../api';

export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: 'USER_REGISTER_REQUEST' });

  try {
    await api.post('/api/users/register', user);
    dispatch({ type: 'USER_REGISTER_SUCCESS' });
  } catch (error) {
    dispatch({
      type: 'USER_REGISTER_FAILED',
      payload: error.response?.data?.message || 'Registration failed.',
    });
  }
};

export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: 'USER_LOGIN_REQUEST' });

  try {
    const response = await api.post('/api/users/login', user);
    localStorage.setItem('currentUser', JSON.stringify(response.data));
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: response.data });
    window.location.href = '/';
  } catch (error) {
    dispatch({
      type: 'USER_LOGIN_FAILED',
      payload: error.response?.data?.message || 'Login failed.',
    });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('currentUser');
  window.location.href = '/login';
};

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: 'GET_USERS_REQUEST' });

  try {
    const response = await api.get('/api/users/getallusers');
    dispatch({ type: 'GET_USERS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'GET_USERS_FAILED',
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const deleteUser = (userid) => async () => {
  try {
    await api.post('/api/users/deleteuser', { userid });
    window.location.reload();
  } catch (error) {
    alert(error.response?.data?.message || 'Failed to delete user.');
  }
};
