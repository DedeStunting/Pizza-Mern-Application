import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  addPizzaReducer,
  getAllPizzasReducer,
  getPizzaByIdReducer,
  editPizzaReducer,
} from './reducers/pizzaReducers';
import { cartReducer } from './reducers/cartReducers';
import { registerUserReducer, loginUserReducer, getAllUsersReducer } from './reducers/userReducers';
import {
  placeOrderReducer,
  getUserOrdersReducer,
  getAllOrdersReducer,
} from './reducers/orderReducers';

const persistCartMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (['ADD_TO_CART', 'DELETE_FROM_CART', 'CLEAR_CART'].includes(action.type)) {
    const { cartItems } = store.getState().cartReducer;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  return result;
};

const finalReducer = combineReducers({
  getAllPizzasReducer,
  cartReducer,
  registerUserReducer,
  loginUserReducer,
  placeOrderReducer,
  getUserOrdersReducer,
  addPizzaReducer,
  getPizzaByIdReducer,
  editPizzaReducer,
  getAllOrdersReducer,
  getAllUsersReducer,
});

const cartItems = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];
const currentUser = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser'))
  : null;

const initialState = {
  cartReducer: { cartItems },
  loginUserReducer: { currentUser },
};

const store = createStore(
  finalReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk, persistCartMiddleware))
);

export default store;
