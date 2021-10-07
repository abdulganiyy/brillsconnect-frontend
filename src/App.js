import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import Menu from "./components/Menu";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
function App() {
  return (
    <>
      <Router>
        <Menu />
        <div className="container">
          <Switch>
            <Route path="/signup" exact component={SignUp} />
            <Route path="/login" exact component={Login} />
            <Route path="/forgotpassword" exact component={ForgotPassword} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/settings" exact component={Settings} />
          </Switch>
          <Redirect to="/signup" />
        </div>
      </Router>
    </>
  );
}

export default App;
