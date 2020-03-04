import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";

import MUImodal from "./utils/MUImodal.js";
import MUIdialog from "./utils/MUIdialog.js";
import MUIdropback from "../LoadingSpinner/MUIdropback.js";

import {
  FORMNAME,
  FIELDGENERATOR,
  NOTCOMPLETEFORM,
  SERVER_ERROR
} from "./constants/Types";

import "./styles/FormBuilderPage.css";

import { AddFormFields } from "./actions/FormBuilderActions";

const FormBuilderPage = ({ history }) => {
  const [allInputsData, setAllInputsData] = useState([]);
  const [formName, setFormName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [modalChoice, setModalChoice] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const errorMessage = "Error";

  const openFormNameModal = () => {
    setModalChoice(FORMNAME);
    setOpenModal(true);
  };
  const openFieldGeneratorModal = () => {
    setModalChoice(FIELDGENERATOR);
    setOpenModal(true);
  };

  const AddField = addedField => {
    setAllInputsData([...allInputsData, { ...addedField }]);
  };

  const AddFormName = formName => {
    setFormName(formName);
  };

  const deleteField = id => {
    let tempInputs = allInputsData.filter(input => input.id !== id);
    setAllInputsData([...tempInputs]);
  };

  const generateFields = () => {
    return allInputsData.map((inputData, index) => {
      return (
        <div className="addedField" key={inputData.id}>
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
          />
          <Tooltip
            title="Delete this field"
            style={{ margin: 10 }}
            onClick={() => deleteField(inputData.id)}
          >
            <IconButton>
              <DeleteForeverIcon color="secondary" />
            </IconButton>
          </Tooltip>
        </div>
      );
    });
  };
  const notCompleteForm = () => {
    if (!formName || allInputsData.length === 0) {
      return true;
    }
    return false;
  };
  const showNotCompleteMessage = () => {
    setDialogMessage(NOTCOMPLETEFORM);
    setOpenDialog(true);
    setIsLoading(false);
  };
  const showBackendErrorMessage = () => {
    setDialogMessage(SERVER_ERROR);
  };

  const showFormCompleteMessage = () => {
    setAllInputsData([]);
    setFormName("");
    setOpenDialog(true);
    setIsLoading(false);
  };
  const submitForm = async e => {
    e.preventDefault();
    setIsLoading(true);
    if (notCompleteForm()) {
      showNotCompleteMessage();
      return;
    }
    await setDialogMessage("");
    let ansFromBackend = await AddFormFields(formName, allInputsData);
    if (ansFromBackend === errorMessage) {
      showBackendErrorMessage();
    }
    showFormCompleteMessage();
  };

  const returnToMainPage = () => {
    history.push("/");
  };

  return (
    <div className="container">
      <Card className="card">
        <Button
          className="AddFieldButton"
          variant="contained"
          color="primary"
          size="small"
          onClick={openFieldGeneratorModal}
          startIcon={<AddCircleOutlineIcon />}
        >
          Add new field
        </Button>
        <Button
          className="AddTitleButton"
          variant="contained"
          color="primary"
          size="small"
          onClick={openFormNameModal}
          startIcon={<AddCircleOutlineIcon />}
        >
          Title
        </Button>
        <div className="generatedForm">
          <h1 className="title">{formName}</h1>
          {generateFields()}
        </div>
        <Button
          className="SaveFormButton"
          variant="contained"
          color="secondary"
          size="small"
          onClick={submitForm}
          startIcon={<SaveIcon />}
        >
          Save form
        </Button>

        <Button
          className="CancelButton"
          variant="contained"
          size="small"
          onClick={returnToMainPage}
          startIcon={<CancelIcon />}
        >
          Cancel
        </Button>
        <MUImodal
          allInputsData={allInputsData}
          open={openModal}
          setOpen={setOpenModal}
          AddField={AddField}
          AddFormName={AddFormName}
          modalChoice={modalChoice}
        />
        <MUIdialog
          open={openDialog}
          setOpen={setOpenDialog}
          message={dialogMessage}
        />
        <MUIdropback open={isLoading} />
      </Card>
    </div>
  );
};

export default FormBuilderPage;
