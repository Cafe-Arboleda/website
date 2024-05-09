import tsconfigPaths from "vite-tsconfig-paths";

import { defineConfig } from "vite";
import { flatRoutes } from "remix-flat-routes";
import { installGlobals } from "@remix-run/node";
import { vitePlugin as remix } from "@remix-run/dev";

installGlobals();

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ["**/*"],

      routes: async (defineRoutes) => {
        return flatRoutes("routes", defineRoutes);
      },
    }),

    tsconfigPaths(),
  ],
});
