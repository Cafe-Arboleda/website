import { createServerClient, serialize, parse } from "@supabase/ssr";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL) throw new Error("SUPABASE_URL env variable required");
if (!SUPABASE_KEY) throw new Error("SUPABASE_KEY env variable required");



export const createSupabaseClient = ({ request }: { request: Request }) => {
  const cookies = parse(request.headers.get("Cookie") ?? "");

  const headers = new Headers();

  return createServerClient(SUPABASE_URL, SUPABASE_KEY, {
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
};
