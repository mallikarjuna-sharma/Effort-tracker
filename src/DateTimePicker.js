import "date-fns";
import React, { useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Grid, Typography } from "@material-ui/core";

export default function DateTimePicker(props) {
  // The first commit of Material-UI

  const [selectedDate, setSelectedDate] = React.useState(new Date());


  useEffect(() => {
    const formatDate =
      selectedDate.getFullYear() +
      "-" +
      "0"+
      (parseInt(selectedDate.getMonth())+1) +
      "-" +
      selectedDate.getDate();

    props.setSelectedDate(formatDate);
  }, [selectedDate]);

  

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="center" spacing={2}>

        <Grid item>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Select Date"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e);
          }}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        </Grid>
       
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
