import { Button as Btn, type ButtonProps } from '@headlessui/react';
import classNames from 'classnames';
import style from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'danger';

interface ButtonI extends ButtonProps {
  className?: string;
  variant?: Variant;
}

export const Button = (props: ButtonI) => {
  const { className, variant = 'primary', ...rest } = props;

  return (
    <Btn
      className={classNames(
        style.button,
        {
          [style.primary]: variant === 'primary',
          [style.secondary]: variant === 'secondary',
          [style.danger]: variant === 'danger',
        },
        className,
      )}
      {...rest}
    />
  );
};
