import type { PopoverButtonProps } from '@headlessui/react';
import { PopoverButton as PopoverButtonHeadless } from '@headlessui/react';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import Filter from '../../../assets/icons/filter.svg';
import InfoMessage from '../../../assets/icons/messageInfo.svg';
import style from './PopoverButton.module.css';

const icons = {
  filter: <Filter />,
  InfoMessage: <InfoMessage />,
  tag: null,
  empty: null,
} as const;

interface PopoverButtonHeadlessProps extends PopoverButtonProps {
  kind?: keyof typeof icons;
  iconPosition?: 'left' | 'right';
  children?: ReactNode;
}

export const PopoverButton = (props: PopoverButtonHeadlessProps) => {
  const { kind, className, children, iconPosition = 'left', ...rest } = props;

  return (
    <PopoverButtonHeadless
      className={classNames(style.popoverButton, { [style.tag]: kind === 'tag' }, className)}
      {...rest}
    >
      {kind && iconPosition === 'left' && icons[kind]}
      {children}
      {kind && iconPosition === 'right' && icons[kind]}
    </PopoverButtonHeadless>
  );
};
