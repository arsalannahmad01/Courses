const express = require('express')
const router = express.Router()

const { registerUser, login } = require('../controllers/users')

router.route('/register').post(registerUser)
router.route('/login').post(login) 

module.exports = router