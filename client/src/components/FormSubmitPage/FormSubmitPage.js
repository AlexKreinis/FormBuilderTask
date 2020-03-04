import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./styles/FormSubmitPage.css";
import MUIdropback from "../LoadingSpinner/MUIdropback";
import AddToHomeScreenIcon from "@material-ui/icons/AddToHomeScreen";
import PropTypes from "prop-types";

import { getForm, AddFormData } from "./actions/FormSubmitActions";

const FormSubmitPage = ({ match, history }) => {
  const [formData, setFormData] = useState({});
  const [formFields, setFormFields] = useState([]);
  const [formName, setFormName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const successMessage = "Success";
  const errorMessage = "Error";

  useEffect(() => {
    (async function getFormDetails() {
      let formData = await getForm(match.params.id);
      if (formData === errorMessage) {
        setIsError(true);
      } else {
        setFormName(formData.formName);
        setFormFields(formData.inputs);
      }
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
    if (res === successMessage) {
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
            required
            margin="normal"
            style={{ width: 200 }}
            onChange={e => onChange(e, inputData._id)}
          />
        </div>
      );
    });
  };

  const successResponse = () => {
    return (
      <form className="FormContainer" onSubmit={onSubmit}>
        <div>
          <div className="formParagraph">
            <div>
              <AddToHomeScreenIcon />
            </div>
            <div>
              <p>You can submit your form here</p>
            </div>
          </div>

          <div className="formTitle">
            <h1>{formName}</h1>
          </div>
        </div>
        {makeForm()}

        {!isLoading && (
          <div className="formButtons">
            <div>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                onClick={returnToMainpage}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </form>
    );
  };

  const showErrorMessage = () => {
    return (
      <div className="errorMessage">
        <div>
          <h1>Something went wrong,please try again later</h1>
        </div>

        <div>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            onClick={returnToMainpage}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  };

  const showSubmitPage = () => {
    if (isError) {
      return showErrorMessage();
    }
    return successResponse();
  };
  return (
    <div className="FormSubmitPage">
      <div>
        <Card>{showSubmitPage()}</Card>
      </div>
      <MUIdropback open={isLoading} />
    </div>
  );
};

FormSubmitPage.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default FormSubmitPage;
