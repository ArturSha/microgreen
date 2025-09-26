import classNames from 'classnames';
import type { ComponentProps } from 'react';
import style from './Checkbox.module.css';

interface CheckboxProps extends Omit<ComponentProps<'input'>, 'onChange'> {
  className?: string;
  checked: boolean;
  label?: string;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox = ({
  checked,
  label,
  disabled,
  className,
  children,
  onChange,
  ...props
}: CheckboxProps) => {
  return (
    <label
      className={classNames(
        style.wrapper,
        {
          [style.disabled]: disabled,
        },
        className,
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className={style.checkbox}
        {...props}
      />
      <div
        className={classNames(style.box, {
          [style.checked]: checked,
        })}
      >
        {checked && <span>✔</span>}
      </div>
      {label && <span className={style.label}>{label}</span>}
      {children}
    </label>
  );
};
