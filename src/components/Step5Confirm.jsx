import './Step5Confirm.css';

export default function Step5Confirm({ bookingRef, booking, advanceAmount, onReset }) {
  return (
    <div className="section-content">
      <div className="confirmation-center">
        <div className="confirm-icon">🏁</div>
        <div className="confirm-title">
          BOOKING<br /><span>CONFIRMED</span>
        </div>
        <p className="confirm-sub">
          Your seat customization appointment is locked in. Our team will reach out
          within 24 hours to confirm the details and provide any prep instructions.
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
            <span className="summary-val" style={{ color: 'var(--papaya)' }}>
              {advanceAmount}
            </span>
          </div>
        </div>

        <button className="cta-btn" onClick={onReset}>
          Start New Booking
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
