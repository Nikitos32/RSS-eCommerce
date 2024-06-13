export type ImagesProduct = {
  url: string;
};

export type ValuePrice = {
  fractionDigits: number;
  centAmount: number;
  currencyCode?: string;
};

export type ProductPrice = {
  value: ValuePrice;
  discounted: {
    discount: {
      id: string;
      name: string;
      value: {
        type: string;
        permyriad: number;
      };
    };
    value: ValuePrice;
  } | null;
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
