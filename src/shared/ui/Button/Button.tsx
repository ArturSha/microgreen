import { Button as Btn, type ButtonProps } from '@headlessui/react';
import classNames from 'classnames';
import style from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'danger';

interface ButtonI extends ButtonProps {
  className?: string;
  variant?: Variant;
}

const variantClasses: Record<string, string> = {
  primary: style.primary,
  secondary: style.secondary,
  danger: style.danger,
};

export const Button = (props: ButtonI) => {
  const { className, variant = 'primary', ...rest } = props;

  return <Btn className={classNames(style.button, variantClasses[variant], className)} {...rest} />;
};
