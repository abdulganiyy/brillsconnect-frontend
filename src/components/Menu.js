import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../slices/auth";

const Menu = ({ history }) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authAction.logout());
    history.push("/");
  };
  let logoutButton;
  if (localStorage.getItem("token")) {
    logoutButton = (
      <li>
        <button className="logout" onClick={() => logoutHandler()}>
          Logout
        </button>
      </li>
    );
  }
  return (
    <div className="menu">
      <div className="logo">HOME</div>
      <ul className="nav-items">
        {localStorage.getItem("token") ? null : (
          <>
            <li className="nav-item">
              <Link to="/signup">Sign Up</Link>
            </li>
            <li className="nav-item">
              <Link to="/login">Login</Link>
            </li>
          </>
        )}

        {localStorage.getItem("token") ? (
          <>
            <li className="nav-item">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="nav-item">
              <Link to="/settings">Settings</Link>
            </li>
          </>
        ) : null}

        <li className="nav-item">Discover</li>
        <li className="nav-item">Buddies</li>
        {logoutButton}
      </ul>
    </div>
  );
};

export default Menu;
