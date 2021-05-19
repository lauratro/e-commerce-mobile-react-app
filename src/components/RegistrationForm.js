import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";

function RegistrationForm() {
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
            <h2>Sign in</h2>
          </Grid>
          <TextField label="Email" placeholder="example@gmail.com" fullWidth />
          <TextField
            label="Password"
            placeholder="Enter Password"
            type="password"
            fullWidth
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnStyle}
            fullWidth
          >
            Sign in
          </Button>
          <Typography>Do you have an account? Sign up</Typography>
        </Paper>
      </Grid>
    </div>
  );
}
export default RegistrationForm;
