import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import type { LoaderFunction } from "@remix-run/node";

import { ROUTE } from "~/utils/enum";

import { createSupabaseServerClient } from "~/lib/supabase/client.server";

import { Navlink } from "~/components/navlink";

import styles from "./layout.module.css";

export const loader: LoaderFunction = async ({ request }) => {
  const { supabase } = createSupabaseServerClient({ request });

  const { data } = await supabase.from("profiles").select();

  return json({ profile: data && data[0] });
};

export default function AccountLayout() {
  const { profile } = useLoaderData<typeof loader>();

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Hola, {profile?.first_name}</h1>

        <div>
          <Navlink to={ROUTE.ACCOUNT} variant="tab">
            Cuenta
          </Navlink>
          <Navlink to={ROUTE.PROFILE} variant="tab">
            Perfil
          </Navlink>
          <Navlink to={ROUTE.MEMBERSHIP} variant="tab">
            Membresía
          </Navlink>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
