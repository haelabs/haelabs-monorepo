'use client';

import type { ReactNode } from 'react';
import { motion } from 'motion/react';

type StaggerGridProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function StaggerGrid({ children, className, delay = 0 }: StaggerGridProps) {
  return (
    <div className={className}>
      {Array.isArray(children) ? (
        children.map((child, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: delay + i * 0.06,
            }}
          >
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94], delay }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
