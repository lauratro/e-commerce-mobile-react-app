import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import myfirebase from "../../firebase";
import { auth } from "../../firebase";
import {
  BoxContainer,
  FormContainer,
  Input,
  SubmitButton,
  MutedLink,
  BoldLink,
} from "./Common";
import { AccountContext } from "./AccountContext";
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
  margin: "15px 0",
  background: "rgb(58,180,117)",
  background:
    "linear-gradient(90deg, rgba(58,180,117,1) 0%, rgba(39,161,45,1) 38%, rgba(25,78,34,1) 100%)",
};

export function LoginForm(props) {
  const { switchToSignUp } = useContext(AccountContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  // const { signin } = useAuth();
  const history = useHistory();
  const login = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("userLogin", user);
        setUser(user);
        setIsLoggedIn(true);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setUser(null);
        setIsLoggedIn(false);
        setError(errorMessage);
      });
  };
  const handleSignin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    login();
    /*
    signin(email, password)
      .then((ref) => {
        setLoading(false);
        history.push("/");
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      }); */
  };

  return (
    <BoxContainer>
      {/*  // <FormContainer onSubmit={(e) => handleSignup(e)}> */}
      {error && <p>{error}</p>}
      <form onSubmit={(e) => handleSignin(e)}>
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
          Sign In
        </Button>
      </form>
      {/*  <FormContainer>
        <Input type="email" placeholder="email" />
        <Input type="password" placeholder="password" />
      </FormContainer> */}

      <MutedLink href="#">
        Don't have an account?
        <BoldLink href="#" onClick={switchToSignUp}>
          Sign up
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
