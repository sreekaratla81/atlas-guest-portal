import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import './style.css';
import { CurrencyProvider } from './hooks/useCurrency';

ReactDOM.createRoot(document.getElementById('root')).render(
  <CurrencyProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </CurrencyProvider>
);
