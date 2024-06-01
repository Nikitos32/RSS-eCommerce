import { GraphQLResponse } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { ProductService } from '../services';

export function useApiGetProduct(id: string) {
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [ok, setOk] = useState(false);
  const [product, setProduct] = useState<GraphQLResponse>();

  useEffect(() => {
    const customerService = new ProductService();

    const getProduct = async () => {
      setLoading(true);
      const response = await customerService.getProductById(id);
      setOk(response.ok);
      setErrorMsg(response.message as string);
      if (response.ok) {
        setProduct(response.data as GraphQLResponse);
      }
      setLoading(false);
    };
    getProduct();
  }, [id]);
  return {
    loading,
    ok,
    errorMsg,
    product,
  };
}
