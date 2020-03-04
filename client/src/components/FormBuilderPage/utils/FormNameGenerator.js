import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";

const FormNameGenerator = ({ AddFormName, handleClose }) => {
  const [formName, setFormName] = useState("");

  const onChange = e => {
    setFormName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    AddFormName(formName);
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" component="h2" gutterBottom>
        Edit form name
      </Typography>
      <TextField
        id="outlined-helperText"
        label="Form Name"
        name="formName"
        value={formName}
        variant="outlined"
        onChange={onChange}
      />
      <Tooltip title="Add new form name" aria-label="add">
        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          type="submit"
          style={{ marginLeft: 20 }}
        >
          Add
          <AddIcon />
        </Fab>
      </Tooltip>
    </form>
  );
};
FormNameGenerator.propTypes = {
  AddFormName: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};
export default FormNameGenerator;
