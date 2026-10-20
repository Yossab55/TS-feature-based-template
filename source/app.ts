import cookieParser from "cookie-parser";
import express, {
  type Application,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import morgan from "morgan";
import { errorMiddleware } from "./middleware/Error.middleware.js";
import logger from "./util/logger.js";
import { level } from "winston";

const app: Application = express();

process.on("uncaughtException", (err: Error) => {
  logger.error({
    level: "error",
    private: true,
    message: "Uncaught Exception",
    error: err,
  });
  process.exit(1); // Exit the process to avoid undefined behavior
});

process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
  logger.log({
    level: "error",
    private: true,
    message: "Unhandled Rejection",
    reason,
    promise,
  });
  process.exit(1); // Exit the process to avoid undefined behavior
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routers

// Error Handling Middleware
app.use(errorMiddleware);

export default app;
