import clsx from "clsx";

import { cva } from "class-variance-authority";
import { NavLink } from "@remix-run/react";

import type { LinkProps } from "@remix-run/react";
import type { VariantProps } from "class-variance-authority";

import styles from "./navlink.module.css";

const navlinkStyles = cva(styles.navlink, {
  variants: {
    variant: {
      default: styles.navlink,

      special: styles.specialNavlink,

      tab: styles.tab,
    },
  },

  defaultVariants: {
    variant: "default",
  },
});

interface NavlinkProps extends LinkProps, VariantProps<typeof navlinkStyles> {
  children: React.ReactNode;
}

export const Navlink = ({ children, variant, to, ...linkProps }: NavlinkProps) => {
  return (
    <NavLink
      end
      to={to}
      className={({ isActive }) =>
        clsx(navlinkStyles({ variant }), isActive && styles.isActive)
      }
      {...linkProps}
    >
      {children}
    </NavLink>
  );
};
