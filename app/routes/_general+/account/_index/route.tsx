import type { LoaderFunction } from "@remix-run/node";

import { atuhLoader } from "~/utils/auth-loader.server";

export const loader: LoaderFunction = (loaderArgs) => atuhLoader({ loaderArgs });

export default function AccountRoute() {
  return (
    <div>
      <h1>Account</h1>
    </div>
  );
}
