import React, { useState, useEffect } from "react";
import { getFormData } from "./actions/FormSubmissionsActions";
import MUIstatictable from "./utils/MUIstatictable";
import Button from "@material-ui/core/Button";
import MUIdropback from "../LoadingSpinner/MUIdropback";
import PropTypes from "prop-types";
import "./styles/FormSubmissions.css";

const FormSubmissionPage = ({ match, history }) => {
  const ErrorMessage = "Error";
  const [submissions, setSubmissions] = useState([]);
  const [formName, setFormName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async function getFormDetails() {
      let formData = await getFormData(match.params.id);
      if (formData === ErrorMessage) {
        setIsError(true);
      } else {
        setSubmissions(formData.inputs);
        setFormName(formData.formName);
      }
      setIsLoading(false);
    })();
  }, [match]);

  const successMessage = () => {
    return (
      <>
        <div className="header">
          <p>All the submissions of the form</p>
          <h1>{formName}</h1>
        </div>
        <div>
          <MUIstatictable submissions={submissions} />
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={returnToMain}>
            Return
          </Button>
        </div>
      </>
    );
  };

  const errorMessage = () => {
    return (
      <>
        <div className="header">
          <h1>Something went wrong, try again later</h1>
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={returnToMain}>
            Return
          </Button>
        </div>
      </>
    );
  };

  const showSubmissions = () => {
    if (isError) {
      return errorMessage();
    }
    return successMessage();
  };
  const returnToMain = () => {
    history.push("/");
  };

  return (
    <div className="formSubmissions">
      <>{showSubmissions()}</>
      <MUIdropback open={isLoading} />
    </div>
  );
};

FormSubmissionPage.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
export default FormSubmissionPage;
