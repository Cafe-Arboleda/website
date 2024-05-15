import type { InputHTMLAttributes } from "react";

import styles from "./text-input.module.css";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const TextInput = ({
  label,
  name,
  error,
  ...inputProps
}: TextInputProps) => {
  return (
    <label className={styles.container}>
      <span className={styles.label}>{label}</span>

      <input name={name} className={styles.input} {...inputProps} />

      {error && <span className={styles.error_message}>{error}</span>}
    </label>
  );
};
