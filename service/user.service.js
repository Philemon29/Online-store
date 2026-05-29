const User = require('../models/user.model')
const Token = require('../models/token.model')
const mailService = require('./mail.service')



const requestAccountDeletion = async(userId) => {
    const user = await User.findById(userId);

      
    if(!user) throw new Error("User not found")

    await Token.deleteMany({userId: user._id})

    const deleteToken = ("" + Math.floor(1000 + Math.random() * 9000))

    await Token.create({
        userId: user._id,
        code: deleteToken
    })

    await mailService.sendAccountDeletionEmail(user.email, user.name, deleteToken)

    return;

}

module.exports = {requestAccountDeletion}