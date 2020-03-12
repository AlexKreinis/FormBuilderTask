import React from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthed = () => {
    if (localStorage.token) {
      if (localStorage.token) {
        axios.defaults.headers.common["x-auth-token"] = localStorage.token;
      } else {
        delete axios.defaults.headers.common["x-auth-token"];
      }
      return true;
    }
    return false;
  };
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthed() ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
