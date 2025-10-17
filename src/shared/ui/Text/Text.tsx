import classNames from 'classnames';
import { type ElementType, type ComponentProps, type ReactNode } from 'react';
import style from './Text.module.css';

type Variant = 'error' | 'default';
type Color = 'black' | 'green';

type TextProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  variant?: Variant;
  bold?: boolean;
  color?: Color;
} & Omit<ComponentProps<T>, 'as' | 'children' | 'className'>;

const styles: Record<Variant, string> = {
  default: style.default,
  error: style.error,
};

const colors: Record<Color, string> = {
  black: style.black,
  green: style.green,
};

export const Text = <T extends ElementType = 'p'>({
  as,
  children,
  className,
  bold,
  variant = 'default',
  color = 'black',
  ...rest
}: TextProps<T>) => {
  const Component = as || 'p';

  return (
    <Component
      className={classNames(
        style.text,
        styles[variant],
        colors[color],
        { [style.bold]: bold },
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};
