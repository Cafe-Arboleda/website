import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import type { LoaderFunction } from "@remix-run/node";

import { createSupabaseServerClient } from "~/lib/supabase/client.server";

import { atuhLoader } from "~/utils/auth-loader.server";

export const loader: LoaderFunction = (loaderArgs) =>
  atuhLoader({
    loaderArgs,
    callback: async ({ request }) => {
      const { supabase, headers } = createSupabaseServerClient({ request });

      const { data } = await supabase.from("profiles").select("*");

      return json({ profile: data && data[0] }, { headers });
    },
  });

export default function AccountRoute() {
  const { profile } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Hola, {profile.first_name}</h1>
    </div>
  );
}
