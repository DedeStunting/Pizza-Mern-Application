require('dotenv').config();

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const connectDB = require('../db');
const User = require('../models/userModel');
const Pizza = require('../models/pizzaModel');

const pizzas = [
  {
    name: 'PEPPER BARBECUE CHICKEN',
    varients: ['small', 'medium', 'large'],
    prices: [{ small: 200, medium: 350, large: 400 }],
    category: 'nonveg',
    image: 'https://www.dominos.co.in/files/items/Deluxe_Veggie.jpg',
    description: 'Pepper Barbecue Chicken with cheese.',
  },
  {
    name: 'MARGHERITA',
    varients: ['small', 'medium', 'large'],
    prices: [{ small: 150, medium: 300, large: 400 }],
    category: 'veg',
    image: 'https://www.dominos.co.in/files/items/Margherit.jpg',
    description: 'Classic Margherita with mozzarella cheese.',
  },
  {
    name: 'FARMHOUSE',
    varients: ['small', 'medium', 'large'],
    prices: [{ small: 250, medium: 450, large: 600 }],
    category: 'veg',
    image: 'https://www.dominos.co.in/files/items/Farmhouse.jpg',
    description: 'Onion, capsicum, tomato, and grilled mushroom.',
  },
  {
    name: 'CHICKEN SAUSAGE',
    varients: ['small', 'medium', 'large'],
    prices: [{ small: 300, medium: 450, large: 550 }],
    category: 'nonveg',
    image: 'https://www.dominos.co.in/files/items/Chicken_Sausage.jpg',
    description: 'Classic pizza topped with chicken sausage.',
  },
  {
    name: 'PANEER MAKHANI',
    varients: ['small', 'medium', 'large'],
    prices: [{ small: 250, medium: 400, large: 500 }],
    category: 'veg',
    image: 'https://www.dominos.co.in/files/items/Chicken_Sausage.jpg',
    description: 'Paneer and capsicum on makhani sauce.',
  },
  {
    name: 'DELUXE VEGGIE',
    varients: ['small', 'medium', 'large'],
    prices: [{ small: 200, medium: 350, large: 500 }],
    category: 'veg',
    image: 'https://www.dominos.co.in/files/items/Deluxe_Veggie.jpg',
    description: 'Loaded veggie pizza with onions, capsicum, and mushrooms.',
  },
];

async function seed() {
  await connectDB();

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@bundopizza.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await User.create({
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      isAdmin: true,
    });
    console.log(`Admin user created: ${adminEmail}`);
  } else {
    console.log('Admin user already exists.');
  }

  const pizzaCount = await Pizza.countDocuments();
  if (pizzaCount === 0) {
    await Pizza.insertMany(pizzas);
    console.log(`Seeded ${pizzas.length} pizzas.`);
  } else {
    console.log(`Database already has ${pizzaCount} pizzas.`);
  }

  await mongoose.connection.close();
  console.log('Seed complete.');
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
