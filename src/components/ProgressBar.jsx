import './ProgressBar.css';

const STEPS = [
  { num: 1, label: 'Brand' },
  { num: 2, label: 'Model' },
  { num: 3, label: 'Customize' },
  { num: 4, label: 'Book' },
  { num: 5, label: 'Confirm' },
];

export default function ProgressBar({ currentStep, onStepClick }) {
  return (
    <div className="progress-container glass-panel-nav">
      <div className="progress-steps">
        {STEPS.map((step, index) => {
          const isDone = step.num < currentStep;
          const isActive = step.num === currentStep;

          return (
            <div key={step.num} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div
                className={`step ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                onClick={() => isDone && onStepClick(step.num)}
              >
                <div className="step-num">
                   {isDone ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                   ) : (
                     step.num
                   )}
                </div>
                <div className="step-label">{step.label}</div>
              </div>
              {index < STEPS.length - 1 && (
                <div className={`step-line ${isDone ? 'done' : ''}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
