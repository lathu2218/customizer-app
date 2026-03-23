import { useState, useEffect } from 'react';
import { brands, BASE_PRICE, TIME_SLOTS } from '../data';
import './Step4Booking.css';

function OrderSummary({ brand, model, color, pattern, material }) {
  const colorPrice = color?.price ?? 0;
  const patternPrice = pattern?.price ?? 0;
  const materialPrice = material?.price ?? 0;
  const total = BASE_PRICE + colorPrice + patternPrice + materialPrice;
  const advance = Math.ceil(total * 0.3);
  const brandObj = brands.find((b) => b.id === brand);

  return (
    <div className="summary-box">
      <div className="summary-title">Order Summary</div>
      
      <div className="summary-list">
        <div className="summary-row">
          <span className="summary-key">Vehicle</span>
          <span className="summary-val">
            {brandObj && model ? `${brandObj.name} ${model.name}` : '—'}
          </span>
        </div>
        <div className="summary-row">
          <span className="summary-key">Color</span>
          <span className="summary-val">{color?.name ?? '—'}</span>
        </div>
        <div className="summary-row">
          <span className="summary-key">Pattern</span>
          <span className="summary-val">{pattern?.name ?? '—'}</span>
        </div>
        <div className="summary-row">
          <span className="summary-key">Material</span>
          <span className="summary-val">{material?.name ?? '—'}</span>
        </div>
        <div className="summary-row">
          <span className="summary-key">Seats Covered</span>
          <span className="summary-val">{model?.seats ?? 'Full Set (5)'}</span>
        </div>
      </div>

      <div className="summary-divider" />

      <div className="summary-row total-row">
        <span className="summary-key">Total Cost</span>
        <span className="summary-total highlight">₹{total.toLocaleString()}</span>
      </div>
      
      <div className="advance-box">
        <div className="advance-label">
          <strong>Advance Payment</strong>
          <br/>
          <span>30% required to confirm booking</span>
        </div>
        <div className="advance-amount">₹{advance.toLocaleString()}</div>
      </div>
      <div className="summary-bg-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

export default function Step4Booking({
  brand, model, color, pattern, material,
  booking, onBookingChange,
  onNext, onBack,
}) {
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    setMinDate(d.toISOString().split('T')[0]);
  }, []);

  const handleChange = (field) => (e) => {
    onBookingChange({ ...booking, [field]: e.target.value });
  };

  const isValid =
    booking.name.trim() &&
    booking.phone.trim() &&
    booking.email.trim() &&
    booking.date &&
    booking.time;

  return (
    <div className="section-content fade-in-up">
      <div className="section-title">Book Your <span>Session</span></div>
      <p className="section-sub">Schedule your installation and pay a 30% advance to confirm your custom interior order.</p>

      <div className="appointment-layout">
        {/* Form Elements */}
        <div className="booking-form-wrap">
          <div className="form-grid">
            <div className="form-group col-span-2">
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                type="text"
                placeholder="Your full name"
                value={booking.name}
                onChange={handleChange('name')}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                className="form-input"
                type="tel"
                placeholder="+91 99999 00000"
                value={booking.phone}
                onChange={handleChange('phone')}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                className="form-input"
                type="email"
                placeholder="you@example.com"
                value={booking.email}
                onChange={handleChange('email')}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Preferred Date</label>
              <input
                className="form-input"
                type="date"
                min={minDate}
                value={booking.date}
                onChange={handleChange('date')}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Time Slot</label>
              <select
                className="form-select"
                value={booking.time}
                onChange={handleChange('time')}
              >
                <option value="">Select a time slot</option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Special Instructions</label>
            <textarea
              className="form-input"
              rows="3"
              placeholder="Any special requests or notes regarding your car..."
              value={booking.notes}
              onChange={handleChange('notes')}
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary-wrap">
          <OrderSummary
            brand={brand}
            model={model}
            color={color}
            pattern={pattern}
            material={material}
          />
        </div>
      </div>

      <div className="nav-buttons">
        <button className="btn-back" onClick={onBack}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <button className="btn-next" onClick={onNext} disabled={!isValid}>
          Pay Advance & Confirm
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
