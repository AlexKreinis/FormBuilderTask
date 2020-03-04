import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import FieldGenerator from "./FieldGenerator";
import FormNameGenerator from "./FormNameGenerator";
import PropTypes from "prop-types";
import { FORMNAME, FIELDGENERATOR } from "../constants/Types";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function TransitionsModal({
  open,
  setOpen,
  AddField,
  AddFormName,
  modalChoice,
  allInputsData
}) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };
  const whatModalToShow = () => {
    if (modalChoice === FORMNAME) {
      return (
        <FormNameGenerator
          AddFormName={AddFormName}
          handleClose={handleClose}
        />
      );
    } else if (modalChoice === FIELDGENERATOR) {
      return (
        <FieldGenerator
          AddField={AddField}
          handleClose={handleClose}
          allInputsData={allInputsData}
        />
      );
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>{whatModalToShow()}</div>
        </Fade>
      </Modal>
    </div>
  );
}
TransitionsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  AddField: PropTypes.func.isRequired,
  AddFormName: PropTypes.func.isRequired,
  modalChoice: PropTypes.string.isRequired,
  allInputsData: PropTypes.array.isRequired
};
