import React, { useCallback, useState } from 'react';
import styles from './Input.module.scss';
import cn from 'classnames';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Время задержки для debounce (в миллисекундах) */
  debounceDelay?: number;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, debounceDelay = 0, afterSlot, className, disabled, ...props }, ref) => {
    const [currentValue, setCurrentValue] = useState(value);
    let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setCurrentValue(newValue);

        if (debounceDelay > 0) {
          if (debounceTimeout) {
            clearTimeout(debounceTimeout);
          }

          debounceTimeout = setTimeout(() => {
            onChange(newValue);
          }, debounceDelay);
        } else {
          onChange(newValue);
        }
      },
      [onChange, debounceDelay],
    );

    return (
      <label className={cn(styles.input_wrapper, disabled && styles.input_wrapper_disabled, className)}>
        <input
          value={currentValue}
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
