import React from "react";
import GitHubLogin from "react-github-login";
import { LoginWithGithub } from "./actions/LoginActions";
import "./styles/LoginPage.css";

const LoginPage = ({ history }) => {
  const onSuccess = suc => {
    console.log(suc.code);
    LoginWithGithub(suc.code);
    history.push("/FormListPage");
  };
  const onFailure = res => {
    console.log("failed", res);
  };

  return (
    <div className="LoginPage">
      <GitHubLogin
        clientId="e9f1e9e4962a75bb1f90"
        onSuccess={onSuccess}
        onFailure={onFailure}
        redirectUri="http://localhost:3000/"
      />
    </div>
  );
};

export default LoginPage;
