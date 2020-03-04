import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import "../styles/FieldGenerator.css";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  extendedIcon: {
    marginLeft: theme.spacing(1)
  }
}));

const FieldGenerator = ({ AddField, handleClose, allInputsData }) => {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const makeTypesForSelect = () => {
    const types = ["text", "color", "date", "email", "tel", "number"];
    return types.map((type, index) => (
      <option key={index} value={type}>
        {type}
      </option>
    ));
  };

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const [singleFieldData, setSingleFieldData] = useState({
    fieldLabel: "",
    inputName: "",
    inputType: "",
    id: ""
  });

  const clearErrorOnDuplicate = () => {
    setIsError(false);
    setErrorMessage("");
  };
  const setErrorMessageOnDuplicate = () => {
    setErrorMessage("Name allready exists");
    setIsError(true);
  };
  const onChange = e => {
    if (isError) {
      clearErrorOnDuplicate();
    }
    setSingleFieldData({ ...singleFieldData, [e.target.name]: e.target.value });
  };

  const checkIfNameExist = () => {
    for (let index = 0; index < allInputsData.length; index++) {
      if (allInputsData[index].inputName === singleFieldData.inputName) {
        return true;
      }
    }
    return false;
  };
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    if (checkIfNameExist()) {
      setErrorMessageOnDuplicate();
      return;
    }
    clearErrorOnDuplicate();
    AddField(singleFieldData);
    handleClose();
  };

  const { fieldLabel, inputName, inputType } = singleFieldData;

  useEffect(() => {
    setSingleFieldData(prevSingleFieldData => ({
      ...prevSingleFieldData,
      id: uuidv4()
    }));
  }, []);

  const classes = useStyles();

  return (
    <form className="fieldGeneratorContainer" onSubmit={handleSubmit}>
      <div>
        <Typography variant="h4" component="h2" gutterBottom>
          Create Field
        </Typography>
      </div>

      <div>
        <TextField
          id="outlined-helperText"
          label="Input name"
          name="inputName"
          value={inputName}
          variant="outlined"
          onChange={onChange}
          helperText={errorMessage}
          error={isError}
        />
      </div>

      <div>
        <TextField
          id="outlined-helperText"
          label="Label name"
          name="fieldLabel"
          value={fieldLabel}
          variant="outlined"
          onChange={onChange}
        />
      </div>

      <div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
            Input type
          </InputLabel>
          <Select
            native
            value={inputType}
            onChange={onChange}
            labelWidth={labelWidth}
            inputProps={{
              name: "inputType",
              id: "outlined-age-native-simple"
            }}
          >
            <option value="" />
            {makeTypesForSelect()}
          </Select>
        </FormControl>
      </div>

      <div>
        <Tooltip title="Add new field" aria-label="add">
          <Fab
            variant="extended"
            color="primary"
            aria-label="add"
            type="submit"
          >
            Add
            <AddIcon className={classes.extendedIcon} />
          </Fab>
        </Tooltip>
      </div>
      <p></p>
    </form>
  );
};

FieldGenerator.propTypes = {
  AddField: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  allInputsData: PropTypes.array.isRequired
};
export default FieldGenerator;
