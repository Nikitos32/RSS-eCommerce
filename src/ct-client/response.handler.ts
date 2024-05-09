import {
  ClientResponse,
  Customer,
  ErrorObject,
  ErrorResponse,
} from '@commercetools/platform-sdk';
import { HttpStatusCode } from './http.status.code';

export interface CTResponse {
  ok: boolean;
  status: HttpStatusCode;
  message?: string;
  data?: Customer | ErrorObject[];
}
/**
 * @class CTResponseHandler
 *
 * @description class to handle all commercetools http responses
 */
export class CTResponseHandler {
  /**
   *
   * @description method to handle all success responses
   *
   * @param statusCode HttpStatusCode
   * @param message String
   * @param data Customer | ErrorObject[]
   *
   * @return CTResponse
   */
  static successResponse(
    statusCode: HttpStatusCode,
    message: string,
    data: Customer
  ): CTResponse {
    const response: CTResponse = {
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
   * @param data Customer | ErrorObject[]
   *
   * @return CTResponse
   */
  static errorResponse(
    statusCode: HttpStatusCode,
    message: string,
    data: ErrorObject[] | undefined
  ): CTResponse {
    const response: CTResponse = {
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

  /**
   *
   * @description method to handle error in catch block
   *
   * @param error ClientResponse
   *
   * @return CTResponse
   */
  static handleCatch(
    error: ClientResponse
  ): CTResponse {
    const result =
      error.body as ErrorResponse;

    return CTResponseHandler.errorResponse(
      result.statusCode,
      result.message,
      result.errors
    );
  }
}
