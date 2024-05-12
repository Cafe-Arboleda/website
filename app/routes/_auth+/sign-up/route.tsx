import { z } from "zod";
import { Form, Link, useActionData } from "@remix-run/react";

import type { ActionFunction } from "@remix-run/node";

import { ROUTE } from "~/utils/enum";

import { Button } from "~/components/button";
import { TextInput } from "~/components/text-input";
import { CheckboxInput } from "~/components/checkbox-input";
import { SignFormWrapper } from "~/components/sign-form-wrapper";

import styles from "./route.module.css";

export const action: ActionFunction = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());

  const userSchema = z
    .object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email("This is not a valid email"),
      password: z.string().min(6, "Password must be at least +6 characters"),
      policyAgreement: z.string(),
    })
    .required();

  const checkResult = userSchema.safeParse(formData);

  if (!checkResult.success) {
    return { user: null, errors: checkResult.error.format() };
  }

  return {
    user: formData,
    errors: null,
  };
};

export default function SignUpRoute() {
  const actionData = useActionData<typeof action>();

  console.log(actionData?.user);

  return (
    <SignFormWrapper
      title="Házte Miembro"
      caption="Crea una cuenta, escoge una membresía y disfruta del club!"
    >
      <Form action="/sign-up" method="post" className={styles.form}>
        <div className={styles.userInfoFields}>
          <TextInput label="Primer Nombre" name="firstName" />
          <TextInput label="Primer Apellido" name="lastName" />
        </div>

        <div className={styles.userCredentialsFields}>
          <TextInput label="Email" name="email" type="email" />
          <TextInput label="Password" name="password" type="password" />

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
