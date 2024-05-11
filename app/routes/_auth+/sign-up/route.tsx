import { Form, Link } from "@remix-run/react";

import { ROUTE } from "~/utils/enum";

import { Button } from "~/components/button";
import { TextInput } from "~/components/text-input";
import { CheckboxInput } from "~/components/checkbox-input";
import { SignFormWrapper } from "~/components/sign-form-wrapper";

import styles from "./route.module.css";

export default function SignUpRoute() {
  return (
    <SignFormWrapper
      title="Házte Miembro"
      caption="Crea una cuenta, escoge una membresía y disfruta del club!"
    >
      <Form className={styles.form}>
        <div className={styles.userInfoFields}>
          <TextInput label="Primer Nombre" name="firstName" />
          <TextInput label="Primer Apellido" name="lastName" />
        </div>

        <div className={styles.userCredentialsFields}>
          <TextInput label="Email" name="email" type="email" />
          <TextInput label="Password" name="password" type="password" />

          <CheckboxInput>
            Certifico que tengo al menos 21 años de edad y que he leído y aceptado los{" "}
            <Link to={ROUTE.USAGE_TERMS}>términos de uso</Link> y la{" "}
            <Link to={ROUTE.PRIVACY_POLICY}>política de privacidad</Link> del sitio web.
          </CheckboxInput>
        </div>

        <Button>Crear Cuenta</Button>
      </Form>
    </SignFormWrapper>
  );
}
