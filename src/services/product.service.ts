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

  async getProductsSortedByKey(
    locale: string = 'en-US',
    sortParam: string = 'asc'
  ): Promise<CTResponse> {
    const query = `
    query ($locale: Locale) {
  productProjectionSearch (sorts: ["name.${locale} ${sortParam}"]) {
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

  async searchProduct(
    locale: string = 'EN_GB',
    searchValue: string = ''
  ): Promise<CTResponse> {
    const query = `
    query ($locale: Locale) {
  productProjectionSearch(
    text: "${searchValue}",
    locale: $locale
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

  async filterProductByPrice(
    locale: string = 'en-US',
    filterValueMin: string = '',
    filterValueMax: string = ''
  ): Promise<CTResponse> {
    const query = `
    query($locale: Locale) {
      products (where: "masterData(current(masterVariant(prices(value(centAmount > ${filterValueMin}00 and centAmount < ${filterValueMax}00)))))") {
        count
        total
        results {
          id
          key
          skus
          masterData {
            current {
              description(locale: $locale)
              categories {
                id
                name(locale:$locale)
            }
              name(locale: $locale)
              masterVariant {
                id
                images {
                  url
                  label
                }
                prices {
                  id
                  value {
                    centAmount
                  }
                }
                attributesRaw {
                  name
                }
              }
            }
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
