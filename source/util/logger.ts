import winston, { createLogger, format, transports } from "winston";
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, timestamp, message }) => {
  return `${timestamp} - ${level}: ${message}`;
});

const ignorePrivate = format((info, opts) => {
  if (info.private) {
    return false;
  }
  return info;
});

const logger = winston.createLogger({
  level: "http",
  transports: [
    new transports.File({
      filename: "logs/app.log",
      format: combine(format.json(), ignorePrivate()),
    }),

    new transports.Console({
      format: combine(
        format.colorize(),
        format.prettyPrint(),
        timestamp(),
        myFormat,
      ),
    }),
  ],
});

export default logger;
