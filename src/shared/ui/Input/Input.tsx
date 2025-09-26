import classNames from 'classnames';
import { useState, type ComponentProps } from 'react';
import { Button } from '../Button';
import { Text } from '../Text';
import style from './Input.module.css';

interface InputProps extends ComponentProps<'input'> {
  error?: string;
}

export const Input = ({ error, className, ref, type = 'text', ...props }: InputProps) => {
  const [show, setShow] = useState<boolean>(false);
  const inputType = type === 'password' && show ? 'text' : type;
  return (
    <div className={style.wrapper}>
      <div className={style.inputWrapper}>
        <input
          ref={ref}
          className={classNames(style.input, { [style.error]: error }, className)}
          type={inputType}
          {...props}
        />
        {type === 'password' && (
          <Button
            className={style.toggleButton}
            variant="clear"
            icon={show ? 'eye' : 'eyeClosed'}
            onClick={() => setShow(!show)}
          />
        )}
      </div>
      {error && <Text className={style.errorMessage}>{error}</Text>}
    </div>
  );
};

Input.displayName = 'Input';
