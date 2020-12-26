import { ApiError } from '@src/utils/error/ApiError';

export const errorResponse = (res, apiError) =>
  res.status(apiError.code).send(ApiError.format(apiError));
