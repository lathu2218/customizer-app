import { useState } from 'react';
import { BASE_PRICE } from '../data';
import './PaymentModal.css';

function formatCardNumber(value) {
  return value
    .replace(/\D/g, '')
    .substring(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

export default function PaymentModal({ isOpen, onClose, onConfirm, color, pattern, material }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const colorPrice = color?.price ?? 0;
  const patternPrice = pattern?.price ?? 0;
  const materialPrice = material?.price ?? 0;
  const total = BASE_PRICE + colorPrice + patternPrice + materialPrice;
  const advance = Math.ceil(total * 0.3);

  const handleCardChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };
  
  const isValid = cardNumber.length >= 19 && expiry.length >= 5 && cvv.length >= 3;

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal fade-in-up">
        <button className="modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="section-title" style={{ fontSize: 40, marginBottom: 8 }}>Payment <span>Details</span></div>
        <p className="section-sub" style={{ margin: 0, marginBottom: 32 }}>Secure advance payment · 30% of total</p>

        {/* Card Display */}
        <div className="card-display">
          <div className="card-chip">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 8H20M4 16H20M8 4V20M16 4V20" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="2" y="4" width="20" height="16" rx="2" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="card-number">
            {cardNumber || '•••• •••• •••• ••••'}
          </div>
          <div className="card-details">
            <span>CARDHOLDER NAME</span>
            <span>{expiry || 'MM/YY'}</span>
          </div>
        </div>

        {/* Card Inputs */}
        <div className="form-group">
          <label className="form-label">Card Number</label>
          <input
            className="form-input"
            type="text"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            value={cardNumber}
            onChange={handleCardChange}
          />
        </div>

        <div className="card-row">
          <div className="form-group">
            <label className="form-label">Expiry</label>
            <input
              className="form-input"
              type="text"
              placeholder="MM / YY"
              maxLength={7}
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">CVV</label>
            <input
              className="form-input"
              type="password"
              placeholder="•••"
              maxLength={3}
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        </div>

        {/* Amount */}
        <div className="pay-amount">
          <div className="pay-label">Advance Amount Due</div>
          <div className="pay-val">₹{advance.toLocaleString()}</div>
        </div>

        <button className="btn-next" style={{ width: '100%', justifyContent: 'center' }} onClick={onConfirm} disabled={!isValid}>
          PAY NOW & CONFIRM
        </button>
      </div>
    </div>
  );
}
