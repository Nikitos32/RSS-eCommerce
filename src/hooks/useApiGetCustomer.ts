import { useEffect, useState } from 'react';
import { CustomerService } from '../services';
import { Customer } from '@commercetools/platform-sdk';
import { useLocalStorage } from './useLocalStorage';
import { useAuth } from '.';

export function useApiGetCustomer() {
  const { customerId } = useAuth();
  const [, setVersion] = useLocalStorage('apiCustomerVersion', 0);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [ok, setOk] = useState(false);
  const [customer, setCustomer] = useState<Customer>();

  useEffect(() => {
    const customerService = new CustomerService();

    const getCustomer = async () => {
      setLoading(true);
      const response = await customerService.getCustomerById(customerId);
      setOk(response.ok);
      setErrorMsg(response.message as string);
      if (response.ok) {
        const customer = response.data as Customer;
        setCustomer(customer);
        setVersion(customer.version);
      }
      setLoading(false);
    };
    getCustomer();
  }, [customerId, setVersion]);
  return {
    loading,
    ok,
    errorMsg,
    customer,
  };
}
