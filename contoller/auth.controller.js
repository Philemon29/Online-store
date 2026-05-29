const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Token = require('../models/token.model')
const AuthService = require("../service/auth.service")

const JWT_SECRETE = 'dancode'

const register = async(req, res) => {
     try{
            const {name, email, password, role} = req.body;

            console.log(`the role is ${role}`)
    
            if(!name || !email || !password){
               return res.status(400).json({error: "All fields are required"})
            }

            await AuthService.registerUser({name, email, password, role})
    

            res.status(201).send({message: "User registration was successful", 

               name, 
               email,
               role
            })
            
         }catch(error){
            res.status(500).send({message: error.message})
         }
}

const login = async(req, res) => {
     try{
           const {email, password} = req.body;
           
           if(!email || !password) return res.status(400).json({message: "All fields are required"})
           
            const result = await AuthService.loginUser({email, password})

            res.status(200).send({message: "Login successful", result})
    
         }catch(error){
           res.status(500).send({message: error.message})
         }
}


const requestPasswordReset = async(req, res) => {
     try{
        const{email} = req.body;

        if(!email) return res.status(400).json({message: "Email is required"})

         await AuthService.requestPasswordReset(email);
         res.status(200).json({message: "Password reset email sent"})
     }catch(error){
         res.status(500).send({message: error.message})
     }
}

const resetPassword = async(req, res) =>{
    try{
         const {email, code, newPassword} = req.body;
         if(!email || !code || !newPassword) return res.status(400).json({message: "All fields are required"})

         await AuthService.resetPassword(email, code, newPassword)
         res.status(200).json({message: "Password reset successful"})
    }catch(error){
        res.status(500).send({message: error.message})
    }
}

const allUsers = async(req, res) => {
    try{
      
          const user = await User.find().select('-password');
          res.status(200).json(user)
     }catch(error){
        res.status(500).json({message: error.message})
     }
}

const myProfile = async(req, res) => {
     const userId = req.user._id

     console.log(`the uerid is ${userId}`)
     try{
      
          const user = await User.findById(userId).select('-password');

          if(!user){
              res.status(400).send({message: 'User not found'})
          }
          return res.status(200).json(user)
     }catch(error){
        res.status(500).json({message: error.message})
     }
}

module.exports = {register, login, allUsers, myProfile, requestPasswordReset, resetPassword}