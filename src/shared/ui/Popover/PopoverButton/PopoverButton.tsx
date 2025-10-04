import type { PopoverButtonProps } from '@headlessui/react';
import { PopoverButton as PopoverButtonHeadless } from '@headlessui/react';
import classNames from 'classnames';
import style from './PopoverButton.module.css';

export const PopoverButton = (props: PopoverButtonProps) => {
  const { className, children, ...rest } = props;

  return (
    <PopoverButtonHeadless className={classNames(style.popoverButton, className)} {...rest}>
      {children}
    </PopoverButtonHeadless>
  );
};
