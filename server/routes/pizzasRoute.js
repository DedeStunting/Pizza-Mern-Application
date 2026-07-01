const express = require('express');
const router = express.Router();
const Pizza = require('../models/pizzaModel');
const { protect, admin } = require('../middleware/auth');

router.get('/getallpizzas', async (req, res, next) => {
  try {
    const pizzas = await Pizza.find().sort({ createdAt: -1 });
    res.json(pizzas);
  } catch (error) {
    next(error);
  }
});

router.post('/addpizza', protect, admin, async (req, res, next) => {
  try {
    const { pizza } = req.body;

    if (!pizza?.name || !pizza?.image || !pizza?.description || !pizza?.category) {
      return res.status(400).json({ message: 'All pizza fields are required.' });
    }

    const newPizza = new Pizza({
      name: pizza.name,
      image: pizza.image,
      varients: ['small', 'medium', 'large'],
      description: pizza.description,
      category: pizza.category,
      prices: [
        {
          small: Number(pizza.prices.small),
          medium: Number(pizza.prices.medium),
          large: Number(pizza.prices.large),
        },
      ],
    });

    await newPizza.save();
    res.status(201).json({ message: 'New pizza added successfully.' });
  } catch (error) {
    next(error);
  }
});

router.post('/getpizzabyid', protect, admin, async (req, res, next) => {
  try {
    const { pizzaid } = req.body;
    const pizza = await Pizza.findById(pizzaid);

    if (!pizza) {
      return res.status(404).json({ message: 'Pizza not found.' });
    }

    res.json(pizza);
  } catch (error) {
    next(error);
  }
});

router.post('/editpizza', protect, admin, async (req, res, next) => {
  try {
    const { editedpizza } = req.body;
    const pizza = await Pizza.findById(editedpizza._id);

    if (!pizza) {
      return res.status(404).json({ message: 'Pizza not found.' });
    }

    pizza.name = editedpizza.name;
    pizza.description = editedpizza.description;
    pizza.image = editedpizza.image;
    pizza.category = editedpizza.category;
    pizza.prices = editedpizza.prices.map((price) => ({
      small: Number(price.small),
      medium: Number(price.medium),
      large: Number(price.large),
    }));

    await pizza.save();
    res.json({ message: 'Pizza details updated successfully.' });
  } catch (error) {
    next(error);
  }
});

router.post('/deletepizza', protect, admin, async (req, res, next) => {
  try {
    const { pizzaid } = req.body;
    await Pizza.findByIdAndDelete(pizzaid);
    res.json({ message: 'Pizza deleted successfully.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
