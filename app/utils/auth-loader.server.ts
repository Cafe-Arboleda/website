import { json, redirect } from "@remix-run/node";

import type { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";

import { ROUTE } from "./enum";

import { createSupabaseServerClient } from "~/lib/supabase/client.server";

const PUBLIC_ROUTES = [ROUTE.SIGN_IN, ROUTE.SIGN_UP];
const PRIVATE_ROUTES = [ROUTE.ACCOUNT, ROUTE.MEMBERSHIP];

interface AuthLoaderOptions {
  callback?: LoaderFunction;
  loaderArgs: LoaderFunctionArgs;
}

export const atuhLoader = async ({ callback, loaderArgs }: AuthLoaderOptions) => {
  const { request } = loaderArgs;
  const { pathname } = new URL(request.url);

  const { supabase, headers } = createSupabaseServerClient({
    request,
  });

  const { data } = await supabase.auth.getSession();

  const isAuthenticated = data.session?.access_token;

  if (isAuthenticated && PUBLIC_ROUTES.includes(pathname)) {
    throw redirect(ROUTE.HOME, { headers });
  }

  if (!isAuthenticated && PRIVATE_ROUTES.includes(pathname)) {
    throw redirect(ROUTE.HOME, { headers });
  }

  if (callback) {
    return await callback({ ...loaderArgs });
  }

  return json({ ok: true }, { headers });
};
