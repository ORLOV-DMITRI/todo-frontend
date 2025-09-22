import React, { ComponentProps } from 'react';
import cn from 'classnames';
import styles from './Input.module.scss';

type Props = {
  label?: string;
  error?: string;
  className?: string;
} & ComponentProps<'input'>

export default function Input({ label, error, className, ...props }: Props) {
  return (
    <div className={cn(styles.wrapper, className)}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={cn(
          styles.input,
          error && styles.error
        )}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}