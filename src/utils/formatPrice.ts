const { VITE_CTP_LOCALE = 'en-GB', VITE_CTP_CURRENCY = 'EUR' } = import.meta
  .env;
export const formatPrice = (value: number): string => {
  const formatter = new Intl.NumberFormat(VITE_CTP_LOCALE, {
    style: 'currency',
    currency: VITE_CTP_CURRENCY,
  });

  return formatter.format(value);
};
