const router = require('express').Router();

const {auth} = require('../middleware/auth.middleware')

const {requestAccountDeletion} = require('../contoller/user.controller')



router.post('/delete-account/request', auth, requestAccountDeletion)

module.exports = router