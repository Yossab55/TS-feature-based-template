import { ResponseCode } from "../constant/ResponseCodes.js";
import AppError from "./AppError.js";

class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(
      message,
      ResponseCode.notFound,
      "Please check the resource URL or contact support for assistance",
    );
  }
}

export default NotFoundError;
