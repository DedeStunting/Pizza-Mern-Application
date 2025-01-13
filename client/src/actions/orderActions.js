import axios from "axios";

export const placeOrder = (token, subtotal) => async (dispatch, getState) => {
    dispatch({ type: 'PLACE_ORDER_REQUEST' });
    const currentUser = getState().loginUserReducer.currentUser;
    const cartItems = getState().cartReducer.cartItems;

    try {
        // Make the API request to your server to process the order
        const response = await axios.post('/api/orders/placeorder', { token, subtotal, currentUser, cartItems });

        console.log("Server response:", response.data);

        // Check the response and dispatch success or action-needed response
        if (response.data.requiresAction) {
            dispatch({
                type: 'PLACE_ORDER_REQUIRES_ACTION',
                payload: {
                    clientSecret: response.data.paymentIntentClientSecret,
                },
            });
            return response.data;  // Return data to be used in tokenHandler
        } else if (response.data.success) {
            dispatch({ type: 'PLACE_ORDER_SUCCESS' });
            return response.data;  // Return the success response to the component
        } else {
            dispatch({
                type: 'PLACE_ORDER_FAILED',
                payload: 'Payment failed or incomplete',
            });
            return { error: 'Payment failed or incomplete' }; // Return error to the component
        }

    } catch (error) {
        console.log('Error in placeOrder action:', error);
        dispatch({
            type: 'PLACE_ORDER_FAILED',
            payload: error.response?.data?.message || error.message,
        });
        return { error: error.response?.data?.message || error.message };  // Return error to component
    }
};




export const getUserOrders = () => async (dispatch, getState) => {
    const currentUser = getState().loginUserReducer.currentUser;

    dispatch({ type: 'GET_USER_ORDERS_REQUEST' });

    try {
        const response = await axios.get(`/api/orders/getuserorders`, {
            params: { userId: currentUser._id }, // Use query params
            
        });
        console.log(response);
        dispatch({ type: 'GET_USER_ORDERS_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'GET_USER_ORDERS_FAILED', payload: error.message });
    }
};

export const getAllOrders = () => async dispatch => {
    dispatch({ type: 'GET_ALL_ORDERS_REQUEST' });
  
    try {
      const response = await axios.get('/api/orders/getallorders');
      dispatch({ type: 'GET_ALL_ORDERS_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'GET_ALL_ORDERS_FAILED', payload: error.message });
    }
  };
  
  export const updateOrderDeliveryStatus = (orderId, isDelivered) => async dispatch => {
    dispatch({ type: 'UPDATE_ORDER_STATUS_REQUEST' });
  
    try {
      const response = await axios.post('/api/orders/updateorderstatus', {
        orderId,
        isDelivered,
      });
      dispatch({ type: 'UPDATE_ORDER_STATUS_SUCCESS', payload: response.data });
      dispatch(getAllOrders()); // Refresh orders after updating status
    } catch (error) {
      dispatch({ type: 'UPDATE_ORDER_STATUS_FAILED', payload: error.message });
    }
  };





















// import axios from "axios"
// export const placeOrder=(token , subtotal)=>async (dispatch, getState)=>{

//     dispatch({type: 'PLACE_ORDER_REQUEST'})
//     const currentUser = getState().loginUserReducer.currentUser
//     const cartItems = getState().cartReducer.cartItems

//     try {

//         const response  = await axios.post('/api/orders/placeorder', {token, subtotal, currentUser, cartItems}) 
//         dispatch({type: 'PLACE_ORDER_SUCCESS'})
//         console.log(response)

//     } catch (error) {

//         console.log(error)
//         dispatch({type: 'PLACE_ORDER_FAILED', payload: error.response.data.message})

//     }

// }