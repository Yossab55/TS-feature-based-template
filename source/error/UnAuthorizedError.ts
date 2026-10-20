import { ResponseCode } from "../constant/ResponseCodes.js";
import AppError from "./AppError.js";

class UnAuthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(
      message,
      ResponseCode.unauthorized,
      "Please provide valid credentials to access this resource",
    );
  }
}

export default UnAuthorizedError;
