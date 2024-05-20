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
  VITE_CTP_PROJECT_KEY = 'no key',
  VITE_CTP_CLIENT_SECRET = 'no secret',
  VITE_CTP_CLIENT_ID = 'no ID',
  VITE_CTP_AUTH_URL = 'no auth',
  VITE_CTP_API_URL = 'no API',
  VITE_CTP_SCOPES = 'no scopes',
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
