import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthed = () => {
    if (localStorage.token) {
      return true;
    }
    return false;
  };
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthed() ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
