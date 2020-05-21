import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Dialog, Slide } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Typography, Grid, TextField } from "@material-ui/core";
import stringConstants from "./stringConstants.jsx";

import useStyles from "./styles.jsx";

import { loginUser } from "./service.js";

import { makeStyles } from "@material-ui/core/styles";

import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

const useStylesselect = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function UpdateRecordPopup(props) {
  const classesSelect = useStylesselect();

  const {
    editRowId: fieldValues,
    open,
    setOpen,
    setEditRowId,
    handleAddUpdate,
  } = props;

  const [effortId, seteffortId] = React.useState(
    fieldValues ? fieldValues["id"] : ""
  );

  const [effort, seteffort] = React.useState(
    fieldValues ? fieldValues["effort"] : ""
  );
  const [description, setdescription] = React.useState(
    fieldValues ? fieldValues["description"] : ""
  );
  const [activityType, setactivityType] = React.useState(
    fieldValues ? fieldValues["activityType"] : "core"
  );
  const [serviceElement, setserviceElement] = React.useState(
    fieldValues ? fieldValues["serviceElement"] : "Change Management"
  );
  const [assyst, setassyst] = React.useState(
    fieldValues ? fieldValues["assyst"] : ""
  );

  const [errorfield, seterrorfield] = React.useState(-1);

  const [showConfirmMsg, setShowConfirmMsg] = React.useState(0);

  React.useEffect(() => {
    setOpen(true);
    console.log(fieldValues, "fieldValues");
  }, []);

  const classes = useStyles();

  const handleTextFieldChange = (val, id) => {
    switch (id) {
      case "effort": {
        seteffort(val);
        break;
      }
      case "description": {
        setdescription(val);
        break;
      }
      case "assyst": {
        setassyst(val);
        break;
      }
      default:
        break;
    }
  };

  const StyledButton = withStyles({
    root: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 48,
      padding: "0 30px",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
    label: {
      textTransform: "capitalize",
    },
  })(Button);

  const getValue = (type, index) => {
    switch (index) {
      case 0: {
        return effort;
      }
      case 1: {
        return description;
      }
      case 2: {
        return assyst;
      }
    }
  };

  const getErrorMsg = () => {
    switch (errorfield) {
      case 0:
        return "Enter Effort";
      case 1:
        return "Enter More than 4 description";
      case 2:
        return "Enter Valid Password !";
      case 3:
        return "Enter Same Password !";
      case 4:
        return "Enter Valid Email";
    }
  };

  const handleFieldValidation = () => {
    if (!effort) seterrorfield(0);
    else if (!description || description.length < 4) seterrorfield(1);
  };

  return (
    <div>
      <Dialog
        onClose={() => {
          setOpen(false);
          setEditRowId(false);
        }}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          style={{
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          }}
        >
          {fieldValues ? " Edit Record" : "Add Records"}
        </DialogTitle>

        <DialogContent dividers>
          <form className={classes.rootregister}>
            {stringConstants.EDIT_POPUP.map((object, index) => (
              <TextField
                key={index}
                id={object.id}
                type={object.type}
                error={index === errorfield ? true : 0}
                helperText={index === errorfield ? getErrorMsg() : ""}
                required={object.id === "assyst" ? false : true}
                label={object.label}
                color="primary"
                onChange={(e) =>
                  handleTextFieldChange(e.target.value, object.id)
                }
                value={getValue(object, index)}
              />
            ))}
            <FormControl required className={classesSelect.formControl}>
              <InputLabel htmlFor="age-native-required">
                Service Element
              </InputLabel>
              <Select
                native
                value={serviceElement}
                onChange={(e) => setserviceElement(e.target.value)}
                name="age"
                inputProps={{
                  id: "age-native-required",
                }}
              >
                {stringConstants.SERVICE_ELEMENT.map((obj) => (
                  <option value={obj.id}>{obj.label}</option>
                ))}
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>

            <FormControl required className={classesSelect.formControl}>
              <InputLabel htmlFor="age-native-required">
                Activity Type 
              </InputLabel>
              <Select
                native
                value={activityType}
                onChange={(e) => setactivityType(e.target.value)}
                name="age"
                inputProps={{
                  id: "age-native-required",
                }}
              >
                {stringConstants.ACTIVITYTYPE.map((obj) => (
                  <option value={obj.id}>{obj.label}</option>
                ))}
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Grid container>
            <Grid item md={6} lg={6} sm={6} xs={6}>
              <StyledButton
                onClick={() => {
                  if (effort && description && activityType && serviceElement) {
                    if (!showConfirmMsg) setShowConfirmMsg(1);
                    else {
                      setShowConfirmMsg(0);
                      handleAddUpdate(
                        effort,
                        description,
                        activityType,
                        serviceElement,
                        assyst,
                        effortId
                      );
                    }
                  } else {
                    setShowConfirmMsg(0);
                    handleFieldValidation();
                  }
                }}
                color="primary"
              >
                {!showConfirmMsg
                  ? fieldValues
                    ? "Update"
                    : "Add"
                  : "Confirm Save"}
              </StyledButton>
            </Grid>

            {(fieldValues || showConfirmMsg) && (
              <Grid item md={6} lg={6} sm={6} xs={6}>
                <Grid container justify="flex-end" alignContent="center">
                  <StyledButton
                    color="primary"
                    onClick={(e) => {
                      if (showConfirmMsg) setShowConfirmMsg(0);
                    }}
                  >
                    {!showConfirmMsg ? "Delete" : "Cancel"}
                  </StyledButton>
                </Grid>
              </Grid>
            )}
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpdateRecordPopup;
