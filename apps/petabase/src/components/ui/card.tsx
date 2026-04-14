import type { ReactNode } from 'react';

import { classNames } from '@petabase/lib/utils/classnames';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return <section className={classNames('pb-card', className)}>{children}</section>;
}
