/* eslint-disable max-classes-per-file */

import { InternalError } from '@src/utils/error/InternalError';

export class PipedriveRequestError extends InternalError {
  constructor(message) {
    const internalMessage =
      'Unexpected error when trying to communicate to Pipedrive';
    super(`${internalMessage}: ${message}`);
  }
}

export class PipedriveResponseError extends InternalError {
  constructor(message, code) {
    const internalMessage =
      'Unexpected error returned by the Pipedrive service';
    super(`${internalMessage}: ${message}`, code);
  }
}
