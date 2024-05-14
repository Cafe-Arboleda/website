import { redirect } from "@remix-run/node";

import type { ActionFunction } from "@remix-run/node";

import { ROUTE } from "~/utils/enum";

import { createSupabaseServerClient } from "~/lib/supabase/client.server";

export const action: ActionFunction = async ({ request }) => {
  const { supabase, headers } = createSupabaseServerClient({ request });

  await supabase.auth.signOut();

  return redirect(ROUTE.HOME, { headers });
};
