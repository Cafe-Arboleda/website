import type { LoaderFunction } from "@remix-run/node";

import { atuhLoader } from "~/utils/auth-loader.server";

export const loader: LoaderFunction = (loaderArgs) => atuhLoader({ loaderArgs });

export default function MembershipRoute() {
  return (
    <div>
      <h1>Membership</h1>
    </div>
  );
}
