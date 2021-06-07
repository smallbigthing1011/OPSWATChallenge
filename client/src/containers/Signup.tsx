import {
  Box,
  Button,
  Divider,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { REACT_APP_API_ENPOINT } from "../endpoint";
import { Link, useHistory } from "react-router-dom";
interface Props {}

interface User {
  username: string;
  email: string;
  password: string;
}

const Signup: React.FC<Props> = () => {
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const history = useHistory();

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInfor = { ...user };
    userInfor.username = event.target.value;
    setUser(userInfor);
  };
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInfor = { ...user };
    userInfor.email = event.target.value;
    setUser(userInfor);
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInfor = { ...user };
    userInfor.password = event.target.value;
    setUser(userInfor);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userDataFetch = await (
      await fetch(`${REACT_APP_API_ENPOINT}/api/users`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      })
    ).json();
    if (userDataFetch.message) {
      setMessage("Failed to sign up!");
      setOpen(true);
    } else {
      console.log(userDataFetch);
      document.cookie = `token=${userDataFetch.user.token}`;
      history.push("/me");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100vh"
      width="100vw"
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        message={message}
      />
      <form className="formWrapper" onSubmit={handleSignup}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={8} sm={8} md={8} lg={8} xl={8} spacing={2} container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Typography variant="h4">Sign up</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                variant="standard"
                label="Username"
                fullWidth
                helperText=""
                onChange={handleChangeUsername}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                variant="standard"
                label="Password"
                fullWidth
                type="password"
                onChange={handleChangePassword}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                variant="standard"
                label="Email"
                fullWidth
                type="email"
                onChange={handleChangeEmail}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                type="submit"
              >
                Sign up
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Divider variant="middle" />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              container
              justify="center"
            >
              <Typography variant="body1" align="center">
                Already have an account?
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Link to="/login">
                <Button variant="contained" fullWidth color="secondary">
                  Sign in
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Signup;
