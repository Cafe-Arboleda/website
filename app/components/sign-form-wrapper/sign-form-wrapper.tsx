import { Link, useLocation } from "@remix-run/react";

import { ROUTE } from "~/utils/enum";

import styles from "./sign-form-wrapper.module.css";

interface SignFormWrapperProps {
  title: string;
  caption?: string;

  children: React.ReactNode;
}

export const SignFormWrapper = ({ title, caption, children }: SignFormWrapperProps) => {
  const location = useLocation();

  const isSignIn = location.pathname === ROUTE.SIGN_IN;

  const alternateSignLinkUrl = isSignIn ? ROUTE.SIGN_UP : ROUTE.SIGN_IN;
  const alternateSignLinkText = isSignIn
    ? "No tienes una cuenta? Házte miembro"
    : "Ya tienes una cuenta? Inicia sesión";

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>{title}</h1>
        <span>{caption}</span>
      </div>

      {children}

      <div>
        <Link to={alternateSignLinkUrl} className={styles.alternateSignLink}>
          {alternateSignLinkText}
        </Link>
      </div>
    </div>
  );
};
