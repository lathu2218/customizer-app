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
    <div className="progress-container">
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
                <div className="step-num">{step.num}</div>
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
