import React, { useContext, useEffect, useRef, useState } from "react";
import {
  BoxContainer,
  FormContainer,
  Input,
  SubmitButton,
  MutedLink,
  BoldLink,
} from "./Common";
import { AccountContext } from "./AccountContext";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  FormGroup,
  FormControl,
} from "@material-ui/core";
const btnStyle = {
  margin: "8px 0",
};

export function SignUpForm(props) {
  const { switchToSignIn } = useContext(AccountContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup } = useAuth();
  const history = useHistory();
  const handleSignup = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    //  const confirmPassword = confirmPasswordRef.current.value;
    signup(email, password)
      .then((ref) => {
        /* if (passwordRef.current.value !== confirmPasswordRef.current.value) {
          return setError("Password do not match");
        } */
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };
  return (
    <BoxContainer>
      {/*  // <FormContainer onSubmit={(e) => handleSignup(e)}> */}
      {error && <p>{error}</p>}
      <form onSubmit={(e) => handleSignup(e)}>
        <TextField
          label="email"
          placeholder="Enter your email"
          type="email"
          fullWidth
          inputRef={emailRef}
          value={email}
          onInput={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          placeholder="Enter Password"
          type="password"
          fullWidth
          inputRef={passwordRef}
          value={password}
          onInput={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnStyle}
          fullWidth
          disabled={loading}
        >
          Sign Up
        </Button>
      </form>
      {/*   <form onSubmit={(e) => handleSignup(e)}>
            <Input type="email" placeholder="email"  inputRef={emailRef}
              value={email}
              onInput={(e) => setEmail(e.target.value)}/>
            <Input type="password" placeholder="password"  inputRef={passwordRef}
              value={password}
                    onInput={(e) => setPassword(e.target.value)} />
                    <SubmitButton type="submit"  disabled={loading}>Sign up</SubmitButton>
            </form> */}
      {/*   </FormContainer> */}
      <MutedLink href="#">Forget your password?</MutedLink>

      <MutedLink href="#">
        Do you have an account?
        <BoldLink href="#" onClick={switchToSignIn}>
          Sign in
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
