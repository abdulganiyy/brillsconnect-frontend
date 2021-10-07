import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = ({ history }) => {
  const { user } = useSelector((state) => state.authReducer);

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
    }
  });

  return (
    <>
      {user && (
        <div className="profile">
          <div className="img-wrapper">
            <img
              src="https://ui-avatars.com/api/?name=John+Doe"
              alt="my avatar"
              className="img"
            />
          </div>
          <div className="detail">
            <h4>Username</h4>
            <p>{user.username}</p>
          </div>
          <div className="detail">
            <h4>Email</h4>
            <p>{user.email}</p>
          </div>
          <div className="detail">
            <h4>Phone Number</h4>
            <p>{user.phone}</p>
          </div>
          <div className="detail">
            <h4>My Interest</h4>
            <p>{user.interest}</p>
          </div>
          <div>
            <Link to="/settings">Go to Settings</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
