import { ClientResponse } from '@commercetools/platform-sdk';
import { CTResponse, CTResponseHandler, HttpStatusCode } from '../ct-client';
import { GraphqlRequest } from '../ct-client/graphql.request';

export class ProductService {
  graphqlRequest = new GraphqlRequest();

  async getProductById(
    id: string,
    locale: string = 'en-US'
  ): Promise<CTResponse> {
    const query = `
    query($id: String, $locale: Locale) {
      product(id: $id) {
        key
        masterData {
          current {
            skus
            name(locale: $locale)
            description(locale: $locale)
            categories {
              id
              name(locale:$locale)
            }
          }
        }
      }
    }
    `;

    const variables = { id, locale };

    try {
      const answer = await this.graphqlRequest.make({ query, variables });

      const { product } = answer.body.data;

      if (answer.statusCode === HttpStatusCode.OK_200 && product) {
        return CTResponseHandler.makeSuccess(
          answer.statusCode,
          '',
          answer.body
        );
      }

      if (answer.statusCode === HttpStatusCode.OK_200 && !product) {
        return CTResponseHandler.makeError(
          HttpStatusCode.NOT_FOUND_404,
          'Product Not Found',
          undefined
        );
      }

      return CTResponseHandler.handleUnexpectedStatus(answer.statusCode);
    } catch (error) {
      return CTResponseHandler.handleCatch(error as ClientResponse);
    }
  }

  async getProductsWithFilters(
    locale: string = 'en-US',
    sortParam?: string,
    searchValue?: string,
    categoryFilter?: string[]
  ): Promise<CTResponse> {
    const query = `
    query ($locale: Locale) {
  productProjectionSearch (
    ${sortParam ? `sorts: ["name.${locale} ${sortParam}"],` : ''}
    ${searchValue ? `text: "${searchValue}", locale: $locale,` : ''}
    ${
      categoryFilter
        ? `filters: {
      model: {
        value: {
          path: "categories.id"
          values: ${categoryFilter}
        }
      }
    }`
        : ''
    }
  ) {
    count
    total
    results {
      id
      key
      description(locale: $locale)
      name(locale: $locale)
      categories {
        name(locale: $locale)
      }
      masterVariant {
        prices {
          value {
            centAmount
          }
        }
        images {
          url
        }
        key
      }
    }
  }
}
    `;

    const variables = { locale };

    try {
      const answer = await this.graphqlRequest.make({ query, variables });

      if (answer.statusCode === HttpStatusCode.OK_200) {
        return CTResponseHandler.makeSuccess(
          answer.statusCode,
          '',
          answer.body
        );
      }
      return CTResponseHandler.handleUnexpectedStatus(answer.statusCode);
    } catch (error) {
      return CTResponseHandler.handleCatch(error as ClientResponse);
    }
  }

  async getProductsAll(locale: string = 'EN-GB'): Promise<CTResponse> {
    const query = `
    query ($locale: Locale) {
  productProjectionSearch {
    count
    total
    results {
      id
      key
      description(locale: $locale)
      name(locale: $locale)
      categories {
        name(locale: $locale)
      }
      masterVariant {
        prices {
          value {
            centAmount
          }
        }
        images {
          url
        }
        key
      }
    }
  }
}
    `;

    const variables = { locale };

    try {
      const answer = await this.graphqlRequest.make({ query, variables });

      if (answer.statusCode === HttpStatusCode.OK_200) {
        return CTResponseHandler.makeSuccess(
          answer.statusCode,
          '',
          answer.body
        );
      }
      return CTResponseHandler.handleUnexpectedStatus(answer.statusCode);
    } catch (error) {
      return CTResponseHandler.handleCatch(error as ClientResponse);
    }
  }

  async getProductByKey(
    key: string,
    locale: string = 'en-US'
  ): Promise<CTResponse> {
    const query = `
    query ($key: String, $locale: Locale) {
      product(key: $key) {
        key
        masterData {
          current {
            skus
            name(locale: $locale)
            description(locale: $locale)
            categories {
              id
              name(locale: $locale)
            }
            masterVariant {
              images {
                url
              }
              prices {
                value {
                  fractionDigits
                  centAmount
                  currencyCode
                }
                discounted {
                  value {
                    centAmount
                    fractionDigits
                    currencyCode
                  }
                  discount {
                    id
                    name(locale: $locale)
                    value {
                      type
                      ... on RelativeDiscountValue {
                        permyriad
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    `;

    const variables = { key, locale };

    try {
      const answer = await this.graphqlRequest.make({ query, variables });

      const { product } = answer.body.data;

      if (answer.statusCode === HttpStatusCode.OK_200 && product) {
        return CTResponseHandler.makeSuccess(
          answer.statusCode,
          '',
          answer.body
        );
      }

      if (answer.statusCode === HttpStatusCode.OK_200 && !product) {
        return CTResponseHandler.makeError(
          HttpStatusCode.NOT_FOUND_404,
          'Product Not Found',
          undefined
        );
      }

      return CTResponseHandler.handleUnexpectedStatus(answer.statusCode);
    } catch (error) {
      return CTResponseHandler.handleCatch(error as ClientResponse);
    }
  }
}
/*   266af93b-136f-456e-97c0-5d5ec9a922c6 - Home Decor*/
/* 7bc4d2e8-a12a-44dc-92c7-a027ba7a6088 - Furniture*/
/* 6ee0d40d-61c5-42ec-a33a-0baaf760330f - Kitchen */
