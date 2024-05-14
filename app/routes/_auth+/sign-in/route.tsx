import { z } from "zod";
import { Form, Link, json, redirect, useActionData } from "@remix-run/react";

import type { ActionFunction, LoaderFunction } from "@remix-run/node";

import { ROUTE } from "~/utils/enum";
import { atuhLoader } from "~/utils/auth-loader.server";

import { createSupabaseServerClient } from "~/lib/supabase/client.server";

import { Button } from "~/components/button";
import { TextInput } from "~/components/text-input";
import { SignFormWrapper } from "~/components/sign-form-wrapper";

import styles from "./route.module.css";

export const loader: LoaderFunction = (loaderArgs) => atuhLoader({ loaderArgs });

export const action: ActionFunction = async ({ request }) => {
  const { supabase, headers } = createSupabaseServerClient({ request });

  const formData = Object.fromEntries(await request.formData());

  const userInfoSchema = z.object({
    email: z
      .string()
      .email({ message: "Este no es un email válido" })
      .min(1, { message: "Este campo es requerido" }),
    password: z
      .string()
      .min(6, { message: "La contraseña debe tener mínimo 6 caracteres" }),
  });

  const checkResult = userInfoSchema.safeParse(formData);

  if (checkResult.error) {
    return json({ errors: checkResult.error.format() });
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: checkResult.data.email,
    password: checkResult.data.password,
  });

  if (error) {
    return json({ errors: { server: error.message } });
  }

  return redirect(ROUTE.HOME, { headers });
};

export default function SignInRoute() {
  const actionData = useActionData<typeof action>();

  const errors = actionData?.errors;

  return (
    <SignFormWrapper title="Hola de nuevo!">
      <Form action="/sign-in" method="post" className={styles.form}>
        <div className={styles.userCredentialsFields}>
          <TextInput
            label="Correo Electrónico"
            name="email"
            type="email"
            error={errors?.email._errors[0]}
          />
          <TextInput
            label="Contraseña"
            name="password"
            type="password"
            error={errors?.password._errors[0]}
          />

          <Link to={ROUTE.RECOVER_PASSWORD} className={styles.recoverPasswordLink}>
            Olvidé mi contraseña
          </Link>
        </div>

        <Button>Iniciar Sesión</Button>
      </Form>
    </SignFormWrapper>
  );
}
