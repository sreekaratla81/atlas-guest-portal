import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import { CurrencyProvider } from "./hooks/useCurrency";
import ErrorBoundary from "./components/ErrorBoundary";

const rootEl = document.getElementById("root");
if (!rootEl) {
  document.body.innerHTML = "<pre>Root element #root not found</pre>";
  throw new Error("Root element #root not found");
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <ErrorBoundary>
      <React.Suspense fallback={<div style={{ padding: 16 }}>Loading…</div>}>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </React.Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);
