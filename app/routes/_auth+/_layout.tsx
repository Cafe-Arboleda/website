import { Link } from "react-router-dom";
import { Outlet } from "@remix-run/react";

import { ROUTE } from "~/utils/enum";

import styles from "./layout.module.css";

export default function AuthLayout() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to={ROUTE.HOME} className={styles.logo}>
          Arboleda
        </Link>
      </header>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
