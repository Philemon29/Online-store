const userService = require('../service/user.service')

const requestAccountDeletion = async(req, res) => {
      const userId = req.user._id;
      try{
           await userService.requestAccountDeletion(userId);
           return res.status(200).json({message: "A deletion token  have been sent to your email"})
      }catch(error){
          return res.status(400).json({error: error.message})
      }
}

module.exports = {requestAccountDeletion}