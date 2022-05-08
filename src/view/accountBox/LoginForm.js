import React, { useContext, useRef, useState } from "react";

import { AuthContext } from "../../context/AuthContext";

import { auth } from "../../firebase";
import { BoxContainer, MutedLink, BoldLink } from "./Common";
import { AccountContext } from "./AccountContext";
import { TextField, Button } from "@material-ui/core";
const btnStyle = {
  margin: "15px 0",
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
  const {  setUser,  setIsLoggedIn } = useContext(AuthContext);


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
    
        var errorMessage = error.message;
        setUser(null);
        setIsLoggedIn(false);
        setError(errorMessage);
        setLoading(false);
      });
  };
  const handleSignin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    login();
    

  };

  return (
    <BoxContainer>

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


      <MutedLink href="#">
        Don't have an account?
        <BoldLink href="#" onClick={switchToSignUp}>
          Sign up
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
