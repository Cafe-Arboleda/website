import { cva } from "class-variance-authority";

import type { VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import styles from "./button.module.css";

const buttonStyles = cva(styles.baseButton, {
  variants: {
    variant: {
      primary: styles.primaryButton,

      secondary: styles.secondaryButton,

      ghost: styles.ghostButton,
    },
  },

  defaultVariants: {
    variant: "primary",
  },
});

interface ButtonProps
  extends VariantProps<typeof buttonStyles>,
    ButtonHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
}

export const Button = ({ children, variant }: ButtonProps) => {
  return <button className={buttonStyles({ variant })}>{children}</button>;
};
