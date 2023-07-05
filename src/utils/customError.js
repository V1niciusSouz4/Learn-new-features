export class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode ? statusCode : 400;
  }
}

export const throwError = (message, statusCode) => {
  throw new CustomError(message, statusCode);
};
