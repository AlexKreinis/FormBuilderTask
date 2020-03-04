import React, { useState, useEffect } from "react";
import MUItable from "./utils/MUItable";
import MUIdropback from "../LoadingSpinner/MUIdropback";
import { getAllForms } from "./actions/FormListPageActions";
import "./styles/FormList.css";
const FormListPage = () => {
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const ErrorMessage = "Error";

  useEffect(() => {
    (async function getFormsFromServer() {
      let forms = await getAllForms();
      if (forms === ErrorMessage) {
        setIsError(true);
      } else {
        forms = forms.map(form => {
          return [form.formName, form.submits, form._id];
        });
        setForms([...forms]);
      }
      let loadDelay = 500;
      setTimeout(() => {
        setIsLoading(false);
      }, loadDelay);
    })();
  }, []);

  const successMessage = () => {
    return (
      <>
        <MUItable forms={forms} />
        <MUIdropback open={isLoading} />
      </>
    );
  };

  const errorMessage = () => {
    return <div className="errorMessage ">Something went wrong,try again</div>;
  };

  const showForms = () => {
    if (isError) {
      return errorMessage();
    }
    return successMessage();
  };

  return <div className="showTable">{showForms()}</div>;
};

export default FormListPage;
