import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import logger from "./logger.js";
import { promisify } from "util";
import AppError from "../error/AppError.js";
import { ResponseCode } from "../constant/ResponseCodes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mainDir = getMainDir(__dirname);
const unlink = promisify(fs.unlink);
const readFile = promisify(fs.readFile);
const joinPath = path.join;

function getMainDir(dir: string): string | null {
  if (fs.existsSync(path.join(dir, "package.json"))) {
    return dir;
  }
  const parent = path.resolve(dir, "..");
  if (parent == dir) return null; // we reached to the end and didn't find dir
  return getMainDir(parent);
}

function getExtensionName(filename: string): string {
  const extension = path.extname(filename);
  if (extension == "." || !extension) {
    throw new AppError(
      `File handling, filename doesn't have extension got: ${filename}`,
      ResponseCode.badRequest,
      "Send correct file",
    );
  }

  return extension;
}

async function retrieveFile(path: string): Promise<Buffer> {
  const file = await readFile(path);
  return file;
}

function resolveFile(filepath: string) {
  return path.resolve(filepath);
}

async function removeFile(path: string) {
  const urlPattern = /http[s]{0,1}:\/\/\w+/;
  if (urlPattern.test(path)) return;
  if (!mainDir) {
    logger.error(`mainDir is not defined, cannot remove file: ${path}`);
    return;
  }
  const fileFromDir = joinPath(mainDir, path);
  if (fs.existsSync(fileFromDir)) await unlink(fileFromDir);
  logger.info(`file: ${fileFromDir} has been removed`);
}

export {
  mainDir,
  joinPath,
  getExtensionName,
  retrieveFile,
  resolveFile,
  removeFile,
};
