import { Response } from "express";
import { HttpErrorResponse } from "../../interfaces/httpResponsesInterface";
import { HttpStatus } from "../enums/httpStatusEnum";

import {
  HttpError,
  HttpErrorArgs,
  HttpErrorMessageArgs,
} from "../errors/httpError";

export function getHttpErrorClassArgs(
  response: string | HttpErrorMessageArgs,
  httpStatus: HttpStatus
): HttpErrorArgs {
  if (typeof response === "string") {
    return { message: response, httpStatus };
  }

  return { ...response, httpStatus };
}

export function httpErrorResponse(error: any, res: Response) {
  if (error instanceof HttpError) {
    console.error(
      JSON.stringify({ ...error, message: error.message }, null, 2)
    );

    const response: HttpErrorResponse = {
      ok: false,
      message: error.message,
      details: error.details || error.stack,
    };

    return res.status(error.httpStatus).json(response);
  }

  const response: HttpErrorResponse = {
    ok: false,
    message: error.message || "Internal server error",
    details: error.stack || null,
  };

  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
}
