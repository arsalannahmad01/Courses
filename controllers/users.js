const User = require('../models/User')
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');


const registerUser = async (req, res) => {
    const user = await User.create(req.body)

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ success: true, name: user.name, token: token })
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) throw new BadRequestError('Please provide email and password')

    const user = await User.findOne({ email: email })
    if (!user) throw new UnauthenticatedError('Invalid Credentials')

    const isPaswordCorrect = await user.comparePassword(password)
    if (!isPaswordCorrect) throw new UnauthenticatedError('Invalid Credentials')

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ name: user.name, token: token })
}

module.exports = { registerUser, login }