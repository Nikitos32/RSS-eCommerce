import {
  ClientResponse,
  Customer,
  CustomerSignInResult,
  ErrorObject,
  ErrorResponse,
} from '@commercetools/platform-sdk';
import { HttpStatusCode } from './http.status.code';

type Data = Customer | CustomerSignInResult | ErrorObject[];

/**
 * @interface CTResponse
 * @memberof CTResponseHandler
 * @alias CTResponse
 * @typedef {object} CTResponse
 * @property {boolean} ok Result of Request Success - true, Error - false
 * @property {string} message message from Response for Errors
 * @property {CustomerSignInResult | ErrorObject[]} data
 */
export interface CTResponse {
  ok: boolean;
  status: HttpStatusCode;
  message?: string;
  data?: Data;
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
   * @param data CustomerSignInResult
   *
   * @return CTResponse
   */
  static makeSuccess(
    statusCode: HttpStatusCode,
    message: string,
    data: Customer | CustomerSignInResult | ErrorObject[] | undefined
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
  static makeError(
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
  static handleCatch(error: ClientResponse): CTResponse {
    const result = error.body as ErrorResponse;

    return CTResponseHandler.makeError(
      result.statusCode || error.statusCode || 0,
      result.message,
      result.errors
    );
  }

  static handleUnexpectedStatus(statusCode: number | undefined): CTResponse {
    return CTResponseHandler.makeError(
      statusCode || 0,
      `Status Code ${statusCode} is not expected`,
      undefined
    );
  }
}
