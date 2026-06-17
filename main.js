const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config()
const bcrypt = require('bcrypt');
const connectDB = require('./config/db.config');
const User = require('./models/user.model')
const app = express()
app.use(express.json())



const PORT = process.env.PORT || 6000


connectDB()
 
app.use('/api', require('./routes'))








app.listen(PORT, () => {
     console.log(`server is running on http://localhost:${PORT}`)
})