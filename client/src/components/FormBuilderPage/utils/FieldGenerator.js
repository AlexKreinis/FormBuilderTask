import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
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

const FieldGenerator = ({ AddField, handleClose }) => {
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
    inputType: ""
  });

  const onChange = e => {
    setSingleFieldData({ ...singleFieldData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    AddField(singleFieldData);
    handleClose();
  };

  const { fieldLabel, inputName, inputType } = singleFieldData;

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
          label="Label name"
          name="fieldLabel"
          value={fieldLabel}
          variant="outlined"
          onChange={onChange}
        />
      </div>

      <div>
        <TextField
          id="outlined-helperText"
          label="Input name"
          name="inputName"
          value={inputName}
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
    </form>
  );
};

export default FieldGenerator;
