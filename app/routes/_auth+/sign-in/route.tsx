import { Form } from "@remix-run/react";
import { SignFormWrapper } from "~/components/sign-form-wrapper";

export default function SignInRoute() {
  return (
    <SignFormWrapper title="Hola de nuevo!">
      <Form>form</Form>
    </SignFormWrapper>
  );
}
