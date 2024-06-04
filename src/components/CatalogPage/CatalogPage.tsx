import { FormEvent, useContext, useEffect, useState } from 'react';
import { FilterSection } from '../FilterSection/FilterSection';
import { ProductPreviewItem } from '../ProductPreviewItem/ProductPreviewItem';
import { SortSection } from '../SortSection/SortSection';
import { IsLoadindContext } from '../../App';
import { ProductService } from '../../services';
import { CTResponse } from '../../ct-client';
import { Category, Product } from '@commercetools/platform-sdk';
import { convertPrice } from '../../utils/convertPrice';

interface ProductsData {
  products: Products;
}

interface Products {
  count: number;
  results: Product[];
  total: number;
}

export const CatalogPage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [handleLoading] = useContext(IsLoadindContext);
  const [currentSort, setCurrentSort] = useState<string>();
  const [currentSearch, setcurrentSearch] = useState<string>();
  const [allProducts, setAllProducts] = useState<Products>();
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
      const data: Promise<CTResponse> = productService.searchProduct(
        'en-US',
        currentSearch
      );
      data.then((response) => {
        handleLoading(false);
        setAllProducts(
          ((response.data as CTResponse).data as ProductsData).products
        );
      });
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
  }, [currentSort, currentSearch, currentRangeValue]);

  return (
    <section className="flex relative">
      <div>
        <FilterSection
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
            {allProducts?.total !== 0 ? (
              allProducts?.results.map((element) => {
                const productData = element?.masterData.current;
                const price = productData?.masterVariant?.prices?.find(
                  (priceEl) => priceEl.value.currencyCode === 'EUR'
                );
                const basePrice = convertPrice(
                  price?.value.centAmount,
                  price?.value.fractionDigits
                );
                return (
                  <ProductPreviewItem
                    key={element.key}
                    id={element.key ? element.key : ''}
                    imgUrl={
                      productData.masterVariant.images
                        ? `${productData.masterVariant.images[0].url}`
                        : ''
                    }
                    productCategory={`${(productData.categories[0] as unknown as Category).name}`}
                    productDescription={`${productData.description}`}
                    productName={`${productData.name}`}
                    productPrice={`${price?.discounted ? convertPrice(price.discounted.value.centAmount, price.discounted.value.fractionDigits) : basePrice}`}
                    productOldPrice={price?.discounted ? basePrice : ''}
                  />
                );
              })
            ) : (
              <p>No Match</p>
            )}
          </section>
        </div>
      </div>
    </section>
  );
};
