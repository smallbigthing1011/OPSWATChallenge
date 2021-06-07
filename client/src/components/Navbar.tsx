import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
interface Props {}
const Navbar: React.FC<Props> = () => {
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
      <Button variant="text">Log out</Button>
    </div>
  );
};
export default Navbar;
