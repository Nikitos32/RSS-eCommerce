import { useEffect, useState } from 'react';
import { CustomerService } from '../services';
import { Customer } from '@commercetools/platform-sdk';
import { useLocalStorage } from './useLocalStorage';

export function useApiGetCustomer() {
  const [id] = useLocalStorage('apiCustomerId', '');
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [ok, setOk] = useState(false);
  const [customer, setCustomer] = useState<Customer>();

  useEffect(() => {
    const customerService = new CustomerService();

    const getCustomer = async () => {
      setLoading(true);
      const response = await customerService.getCustomerById(id);
      setOk(response.ok);
      setErrorMsg(response.message as string);
      if (response.ok) {
        setCustomer(response.data as Customer);
      }
      setLoading(false);
    };
    getCustomer();
  }, [id]);
  return {
    loading,
    ok,
    errorMsg,
    customer,
  };
}
