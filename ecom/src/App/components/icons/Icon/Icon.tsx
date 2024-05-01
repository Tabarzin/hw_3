import React from 'react';
import styles from './Icon.module.scss';
import cn from 'classnames';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  color,
  children,
  width = 24,
  height = 24,
  ...props
}) => {
  return (
    <svg
      {...props}
      className={cn(styles.icon, color && styles[`icon_color_${color}`], className)}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
    >
      {children}
    </svg>
  );
};

export default Icon;
