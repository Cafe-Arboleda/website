import type { InputHTMLAttributes } from "react";

import styles from "./checkbox-input.module.css";

interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  label?: string;
}

export const CheckboxInput = ({ children, label, ...inputProps }: CheckboxInputProps) => {
  return (
    <label className={styles.container}>
      <input
        type="checkbox"
        name="acceptUsage"
        className={styles.input}
        {...inputProps}
      />

      <span className={styles.label}>{children ? children : label}</span>
    </label>
  );
};
