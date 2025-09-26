import { Button as Btn } from '@headlessui/react';
import classNames from 'classnames';
import type { ComponentProps } from 'react';
import style from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'danger';

interface ButtonI extends ComponentProps<'button'> {
  className?: string;
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  primary: style.primary,
  secondary: style.secondary,
  danger: style.danger,
};

export const Button = (props: ButtonI) => {
  const { className, variant = 'primary', ...rest } = props;

  return <Btn className={classNames(style.button, variantClasses[variant], className)} {...rest} />;
};
