import React from 'react';
import styles from './CheckBox.module.scss';
import cn from 'classnames';
import CheckIcon from '../icons/CheckIcon';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
  className?: string;
};

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange, disabled, className, ...props }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label className={cn(styles.checkbox_wrapper, disabled && styles.checkbox_wrapper_disabled, className)}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={checked}
        onChange={handleInputChange}
        disabled={disabled}
        {...props}
      />
      <CheckIcon width={40} height={40} className={styles.checkbox__mark} />
    </label>
  );
};

export default CheckBox;
