const express = require("express");
const Pizza = require("./models/pizzaModel");
const db = require("./db");
const app = express();

app.use(express.json());

const pizzaRoute = require('./routes/pizzasRoute');
const userRoute = require('./routes/userRoute')
const ordersRoute = require('./routes/OrdersRoute.js');

app.use('/api/pizzas', pizzaRoute);
app.use('/api/users', userRoute);
app.use('/api/orders', ordersRoute);

app.get("/", (req, res) => {
    res.send("server is working");
});

app.get("/getpizzas", async (req, res) => {
    console.log("Fetching pizzas..."); // Add this to debug
    try {
        const pizzas = await Pizza.find({});
        console.log("Pizzas fetched:", pizzas);
        res.send(pizzas);
    } catch (err) {
        console.error("Error fetching pizzas:", err);
        res.status(500).send("Server Error");
    }
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
