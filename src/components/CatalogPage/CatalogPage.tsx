import { FormEvent, useContext, useEffect, useState } from 'react';
import { FilterSection } from '../FilterSection/FilterSection';
import { SortSection } from '../SortSection/SortSection';
import { IsLoadindContext } from '../../App';
import { ProductService } from '../../services';
import { ProductPrice } from '../../type/types/productPageType';
import { CTResponse } from '../../ct-client';
import {
  Category,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { ProductPreviewItem } from '../ProductPreviewItem/ProductPreviewItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IoIosArrowUp } from 'react-icons/io';
import { animateScroll as scroll } from 'react-scroll';

interface ProductProjectionResponse {
  productProjectionSearch: ProductProjectionPagedQueryResponse;
}

export const CatalogPage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [handleLoading] = useContext(IsLoadindContext);
  const [currentSort, setCurrentSort] = useState<string>();
  const [currentSearch, setcurrentSearch] = useState<string>();
  const [currentCategories, setCurrentCategories] = useState<string[]>([]);
  const [currentLimit, setCurrentLimit] = useState<number>(13);
  const [currentScroll, setCurrentScroll] = useState<number>(0);

  const [products, setProducts] = useState<ProductProjectionResponse>({
    productProjectionSearch: {
      limit: 0,
      total: 0,
      count: 0,
      offset: 0,
      results: [],
    },
  });

  window.onscroll = () => {
    setCurrentScroll(window.scrollY);
  };

  const [currentRangeValue, setCurrentRangeValue] = useState<number[]>([
    0, 3100,
  ]);

  const handleCurrentLimit = () => {
    setCurrentLimit((prevState) => prevState + 13);
  };

  const handleRangeSlider = (event: number | number[]) => {
    if (typeof event !== 'number') {
      setCurrentRangeValue(event);
      setCurrentLimit(13);
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
    setCurrentLimit(13);
  };

  const handleCurrentSort = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setCurrentSort(target.value);
    setCurrentLimit(13);
  };

  const handleCurrentSearch = (event: FormEvent) => {
    const target = event.target as HTMLInputElement;
    setcurrentSearch(target.value);
    setCurrentLimit(13);
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
        currentCategories,
        currentLimit
      );
      data.then((response) => {
        handleLoading(false);
        setProducts(
          (response.data as CTResponse).data as ProductProjectionResponse
        );
      });
    } else {
      const data: Promise<CTResponse> =
        productService.getProductsAll(currentLimit);
      data.then((response) => {
        handleLoading(false);
        setProducts(
          (response.data as CTResponse).data as ProductProjectionResponse
        );
      });
    }
  }, [
    currentSort,
    currentSearch,
    currentRangeValue,
    currentCategories,
    currentLimit,
  ]);

  return (
    <section className="flex relative">
      <div id="pageHead">
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
          <section>
            <InfiniteScroll
              className="flex flex-col gap-5 flex-wrap"
              dataLength={currentLimit}
              next={() => handleCurrentLimit()}
              hasMore={
                products.productProjectionSearch.count !==
                products.productProjectionSearch.total
              }
              scrollThreshold={1}
              loader={<p>Loading...</p>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>No more products!</b>
                </p>
              }
            >
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
                    price={
                      element?.masterVariant.prices
                        ? (element?.masterVariant
                            .prices[0] as unknown as ProductPrice)
                        : undefined
                    }
                  />
                );
              })}
            </InfiniteScroll>
            {currentScroll > 1000 ? (
              <button
                onClick={() =>
                  scroll.scrollToTop({
                    duration: 1500,
                    delay: 100,
                    smooth: 'easeInOutQuint',
                  })
                }
                className="fixed right-5 bottom-12 z-50 border-2 p-3 rounded-full bg-orange-400 text-white"
              >
                <IoIosArrowUp />
              </button>
            ) : (
              <></>
            )}
          </section>
        </div>
      </div>
    </section>
  );
};
