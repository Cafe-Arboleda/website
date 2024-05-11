import type { InputHTMLAttributes } from "react";

import styles from "./text-input.module.css";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const TextInput = ({ label, ...inputProps }: TextInputProps) => {
  return (
    <label className={styles.container}>
      <span className={styles.label}>{label}</span>

      <input {...inputProps} className={styles.input} />
    </label>
  );
};
