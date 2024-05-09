import { Form } from "@remix-run/react";
import { SignFormWrapper } from "~/components/sign-form-wrapper";

export default function SignUpRoute() {
  return (
    <SignFormWrapper
      title="Házte Miembro"
      caption="Crea una cuenta, escoge una membresía y disfruta del club!"
    >
      <Form>form</Form>
    </SignFormWrapper>
  );
}
