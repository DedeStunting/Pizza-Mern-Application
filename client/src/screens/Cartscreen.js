import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { addToCart, deleteFromCart } from '../actions/cartActions';
import Checkout from '../components/Checkout';

export default function Cartscreen() {
  const cartstate = useSelector((state) => state.cartReducer);
  const { currentUser } = useSelector((state) => state.loginUserReducer);
  const cartItems = cartstate.cartItems;
  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) {
      window.location.href = '/login';
    }
  }, [currentUser]);

  if (!currentUser) {
    return null;
  }

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 style={{ fontSize: '40px' }}>My Cart</h2>

          {cartItems.length === 0 ? (
            <p>
              Your cart is empty. <Link to="/">Browse the menu</Link>
            </p>
          ) : (
            cartItems.map((item) => (
              <div className="flex-container" key={`${item._id}-${item.varient}`}>
                <div className="text-start m-1 w-100">
                  <h1>
                    {item.name} [{item.varient}]
                  </h1>
                  <h1>
                    Price: {item.quantity} × {item.prices[0][item.varient]} = {item.price}₦
                  </h1>
                  <h1 style={{ display: 'inline' }}>Quantity: </h1>
                  <FaPlus
                    className="mx-2"
                    role="button"
                    aria-label="Increase quantity"
                    onClick={() => dispatch(addToCart(item, item.quantity + 1, item.varient))}
                  />
                  <b>{item.quantity}</b>
                  <FaMinus
                    className="mx-2"
                    role="button"
                    aria-label="Decrease quantity"
                    onClick={() => dispatch(addToCart(item, item.quantity - 1, item.varient))}
                  />
                  <hr />
                </div>

                <div className="m-1 w-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ height: '80px', width: '80px' }}
                  />
                </div>
                <div className="m-1 w-100">
                  <FaTrash
                    className="mt-5"
                    role="button"
                    aria-label="Remove item"
                    onClick={() => dispatch(deleteFromCart(item))}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="col-md-4">
          <h2 style={{ fontSize: '45px' }}>Subtotal: {subtotal}₦</h2>
          {cartItems.length > 0 && <Checkout subtotal={subtotal} />}
        </div>
      </div>
    </div>
  );
}
