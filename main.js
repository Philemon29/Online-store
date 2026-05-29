const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const connectDB = require('./config/db.config');
const User = require('./models/user.model')
const app = express()
app.use(express.json())


dotenv.config()


connectDB()
 
app.use('/api', require('./routes'))








app.listen(6000, () => {
     console.log('server is running on http://locfalhost:6000')
})