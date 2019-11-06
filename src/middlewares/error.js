const catchAll = (err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Something broke!'

  res.status(status).json({ code: status, message })
}

const notFound = (req, res, next) => {
  const error = new Error('Route Not Found')
  error.status = 404

  next(error)
}

module.exports = {
  catchAll,
  notFound
}
