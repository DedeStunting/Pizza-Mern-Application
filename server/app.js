require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const pizzaRoute = require('./routes/pizzasRoute');
const userRoute = require('./routes/userRoute');
const ordersRoute = require('./routes/ordersRoute');

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Bundō Pizza API is running' });
});

app.use('/api/pizzas', pizzaRoute);
app.use('/api/users', userRoute);
app.use('/api/orders', ordersRoute);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
