import React, { useState, useEffect } from "react";
import { getFormData } from "./actions/FormSubmissionsActions";
import MUIstatictable from "./utils/MUIstatictable";
import Button from "@material-ui/core/Button";
import MUIdropback from "../LoadingSpinner/MUIdropback";

const FormSubmissionPage = ({ match, history }) => {
  const [submissions, setSubmissions] = useState([]);
  const [formName, setFormName] = useState("");
  useEffect(() => {
    (async function getFormDetails() {
      let formData = await getFormData(match.params.id);
      setSubmissions(formData.inputs);
      setFormName(formData.formName);
    })();
  }, [match]);
  const returnToMain = () => {
    history.push("/");
  };
  return (
    <div>
      <h3>{formName}</h3>
      <MUIstatictable submissions={submissions} />
      <div>
        <Button variant="contained" color="primary" onClick={returnToMain}>
          Return
        </Button>
      </div>
      <MUIdropback />
    </div>
  );
};

export default FormSubmissionPage;
