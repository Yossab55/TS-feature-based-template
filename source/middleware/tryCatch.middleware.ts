export function tryCatchMiddleware(handler: Function) {
  return async function (req: any, res: any, next: any) {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
