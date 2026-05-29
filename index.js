const express = require('express')
const dotenv = require('dotenv')

const app = express(); //initialize express

app.use(express.json())

dotenv.config(); //load environment variables from .env file
const port = process.env.PORT;


app.get('/users', (req, res) => {
     res.send("Express server is up!!!!")
})

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})

// route params

app.get('/user/:id', (req, res) => {
     const userId = req.params.id;

     res.send(`the user id sent is ${userId}`)
})


app.get('/search', (req, res) => {
      const name = req.query.name;
      res.send(`Searching for ${name}`)
})


const user = []


app.post('/register', (req, res) => {
    const{name, email, password} = req.body

    if(!name || !email || !password){
        return res.status(400).send("All fields are required")
    }

    
    console.log(req.body);
})
// localhost:5000/search?name=John