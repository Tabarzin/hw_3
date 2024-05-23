import React from 'react';
import styles from './Button.module.scss';
import Loader from '../Loader';
import Text from '../Text';
import cn from 'classnames';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ loading, children = null, className, ...props }) => {
  return (
    <button
      className={cn(className, styles.button, props.disabled && styles.button_disabled)}
      {...props}
      disabled={props.disabled || loading}
    >
      {loading && <Loader className="button__loader" size="s" />}
      <Text className={styles.button__text} tag="span" view="button">
        {children}
      </Text>
    </button>
  );
};

export default Button;
