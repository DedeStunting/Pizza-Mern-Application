const mongoose = require("mongoose");

var mongoUrl = 'mongodb+srv://charlesdhayveed:charlesdhayveed123@cluster0.i44hj.mongodb.net/Mern-Pizza'

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, })

var db = mongoose.connection


db.on('connected', ()=>{
    console.log("Connected to MongoDB...")
})

db.on('error', (err) => {
    console.log("Error connecting to MongoDB:", err)
})


module.exports = mongoose;