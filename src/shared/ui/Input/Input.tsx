import classNames from 'classnames';
import { type ComponentProps } from 'react';
import style from './Input.module.css';

interface InputProps extends ComponentProps<'input'> {
  error?: string;
}

export const Input = ({ error, className, ref, ...props }: InputProps) => {
  return (
    <div className={style.wrapper}>
      <input
        ref={ref}
        className={classNames(style.input, { [style.error]: error }, className)}
        {...props}
      />
      {error && <p className={style.errorMessage}>{error}</p>}
    </div>
  );
};

Input.displayName = 'Input';
