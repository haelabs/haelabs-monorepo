import type { Transition, Variants } from 'motion/react';

const defaultTransition: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 24,
  mass: 0.9,
};

export const pbMotionTransitions = {
  default: defaultTransition,
  fast: {
    ...defaultTransition,
    stiffness: 320,
    damping: 28,
  } satisfies Transition,
};

export const pbMotionVariants: Record<'page' | 'card' | 'tap', Variants> = {
  page: {
    initial: { opacity: 0, y: 8, scale: 0.995 },
    animate: { opacity: 1, y: 0, scale: 1, transition: pbMotionTransitions.default },
    exit: { opacity: 0, y: -4, scale: 0.995, transition: pbMotionTransitions.fast },
  },
  card: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: pbMotionTransitions.default },
  },
  tap: {
    initial: { scale: 1, opacity: 1 },
    animate: { scale: 0.985, opacity: 0.95, transition: { duration: 0.12 } },
  },
};
