import { render, screen } from '@testing-library/react';
import ListingsPage from '../Listings';
import * as api from '../../api/listings';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CurrencyProvider } from '../../hooks/useCurrency';

afterEach(() => {
  vi.restoreAllMocks();
});

function renderPage() {
  return render(
    <CurrencyProvider>
      <MemoryRouter>
        <ListingsPage />
      </MemoryRouter>
    </CurrencyProvider>
  );
}

test('shows data', async () => {
  vi.spyOn(api, 'fetchListings').mockResolvedValue([{ id: 1, name: 'Penthouse' }]);
  renderPage();
  expect(await screen.findByText(/Penthouse/i)).toBeInTheDocument();
});

test('shows empty state', async () => {
  vi.spyOn(api, 'fetchListings').mockResolvedValue([]);
  renderPage();
  expect(await screen.findByText(/No listings yet/i)).toBeInTheDocument();
});

test('shows error banner', async () => {
  vi.spyOn(api, 'fetchListings').mockRejectedValue(new Error('boom'));
  renderPage();
  expect(await screen.findByText(/couldn’t load listings/i)).toBeInTheDocument();
});
