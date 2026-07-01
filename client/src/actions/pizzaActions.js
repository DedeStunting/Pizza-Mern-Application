import api from '../api';

export const getAllPizzas = () => async (dispatch) => {
  dispatch({ type: 'GET_PIZZAS_REQUEST' });

  try {
    const response = await api.get('/api/pizzas/getallpizzas');
    dispatch({ type: 'GET_PIZZAS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'GET_PIZZAS_FAILED',
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const addPizza = (pizza) => async (dispatch) => {
  dispatch({ type: 'ADD_PIZZA_REQUEST' });

  try {
    await api.post('/api/pizzas/addpizza', { pizza });
    dispatch({ type: 'ADD_PIZZA_SUCCESS' });
  } catch (error) {
    dispatch({
      type: 'ADD_PIZZA_FAILED',
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const getPizzaById = (pizzaid) => async (dispatch) => {
  dispatch({ type: 'GET_PIZZABYID_REQUEST' });

  try {
    const response = await api.post('/api/pizzas/getpizzabyid', { pizzaid });
    dispatch({ type: 'GET_PIZZABYID_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'GET_PIZZABYID_FAILED',
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const editPizza = (editedpizza) => async (dispatch) => {
  dispatch({ type: 'EDIT_PIZZA_REQUEST' });

  try {
    await api.post('/api/pizzas/editpizza', { editedpizza });
    dispatch({ type: 'EDIT_PIZZA_SUCCESS' });
  } catch (error) {
    dispatch({
      type: 'EDIT_PIZZA_FAILED',
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const deletePizza = (pizzaid) => async () => {
  try {
    await api.post('/api/pizzas/deletepizza', { pizzaid });
    window.location.reload();
  } catch (error) {
    alert(error.response?.data?.message || 'Failed to delete pizza.');
  }
};
