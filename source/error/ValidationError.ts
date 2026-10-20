//In the name of Cross
import z from "zod";
import AppError from "./AppError.js";
import mongoose from "mongoose";
import { ResponseCode } from "../constant/ResponseCodes.js";

class ValidationError extends AppError {
  public errors: Record<string, string> = {};
  constructor(
    message = "Validation error",
    wayToFix: string | "" = "Please check your input and try again",
    public validationErrors: z.ZodError | mongoose.Error.ValidationError,
  ) {
    super(
      message,
      ResponseCode.badRequest,
      wayToFix || "Please check your input and try again",
    );
    if (validationErrors instanceof z.ZodError) {
      this.handleZodErrors(validationErrors);
    } else if (validationErrors instanceof mongoose.Error.ValidationError) {
      this.handleMongooseErrors(validationErrors);
    } else {
      const __exhaustiveCheck: never = validationErrors;
      throw new Error(`Unhandled error type: ${typeof validationErrors}`);
    }
  }

  handleZodErrors(error: z.ZodError) {
    error.issues.forEach((issue) => {
      const path = issue.path.join(".");
      this.errors[path] = issue.message;
    });
  }

  handleMongooseErrors(errors: mongoose.Error.ValidationError) {
    Object.keys(errors.errors).forEach((key) => {
      const error = errors.errors[key];
      if (error) this.errors[key] = error.message;
    });
  }
}

export default ValidationError;
