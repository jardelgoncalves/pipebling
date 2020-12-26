/* eslint-disable max-classes-per-file */
import httpStatusCodes from 'http-status-codes';

export class APIError {
  constructor(message, code, codeAsString, description, documentation) {
    this.message = message;
    this.code = code;
    this.codeAsString = codeAsString;
    this.description = description;
    this.documentation = documentation;
  }
}

export class ApiError {
  static format(error) {
    return {
      ...{
        message: error.message,
        code: error.code,
        error: error.codeAsString
          ? error.codeAsString
          : httpStatusCodes.getStatusText(error.code),
      },
      ...(error.description && { description: error.description }),
      ...(error.documentation && { documentation: error.documentation }),
    };
  }
}
