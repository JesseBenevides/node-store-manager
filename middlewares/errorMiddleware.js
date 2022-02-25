const errorMiddleware = (err, _req, res, _next) => {
  if (err.status) return res.status(err.status).json(err.message);
  return res.status(500).json(err.message);
};

module.exports = errorMiddleware;
