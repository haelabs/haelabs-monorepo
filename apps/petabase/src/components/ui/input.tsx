import type { InputHTMLAttributes } from 'react';

import { classNames } from '@petabase/lib/utils/classnames';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={classNames('pb-input', className)} {...props} />;
}
