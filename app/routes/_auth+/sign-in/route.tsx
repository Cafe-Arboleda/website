import { Form, Link } from "@remix-run/react";

import type { LoaderFunction } from "@remix-run/node";

import { ROUTE } from "~/utils/enum";
import { atuhLoader } from "~/utils/auth-loader.server";

import { Button } from "~/components/button";
import { TextInput } from "~/components/text-input";
import { SignFormWrapper } from "~/components/sign-form-wrapper";

import styles from "./route.module.css";

export const loader: LoaderFunction = (loaderArgs) => atuhLoader({ loaderArgs });

export default function SignInRoute() {
  return (
    <SignFormWrapper title="Hola de nuevo!">
      <Form className={styles.form}>
        <div className={styles.userCredentialsFields}>
          <TextInput label="Correo Electrónico" name="email" type="email" />
          <TextInput label="Contraseña" name="password" type="password" />

          <Link to={ROUTE.RECOVER_PASSWORD} className={styles.recoverPasswordLink}>
            Olvidé mi contraseña
          </Link>
        </div>

        <Button>Iniciar Sesión</Button>
      </Form>
    </SignFormWrapper>
  );
}
