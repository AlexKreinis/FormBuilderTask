import React, { useState, useEffect } from "react";
import MUItable from "./utils/MUItable";
import MUIdropback from "../LoadingSpinner/MUIdropback";
import { getAllForms } from "./actions/FormListPageActions";
const FormListPage = props => {
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function getFormsFromServer() {
      let forms = await getAllForms();
      let loadDelay = 500;
      forms = forms.map(form => {
        return [form.formName, form.submits, form._id];
      });

      await setForms([...forms]);
      setTimeout(() => {
        setIsLoading(false);
      }, loadDelay);
    })();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <MUItable forms={forms} />
      <MUIdropback open={isLoading} />
    </div>
  );
};

export default FormListPage;
