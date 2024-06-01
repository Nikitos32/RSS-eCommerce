import { useContext, useEffect, useState } from 'react';
import { FilterSection } from '../FilterSection/FilterSection';
import { ProductPreviewItem } from '../ProductPreviewItem/ProductPreviewItem';
import { SortSection } from '../SortSection/SortSection';
import { IsLoadindContext } from '../../App';
import { ProductService } from '../../services';
import { CTResponse } from '../../ct-client';
import { Product } from '@commercetools/platform-sdk';

interface ProductsData {
  products: Products;
}

interface Products {
  count: number;
  results: Product[];
  total: number;
}

export const CatalogPage = () => {
  const [handleLoading] = useContext(IsLoadindContext);
  const [allProducts, setAllProducts] = useState<Products>();

  useEffect(() => {
    handleLoading(true);
    const productService = new ProductService();
    const data: Promise<CTResponse> = productService.getProductsAll();
    data.then((response) => {
      handleLoading(false);
      setAllProducts(
        ((response.data as CTResponse).data as ProductsData).products
      );
    });
  }, []);

  return (
    <section className="flex">
      <div>
        <FilterSection />
      </div>
      <div className="flex gap-5 flex-col w-full p-5">
        <SortSection />
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl">Products</h1>
          <section className="flex flex-col gap-5 flex-wrap">
            {allProducts &&
              allProducts.results.map((element, index) => {
                return (
                  <ProductPreviewItem
                    key={element.id}
                    imgUrl={`../RSS-eCommerce/public/photos/bc-${index}.webp`}
                    productCategory="Chairs"
                    productDescription="lorem10"
                    productName="232kdfkd"
                    productPrice="$359.99"
                  />
                );
              })}
          </section>
        </div>
      </div>
    </section>
  );
};
