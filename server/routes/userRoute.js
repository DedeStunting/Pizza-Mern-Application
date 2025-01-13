const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Register User Route
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });

    try {
        await newUser.save(); // Save user to the database
        res.send('User Registered Successfully');
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

// Login User Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password }); // Use findOne instead of find

        if (user) {
            // Send user details except the password
            const currentUser = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id,
            };
            res.send(currentUser); // Send currentUser as response
        } else {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' });
    }
});


router.get("/getallusers", async(req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        
    }

});


router.post("/deleteuser", async (req, res) => {
    const userid = req.body.userid   

    try {
        await User.findOneAndDelete({_id: userid})
        res.send('User deleted successfully')
    } catch (error) {
        return res.status(400).json({message: error })
    }
})
module.exports = router;
