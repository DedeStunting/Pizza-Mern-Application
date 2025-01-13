import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../actions/orderActions';
import StripeCheckout from 'react-stripe-checkout';
import { loadStripe } from '@stripe/stripe-js';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Success from '../components/Success';

export default function Checkout({ subtotal }) {

    const orderstate = useSelector((state)=> state.placeOrderReducer)
    const { loading, error, success } = orderstate;
    const dispatch = useDispatch();

    // Load Stripe.js instance
    const stripePromise = loadStripe('pk_test_51QTFjfG8m9Jrxe2ghCnvoKDxwQUYBjG4DYklRFDDJbKQCSwfLZKwcXSjTnwIMYtZGrWlJJb9PFGfPL1LUUXYfc4o00PeZpF8bM');

    // Handle token and payment processing
    async function tokenHandler(token) {
        console.log('Token:', token);

        // Call the placeOrder action
        const response = await dispatch(placeOrder(token, subtotal));

        // Handle the server response for additional actions
        if (response.requiresAction) {
            const stripe = await stripePromise;
            const result = await stripe.confirmCardPayment(response.paymentIntentClientSecret);

            if (result.error) {
                console.error('Payment failed:', result.error);
                alert('Payment failed. Please try again.');
            } else if (result.paymentIntent.status === 'succeeded') {
                console.log('Payment succeeded!');
                alert('Payment successful!');
            }
        } else if (response.success) {
            console.log('Payment succeeded!');
            alert('Payment successful!');
        } else {
            console.error('Payment failed:', response.error);
            alert('Payment failed. Please try again.');
        }
    }

    return (
        <div>

            {loading && (<Loading />)}
            {error && (<Error error='Something went wrong'/>)}
            {success && (<Success success='Your order placed successfully'/>)}

            <StripeCheckout
                amount={subtotal * 100}
                shippingAddress
                token={tokenHandler}
                stripeKey="pk_test_51QTFjfG8m9Jrxe2ghCnvoKDxwQUYBjG4DYklRFDDJbKQCSwfLZKwcXSjTnwIMYtZGrWlJJb9PFGfPL1LUUXYfc4o00PeZpF8bM"
                currency="NGN"
            >
                <button className="btn">PAY NOW</button>
            </StripeCheckout>
        </div>
    );
}



























// import React from 'react'
// import { useDispatch } from 'react-redux';
// import { placeOrder } from '../actions/orderActions';
// import StripeCheckout from 'react-stripe-checkout'

// export default function Checkout({subtotal}) {

//     const dispatch = useDispatch()    
//     function tokenHandler(token) 
//     {
//         console.log(token);
//         dispatch(placeOrder(token, subtotal))
//     }
  
//     return (
//     <div>
      
//       <StripeCheckout
//       amount={subtotal*100}
//       shippingAddress
//       token={tokenHandler}
//       stripeKey='pk_test_51QTFjfG8m9Jrxe2ghCnvoKDxwQUYBjG4DYklRFDDJbKQCSwfLZKwcXSjTnwIMYtZGrWlJJb9PFGfPL1LUUXYfc4o00PeZpF8bM'
//       currency='NGN'
//       >

//         <button className='btn'>PAY NOW</button>


//       </StripeCheckout>

//     </div>
//   )
// }
