const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === "ValidationError") {
    statusCode = 400;

    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  if (err.name === "CastError") {
    statusCode = 404;
    message = "Resource not found";
  }

  if (err.code === 11000) {
    statusCode = 400;
    message = "Email already exists";
  }

  const response = {
    success: false,
    message,
  };

  if (err.emptyFields) {
    response.emptyFields = err.emptyFields;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
