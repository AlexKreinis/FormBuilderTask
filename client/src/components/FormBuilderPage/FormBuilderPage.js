import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import MUImodal from "./utils/MUImodal.js";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import "./styles/FormBuilderPage.css";
import { FORMNAME, FIELDGENERATOR } from "./constants/Types";

const FormBuilderPage = ({ history }) => {
  const [allInputsData, setAllInputsData] = useState([]);
  const [formName, setFormName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalChoice, setModalChoice] = useState("");

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

  const generateFields = () => {
    return allInputsData.map((inputData, index) => {
      return (
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
      );
    });
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
          startIcon={<SaveIcon />}
        >
          Add new field
        </Button>
        <Button
          className="AddTitleButton"
          variant="contained"
          color="primary"
          size="small"
          onClick={openFormNameModal}
          startIcon={<SaveIcon />}
        >
          Add form title
        </Button>
        <div className="generatedForm">
          <h4 style={{ marginTop: "10px" }}>{formName}</h4>
          {generateFields()}
        </div>
        <Button
          className="SaveFormButton"
          variant="contained"
          color="secondary"
          size="small"
          // onClick={handleOpen}
          startIcon={<SaveIcon />}
        >
          Save form
        </Button>

        <Button
          className="CancelButton"
          variant="contained"
          size="small"
          onClick={returnToMainPage}
          startIcon={<SaveIcon />}
        >
          Cancel
        </Button>
        <MUImodal
          open={openModal}
          setOpen={setOpenModal}
          AddField={AddField}
          AddFormName={AddFormName}
          modalChoice={modalChoice}
        />
      </Card>
    </div>
  );
};

export default FormBuilderPage;
