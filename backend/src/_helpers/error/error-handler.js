import ErrorResponse from "./ErrorResponse.js";

function errorHandler(err, req, res, next) {
  let error = { ...err };
  error.message = err.message;
  if (err.code && err.code === 11000) {
    let values = Object.values(err.keyValue).join(' ');
    const message = `${values} already taken`;
    error = new ErrorResponse(message, 400);
  }

  if (err.name == "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    // jwt expred error
    const message = "You are unauthorized";
    const hint = "Try to sign in again";
    error = new ErrorResponse(err, 401, undefined, hint);
  }

  if (err.name === "JsonWebTokenError") {
    //jwt token error
    const message = "Invalid sign in attempt";
    error = new ErrorResponse(message, 401);
  }

  if(err.name === "MongoServerError") {
    const message = "Internal Error occured";
    error = new ErrorResponse(message);
  }

  if (error.errArray && error.errArray.length > 0) {
    return res.status(error.statusCode || 500).json({
      err: error.errArray,
    });
  }

  // default to 500 server error
  let log = {
    msg: error.message || "Temporary server error",
  };
  if (error.hint) log.hint = error.hint;
  res.status(error.statusCode || 500).json({
    err: [log],
  });
}

export { errorHandler };
