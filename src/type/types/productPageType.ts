export type ImagesProduct = {
  url: string;
};

export type ProductAPI = {
  categories: {
    id: string;
    name: string;
  };
  description: string;
  masterVariant: {
    images: ImagesProduct[];
  };
  name: string;
};
