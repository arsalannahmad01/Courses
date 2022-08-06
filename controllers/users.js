const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')


const registerUser = async (req, res) => {

    const user = await User.create(req.body)

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ success: true, name: user.name, token: token });
}

const login = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        res.send('Please provide email and password')
    }

    const user = await User.findOne({email: email})
    if(!user) {
        res.send(`No user found`)
    }

    const isPaswordCorrect = await user.comparePassword(password)
    if (!isPaswordCorrect) {
        res.send('Wrong password')
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({name:user.name, token:token})
}

module.exports = {registerUser, login}