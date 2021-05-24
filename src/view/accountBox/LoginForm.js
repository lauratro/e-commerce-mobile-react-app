import React, { useContext } from "react";
import {
  BoxContainer,
  FormContainer,
  Input,
  SubmitButton,
  MutedLink,
  BoldLink,
} from "./Common";
import { AccountContext } from "./AccountContext";

export function LoginForm(props) {
  const { switchToSignUp } = useContext(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="email" />
        <Input type="password" placeholder="password" />
      </FormContainer>
      <MutedLink href="#">Forget your password?</MutedLink>
      <SubmitButton type="submit">Sign in</SubmitButton>
      <MutedLink href="#">
        Don't have an account/
        <BoldLink href="#" onClick={switchToSignUp}>
          Sign up
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
