import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import MUImodal from "./utils/MUImodal.js";
const FormBuilderPage = () => {
  const [allInputsData, setAllInputsData] = useState([]);
  const [formName, setFormName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => {
    setOpenModal(true);
  };
  const AddField = addedField => {
    console.log(addedField);
    setAllInputsData([...allInputsData, { ...addedField }]);
  };

  const generateFields = () => {
    return allInputsData.map((inputData, index) => {
      return (
        <TextField
          id="outlined-helperText"
          variant="outlined"
          key={index}
          label={inputData.fieldLabel}
          name={inputData.inputName}
          type={inputData.inputType}
        />
      );
    });
  };
  return (
    <div>
      Build your form
      <button onClick={handleOpen}>Add field</button>
      {generateFields()}
      <MUImodal open={openModal} setOpen={setOpenModal} AddField={AddField} />
    </div>
  );
};

export default FormBuilderPage;
