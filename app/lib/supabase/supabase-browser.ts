import { useEffect, useState } from "react";
import { useRevalidator } from "@remix-run/react";
import { createBrowserClient } from "@supabase/ssr";

import type { Session } from "@supabase/supabase-js";
import type { Database } from "database.types";

interface SupabaseEnv {
  SUPABASE_URL: string;
  SUPABASE_KEY: string;
}

interface UseSupabaseOptions {
  env: SupabaseEnv;
  serverSession: Session | null;
}

export const useSupabase = ({ env, serverSession }: UseSupabaseOptions) => {
  const revalidator = useRevalidator();

  const [supabase] = useState(() =>
    createBrowserClient<Database>(env.SUPABASE_URL!, env.SUPABASE_KEY!)
  );

  const serverAccessToken = serverSession?.access_token;

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.access_token !== serverAccessToken) {
        revalidator.revalidate();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [revalidator, serverAccessToken, supabase.auth]);

  return { supabase };
};
