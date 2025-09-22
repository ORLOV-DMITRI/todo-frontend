import React, { ComponentProps } from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

type Props = {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'big';
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
} & ComponentProps<'button'>

export default function Button({variant = 'primary', size = 'big', loading = false, disabled, children, className, ...props}: Props) {
  return (
    <button
      className={cn(
        styles.btn,
        styles[variant],
        styles[size],
        loading && styles.loading,
        disabled && styles.disabled,
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className={styles.spinner} />}
      <span className={styles.content}>
        {children}
      </span>
    </button>
  );
}