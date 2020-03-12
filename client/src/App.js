import React from "react";
import FormListPage from "./components/FormsListPage/FormListPage";
import FormSubmitPage from "./components/FormSubmitPage/FormSubmitPage";
import FormSubmissionPage from "./components/FormSubmissionsPage/FormSubmissionPage";
import FormBuilderPage from "./components/FormBuilderPage/FormBuilderPage";
import LoginPage from "./components/LoginPage/LoginPage.js";
import PrivateRoute from "./components/LoginPage/PrivateRoute";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <LoginPage />} />
        <PrivateRoute exact path="/FormListPage" component={FormListPage} />
        <PrivateRoute exact path="/formbuilder" component={FormBuilderPage} />
        <PrivateRoute exact path="/submitpage/:id" component={FormSubmitPage} />
        <PrivateRoute
          exact
          path="/submissionpage/:id"
          component={FormSubmissionPage}
        />
      </Switch>
    </Router>
  );
}

export default App;
