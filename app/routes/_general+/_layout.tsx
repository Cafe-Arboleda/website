import { Link } from "react-router-dom";
import { Outlet } from "@remix-run/react";

import { ROUTE } from "~/utils/enum";

import { Navlink } from "~/components/navlink";

import styles from "./layout.module.css";

export default function GeneralLayout() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.mainLinks}>
          <Link to={ROUTE.HOME} className={styles.logo}>
            Arboleda
          </Link>

          <div className={styles.mainLinks}>
            <Navlink to={ROUTE.HOME}>Home</Navlink>
            <Navlink to={ROUTE.SHOP}>The Shop</Navlink>
          </div>
        </div>

        <div className={styles.authLinks}>
          <Navlink to={ROUTE.SIGN_IN}>Ingresar</Navlink>
          <Navlink to={ROUTE.SIGN_UP} variant="special">
            Házte Miembro
          </Navlink>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
