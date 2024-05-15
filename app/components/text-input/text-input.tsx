import type { InputHTMLAttributes } from "react";

import styles from "./text-input.module.css";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: { [x: string]: { _errors: string[] } };
}

export const TextInput = ({ label, name, error, ...inputProps }: TextInputProps) => {
  return (
    <label className={styles.container}>
      <span className={styles.label}>{label}</span>

      <input name={name} className={styles.input} {...inputProps} />

      {error && (
        <span className={styles.error_message}>{error[name as string]._errors[0]}</span>
      )}
    </label>
  );
};
