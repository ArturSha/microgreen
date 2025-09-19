import { Button as Btn, type ButtonProps } from '@headlessui/react';
import style from './Button.module.css';

interface ButtonI extends ButtonProps {}

export const Button = (props: ButtonI) => {
  return <Btn className={style.button}></Btn>;
};
