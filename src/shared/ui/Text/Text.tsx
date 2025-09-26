import classNames from 'classnames';
import { type ElementType, type ComponentProps, type ReactNode } from 'react';
import style from './Text.module.css';

type Variant = 'error' | 'default';

type TextProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  variant?: Variant;
} & Omit<ComponentProps<T>, 'as' | 'children' | 'className'>;

const styles: Record<Variant, string> = {
  default: style.default,
  error: style.error,
};

export const Text = <T extends ElementType = 'p'>({
  as,
  children,
  className,
  variant = 'default',
  ...rest
}: TextProps<T>) => {
  const Component = as || 'p';

  return (
    <Component className={classNames(style.text, styles[variant], className)} {...rest}>
      {children}
    </Component>
  );
};
