const mongoose = require('mongoose');

const pizzaSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    varients: { type: [String], default: ['small', 'medium', 'large'] },
    prices: { type: Array, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('pizzas', pizzaSchema);
