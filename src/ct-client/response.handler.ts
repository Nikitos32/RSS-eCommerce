import {
  ClientResponse,
  Customer,
  CustomerSignInResult,
  ErrorObject,
  ErrorResponse,
  GraphQLResponse,
} from '@commercetools/platform-sdk';
import { HttpStatusCode } from './http.status.code';

type Data = Customer | GraphQLResponse | CustomerSignInResult | ErrorObject[];

/**
 * @interface CTResponse
 * @memberof CTResponseHandler
 * @alias CTResponse
 * @typedef {object} CTResponse
 * @property {boolean} ok Result of Request Success - true, Error - false
 * @property {string} message message from Response for Errors
 * @property {Customer | GraphQLResponse | CustomerSignInResult | ErrorObject[]} data
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
    data:
      | Customer
      | GraphQLResponse
      | CustomerSignInResult
      | ErrorObject[]
      | undefined
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
    data: GraphQLResponse | ErrorObject[] | undefined
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
      result?.statusCode || error?.statusCode || 0,
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

  /**
   *
   * @description method to handle graphql responses
   *
   * @param answer ClientResponse
   *
   * @return CTResponse data: GraphQLResponse
   */
  static handleGraphql(answer: ClientResponse): CTResponse {
    const { errors } = answer.body as GraphQLResponse;

    if (answer.statusCode !== HttpStatusCode.OK_200) {
      return CTResponseHandler.handleUnexpectedStatus(answer.statusCode);
    }

    if (errors?.length) {
      return CTResponseHandler.makeError(
        answer.statusCode,
        errors[0].message, // first error
        answer.body as GraphQLResponse
      );
    }

    return CTResponseHandler.makeSuccess(
      answer.statusCode,
      '',
      answer.body as GraphQLResponse
    );
  }
}
