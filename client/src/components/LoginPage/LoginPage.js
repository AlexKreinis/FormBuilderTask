import React from "react";
import GitHubLogin from "react-github-login";
import axios from "axios";
import Button from "@material-ui/core/Button";

const LoginPage = () => {
  const onSuccess = suc => {
    console.log("success", suc);
    LoggingIn(suc.code);
  };
  const onFailure = res => {
    console.log("failed", res);
  };

  const loggingIn = async token => {};

  return (
    <div>
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
