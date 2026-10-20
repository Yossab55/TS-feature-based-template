import type { MongoDBConfig } from "../types/config.js";
import { env } from "../util/helpers.js";

export const mongoDBConfig: MongoDBConfig = {
  MONGO_URI: env("MONGO_URI"),
};
