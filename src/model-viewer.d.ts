import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src?: string;
        'ios-src'?: string;
        alt?: string;
        'auto-rotate'?: boolean | string;
        'camera-controls'?: boolean | string;
        'shadow-intensity'?: string;
        'shadow-softness'?: string;
        exposure?: string;
        'camera-orbit'?: string;
        ar?: boolean | string;
        'ar-modes'?: string;
        poster?: string;
        style?: React.CSSProperties;
      }, HTMLElement>;
    }
  }
}