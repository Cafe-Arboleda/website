import { Link } from "react-router-dom";
import { Outlet, useLoaderData, Form } from "@remix-run/react";
import { json } from "@remix-run/node";

import type { LoaderFunction } from "@remix-run/node";

import { ROUTE } from "~/utils/enum";

import { createSupabaseServerClient } from "~/lib/supabase/client.server";

import { Navlink } from "~/components/navlink";

import styles from "./layout.module.css";
import { Button } from "~/components/button";

export const loader: LoaderFunction = async ({ request }) => {
  const { supabase, headers } = createSupabaseServerClient({ request });

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return json({ error }, { headers });
  }

  return json({ user: data.user }, { headers });
};

export default function GeneralLayout() {
  const loaderData = useLoaderData<typeof loader>();

  const { user } = loaderData;

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

        {user ? (
          <div className={styles.authLinks}>
            <Navlink to={ROUTE.ACCOUNT}>Mi Cuenta</Navlink>

            <Form action="/sign-out" method="post">
              <Button type="submit" variant="secondary">
                Cerrar Sesión
              </Button>
            </Form>
          </div>
        ) : (
          <div className={styles.authLinks}>
            <Navlink to={ROUTE.SIGN_IN}>Ingresar</Navlink>
            <Navlink to={ROUTE.SIGN_UP} variant="special">
              Házte Miembro
            </Navlink>
          </div>
        )}
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
