import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../actions/orderActions';
import StripeCheckout from 'react-stripe-checkout';
import { loadStripe } from '@stripe/stripe-js';
import Error from './Error';
import Loading from './Loading';
import Success from './Success';

const stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

export default function Checkout({ subtotal }) {
  const orderstate = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success } = orderstate;
  const dispatch = useDispatch();

  const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

  async function tokenHandler(token) {
    const response = await dispatch(placeOrder(token, subtotal));

    if (response?.requiresAction && stripePromise) {
      const stripe = await stripePromise;
      const result = await stripe.confirmCardPayment(response.paymentIntentClientSecret);

      if (result.error) {
        alert('Payment failed. Please try again.');
      } else if (result.paymentIntent?.status === 'succeeded') {
        alert('Payment successful!');
      }
    } else if (response?.success) {
      alert('Payment successful!');
    } else if (response?.error) {
      alert(response.error);
    }
  }

  if (!stripePublishableKey) {
    return <Error error="Stripe is not configured. Add REACT_APP_STRIPE_PUBLISHABLE_KEY." />;
  }

  return (
    <div>
      {loading && <Loading />}
      {error && <Error error={typeof error === 'string' ? error : 'Something went wrong'} />}
      {success && <Success success="Your order was placed successfully." />}

      <StripeCheckout
        amount={subtotal * 100}
        shippingAddress
        billingAddress
        token={tokenHandler}
        stripeKey={stripePublishableKey}
        currency="NGN"
      >
        <button className="btn" type="button">
          PAY NOW
        </button>
      </StripeCheckout>
    </div>
  );
}
