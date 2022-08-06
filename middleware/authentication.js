const User = require('../models/User')
const jwt = require('jsonwebtoken')
// const { UnauthenticatedError } = require('../errors')

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization

    // console.log(authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // throw new UnauthenticatedError('Authentication invalid')
        res.send('Authentication Invalid')
    }

    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: payload.id }, '-password')
        req.user = user
        next()
    } catch (error) {
        res.send('Authentication Invalid')
        // throw new UnauthenticatedError('Authentication invalid')
    }
}

module.exports = authMiddleware