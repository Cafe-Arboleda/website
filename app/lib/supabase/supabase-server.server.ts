import { createServerClient, serialize, parse } from "@supabase/ssr";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL) throw new Error("SUPABASE_URL env variable is required");
if (!SUPABASE_KEY) throw new Error("SUPABASE_KEY env variable is required");

export const getSupabaseWithHeaders = ({ request }: { request: Request }) => {
  const cookies = parse(request.headers.get("Cookie") ?? "");

  const headers = new Headers();

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      get(key) {
        return cookies[key];
      },

      set(key, value, options) {
        headers.append("Set-Cookie", serialize(key, value, options));
      },

      remove(key, options) {
        headers.append("Set-Cookie", serialize(key, "", options));
      },
    },
  });

  return { supabase, headers };
};

export const getSupabaseWithSessionHeaders = async ({
  request,
}: {
  request: Request;
}) => {
  const { supabase, headers } = getSupabaseWithHeaders({ request });

  const {
    data: { session: serverSession },
  } = await supabase.auth.getSession();

  return { serverSession, headers, supabase };
};
