import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";
import { promisify } from "node:util";
import type { jwtToken } from "../types/jwtToken.js";

const options: SignOptions = {
  expiresIn: Number(jwtConfig.expire),
};

class JWT {
  /**
   *
   * @param {String} iss - the creation of the token
   * @param {String} sub - the id of user
   * @param {String} aud - where to use this token
   * @param {String} role - user role in the website
   * @returns
   */
  static createPayload(
    iss: string,
    sub: string,
    aud: string,
    role: string,
  ): jwtToken {
    const payload = { iss, sub, aud, role };
    return payload;
  }

  static async createToken(payload: jwtToken) {
    // const token = await sign(payload, jwtConfig.secret, options);
    // return token;
    return new Promise<string>((resolve, reject) => {
      jwt.sign(payload, jwtConfig.secret, options, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token as string);
        }
      });
    });
  }

  // verify is also used to decodeToken
  static async verifyToken(token: string, params?: object) {
    return new Promise<jwtToken>((resolve, reject) => {
      jwt.verify(token, jwtConfig.secret, params, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded as jwtToken);
        }
      });
    });
  }
}

export { JWT };
