import { ClientResponse } from '@commercetools/platform-sdk';
import { CTResponse, CTResponseHandler, HttpStatusCode } from '../ct-client';
import { GraphqlRequest } from '../ct-client/graphql.request';

const { VITE_CTP_LOCALE = 'en-GB' } = import.meta.env;

export class ProductService {
  graphqlRequest = new GraphqlRequest();

  async getProductById(
    id: string,
    locale: string = VITE_CTP_LOCALE
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
    priceFilter: number[],
    sortParam?: string,
    searchValue?: string,
    categoryFilter?: string[],
    limit: number = 10
  ): Promise<CTResponse> {
    const query = `
    query ($locale: Locale) {
  productProjectionSearch (
  limit: ${limit},
    ${sortParam ? `sorts: ["name.${locale} ${sortParam}"],` : ''},
    ${searchValue ? `text: "${searchValue}", locale: $locale,` : ''}
    filters: [
      ${
        (categoryFilter ? categoryFilter.length > 0 : false)
          ? `
          {
      model: {
        value: {
          path: "categories.id"
          values: [${categoryFilter?.map((element) => {
            return `"${element}"`;
          })}]
        }
      }
    },
      `
          : ''
      }
      {
         model: {
        range: {
            path: "variants.price.centAmount"
            ranges: [{ from: "${priceFilter[0]}00", to: "${priceFilter[1]}00" }]
          }
        }
      }
    ]
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
        price(currency: "EUR" country:"DE") {
          value {
            fractionDigits
            centAmount
          }
        }
        prices {
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
          value {
            fractionDigits
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

  async getProductsAll(
    limit: number = 10,
    locale: string = 'EN-GB'
  ): Promise<CTResponse> {
    const query = `
  query ($locale: Locale) {
    productProjectionSearch (limit: ${limit}) {
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
          price(currency: "EUR", country: "DE") {
            value {
              fractionDigits
              centAmount
            }
          }
          prices {
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
            value {
              fractionDigits
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
    locale: string = VITE_CTP_LOCALE
  ): Promise<CTResponse> {
    const query = `
    query ($key: String, $locale: Locale) {
      product(key: $key) {
        key
        id
        masterData {
          current {
            skus
            name(locale: $locale)
            description(locale: $locale)
            categories {
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
