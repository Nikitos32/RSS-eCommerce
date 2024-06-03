import { FormEvent, useContext, useEffect, useState } from 'react';
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
  const [currentSort, setCurrentSort] = useState<string>();
  const [currentSearch, setcurrentSearch] = useState<string>();
  const [allProducts, setAllProducts] = useState<Products>();

  const handleCurrentSort = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setCurrentSort(target.value);
  };

  const handleCurrentSearch = (event: FormEvent) => {
    const target = event.target as HTMLInputElement;
    setcurrentSearch(target.value);
  };

  useEffect(() => {
    handleLoading(true);
    const productService = new ProductService();
    if (currentSearch) {
      /*   const data: Promise<CTResponse> = productService.searchProduct(
        'en-US',
        currentSearch
      );
      data.then((response) => {
        handleLoading(false);
        setAllProducts(
          ((response.data as CTResponse).data as ProductsData).products
        );
      }); */
      handleLoading(false);
    } else {
      if (currentSort === 'a-z') {
        const data: Promise<CTResponse> = productService.getProductsSortedByKey(
          'en-US',
          'asc'
        );
        data.then((response) => {
          handleLoading(false);
          setAllProducts(
            ((response.data as CTResponse).data as ProductsData).products
          );
        });
      } else if (currentSort === 'z-a') {
        const data: Promise<CTResponse> = productService.getProductsSortedByKey(
          'en-US',
          'desc'
        );
        data.then((response) => {
          handleLoading(false);
          setAllProducts(
            ((response.data as CTResponse).data as ProductsData).products
          );
        });
      } else {
        const data: Promise<CTResponse> = productService.getProductsAll();
        data.then((response) => {
          handleLoading(false);
          setAllProducts(
            ((response.data as CTResponse).data as ProductsData).products
          );
        });
      }
    }
  }, [currentSort, currentSearch]);

  return (
    <section className="flex">
      <div>
        <FilterSection />
      </div>
      <div className="flex gap-5 flex-col w-full p-5">
        <SortSection
          handleCurrentSearch={handleCurrentSearch}
          handleCurrentSort={handleCurrentSort}
        />
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl">Products</h1>
          <section className="flex flex-col gap-5 flex-wrap">
            {allProducts &&
              allProducts.results.map((element) => {
                return (
                  <ProductPreviewItem
                    key={element.key}
                    imgUrl={
                      element.masterData.current.masterVariant.images
                        ? `${element.masterData.current.masterVariant.images[0].url}`
                        : ''
                    }
                    productCategory={`${element.masterData.current.categories[0].name}`}
                    productDescription={`${element.masterData.current.description}`}
                    productName={`${element.masterData.current.name}`}
                    productPrice={`$${element.masterData.current.masterVariant.prices ? element.masterData.current.masterVariant.prices[0].value.centAmount : ''}`}
                  />
                );
              })}
          </section>
        </div>
      </div>
    </section>
  );
};
