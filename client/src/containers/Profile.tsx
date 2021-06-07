import {
  Fab,
  Grid,
  TextareaAutosize,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import InsertPhotoRoundedIcon from "@material-ui/icons/InsertPhotoRounded";
import React, { useEffect, useState } from "react";
import { REACT_APP_API_ENPOINT } from "../endpoint";
import DefaultAvatar from "../images/avatar.png";
import { Navbar } from "../components";
interface Props {}
interface User {
  id: number;
  username: string;
  bio: string;
  email: string;
  image: string;
  token: string;
}

const Profile: React.FC<Props> = () => {
  const [user, setUser] = useState<User>({
    bio: "",
    email: "",
    id: 0,
    image: "",
    token: "",
    username: "",
  });
  const cookieData: string = document.cookie;
  const token: string = cookieData.split("=")[1];

  const fetchProfileData = async () => {
    const userData = await (
      await fetch(`${REACT_APP_API_ENPOINT}/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
    ).json();
    if (!userData.message) {
      setUser(userData.user);
    }
  };
  const updateProfileData = async () => {
    const userForUpdate = {
      username: user.username,
      email: user.email,
      bio: user.bio,
      image: "",
    };
    console.log(userForUpdate);
    const userData = await (
      await fetch(`${REACT_APP_API_ENPOINT}/api/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userForUpdate),
      })
    ).json();
    if (!userData.message) {
      console.log(userData);
      setUser(userData);
    }
  };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileSelected = event.target.files;
    if (fileSelected !== null) {
      console.log(fileSelected[0]);
    }
  };

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInfo = { ...user };
    userInfo.username = event.target.value;
    setUser(userInfo);
  };
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInfo = { ...user };
    userInfo.email = event.target.value;
    setUser(userInfo);
  };
  const handleChangeBio = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const userInfo = { ...user };
    userInfo.bio = event.target.value;
    setUser(userInfo);
  };
  const handleEditProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateProfileData();
  };
  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <Grid
        container
        justify="center"
        alignItems="center"
        className="profileWrapper"
      >
        <Grid item xs={8} sm={8} md={8} lg={8} xl={8} container spacing={4}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} container>
            <div className="avatar">
              <img src={DefaultAvatar}></img>
            </div>
            <form>
              <label htmlFor="imageupload">
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="imageupload"
                  name="imageupload"
                  type="file"
                  onChange={handleChangeFile}
                />

                <Fab
                  color="primary"
                  component="span"
                  aria-label="up"
                  size="small"
                >
                  <InsertPhotoRoundedIcon />
                </Fab>
              </label>
            </form>
          </Grid>
          <form className="profileForm" onSubmit={handleEditProfile}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              container
              spacing={4}
            >
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} container>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  <Typography variant="body1">Username</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                  <TextField
                    variant="outlined"
                    value={user.username}
                    onChange={handleChangeUsername}
                  ></TextField>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} container>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  <Typography variant="body1">Email</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                  <TextField
                    variant="outlined"
                    value={user.email}
                    onChange={handleChangeEmail}
                  ></TextField>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} container>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  <Typography variant="body1">Bio</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                  <TextareaAutosize
                    rowsMin={5}
                    rowsMax={8}
                    placeholder="Bio"
                    value={user.bio}
                    onChange={handleChangeBio}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} container>
                <Button variant="contained" color="primary" type="submit">
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};
export default Profile;
