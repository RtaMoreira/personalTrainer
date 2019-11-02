import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const AddTraining = props => {
  const [training, setTraining] = useState({
    date: new Date().now,
    duration: 0,
    activity: "",
    customer: ""
  });

  useEffect(() => {
    setTraining({ ...training, customer: props.customerId });
  },[]);

  const handleInputChange = event => {
    setTraining({ ...training, [event.target.name]: event.target.value });
    console.log(training);
  };

  const handleClose = () => {
    props.handleClose();
    setTraining({
      date: 0,
      duration: 0,
      activity: "",
      customer: ""
    });
  };

  const addTraining = () => {
    setTraining({ ...training, customer: props.customerId });
    props.saveTraining(training);
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New training</DialogTitle>
        <DialogContent>
          <DialogContentText>Fill training information here</DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date"
                format="MM/dd/yyyy"
                value={training.date}
                onChange={date => setTraining({ ...training, date: date })}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <TextField
            autoFocus
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={e => handleInputChange(e)}
            label="Activity"
            fullWidth
          />
          <TextField
            autoFocus
            type="number"
            margin="dense"
            name="duration"
            value={training.duraiton}
            onChange={e => handleInputChange(e)}
            label="Duration
            "
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={addTraining} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTraining;
