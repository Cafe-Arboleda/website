import { Link } from "@remix-run/react";
import { cva } from "class-variance-authority";

import type { LinkProps } from "@remix-run/react";
import type { VariantProps } from "class-variance-authority";

import styles from "./navlink.module.css";

const navlinkStyles = cva(styles.navlink, {
  variants: {
    variant: {
      default: styles.navlink,

      special: styles.specialNavlink,
    },
  },

  defaultVariants: {
    variant: "default",
  },
});

interface NavlinkProps extends LinkProps, VariantProps<typeof navlinkStyles> {
  children: React.ReactNode;
}

export const Navlink = ({ children, variant, ...linkProps }: NavlinkProps) => {
  return (
    <Link className={navlinkStyles({ variant })} {...linkProps}>
      {children}
    </Link>
  );
};
