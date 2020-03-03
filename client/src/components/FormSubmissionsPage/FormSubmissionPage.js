import React, { useState, useEffect } from "react";
import { getFormData } from "./actions/FormSubmissionsActions";
import MUIstatictable from "./utils/MUIstatictable";
import Button from "@material-ui/core/Button";
import MUIdropback from "../LoadingSpinner/MUIdropback";
import "./styles/FormSubmissions.css";

const FormSubmissionPage = ({ match, history }) => {
  const [submissions, setSubmissions] = useState([]);
  const [formName, setFormName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function getFormDetails() {
      let formData = await getFormData(match.params.id);
      setSubmissions(formData.inputs);
      setFormName(formData.formName);
      setIsLoading(false);
    })();
  }, [match]);

  const returnToMain = () => {
    history.push("/");
  };

  return (
    <div className="formSubmissions">
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
      <MUIdropback open={isLoading} />
    </div>
  );
};

export default FormSubmissionPage;
