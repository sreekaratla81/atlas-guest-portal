import { useLocation, useNavigate } from 'react-router-dom';
import { differenceInCalendarDays, format } from 'date-fns';
import { getListingById } from '../data/listings';
import { useTranslation } from 'react-i18next';
import { dateLocales } from '../i18n';

export default function BookingSummary() {
  const { state } = useLocation();
  const nav = useNavigate();
  const { t, i18n } = useTranslation();
  const locale = dateLocales[i18n.language];

  if (!state?.listingId || !state?.checkIn || !state?.checkOut) {
    nav('/');
    return null;
  }

  const listing = getListingById(state.listingId);
  const checkIn = new Date(state.checkIn);
  const checkOut = new Date(state.checkOut);
  const nights = Math.max(1, differenceInCalendarDays(checkOut, checkIn));
  const total = nights * listing.pricePerNight;

  const onProceed = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      listingId: listing.id,
      checkIn: state.checkIn,
      checkOut: state.checkOut,
      guests: state.guests,
      name: fd.get('name'),
      phone: fd.get('phone'),
      email: fd.get('email'),
      amount: total
    };
    console.log('Proceed to Pay (Razorpay in Phase 2)', payload);
  };

  return (
    <div className="summary">
      <h2>{t('bookingSummary.title')}</h2>
      <div className="row">
        <img src={listing.imageUrl} alt={listing.title} />
        <div>
          <h3>{listing.title}</h3>
          <div>{listing.location}</div>
          <div>{t('bookingSummary.dates')}: {format(checkIn,'P',{ locale })} → {format(checkOut,'P',{ locale })} ({nights} night{nights>1?'s':''})</div>
          <div>{t('bookingSummary.guests')}: {state.guests}</div>
          <div>{t('bookingSummary.price')}: ₹{listing.pricePerNight} × {nights} = <strong>₹{total}</strong></div>
        </div>
      </div>

      <form onSubmit={onProceed} className="guest-form">
        <label>{t('bookingSummary.name')}<input name="name" required /></label>
        <label>{t('bookingSummary.phone')}<input name="phone" required /></label>
        <label>{t('bookingSummary.email')}<input name="email" type="email" required /></label>
        <button className="primary" type="submit">{t('bookingSummary.proceed')}</button>
      </form>
    </div>
  );
}
