export type ImagesProduct = {
  url: string;
};

export type ProductPrice = {
  value: {
    fractionDigits: number;
    centAmount: number;
    currencyCode: string;
  };
  discounted: {
    discount: {
      id: string;
      name: string;
      value: {
        type: string;
        permyriad: number;
      };
    };
    value: {
      centAmount: number;
      currencyCode: string;
      fractionDigits: number;
    };
  };
};

export type ProductAPI = {
  categories: {
    id: string;
    name: string;
  };
  description: string;
  masterVariant: {
    images: ImagesProduct[];
    prices: ProductPrice[];
  };
  name: string;
};
