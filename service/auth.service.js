const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Token = require('../models/token.model')
const mailService = require('./mail.service')

const JWT_SECRETE = 'dancode'

const registerUser = async({name, email, password, role}) => {
     const existingUser = await User.findOne({email});

        if(existingUser){
            throw new Error(`user with this email don dey`)
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        })


        await user.save()
        const code =("" + Math.floor(1000 + Math.random() * 9000))

        await Token.create({
            userId: user._id,
            code,
        })


       await mailService.sendVerificationEmail(email, name, code)

        return user
}

const loginUser = async({email, password}) => {
    
           const user = await User.findOne({email})
    
          
    
           if(!user){
            throw new Error("Invalide credentails........")
           }
    
           const isMatch = await bcrypt.compare(password, user.password)
    
           if(!isMatch){
             throw new Error("Invalide credentails")
           }

           if(user.isVerified !== true){
              throw new Error("Verify your email to login")
           }

           const token = jwt.sign(
              {userId: user._id},
              JWT_SECRETE,
              {expiresIn: '1d'}
           )
    
           return {user, token}
}


const requestPasswordReset = async(email) => {
    const user = await User.findOne({email})
    if(!user){
        throw new Error("User not found")
    }

    await Token.deleteMany({userId: user._id});

     const code =("" + Math.floor(1000 + Math.random() * 9000));

     await Token.create(
        {
            userId: user._id,
            code
        }
     )

     await mailService.sendPasswordResetEmail(email, user.name, code)

     return;
    
}


const resetPassword = async(email, code, newPassword) => {
     const user = await User.findOne({email})

     if(!user) return new Error("User not found")

    const token = await Token.findOne({userId: user._id, code})

    if(!token) return new Error("Invalid or expired password reset code");

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    user.password = hashedPassword

    await user.save()

    await Token.deleteMany({userId: user._id})

    return;
    
}
module.exports = {registerUser, loginUser, requestPasswordReset, resetPassword}