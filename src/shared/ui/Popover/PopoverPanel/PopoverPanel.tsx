import type { PopoverPanelProps } from '@headlessui/react';
import { PopoverPanel as PopoverPanelHeadless } from '@headlessui/react';
import classNames from 'classnames';
import style from './PopoverPanel.module.css';

export const PopoverPanel = (props: PopoverPanelProps) => {
  const { className, ...rest } = props;
  return <PopoverPanelHeadless className={classNames(style.popoverPanel, className)} {...rest} />;
};
