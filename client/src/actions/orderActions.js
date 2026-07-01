import api from '../api';
import { clearCart } from './cartActions';

export const placeOrder = (token, subtotal) => async (dispatch, getState) => {
  dispatch({ type: 'PLACE_ORDER_REQUEST' });
  const cartItems = getState().cartReducer.cartItems;

  try {
    const response = await api.post('/api/orders/placeorder', {
      token,
      subtotal,
      cartItems,
    });

    if (response.data.requiresAction) {
      dispatch({
        type: 'PLACE_ORDER_REQUIRES_ACTION',
        payload: {
          clientSecret: response.data.paymentIntentClientSecret,
        },
      });
      return response.data;
    }

    if (response.data.success) {
      dispatch({ type: 'PLACE_ORDER_SUCCESS' });
      dispatch(clearCart());
      return response.data;
    }

    dispatch({ type: 'PLACE_ORDER_FAILED', payload: 'Payment failed or incomplete.' });
    return { error: 'Payment failed or incomplete.' };
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch({ type: 'PLACE_ORDER_FAILED', payload: message });
    return { error: message };
  }
};

export const getUserOrders = () => async (dispatch) => {
  dispatch({ type: 'GET_USER_ORDERS_REQUEST' });

  try {
    const response = await api.get('/api/orders/getuserorders');
    dispatch({ type: 'GET_USER_ORDERS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'GET_USER_ORDERS_FAILED',
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const getAllOrders = () => async (dispatch) => {
  dispatch({ type: 'GET_ALL_ORDERS_REQUEST' });

  try {
    const response = await api.get('/api/orders/getallorders');
    dispatch({ type: 'GET_ALL_ORDERS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'GET_ALL_ORDERS_FAILED',
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updateOrderDeliveryStatus = (orderId, isDelivered) => async (dispatch) => {
  dispatch({ type: 'UPDATE_ORDER_STATUS_REQUEST' });

  try {
    await api.post('/api/orders/updateorderstatus', { orderId, isDelivered });
    dispatch({ type: 'UPDATE_ORDER_STATUS_SUCCESS' });
    dispatch(getAllOrders());
  } catch (error) {
    dispatch({
      type: 'UPDATE_ORDER_STATUS_FAILED',
      payload: error.response?.data?.message || error.message,
    });
  }
};
