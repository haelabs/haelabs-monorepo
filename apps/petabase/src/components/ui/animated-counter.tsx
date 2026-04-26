'use client';

import { useEffect, useRef, useState } from 'react';
import { animate } from 'motion';

type AnimatedCounterProps = {
  value: number;
  locale?: string;
  format?: 'number' | 'currency';
  className?: string;
};

export function AnimatedCounter({ value, locale = 'en', format = 'number', className }: AnimatedCounterProps) {
  const [display, setDisplay] = useState(() => formatValue(0, locale, format));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate(latest) {
        setDisplay(formatValue(Math.round(latest), locale, format));
      },
    });
    return () => controls.stop();
  }, [value, locale, format]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

function formatValue(n: number, locale: string, format: 'number' | 'currency') {
  const loc = locale === 'th' ? 'th-TH' : 'en-US';
  if (format === 'currency') {
    return new Intl.NumberFormat(loc).format(n);
  }
  return new Intl.NumberFormat(loc).format(n);
}
