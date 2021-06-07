import { Button } from "@material-ui/core";
import React from "react";
import { Link, useHistory } from "react-router-dom";
interface Props {}
const Navbar: React.FC<Props> = () => {
  const history = useHistory();
  const handleClickLogout = () => {
    const cookieData: string = document.cookie;
    document.cookie = `token=${cookieData}; expires=Thu, 18 Dec 2013 12:00:00 UTC`;
    history.push("/");
  };
  return (
    <div className="navbar">
      <ul>
        <Link to="/articles">
          <li>Articles</li>
        </Link>
        <Link to="/users">
          <li>Users</li>
        </Link>
        <Link to="/me">
          <li>Profile</li>
        </Link>
      </ul>
      <Button variant="text" onClick={handleClickLogout}>
        Log out
      </Button>
    </div>
  );
};
export default Navbar;
