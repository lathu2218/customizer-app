import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current && dotRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive') ||
        target.tagName.toLowerCase() === 'model-viewer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className={`global-custom-cursor ${isHovering ? 'hovering' : ''}`} />
      <div ref={dotRef} className={`global-custom-cursor-arrow ${isHovering ? 'hovering' : ''}`}>
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="var(--accent)" 
          stroke="rgba(0,0,0,0.5)" 
          strokeWidth="1"
        >
          {/* Classic mouse pointer shape */}
          <path 
            d="M4 2 L4 22 L10 16 L15 26 L19 24 L14 14 L21 14 Z" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>
    </>
  );
}
