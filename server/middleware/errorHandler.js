// middleware/errorHandler.js
import { STATUS_CODE } from '../utils/httpStatusCode.js'

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = err.message || "server error";

    console.log("message =====> ", message)

  res.status(statusCode).json({
    statusCode,
    status: STATUS_CODE.ERROR,
    message,
  });
};

export default errorHandler;
