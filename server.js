const express = require('express');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

const app = express();


const port = process.env.PORT || 7000;

app.use(express.json());


const userFile = path.join(__dirname, 'users.json');

// function to load users from user.json

function loadUsers(){
      if(!fs.existsSync(userFile)){
          return[]
      }
      const data = fs.readFileSync(userFile, 'utf-8');
      return data ? JSON.parse(data) : [];
}

// function to dave the user
function saveUsers(users){
     fs.writeFileSync(userFile, JSON.stringify(users, null, 2))
}

app.get('/', (req, res) => {
      res.send("Welcome to user management system")
});


app.post('/register', (req, res) => {
     const{name, email, password} = req.body;

     if(!name || !email || !password){
         return res.status(400).json({message: "All fields are rquired"})
     }

     const users = loadUsers();

     const userExist = users.find((user) => user.email === email)

     if(userExist){
         return res.status(409).json({message: "User already exist"})
     }

     const hashedPassword = bcrypt.hashSync(password, 10)

     const newUser = {
        id: users.length + 1,
        name,
        email,
        password: hashedPassword
     }

     users.push(newUser)

     saveUsers(users)

     res.status(201).json({message: "User registration was successful", user: newUser})

})

// update user

app.patch('/users/:id', (req, res) => {
      const {id} = req.params;

      const{name, email} = req.body;

      const users = loadUsers()

      let user = users.find(u => u.id === id)

      if(!user){
          return res.status(404).json({message: `user with this id: ${id} does not exist`})
      }


      if(name) user.name = name;
      if(email) user.email = email

      saveUsers(users)

      res.status(200).json({message: "user updated successfully", user})
})

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})



const btn = document.getElementById('submiotbtn')

btn.addEventListener('click', () => {
    const res = axios.post('https://localhost:8000/register')

})



