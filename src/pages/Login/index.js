import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserService from "../../services/UserService";
import { Context } from "../../shared/Util/context";
import LoginForm from "../../shared/components/LoginForm";
import "./Login.css";
import Header from "../../shared/components/Header";
import Button from "../../shared/Elements/Button";
const Login = () => {
  let history = useHistory();
  const { login } = useContext(Context);
  //login with {email, password}
  const submitFormHandler = async (data) => {
    try {
      await UserService.login(data);
      login();
      history.push("/");
      alert("login successfully");
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
        console.log(error.response);
      }
    }
  };
  return (
    <>
      <Header noChild>
        <span className="space"></span>
        <div className="header__actions flex-align">
          <Button
            color="primary"
            style={{
              padding: "0.5rem 1rem",
              color: "#fafafa",
              backgroundColor: "#0274de",
              marginLeft: "1.5rem",
            }}
            href="/?signup=true"
            className="header__actions__e"
            default
          >
            Signup
          </Button>
        </div>
      </Header>
      <div className="login__wrapper center">
        <LoginForm header={<h1>Login</h1>} login={submitFormHandler} />
      </div>
    </>
  );
};

export default Login;
