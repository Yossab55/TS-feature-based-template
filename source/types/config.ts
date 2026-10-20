export type ServerConfig = {
  port: number;
  host: string;
};

export type MongoDBConfig = {
  MONGO_URI: string;
};

export type JWTConfig = {
  secret: string;
  expire: string;
};

export type CookieConfig = {
  httpOnly: boolean;
  maxAge: number;
  secure: boolean;
  sameSite: "lax" | "strict" | "none";
};

export type CookieRemoveConfig = Pick<CookieConfig, "httpOnly" | "maxAge">;
