import type { Request, Response, NextFunction } from "express";
import { JWT } from "../interfaces/JWT.js";
import UnAuthorizedError from "../error/UnAuthorizedError.js";
import type { jwtToken } from "../types/jwtToken.js";

declare global {
  namespace Express {
    interface Request {
      jwtPayload?: jwtToken;
    }
  }
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  let token: string | undefined;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies && typeof req.cookies === "object") {
    token = (req.cookies as Record<string, string>)["token"];
  }

  if (!token) {
    throw new UnAuthorizedError("Authentication token is required");
  }

  try {
    const decoded = await JWT.verifyToken(token);
    req.jwtPayload = decoded;
    next();
  } catch {
    throw new UnAuthorizedError("Invalid or expired authentication token");
  }
}
