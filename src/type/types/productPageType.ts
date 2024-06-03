export type ImagesProduct = {
  url: string;
};

export type ProductPrice = {
  value: {
    fractionDigits: number;
    centAmount: number;
    currencyCode: string;
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
