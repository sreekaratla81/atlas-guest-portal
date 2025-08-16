import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import './style.css';
import { CurrencyProvider } from './hooks/useCurrency';
import { ENV } from './config/env';

// eslint-disable-next-line no-console
console.info('[ENV] VITE_API_BASE_URL =', ENV.API_BASE_URL);

ReactDOM.createRoot(document.getElementById('root')).render(
  <CurrencyProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </CurrencyProvider>
);
