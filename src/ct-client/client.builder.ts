import {
  ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  AuthMiddlewareOptions,
  Client,
  ClientBuilder,
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const {
  VITE_CTP_PROJECT_KEY = 'r20',
  VITE_CTP_CLIENT_SECRET = 're5q7FF5iTAAjW1FRit789wji3LMxAuZ',
  VITE_CTP_CLIENT_ID = 'd9egYx69K1gyqJmpdubFU5SY',
  VITE_CTP_AUTH_URL = 'https://auth.europe-west1.gcp.commercetools.com',
  VITE_CTP_API_URL = 'https://api.europe-west1.gcp.commercetools.com',
  VITE_CTP_SCOPES = 'manage_project:r20',
} = import.meta.env;

const authMiddlewareOptions: AuthMiddlewareOptions =
  {
    host: VITE_CTP_AUTH_URL,
    projectKey: VITE_CTP_PROJECT_KEY,
    credentials: {
      clientId: VITE_CTP_CLIENT_ID,
      clientSecret:
        VITE_CTP_CLIENT_SECRET,
    },
    scopes: [VITE_CTP_SCOPES],
    fetch,
  };

const httpMiddlewareOptions: HttpMiddlewareOptions =
  {
    host: VITE_CTP_API_URL,
    fetch,
  };

const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(
    authMiddlewareOptions
  )
  .withHttpMiddleware(
    httpMiddlewareOptions
  )
  .withLoggerMiddleware()
  .build();

const createApiClient = (
  ctpClient: Client
): ByProjectKeyRequestBuilder => {
  return createApiBuilderFromCtpClient(
    ctpClient
  ).withProjectKey({
    projectKey: VITE_CTP_PROJECT_KEY,
  });
};
export const apiRoot =
  createApiClient(ctpClient);
