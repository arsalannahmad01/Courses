const apiNotFoundMiddleware = (req, res) => {
    res.status(404).send('Route does not exist')
}

module.exports = apiNotFoundMiddleware