const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const stripe = require("stripe")("sk_test_51QTFjfG8m9Jrxe2gaoKAqy2HcfGF24f0XcWlyO6snHlKPLyJGttjYAv7xcRmfXggPn5kMx3UQcz3m8gCrmzSJzp100cMrPmqL0");
const Orders = require("../models/orderModel");

router.post("/placeorder", async (req, res) => {
    const { token, subtotal, currentUser, cartItems } = req.body;

    try {
        // Ensure that required fields are present
        if (!token || !subtotal || !currentUser || !cartItems) {
            console.error('Missing required data');
            return res.status(400).json({ message: 'Missing required data' });
        }

        // Create a customer in Stripe
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });

        // Create a Payment Intent with the provided amount and customer details
        const paymentIntent = await stripe.paymentIntents.create({
            amount: subtotal * 100, // Amount in cents
            currency: 'ngn',
            customer: customer.id,
            receipt_email: token.email,
            payment_method: token.card.id, // Use the card ID from the token
            confirm: true, // Confirm the payment immediately
            automatic_payment_methods: {
                enabled: true, 
                allow_redirects: 'never', // This will disable redirect-based payment methods
            },
        });

        // Handle different payment statuses
        if (paymentIntent.status === 'requires_action') {
            // Handle case where payment requires additional action (e.g. 3D Secure)
            res.send({
                requiresAction: true,
                paymentIntentClientSecret: paymentIntent.client_secret,
            });
        } else if (paymentIntent.status === 'succeeded') {
            // Payment was successful, save the order to the database
            const newOrder = new Orders({
                name: currentUser.name,
                email: currentUser.email,
                userId: currentUser._id,
                orderItems: cartItems,
                orderAmount: subtotal,
                shippingAddress: {
                    street: token.card.address_line1,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postalCode: token.card.address_zip,
                },
                transactionId: paymentIntent.id, // Use the paymentIntent ID as the transaction ID
            });

            // Save the order to the database
            await newOrder.save();

            console.log('Payment succeeded, order saved:', newOrder);
            res.send({ success: true, message: 'Payment successful and order saved!' });
        } else {
            // Payment failed
            console.error('Payment failed with status:', paymentIntent.status);
            res.status(500).send({ error: 'Payment failed' });
        }
    } catch (error) {
        console.error('Payment Error:', error);
        res.status(400).json({ message: 'Something went wrong: ' + error.message });
    }
});




router.get("/getuserorders", async(req, res) => {
 
    const {userid} = req.body

    try {
        const orders = await Orders.find({userid: userid})
        res.send(orders)
    } catch (error) {
        return res.status(400).json({message: 'Something went wrong' + error.message})
    }
})


// Get all orders
router.get('/getallorders', async (req, res) => {
    try {
      const orders = await Orders.find();
      res.send(orders);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });
  
  // Update delivery status
  router.post('/updateorderstatus', async (req, res) => {
  const { orderId, isDelivered } = req.body;

  try {
    const order = await Orders.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.isDelivered = isDelivered;
    await order.save();

    res.send('Order status updated successfully');
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(400).json({ message: 'Failed to update order status', error });
  }
});


module.exports = router;


