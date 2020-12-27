/* eslint-disable max-classes-per-file */

import { InternalError } from '@src/utils/error/InternalError';

export class BlingRequestError extends InternalError {
  constructor(message) {
    const internalMessage =
      'Unexpected error when trying to communicate to Bling';
    super(`${internalMessage}: ${message}`);
  }
}

export class BlingResponseError extends InternalError {
  constructor(message, code) {
    const internalMessage = 'Unexpected error returned by the Bling service';
    super(`${internalMessage}: ${message}`, code);
  }
}
