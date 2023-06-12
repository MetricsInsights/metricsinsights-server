export default class AppError extends Error {
    constructor(public readonly message: string, public readonly statusCode = 400) {
      super(message);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  