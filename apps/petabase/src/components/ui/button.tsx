import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { classNames } from '@petabase/lib/utils/classnames';

type ButtonVariant = 'primary' | 'ghost';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

export function Button({ children, className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={classNames(
        'pb-btn',
        variant === 'ghost' && 'pb-btn-ghost',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
