const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Orders = require('../models/orderModel');
const { protect, admin } = require('../middleware/auth');

router.post('/placeorder', protect, async (req, res, next) => {
  try {
    const { token, subtotal, cartItems } = req.body;

    if (!token || !subtotal || !cartItems?.length) {
      return res.status(400).json({ message: 'Missing required order data.' });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ message: 'Stripe is not configured.' });
    }

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(subtotal * 100),
      currency: 'ngn',
      customer: customer.id,
      receipt_email: token.email,
      payment_method: token.card.id,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });

    if (paymentIntent.status === 'requires_action') {
      return res.json({
        requiresAction: true,
        paymentIntentClientSecret: paymentIntent.client_secret,
      });
    }

    if (paymentIntent.status !== 'succeeded') {
      return res.status(500).json({ error: 'Payment failed.' });
    }

    const newOrder = new Orders({
      name: req.user.name || req.body.currentUser?.name,
      email: req.user.email || req.body.currentUser?.email,
      userId: req.user.id,
      orderItems: cartItems,
      orderAmount: subtotal,
      shippingAddress: {
        street: token.card.address_line1,
        city: token.card.address_city,
        country: token.card.address_country,
        postalCode: token.card.address_zip,
      },
      transactionId: paymentIntent.id,
    });

    await newOrder.save();

    res.json({ success: true, message: 'Payment successful and order saved.' });
  } catch (error) {
    next(error);
  }
});

router.get('/getuserorders', protect, async (req, res, next) => {
  try {
    const orders = await Orders.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get('/getallorders', protect, admin, async (req, res, next) => {
  try {
    const orders = await Orders.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.post('/updateorderstatus', protect, admin, async (req, res, next) => {
  try {
    const { orderId, isDelivered } = req.body;
    const order = await Orders.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    order.isDelivered = isDelivered;
    await order.save();

    res.json({ message: 'Order status updated successfully.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
