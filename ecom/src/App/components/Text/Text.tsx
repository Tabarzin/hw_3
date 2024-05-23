import * as React from 'react';
import styles from './Text.module.scss';
import cn from 'classnames';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({ className, view, tag: Tag = 'p', weight, children, color, maxLines }) => {
  return (
    <Tag
      className={cn(
        styles.text,
        styles[`text_weight-${weight}`],
        styles[`text_view-${view}`],
        color && styles[`text_color-${color}`],
        !!maxLines && styles['text_multi-ellipsis'],
        className,
      )}
      style={{ WebkitLineClamp: maxLines }}
    >
      {children}
    </Tag>
  );
};

export default Text;
