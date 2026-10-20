import { ResponseCode } from "../constant/ResponseCodes.js";
import AppError from "./AppError.js";

class ForbiddenError extends AppError {
  constructor(message = "Access forbidden", wayToFix?: string) {
    super(
      message,
      ResponseCode.forbidden,
      wayToFix ||
        "Please check your permissions or contact support for assistance",
    );
  }
}

export default ForbiddenError;
