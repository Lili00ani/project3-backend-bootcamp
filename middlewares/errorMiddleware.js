const notFound = (req, res, next) => {
  const error = new Error(`Not Found`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.status || 500;
  let message = err.message || `internal server error`;

  res.status(statusCode).send(message);
};

module.exports = { notFound, errorHandler };
