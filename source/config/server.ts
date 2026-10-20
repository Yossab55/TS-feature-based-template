import type { ServerConfig } from "../types/config.js";
import { env } from "../util/helpers.js";

const serverConfig: ServerConfig = {
  port: Number(env("PORT")) || 3000,
  host: env("HOST") || "localhost",
};

export default serverConfig;
