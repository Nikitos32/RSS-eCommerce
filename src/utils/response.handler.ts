import { Customer } from '@commercetools/platform-sdk';
import { HttpStatusCode } from './http.status.code';

export interface ResponseCT {
  ok: boolean;
  status: HttpStatusCode;
  message?: string;
  data?: Customer;
}
/**
 * @class ResponseHandler
 *
 * @description class to handle all commercetools http response
 */
export class ResponseHandler {
  /**
   *
   * @description method to handle all success responses
   *
   * @param statusCode HttpStatusCode
   * @param message String
   * @param data Customer
   *
   * @return ResponseCT
   */
  static successResponse(
    statusCode: HttpStatusCode,
    message: string,
    data: Customer
  ): ResponseCT {
    const response: ResponseCT = {
      status: statusCode,
      ok: true,
    };

    if (message !== '') {
      response.message = message;
    }

    if (data) {
      response.data = data;
    }

    return response;
  }

  /**
   *
   * @description method to handle all error responses
   *
   * @param statusCode HttpStatusCode
   * @param message String
   * @param data Customer
   *
   * @return ResponseCT
   */
  static errorResponse(
    statusCode: HttpStatusCode,
    message: string,
    data: Customer
  ): ResponseCT {
    const response: ResponseCT = {
      status: statusCode,
      ok: false,
    };

    if (message !== '') {
      response.message = message;
    }

    if (data) {
      response.data = data;
    }

    return response;
  }
}
