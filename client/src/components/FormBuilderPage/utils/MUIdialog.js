import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";

import { withRouter } from "react-router-dom";

import { NOTCOMPLETEFORM, SERVER_ERROR } from "../constants/Types";
const ResponsiveDialog = ({ open, setOpen, history, message }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const handleClose = () => {
    setOpen(false);
  };
  const handleNoOption = () => {
    handleClose();
    history.push("/");
  };
  const SuccessMessage = (
    <>
      <DialogTitle id="responsive-dialog-title">
        {"Your form template was successfully created"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>do you wish to add another?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleNoOption} color="secondary">
          No
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </>
  );
  const FailedMessageEmpty = (
    <>
      <DialogTitle id="responsive-dialog-title">{"Error"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You must add at least one field and a title
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </>
  );
  const ErrorMessage = (
    <>
      <DialogTitle id="responsive-dialog-title">{"Error"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Something went wrong,please try again
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </>
  );

  const selectMessage = () => {
    if (message === NOTCOMPLETEFORM) {
      return FailedMessageEmpty;
    } else if (message === SERVER_ERROR) {
      return ErrorMessage;
    } else {
      return SuccessMessage;
    }
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {selectMessage()}
      </Dialog>
    </div>
  );
};

ResponsiveDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired
};
export default withRouter(ResponsiveDialog);
