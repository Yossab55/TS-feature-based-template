import NotFoundError from "../error/NotFound.js";
import ForbiddenError from "../error/ForbiddenError.js";
import ValidationError from "../error/ValidationError.js";
import AppError from "../error/AppError.js";

export function errorMiddleware(error: Error, req: any, res: any, next: any) {
  if (error instanceof NotFoundError) {
    return res.status(error.statusCode).json({
      message: error.message,
      wayToFix: error.wayToFix,
    });
  }

  if (error instanceof ValidationError) {
    return res.status(error.statusCode).json({
      message: error.message,
      wayToFix: error.wayToFix,
      errors: error.errors,
    });
  }

  if (error instanceof ForbiddenError) {
    return res.status(error.statusCode).json({
      message: error.message,
      wayToFix: error.wayToFix,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      wayToFix: error.wayToFix,
    });
  }

  if (error instanceof Error) {
    return res.status(500).json({
      message: error.message,
      wayToFix: "Please contact support for assistance",
    });
  }

  return res.status(500).json({
    message: "An unexpected error occurred",
    wayToFix: "Please contact support for assistance",
  });
}
