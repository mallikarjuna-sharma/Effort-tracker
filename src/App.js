import { TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useState } from "react";
import DateTimePicker from "./DateTimePicker.js";
import GenerateTableComponent from "./table.js";

import Register from './Register.jsx'
import UpdateRecordPopup from './UpdateRecordPopup.js'

const axios = require("axios");

function App() {

  const [serviceURL, setserviceURL] = useState("localhost:5000");



  const [bookNow, setBookNow] = useState(false);

  const [openErrorPopUp, setopenErrorPopUp] = useState(false);

  const [OpenConfirmPopup, setOpenConfirmPopup] = useState(false);

  const [tableData, setTableData] = useState([]);



  const [selectedEndTime, setSelectedEndTime] = React.useState("");
  const [registrationForDate, setRegistrationForDate] = React.useState([]);



  const [userBooking, setUserBooking] = useState([]);

  const [openCancelPopUp, setOpenCancelPopup] = useState(false);



  // tcs effort app

  const [userEffort, setUserEffort] = useState([]);

  const [editRowId, setEditRowId] = useState(false);

  const [open, setOpen] = useState(false);

  const [selectedDate, setSelectedDate] = React.useState("");

  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const getTablesThatCanBeBooked = (slotArray) => {
    // console.log(slotArray, "result");

    let result = [];

    let resultLength = [];

    let tempArr = [];
    let success = true;

    for (let i = 1; i < 6; i++) {
      tempArr = [];
      success = true;

      if (registrationForDate[i]) {
        registrationForDate[i].forEach((e) => {
          tempArr.push(...e);
        });

        slotArray.forEach((e) => {
          if (tempArr.indexOf(e) > -1) {
            success = false;
            return;
          }
        });

        if (success) {
          result.push(i);
          resultLength.push(tempArr.length);
        }
      } else {
        if (success) {
          result.push(i);
          resultLength.push(tempArr.length);
        }
      }
    }

    console.log(result, "result");
    console.log(resultLength, "result");

    return [result, resultLength];
  };


  useEffect( () => console.log(selectedDate,'selectedDate'),[selectedDate])

  

  const handleAddUpdate = (effort,description,activityType,serviceElement,assyst,Eid ) => {


    if(selectedDate){
     let effortDetails =  [{
        "date":selectedDate,
        "effort":effort,
        "description":description,
        "activityType":activityType,
        "serviceElement":serviceElement,
        "assyst":assyst,
        "username":userName
    }];

    console.log(effortDetails,'effortDetails',Eid);  
       
    }






  }

  


  return (
    <Grid container justify="center" spacing={4}>
      {OpenConfirmPopup && (
        <ConfirmPopUp
          setOpenConfirmPopup={(e) => {
            if (e) setBookNow(true);
            setOpenConfirmPopup(false);
          }}
        />
      )}

      <Grid item>
        <Typography
          variant="h3"
          style={{
            fontSize: "72px",
            background: "-webkit-linear-gradient(#499F92, #333)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Hello ,
          {userName
            ? userName
            : tableData && tableData.length
            ? "Admin"
            : "Guest"}
        </Typography>
      </Grid>

      <Register setUserEffort={(e) => setUserEffort(e)} setUserNamePassword= {e => { setUserName(e[0]); setUserPassword(e[1]) } }/>

      <DateTimePicker
        setSelectedDate={(e) => setSelectedDate(e)}
      />

      <Grid item md={2} xs={12} sm={12}>
        <StyledButtonBlue
          onClick={() => {
            setOpen(true);
          }}
          disabled={false}
        >
          Add Efforts
        </StyledButtonBlue>
      </Grid>

     

      {(editRowId || open) && (
        <UpdateRecordPopup
          editRowId={editRowId}
          open={open}
          handleAddUpdate={(effort,description,activityType,serviceElement,assyst,Eid) => 
            { handleAddUpdate(effort,description,activityType,serviceElement,assyst,Eid) } }
          setOpen={(e) => setOpen(e)}
          setEditRowId={(e) => setEditRowId(e)}
        />
      )}

      {userEffort && userEffort.length ? (
        <Grid item md={11} xs={11} sm={11} lg={11}>
          <GenerateTableComponent
            columns={[
              { id: "id", label: "id" },
              { id: "description", label: "Description" },
              { id: "effort", label: "effort" },
              { id: "activityType", label: "Activity Type" },

              { id: "serviceElement", label: "ServiceElement" },
              { id: "assyst", label: "assyst" },
              { id: "username", label: "username" },
              { id: "edit", label: "Edit" },

              // {
              //   id: userBooking.length ? "cancellationStatus" : "UserName",
              //   label: userBooking.length ? "Drop Plan" : "Who",
              // },
            ]}
            tableData={userEffort}
            editRow={(e) => {
              setEditRowId(e);
              setOpen(1);
            }}
          />
        </Grid>
      ) : null}
    </Grid>
  );
}

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const StyledButtonBlue = withStyles({
  root: {
    background: "linear-gradient(45deg, #93CFC2 30%, #136F7E 90%)",
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



const ConfirmPopUp = (props) => {
  const { setOpenConfirmPopup } = props;

  return (
    <Dialog onClose={() => setOpenConfirmPopup(false)} open={1}>
      <DialogTitle
        id="customized-dialog-title"
        onClose={() => setOpenConfirmPopup(false)}
        style={{
          background: "linear-gradient(45deg, #93CFC2 30%, #136F7E 90%)",
        }}
      >
        Can I Book ?
      </DialogTitle>

      <DialogActions>
        <StyledButtonBlue
          onClick={(e) => {
            setOpenConfirmPopup(true);
          }}
        >
          Confirm
        </StyledButtonBlue>

        <StyledButtonBlue
          onClick={(e) => {
            setOpenConfirmPopup(false);
          }}
        >
          No !
        </StyledButtonBlue>
      </DialogActions>
    </Dialog>
  );
};

const useStylesSnack = makeStyles((theme) => ({
  rootsnack: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));



export default App;
