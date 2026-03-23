import './Step5Confirm.css';

export default function Step5Confirm({ bookingRef, booking, advanceAmount, onReset }) {
  return (
    <div className="section-content fade-in-up">
      <div className="confirmation-center">
        <div className="confirm-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98233 16.07 2.85999M22 4L12 14.01L8.63 10.64" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="confirm-title">
          BOOKING<br /><span>CONFIRMED</span>
        </div>
        <p className="confirm-sub">
          Your seat customization appointment is locked in. Our team will reach out
          within 24 hours to confirm the details and provide installation instructions.
        </p>
        <div className="confirm-ref">{bookingRef}</div>

        <div className="confirm-details">
          <div className="summary-row">
            <span className="summary-key">Name</span>
            <span className="summary-val">{booking.name || '—'}</span>
          </div>
          <div className="summary-row">
            <span className="summary-key">Date</span>
            <span className="summary-val">{booking.date || '—'}</span>
          </div>
          <div className="summary-row">
            <span className="summary-key">Time</span>
            <span className="summary-val">{booking.time || '—'}</span>
          </div>
          <div className="summary-row">
            <span className="summary-key">Advance Paid</span>
            <span className="summary-val highlight-val">
              {advanceAmount}
            </span>
          </div>
        </div>

        <button className="btn-next" style={{ margin: '0 auto' }} onClick={onReset}>
          Start New Booking
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
