import {
  Customer,
  CustomerSignInResult,
  ErrorObject,
  GraphQLResponse,
} from '@commercetools/platform-sdk';

export type Data =
  | Customer
  | GraphQLResponse
  | CustomerSignInResult
  | ErrorObject[];
