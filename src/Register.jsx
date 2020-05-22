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

import { loginUser ,registerUser} from "./service.js";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography classTcsId={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          classTcsId={classes.closeButton}
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

function Register(props) {
  const [open, setOpen] = React.useState(true);

  const [TcsId, setTcsId] = React.useState(" ");
  const [name, setName] = React.useState(" ");
  const [password, setpassword] = React.useState(" ");
  const [confirmpassword, setconfirmpassword] = React.useState(" ");
  const [application, setapplication] = React.useState(" ");
  const [email, setemail] = React.useState(" ");




  const [errorfield, seterrorfield] = React.useState(-1);

  const [pageNumber, setPageNumber] = React.useState(1);

  const { setUserEffort,setUserNamePassword,setMasterEffort } = props;

  const classes = useStyles();

  const handleRegistrationFieldChange = (val, type) => {
    switch (type) {
      case "TcsId": {
        setTcsId(val);
        break;
      }
      case "Name": {
        console.log(type,'type')
        setName(val);
        break;
      }
      case "Gmail": {
        setTcsId(val);
        break;
      }
      case "password": {
        setpassword(val);
        break;
      }
      case "confirmpassword": {
        setconfirmpassword(val);
        break;
      }
      case "application": {
        setapplication(val);
        break;
      }
      case "email": {
        setemail(val);
        break;
      }
      default:
        break;
    }
  };

  const handleLoginFieldChange = (val, type) => {

    switch (type) {
        case "TcsId": {
          setTcsId(val);
          break;
        }
        case "Password": {
            setpassword(val);
          break;
        }
    }

  }

  const handleLogin = () => {
    if (!pageNumber) setPageNumber(1);
    else {
      if (!TcsId || TcsId.length < 4) seterrorfield(0);
      else if (!password || password.length < 4) seterrorfield(1);
      else {
        loginUser().then((res) => {
          console.log(res, "res loginUser");

          if (res) {setUserEffort(res.useEffort);setMasterEffort(res.useEffort);}
          setUserNamePassword([TcsId,password])
          setOpen(false);
        });
      }
    }
  };

  const handleRegister = (type) => {
    if (pageNumber) setPageNumber(0);

    console.log(TcsId);

    console.log(password);
    console.log(confirmpassword);

    console.log(name);

    console.log(application);

    console.log(email);


    if (!TcsId || TcsId.length < 4) seterrorfield(0);
    else if (!name || name.length < 4) seterrorfield(1);
    else if (!password || password.length < 4) seterrorfield(2);
    else if (!application || application.length < 4) seterrorfield(4);
    else if (!email || email.length < 4) seterrorfield(4);

    else if (TcsId && password) {

      console.log(TcsId);
      console.log(password);

      console.log(TcsId);

      console.log(application);

      // console.log(application);



      let userDetails = {
        username:TcsId,
        password:password,
        name:name,
        application:application,
        email:email
      }

      registerUser(userDetails).then((res) => {
        console.log(res, "res registerUser");
        if (res) {
          setUserNamePassword([TcsId,password])
          setOpen(false);
        }
      })


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
    if (type === "register")
      switch (index) {
        case "0": {
          return TcsId;
        }
        case "1": {
          return name;
        }
        case "2": {
          return password;
        }
        case "3": {
          return confirmpassword;
        }
        case "4": {
          return application;
        }   
        case "5": {
          return email;
        }
      }
    else
      switch (index) {
        case "0": {
          return TcsId;
        }
        case "1": {
          return password;
        }
      }
  };

  const getErrorMsg = () => {
    switch (errorfield) {
      case 0:
        return "Enter Valid TcsId !";
      case 1:
        return "Enter Valid Number !";
      case 2:
        return "Enter Valid Password !";
      case 3:
        return "Enter Same Password !";
      case 4:
        return "Enter Valid Email";
      case 5:
        return "Enter Valid Company";
      case 6:
        return "Enter Valid Address";
    }
  };

  return (
    <div>
      {
        <Dialog aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle
            id="customized-dialog-title"
            style={{
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            }}
          >
            {!pageNumber ? "Register" : "Login"} Yourself !
          </DialogTitle>

          <DialogContent dividers>
            <form className={classes.rootregister}>
              {!pageNumber
                ? stringConstants.REGISTERFIELDS.map((ind, index) => (
                    <TextField
                      key={index}
                      id={ind.id}
                      type={ind.type}
                      error={index === errorfield ? true : 0}
                      helperText={index === errorfield ? getErrorMsg() : ""}
                      required
                      label={ind.label}
                      color="primary"
                      onChange={(e) =>
                        handleRegistrationFieldChange(e.target.value, ind.id)
                      }
                      value={getValue("register", index)}
                    />
                  ))
                : stringConstants.LOGINFIELDS.map((ind, index) => (
                    <TextField
                      key={index}
                      id={ind.id}
                      type={ind.type}
                      error={index === errorfield ? true : 0}
                      helperText={
                        index === errorfield
                          ? "UserTcsId or Password is Wrong"
                          : ""
                      }
                      required
                      label={ind.label}
                      color="primary"
                      onChange={(e) =>
                        handleLoginFieldChange(e.target.value, ind.id)
                      }
                      value={getValue("login", index)}
                    />
                  ))}
            </form>
          </DialogContent>
          <DialogActions>
            <Grid container>
              <Grid item md={6} lg={6} sm={6} xs={6}>
                <StyledButton
                  onClick={() => {
                    handleRegister();
                  }}
                  color="primary"
                >
                  Register
                </StyledButton>
              </Grid>
              <Grid item md={6} lg={6} sm={6} xs={6}>
                <Grid container justify="flex-end" alignContent="center">
                  <StyledButton color="primary" onClick={(e) => handleLogin()}>
                    {!pageNumber ? "Existing user" : ""} Login
                  </StyledButton>
                </Grid>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      }
    </div>
  );
}

export default Register;
