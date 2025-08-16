import { createContext, useCallback, useContext, useState } from 'react';
import { CURRENCY } from '../config/siteConfig';

const CurrencyContext = createContext({
  currency: CURRENCY.default,
  setCurrency: () => {},
  formatCurrency: (value) => value,
  supportedCurrencies: CURRENCY.supported
});

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(CURRENCY.default);

  const formatCurrency = useCallback(
    (value, options = {}) =>
      new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency,
        ...options
      }).format(value),
    [currency]
  );

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatCurrency, supportedCurrencies: CURRENCY.supported }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);

