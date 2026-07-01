export const addToCart = (pizza, quantity, varient) => (dispatch) => {
  const cartItem = {
    name: pizza.name,
    _id: pizza._id,
    image: pizza.image,
    varient,
    quantity: Number(quantity),
    prices: pizza.prices,
    price: pizza.prices[0][varient] * Number(quantity),
  };

  if (cartItem.quantity > 10) {
    alert('Maximum 10 pieces per pizza variant are allowed.');
    return;
  }

  if (cartItem.quantity < 1) {
    dispatch({ type: 'DELETE_FROM_CART', payload: { _id: pizza._id, varient } });
    return;
  }

  dispatch({ type: 'ADD_TO_CART', payload: cartItem });
};

export const deleteFromCart = (pizza) => (dispatch) => {
  dispatch({ type: 'DELETE_FROM_CART', payload: pizza });
};

export const clearCart = () => (dispatch) => {
  dispatch({ type: 'CLEAR_CART' });
};
