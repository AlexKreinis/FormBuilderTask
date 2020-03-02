import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./styles/FormSubmitPage.css";
import MUIdropback from "../LoadingSpinner/MUIdropback";

import { getForm, AddFormData } from "./actions/FormSubmitActions";

const FormSubmitPage = ({ match, history }) => {
  const [formData, setFormData] = useState({});
  const [formFields, setFormFields] = useState([]);
  const [formName, setFormName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function getFormDetails() {
      let formData = await getForm(match.params.id);
      setFormName(formData.formName);
      setFormFields(formData.inputs);
      setIsLoading(false);
    })();
  }, [match.params.id]);

  const onChange = (e, id) => {
    setFormData({
      ...formData,
      [e.target.name]: { value: e.target.value, refId: id }
    });
  };
  const returnToMainpage = () => {
    history.push("/");
  };
  const onSubmit = async e => {
    e.preventDefault();
    let res = await AddFormData({ formData, id: match.params.id });
    console.log(res);
    if (res === "Success") {
      history.push("/");
    }
  };

  const makeForm = () => {
    return formFields.map((inputData, index) => {
      return (
        <div className="addedField" key={index}>
          <TextField
            InputLabelProps={{
              shrink: true
            }}
            id="outlined-helperText"
            variant="outlined"
            key={index}
            label={inputData.fieldLabel}
            name={inputData.inputName}
            type={inputData.inputType}
            margin="normal"
            style={{ width: 200 }}
            onChange={e => onChange(e, inputData._id)}
          />
        </div>
      );
    });
  };

  return (
    <div className="FormSubmitPage">
      <div>
        <Card>
          <form className="FormContainer" onSubmit={onSubmit}>
            <div>
              <p>You can submit your form here</p>
              <h1>{formName}</h1>
            </div>
            {makeForm()}
            <div>
              {!isLoading && (
                <>
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    onClick={returnToMainpage}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </form>
        </Card>
      </div>
      <MUIdropback open={isLoading} />
    </div>
  );
};

export default FormSubmitPage;
