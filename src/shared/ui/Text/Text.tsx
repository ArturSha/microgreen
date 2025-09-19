import classNames from 'classnames';
import { type ElementType, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import style from './Text.module.css';

type TextProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<T>;

export const Text = <T extends ElementType = 'p'>({
  as,
  children,
  className,
  ...rest
}: TextProps<T>) => {
  const Component = as || 'p';

  return (
    <Component className={classNames(style.text, className)} {...rest}>
      {children}
    </Component>
  );
};
