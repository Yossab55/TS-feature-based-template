import { env } from "../util/helpers.js";
import type { CookieConfig, CookieRemoveConfig } from "../types/config.js";
const maxAge: number = (function getMilleSeconds() {
  const days = parseInt(env("JWT_EXPIRES"));
  const convertToMilleSeconds = 24 * 60 * 60 * 1000;
  const minusOneHour = 60 * 60 * 1000;
  const time = days * convertToMilleSeconds - minusOneHour;
  return time;
})();

export const cookieConfig: CookieConfig = {
  httpOnly: true,
  maxAge,
  secure: env("NODE_ENV") === "production",
  sameSite: env("NODE_ENV") === "production" ? "none" : "lax",
};

export const cookieRemoveConfig: CookieRemoveConfig = {
  httpOnly: true,
  maxAge: 1,
};
