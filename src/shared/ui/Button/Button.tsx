import { Button as Btn } from '@headlessui/react';
import classNames from 'classnames';
import type { ComponentProps, ReactNode } from 'react';
import EyeClosed from '../../assets/icons/EyeClosed.svg?react';
import Eye from '../../assets/icons/EyeOpened.svg?react';
import Minus from '../../assets/icons/minus.svg?react';
import Plus from '../../assets/icons/plus.svg?react';
import style from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'clear';
type IconType = 'eyeClosed' | 'eye' | 'minus' | 'plus';

interface ButtonI extends ComponentProps<'button'> {
  className?: string;
  variant?: Variant;
  icon?: IconType;
  isLoading?: boolean;
  iconPosition?: 'left' | 'right';
}

const icons: Record<IconType, ReactNode> = {
  eye: <Eye />,
  eyeClosed: <EyeClosed />,
  minus: <Minus />,
  plus: <Plus />,
};
const variantClasses: Record<Variant, string> = {
  primary: style.primary,
  secondary: style.secondary,
  tertiary: style.tertiary,
  danger: style.danger,
  clear: style.clear,
};

export const Button = (props: ButtonI) => {
  const {
    className,
    variant = 'primary',
    iconPosition = 'left',
    icon,
    disabled,
    isLoading,
    children,
    ...rest
  } = props;

  return (
    <Btn
      className={classNames(style.button, variantClasses[variant], className)}
      disabled={disabled}
      {...rest}
    >
      {icon && iconPosition === 'left' && icons[icon]}
      {children}
      {icon && iconPosition === 'right' && icons[icon]}
      {isLoading && (
        <div className={style.loaderContainer}>
          <span className={style.loading} />
        </div>
      )}
    </Btn>
  );
};
