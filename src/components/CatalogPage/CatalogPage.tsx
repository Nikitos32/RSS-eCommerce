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
import { convertPrice } from '../../utils/convertPrice';

/* import { convertPrice } from '../../utils/convertPrice'; */

interface ProductProjectionResponse {
  productProjectionSearch: ProductProjectionPagedQueryResponse;
}

export const CatalogPage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [handleLoading] = useContext(IsLoadindContext);
  const [currentSort, setCurrentSort] = useState<string>();
  const [currentSearch, setcurrentSearch] = useState<string>();
  const [currentCategories, setCurrentCategories] = useState<string[]>([]);

  const [products, setProducts] = useState<ProductProjectionResponse>({
    productProjectionSearch: {
      limit: 0,
      count: 0,
      offset: 0,
      results: [],
    },
  });

  const [currentRangeValue, setCurrentRangeValue] = useState<number[]>([
    0, 3100,
  ]);
  const handleRangeSlider = (event: number | number[]) => {
    if (typeof event !== 'number') {
      setCurrentRangeValue(event);
    }
  };

  const handleCategories = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      setCurrentCategories([...currentCategories, target.value]);
    } else {
      currentCategories.splice(currentCategories.indexOf(target.value), 1);
      setCurrentCategories([...currentCategories]);
    }
  };

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
    if (
      currentSort ||
      currentSearch ||
      currentCategories.length > 0 ||
      currentRangeValue[0] !== 0 ||
      currentRangeValue[1] !== 3100
    ) {
      const data: Promise<CTResponse> = productService.getProductsWithFilters(
        'EN-GB',
        currentRangeValue,
        currentSort,
        currentSearch,
        currentCategories
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
  }, [currentSort, currentSearch, currentRangeValue, currentCategories]);

  return (
    <section className="flex relative">
      <div>
        <FilterSection
          handleCategories={handleCategories}
          currentRangeValue={currentRangeValue}
          handleRangeSlider={handleRangeSlider}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
        />
      </div>
      <div className="flex gap-5 flex-col w-full p-5">
        <SortSection
          handleCurrentSearch={handleCurrentSearch}
          handleCurrentSort={handleCurrentSort}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
        />
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl">Products</h1>
          <section className="flex flex-col gap-5 flex-wrap">
            {products.productProjectionSearch.results.length > 0 ? (
              products?.productProjectionSearch.results.map((element) => {
                const basePrice = convertPrice(
                  element?.masterVariant.prices
                    ? element?.masterVariant.prices[0].value.centAmount
                    : 0,
                  element?.masterVariant.prices
                    ? element?.masterVariant.prices[0].value.fractionDigits
                    : 0
                );
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
                    productPrice={`${
                      (
                        element?.masterVariant.prices
                          ? element?.masterVariant.prices[0].discounted
                          : 0
                      )
                        ? convertPrice(
                            element?.masterVariant.prices
                              ? element?.masterVariant.prices[0].discounted
                                  ?.value.centAmount
                              : 0,
                            element?.masterVariant.prices
                              ? element?.masterVariant.prices[0].discounted
                                  ?.value.fractionDigits
                              : 0
                          )
                        : basePrice
                    }`}
                    productOldPrice={
                      (
                        element?.masterVariant.prices
                          ? element?.masterVariant.prices[0]?.discounted
                          : 0
                      )
                        ? basePrice
                        : ''
                    }
                  />
                );
              })
            ) : (
              <p>no match</p>
            )}
          </section>
        </div>
      </div>
    </section>
  );
};
