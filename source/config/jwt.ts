import { env } from "../util/helpers.js";
import type { JWTConfig } from "../types/config.js";

export const jwtConfig: JWTConfig = {
  secret: env("JWT_SECRET"),
  expire: env("JWT_EXPIRES"),
};
