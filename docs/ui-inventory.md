# UI Component Inventory

## Buttons
- `btn-dark` used in `components/shared/ContactStrip.jsx`, `components/listings/ListingCard.jsx`.
- `btn-primary` used in `components/shared/EnquiryModal.jsx`, `components/search/StickyDateBar.jsx`.
- `btn-ghost` used in `components/shared/EnquiryModal.jsx`.
- `primary` button style used directly in `pages/BookingSummary.jsx`.

The differing class names and styles indicate inconsistent button implementations across the app.

## Cards
- `.card` layout used on home and listings pages with variants like `card--featured` and `card--half`.
- `ListingCard` component defines its own internal card structure (`lc-card`).

Card markup varies between pages, leading to duplicate styling.

## Forms
- `EnquiryModal` contains a custom form for enquiries.
- `BookingSummary` page includes a guest details form.

Form elements are implemented individually without shared components.
