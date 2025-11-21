import classNames from 'classnames';
import { type ElementType, type ComponentProps, type ReactNode } from 'react';
import style from './Text.module.css';

type Variant = 'error' | 'default';
type Color = 'black' | 'green' | 'beige' | 'blue' | 'red';
type FontSize = 'xxs' | 's' | 'm' | 'l';

type TextProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  variant?: Variant;
  bold?: boolean;
  color?: Color;
  fontSize?: FontSize;
} & Omit<ComponentProps<T>, 'as' | 'children' | 'className'>;

const styles: Record<Variant, string> = {
  default: style.default,
  error: style.error,
};

const sizes: Record<FontSize, string> = {
  xxs: style.xxs,
  s: style.s,
  m: style.m,
  l: style.l,
};

const colors: Record<Color, string> = {
  black: style.black,
  green: style.green,
  beige: style.beige,
  blue: style.blue,
  red: style.red,
};

export const Text = <T extends ElementType = 'p'>({
  as,
  children,
  className,
  bold,
  variant = 'default',
  color = 'black',
  fontSize = 's',
  ...rest
}: TextProps<T>) => {
  const Component = as || 'p';

  return (
    <Component
      className={classNames(
        style.text,
        styles[variant],
        colors[color],
        sizes[fontSize],
        { [style.bold]: bold },
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};
