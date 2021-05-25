import React, { useContext, useEffect, useRef, useState } from "react";
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
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
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
const indexForm = {
  zIndex: 1,
};
const paddingInput = {
  padding: "auto 6px",
};
export function SignUpForm(props) {
  const { switchToSignIn } = useContext(AccountContext);

  const emailRef = useRef();
  const passwordRef = useRef();
  const fullNameRef = useRef();

  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const { user, setUser, isLoggedIn, setIsLoggedIn, name, setName } =
    useContext(AuthContext);
  const history = useHistory();
  const signUp = () => {
    const db = myfirebase.firestore();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const fullName = fullNameRef.current.value;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        setUser(user);
        setName(fullName);
        user.updateProfile({
          displayName: fullName,
        });

        db.collection("users")
          .doc(user.uid)
          .set({
            name: fullName,
            email: email,
          })
          .then(() => {
            db.collection("users")
              .doc(user.uid)
              .get()
              .then((doc) => {
                console.log("doc", doc.data());
                let docData = doc.data();
              });
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        setUser(null);
        setIsLoggedIn(false);
        setError(errorMessage);
        // ..
      });
  };
  const handleSignup = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    signUp();
    /* 
   
    signup(email, password, fullName).catch((err) => {
      setError(err.message);
      setLoading(false);
    }); */
  };
  return (
    <BoxContainer>
      {error && <p>{error}</p>}
      <form onSubmit={(e) => handleSignup(e)} style={indexForm}>
        <TextField
          style={paddingInput}
          label="Fullname"
          placeholder="Enter your name"
          type="text"
          fullWidth
          inputRef={fullNameRef}
          value={fullName}
          onInput={(e) => setFullName(e.target.value)}
        />
        <TextField
          style={paddingInput}
          label="email"
          placeholder="Enter your email"
          type="email"
          fullWidth
          inputRef={emailRef}
          value={email}
          onInput={(e) => setEmail(e.target.value)}
        />

        <TextField
          style={paddingInput}
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

      <MutedLink href="#">
        Do you have an account?
        <BoldLink href="#" onClick={switchToSignIn}>
          Sign in
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
