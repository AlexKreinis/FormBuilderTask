import React from "react";
import FormListPage from "./components/FormsListPage/FormListPage";
import FormSubmitPage from "./components/FormSubmitPage/FormSubmitPage";
import FormSubmissionPage from "./components/FormSubmissionsPage/FormSubmissionPage";
import FormBuilderPage from "./components/FormBuilderPage/FormBuilderPage";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <FormListPage />} />
        <Route exact path="/formbuilder" component={FormBuilderPage} />
        <Route exact path="/submitpage/:id" component={FormSubmitPage} />
        <Route
          exact
          path="/submissionpage/:id"
          component={FormSubmissionPage}
        />
      </Switch>
    </Router>
  );
}

export default App;
