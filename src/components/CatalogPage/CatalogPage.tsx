import { FormEvent, useContext, useEffect, useState } from 'react';
import { FilterSection } from '../FilterSection/FilterSection';
import { SortSection } from '../SortSection/SortSection';
import { IsLoadindContext } from '../../App';
import { ProductService } from '../../services';
import { CTResponse } from '../../ct-client';
import {
  Category,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { ProductPreviewItem } from '../ProductPreviewItem/ProductPreviewItem';

interface ProductProjectionResponse {
  productProjectionSearch: ProductProjectionPagedQueryResponse;
}

export const CatalogPage = () => {
  const [handleLoading] = useContext(IsLoadindContext);
  const [currentSort, setCurrentSort] = useState<string>();
  const [currentSearch, setcurrentSearch] = useState<string>();

  const [products, setProducts] = useState<ProductProjectionResponse>({
    productProjectionSearch: {
      limit: 0,
      count: 0,
      offset: 0,
      results: [],
    },
  });

  const [currentRangeValue, setCurrentRangeValue] = useState<number[]>([
    0, 1000,
  ]);

  const handleRangeSlider = (event: number | number[]) => {
    if (typeof event !== 'number') {
      setCurrentRangeValue(event);
    }
  };

  const handleCurrentSort = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    console.log(target.value);
    setCurrentSort(target.value);
  };

  const handleCurrentSearch = (event: FormEvent) => {
    const target = event.target as HTMLInputElement;
    setcurrentSearch(target.value);
  };

  useEffect(() => {
    handleLoading(true);
    const productService = new ProductService();
    if (currentSort || currentSearch) {
      const data: Promise<CTResponse> = productService.getProductsWithFilters(
        'EN-GB',
        currentSort,
        currentSearch
      );
      data.then((response) => {
        handleLoading(false);
        setProducts(
          (response.data as CTResponse).data as ProductProjectionResponse
        );
      });
    } else {
      const data: Promise<CTResponse> = productService.getProductsAll();
      data.then((response) => {
        handleLoading(false);
        setProducts(
          (response.data as CTResponse).data as ProductProjectionResponse
        );
      });
    }
  }, [currentSort, currentSearch, currentRangeValue]);

  return (
    <section className="flex">
      <div>
        <FilterSection
          currentRangeValue={currentRangeValue}
          handleRangeSlider={handleRangeSlider}
        />
      </div>
      <div className="flex gap-5 flex-col w-full p-5">
        <SortSection
          handleCurrentSearch={handleCurrentSearch}
          handleCurrentSort={handleCurrentSort}
        />
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl">Products</h1>
          <section className="flex flex-col gap-5 flex-wrap">
            {products?.productProjectionSearch.results.map((element) => {
              return (
                <ProductPreviewItem
                  key={element.key}
                  id={element.key ? element.key : ''}
                  imgUrl={
                    element.masterVariant.images
                      ? element.masterVariant.images[0].url
                      : ''
                  }
                  productCategory={`${
                    element.categories[0]
                      ? element.categories.map((element) => {
                          return ` ${(element as unknown as Category).name}`;
                        })
                      : 'no category'
                  }`}
                  productDescription={
                    element.description
                      ? `${element.description}`
                      : 'no description'
                  }
                  productName={`${element.name ? element.name : ''}`}
                  productPrice={`${element.masterVariant.prices ? element.masterVariant.prices[0].value.centAmount : 'no price'}`}
                />
              );
            })}
          </section>
        </div>
      </div>
    </section>
  );
};
