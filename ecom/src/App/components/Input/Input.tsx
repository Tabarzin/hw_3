import React from 'react';
import styles from './Input.module.scss';
import cn from 'classnames';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className, disabled, ...props }, ref) => {
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      },
      [onChange],
    );

    return (
      <label className={cn(styles.input_wrapper, disabled && styles.input_wrapper_disabled, className)}>
        <input
          value={value}
          onChange={handleChange}
          type="text"
          className={styles.input}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        {!!afterSlot && <div className={styles.input_after}>{afterSlot}</div>}
      </label>
    );
  },
);
export default Input;
