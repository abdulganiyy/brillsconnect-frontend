import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../slices/auth";

const Login = () => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const [errMessage, setErrMessage] = React.useState("");

  const { errorMessage, loggedIn } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setErrMessage(errorMessage);
  }, [errorMessage]);

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    for (var key in data) {
      if (data[key] === "") {
        return;
      }
    }

    dispatch(login(data));
  };
  return (
    <div className="login-wrapper">
      {errMessage ? <div className="fail">{errMessage}</div> : null}
      {loggedIn === true ? <Redirect to="/profile" /> : null}
      <form className="form" onSubmit={onSubmit}>
        <div className="formgroup">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="forminput"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={onChange}
          />
        </div>
        <div className="formgroup">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="forminput"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={onChange}
          />
        </div>
        <div className="formgroup">
          <input type="submit" className="forminput" value="LOGIN" />
        </div>
      </form>
      <div className="pagesnav">
        <span>
          <Link to="/signup">signup</Link>
        </span>
        <span>
          <Link to="/forgotpassword">Forgot password</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
