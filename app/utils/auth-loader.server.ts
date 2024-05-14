import { json, redirect } from "@remix-run/node";

import type { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";

import { ROUTE } from "./enum";

import { getSupabaseWithSessionHeaders } from "~/lib/supabase/supabase-server.server";

const PUBLIC_ROUTES = [ROUTE.SIGN_IN, ROUTE.SIGN_UP];
const PRIVATE_ROUTES = [ROUTE.ACCOUNT, ROUTE.MEMBERSHIP];

interface AuthLoaderOptions {
  callback?: LoaderFunction;
  loaderArgs: LoaderFunctionArgs;
}

export const atuhLoader = async ({ callback, loaderArgs }: AuthLoaderOptions) => {
  const { request } = loaderArgs;
  const { pathname } = new URL(request.url);

  const { supabase } = await getSupabaseWithSessionHeaders({
    request,
  });

  const { data } = await supabase.auth.getSession();

  const isAuthenticated = data.session?.access_token;

  if (isAuthenticated && PUBLIC_ROUTES.includes(pathname)) {
    throw redirect(ROUTE.HOME);
  }

  if (!isAuthenticated && PRIVATE_ROUTES.includes(pathname)) {
    throw redirect(ROUTE.HOME);
  }

  if (callback) {
    return await callback({ ...loaderArgs });
  }

  return json({ ok: true });
};
