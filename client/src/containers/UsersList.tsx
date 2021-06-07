import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Navbar } from "../components";
import { REACT_APP_API_ENPOINT } from "../endpoint";

interface Props {}
interface Profile {
  id: string;
  username: string;
  email: string;
  bio: string;
  token: string;
  image: string;
}
const UsersList: React.FC<Props> = () => {
  const [users, setUsers] = useState([]);
  const [selfProfile, setSelfProfile] = useState<Profile>({
    id: "",
    username: "",
    email: "",
    bio: "",
    token: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const cookieData: string = document.cookie;
  const token: string = cookieData.split("=")[1];

  const fetchUsersData = async () => {
    setLoading(true);
    const usersData = await (
      await fetch(`${REACT_APP_API_ENPOINT}/api/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
    ).json();
    if (!usersData.message) {
      setUsers(usersData);
      setLoading(false);
    }
  };
  const fetchProfileData = async () => {
    const profileData = await (
      await fetch(`${REACT_APP_API_ENPOINT}/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
    ).json();
    if (!profileData.message) {
      setSelfProfile(profileData.user);
    }
  };

  const handleClickDelete = async (email: string) => {
    console.log(email);
    const deleteUserData = await (
      await fetch(`${REACT_APP_API_ENPOINT}/api/users/${email}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
    ).json();

    const usersClone = users.filter((user: any) => {
      return user.email !== email;
    });

    setUsers(usersClone);
    // setLoading(false);

    console.log(deleteUserData);
  };
  useEffect(() => {
    fetchUsersData();
    fetchProfileData();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      {loading ? (
        "loading"
      ) : (
        <div className="data-wrapper">
          {loading ? (
            "loading"
          ) : (
            <TableContainer className="data-container">
              <Table aria-label="simple table" className="data-grid">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Bio</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user: any) => (
                    <TableRow key={user.id}>
                      <TableCell component="th" scope="row">
                        {user.id}
                      </TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.bio}</TableCell>
                      <TableCell>{user.image}</TableCell>
                      <TableCell align="center">
                        {user.email === selfProfile.email ? (
                          ""
                        ) : (
                          <IconButton
                            onClick={() => {
                              handleClickDelete(user.email);
                            }}
                          >
                            <DeleteForeverRoundedIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      )}
    </div>
  );
};
export default UsersList;
