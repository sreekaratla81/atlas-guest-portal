import { render, screen } from "@testing-library/react";
import App from "../App";
import React from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import { CurrencyProvider } from "../hooks/useCurrency";

test("renders stub", () => {
  render(
    <ErrorBoundary>
      <React.Suspense fallback={null}>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </React.Suspense>
    </ErrorBoundary>
  );
  expect(screen.getByText(/App loaded/i)).toBeInTheDocument();
});
