export class InternalError extends Error {
  constructor(message, code = 500, description) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.description = description;
    Error.captureStackTrace(this, this.constructor);
  }
}
