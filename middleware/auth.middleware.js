const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const JWT_SECRETE = 'dancode'

// middleware to validate token


const auth = async(req, res, next) => {
      const token = req.header("Authorization").split(' ')[1]

       console.log(`the token is ${token}`)
      if(!token){
         return res.status(401).json({message: "Access denied, authorization token was not provided"})
      }

      console.log(`thr token is ${token}`)

      try{
          const decoded = jwt.verify(token, JWT_SECRETE);

            req.user = await User.findById(decoded.userId).select("-password");
            if (!req.user) return res.status(401).json({ error: "User not found" });
            next();

          console.log(`the user role is ${req.user.role}`)

         
      }catch(error){
         console.error("Auth middleware error:", error)
         return res.status(401).json({message: error.message})
      }

      
}

const adminOnly = (req, res, next) => {
     console.log(`the role is ${req.user?.role}`)
     if(req.user?.role !== 'admin'){
         return res.status(403).json({error: "Access denied, only admin can access this route"})
     }

     next()
}

   module.exports = {auth, adminOnly}