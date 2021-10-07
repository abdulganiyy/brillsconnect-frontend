import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../slices/auth";
import { authAction } from "../slices/auth";

const Settings = ({ history }) => {
  const logoutHandler = () => {
    dispatch(authAction.logout());

    history.push("/signup");
  };
  const [data, setData] = React.useState({
    id: "",
    username: "",
    email: "",
    password: "",
  });
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
    }
  });

  React.useEffect(() => {
    let isActive = true;

    if (user) {
      setData({
        id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
      });
    }

    return () => {
      isActive = false;
    };
  }, [dispatch, user]);

  const onChangeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    console.log(data);

    dispatch(updateUser(data));
  };

  return (
    <>
      {user && (
        <div className="settings">
          <form className="form" onSubmit={onSubmitHandler}>
            <div className="formgroup">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                className="forminput"
                placeholder="Username"
                name="username"
                value={data.username}
                onChange={onChangeHandler}
              />
            </div>
            <div className="formgroup">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="forminput"
                placeholder="Email"
                name="email"
                value={data.email}
                onChange={onChangeHandler}
              />
            </div>
            <div className="formgroup">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="forminput"
                placeholder="New Password"
                name="password"
                value={data.password}
                onChange={onChangeHandler}
              />
            </div>
            <div className="formgroup">
              <input
                type="submit"
                className="forminput"
                value="update"
                onClick={onSubmitHandler}
              />
            </div>
          </form>
          <div>
            <button className="logout" onClick={() => logoutHandler()}>
              Log out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
