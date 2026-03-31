import { useState } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProgressBar from './components/ProgressBar';
import Step1Brand from './components/Step1Brand';
import Step2Model from './components/Step2Model';
import Step3Customize from './components/Step3Customize';
import Step4Booking from './components/Step4Booking';
import Step4Overview from './components/Step4Overview';
import Step5Confirm from './components/Step5Confirm';
import PaymentModal from './components/PaymentModal';
import LoadingScreen from './components/LoadingScreen';


import { BASE_PRICE } from './data';

const INITIAL_BOOKING = { name: '', phone: '', email: '', date: '', time: '', notes: '' };

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showHero, setShowHero] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);
  const [color, setColor] = useState(null);
  const [pattern, setPattern] = useState(null);
  const [material, setMaterial] = useState(null);
  const [booking, setBooking] = useState(INITIAL_BOOKING);

  const [bookingRef, setBookingRef] = useState('');
  const [advanceAmount, setAdvanceAmount] = useState('');

  const startApp = () => {
    setShowHero(false);
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToStep = (n) => {
    setCurrentStep(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetApp = () => {
    setShowHero(true);
    setCurrentStep(1);
    setBrand(null);
    setModel(null);
    setColor(null);
    setPattern(null);
    setMaterial(null);
    setBooking(INITIAL_BOOKING);
    setBookingRef('');
    setAdvanceAmount('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const confirmPayment = () => {
    const ref = 'REF #SF-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const total = BASE_PRICE + (color?.price ?? 0) + (pattern?.price ?? 0) + (material?.price ?? 0);
    const advance = Math.ceil(total * 0.3);
    setBookingRef(ref);
    setAdvanceAmount('₹' + advance.toLocaleString());
    closeModal();
    goToStep(6);
  };

  // Navbar height (~80px) + ProgressBar height (~72px) + extra breathing room = 180px top
  const sectionStyle = {
    width: '100%',
    paddingTop: '40px',      // breathing room below the sticky progress bar
    paddingBottom: '96px',
    paddingLeft: '60px',
    paddingRight: '60px',
    animation: 'fadeUp 0.5s ease both',
  };

  return (
    <>

      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <div className="global-bg" style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 1s ease' }}>
        <div className="bg-blob blob-1"></div>
        <div className="bg-blob blob-2"></div>
        <div className="bg-blob blob-3"></div>
        <div className="particles"></div>
      </div>
      
      {!isLoading && (
        <>
          <Navbar />
          {showHero && <Hero onStart={startApp} />}

      {!showHero && (
        <>
          {/* ProgressBar is sticky at top: 80px (below fixed navbar) */}
          <ProgressBar currentStep={currentStep} onStepClick={goToStep} />

          {/*
            Push content below:
            - fixed Navbar: ~80px
            - sticky ProgressBar: ~72px
            Total offset = ~152px via paddingTop on a wrapper
          */}
          <div style={{ paddingTop: '152px' }}>
            <div style={sectionStyle}>
              {currentStep === 1 && (
                <Step1Brand
                  selectedBrand={brand}
                  onSelectBrand={(id) => { setBrand(id); setModel(null); }}
                  onNext={() => goToStep(2)}
                />
              )}

              {currentStep === 2 && (
                <Step2Model
                  selectedBrand={brand}
                  selectedModel={model}
                  onSelectModel={setModel}
                  onNext={() => goToStep(3)}
                  onBack={() => goToStep(1)}
                />
              )}

              {currentStep === 3 && (
                <Step3Customize
                  selectedColor={color}
                  selectedPattern={pattern}
                  selectedMaterial={material}
                  onSelectColor={setColor}
                  onSelectPattern={setPattern}
                  onSelectMaterial={setMaterial}
                  onNext={() => goToStep(4)}
                  onBack={() => goToStep(2)}
                />
              )}

              {currentStep === 4 && (
                <Step4Overview
                  selectedMaterial={material}
                  onNext={() => goToStep(5)}
                  onBack={() => goToStep(3)}
                />
              )}

              {currentStep === 5 && (
                <Step4Booking
                  brand={brand}
                  model={model}
                  color={color}
                  pattern={pattern}
                  material={material}
                  booking={booking}
                  onBookingChange={setBooking}
                  onNext={openModal}
                  onBack={() => goToStep(4)}
                />
              )}

              {currentStep === 6 && (
                <Step5Confirm
                  bookingRef={bookingRef}
                  booking={booking}
                  advanceAmount={advanceAmount}
                  onReset={resetApp}
                />
              )}
            </div>
          </div>

          <PaymentModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={confirmPayment}
            color={color}
            pattern={pattern}
            material={material}
          />
        </>
      )}
      </>
      )}
    </>
  );
}