import { Form } from "@remix-run/react";

import { Button } from "~/components/button";
import { TextInput } from "~/components/text-input";
import { SignFormWrapper } from "~/components/sign-form-wrapper";

import styles from "./route.module.css";

export default function RecoverPassswordRoute() {
  return (
    <SignFormWrapper title="Hola de nuevo!">
      <Form className={styles.form}>
        <TextInput
          label="Te enviaremos un correo con instrucciones para recuperar tu contraseña"
          type="email"
          name="email"
          placeholder="Correo registrado"
        />

        <Button>Recuperar Contraseña</Button>
      </Form>
    </SignFormWrapper>
  );
}
