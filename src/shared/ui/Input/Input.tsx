import classNames from 'classnames';
import { useState, type ComponentProps } from 'react';
import { Button } from '../Button';
import { Text } from '../Text';
import style from './Input.module.css';

type Variant = 'primary' | 'secondary';
interface InputProps extends ComponentProps<'input'> {
  error?: string;
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  primary: style.primary,
  secondary: style.secondary,
};

export const Input = ({
  error,
  className,
  ref,
  type = 'text',
  variant = 'primary',
  ...props
}: InputProps) => {
  const [show, setShow] = useState<boolean>(false);
  const inputType = type === 'password' && show ? 'text' : type;
  return (
    <div className={style.wrapper}>
      <div className={style.inputWrapper}>
        <input
          ref={ref}
          className={classNames(
            variants[variant],
            { [style.error]: error, [style.marginRight]: type === 'password' },
            className,
          )}
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
      {error && <Text variant="error">{error}</Text>}
    </div>
  );
};
