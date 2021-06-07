import {
  Box,
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { REACT_APP_API_ENPOINT } from "../endpoint";
import { useHistory } from "react-router-dom";

interface Props {}

interface User {
  email: string;
  password: string;
}

const Login: React.FC<Props> = () => {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const history = useHistory();
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
  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userDataFetch = await (
      await fetch(`${REACT_APP_API_ENPOINT}/api/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      })
    ).json();
    if (userDataFetch.message || userDataFetch.errors) {
      setMessage("Failed to log in!");
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
      <Grid container justify="center" alignItems="center">
        <form className="formWrapper" onSubmit={handleSignIn}>
          <Grid item xs={8} sm={8} md={8} lg={8} xl={8} spacing={2} container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Typography variant="h4">Log in</Typography>
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
              <TextField
                variant="standard"
                label="Password"
                fullWidth
                type="password"
                onChange={handleChangePassword}
              ></TextField>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                type="submit"
              >
                Log in
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Box>
  );
};

export default Login;
