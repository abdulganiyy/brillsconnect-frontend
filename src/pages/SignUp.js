import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [data, setData] = React.useState({
    email: "",
    phone: "",
    password: "",
    interest: "",
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
      .post("https://brillsconnect-backend.herokuapp.com/users/signup", data)
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
    <div className="signup-wrapper">
      {userMessage}
      <form className="form" onSubmit={onSubmit}>
        <div className="formgroup">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            className="forminput"
            placeholder="Email"
            value={data.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="formgroup">
          <label htmlFor="phone">Phone Number</label>
          <input
            name="phone"
            id="phone"
            type="text"
            className="forminput"
            placeholder="Phone Number"
            value={data.phone}
            onChange={onChange}
            required
          />
        </div>
        <div className="formgroup">
          <select
            name="interest"
            value={data.interest}
            onChange={onChange}
            required
          >
            <option value="none">I am interested in:</option>
            <option value="football">Football</option>
            <option value="basketball">Basketball</option>
            <option value="ice-hockey">Ice Hockey</option>
            <option value="motorsports">Motorsports</option>
            <option value="bandy">Bandy</option>
            <option value="rugby">Rugby</option>
            <option value="skiing">Skiing</option>
            <option value="shooting">Shooting</option>
          </select>
        </div>
        <div className="formgroup">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            className="forminput"
            placeholder="Password"
            value={data.password}
            onChange={onChange}
            required
          />
        </div>
        <div className="formgroup">
          <input
            type="submit"
            className="forminput"
            value="SIGNUP"
            onClick={onSubmit}
          />
        </div>
      </form>
      <div className="pagesnav">
        <span>
          <Link to="/login">Login</Link>
        </span>
        <span>
          <Link to="/forgotpassword">Forgot password</Link>
        </span>
      </div>
    </div>
  );
};

export default SignUp;
