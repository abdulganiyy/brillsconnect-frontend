import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [data, setData] = React.useState({
    email: "",
    newPassword: "",
  });

  const [errMessage, setErrMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

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

    axios
      .post("http://localhost:8000/users/forgotpassword", data)
      .then((res) => {
        console.log(res.status);
        setSuccessMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err.response.status);
        console.log(err.response.data.message);
        setErrMessage(err.response.data.message);
      });
  };

  let userMessage;

  if (successMessage) {
    userMessage = <div className="success">{successMessage}</div>;
  } else if (errMessage) {
    userMessage = <div className="fail">{errMessage}</div>;
  }
  return (
    <div className="forgotpassword-wrapper">
      {userMessage}
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
          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            type="password"
            className="forminput"
            placeholder="New Password"
            name="newPassword"
            value={data.newPassword}
            onChange={onChange}
          />
        </div>
        <div className="formgroup">
          <input type="submit" className="forminput" value="change password" />
        </div>
      </form>
      <div className="pagesnav">
        <span>
          <Link to="/login">Login</Link>
        </span>
        <span>
          <Link to="/signup">signup</Link>
        </span>
      </div>
    </div>
  );
};

export default ForgotPassword;
