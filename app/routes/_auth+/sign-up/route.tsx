import { z } from "zod";
import { Form, Link, json, redirect, useActionData } from "@remix-run/react";

import type { ActionFunction, LoaderFunction } from "@remix-run/node";

import { ROUTE } from "~/utils/enum";
import { atuhLoader } from "~/utils/auth-loader.server";

import { createSupabaseServerClient } from "~/lib/supabase/client.server";

import { Button } from "~/components/button";
import { TextInput } from "~/components/text-input";
import { CheckboxInput } from "~/components/checkbox-input";
import { SignFormWrapper } from "~/components/sign-form-wrapper";

import styles from "./route.module.css";

export const loader: LoaderFunction = (loaderArgs) =>
  atuhLoader({ loaderArgs });

export const action: ActionFunction = async ({ request }) => {
  const { supabase, headers } = createSupabaseServerClient({ request });

  const formData = Object.fromEntries(await request.formData());

  const userSchema = z
    .object({
      firstName: z.string().min(1, { message: "Este campo es requerido" }),
      lastName: z.string().min(1, { message: "Este campo es requerido" }),
      email: z.string().email("Este email no es válido"),
      password: z
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
      policyAgreement: z.string(),
    })
    .required();

  const checkResult = userSchema.safeParse(formData);

  if (!checkResult.success) {
    return json({ errors: checkResult.error.format() }, { headers });
  }

  const { error: signUpError } = await supabase.auth.signUp({
    email: checkResult.data.email,
    password: checkResult.data.password,

    options: {
      data: {
        first_name: checkResult.data.firstName,
        last_name: checkResult.data.lastName,
      },
    },
  });

  if (signUpError) {
    if (signUpError.code === "user_already_exists") {
      return json({
        errors: { email: { _errors: ["This email is already registered"] } },
      });
    }

    return json({ errors: { server: { _errors: ["Error creating user"] } } });
  }

  return redirect(ROUTE.HOME, { headers });
};

export default function SignUpRoute() {
  const actionData = useActionData<typeof action>();

  const errors = actionData?.errors;

  console.log(errors);

  return (
    <SignFormWrapper
      title="Házte Miembro"
      caption="Crea una cuenta, escoge una membresía y disfruta del club!"
    >
      <Form action="/sign-up" method="post" className={styles.form}>
        <div className={styles.userInfoFields}>
          <TextInput
            label="Primer Nombre"
            name="firstName"
            error={errors?.firstName?._errors[0]}
          />

          <TextInput
            label="Primer Apellido"
            name="lastName"
            error={errors?.lastName?._errors[0]}
          />
        </div>

        <div className={styles.userCredentialsFields}>
          <TextInput
            label="Email"
            name="email"
            type="email"
            error={errors?.email?._errors[0]}
          />

          <TextInput
            label="Password"
            name="password"
            type="password"
            error={errors?.password?._errors[0]}
          />

          <CheckboxInput name="policyAgreement">
            Certifico que tengo al menos 21 años de edad y que he leído y
            aceptado los <Link to={ROUTE.USAGE_TERMS}>términos de uso</Link> y
            la <Link to={ROUTE.PRIVACY_POLICY}>política de privacidad</Link> del
            sitio web.
          </CheckboxInput>
        </div>

        <Button>Crear Cuenta</Button>
      </Form>
    </SignFormWrapper>
  );
}
