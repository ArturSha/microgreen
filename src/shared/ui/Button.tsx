import { Button as Btn, type ButtonProps } from '@headlessui/react';
import classNames from 'classnames';
import style from './Button.module.css';

interface ButtonI extends ButtonProps {
  className?: string;
}

export const Button = (props: ButtonI) => {
  const { className, ...rest } = props;
  return <Btn className={classNames(style.button, className)} {...rest}></Btn>;
};
