/* import React, { useState, useRef, useContext } from "react";
import { VariablesContext } from "../context/ContextStorage";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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

import LockOpenIcon from "@material-ui/icons/LockOpen";

function RegistrationForm() {
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
    // const confirmPassword = confirmPasswordRef.current.value;
    signup(email, password)
      .then((ref) => {
   
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };
  // function handleSubmitTest(event) {
  //   event.preventDefault();
  //   console.log("ciao");
  //   // You should see email and password in console.
  //   // ..code to submit form to backend here...
  // }
  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   if (passwordRef.current.value !== confirmPasswordRef.current.value) {
  //     return setError("Password do not match");
  //   }
  //   try {
  //     setError("");
  //     setLoading(true);
  //     console.log("currUser", emailRef.current.value);
  //     await signUp(emailRef.current.value, passwordRef.current.value);
  //   } catch {
  //     setError("Failed to create an account");
  //   }
  //   setLoading(false);
  // }
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = {
    backgroundColor: "green",
  };
  const btnStyle = {
    margin: "8px 0",
  };

  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOpenIcon />
            </Avatar>
            <h2>Sign Up</h2>
            <p>Email:{email}</p>
            {error && <p>{error}</p>}
          </Grid>
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
              Sign in
            </Button>
          </form>
          <Typography>Do you have an account? Sign in</Typography>
        </Paper>
      </Grid>
    </div>
  );
}
export default RegistrationForm;
 */
