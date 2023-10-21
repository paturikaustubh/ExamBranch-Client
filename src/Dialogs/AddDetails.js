import { React, useState } from "react";
import AddIcon from "@mui/icons-material/Add";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  Snackbar,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";

import Axios from "axios";

export default function AlertDialog(props) {
  let { title, dialogName, butt1, butt2, rno, table, user, style, ip } = props;

  let subcode = "";
  let subname = "";
  let grade = "";
  let year = "";
  let sem = "";
  let exyear = "";
  let exmonth = "";

  const [open, setOpen] = useState(false);
  const [donealert, setdonealert] = useState(false);
  const [wrongAlert, setWrongAlert] = useState(false);
  const [dupeAlert, setDupeAlert] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const check = () => {
    if (table === "studentinfo") {
      if (
        subcode !== "" &&
        subname !== "" &&
        grade !== "" &&
        year !== "" &&
        Number.isInteger(year / 1) &&
        sem !== "" &&
        Number.isInteger(sem / 1) &&
        exyear !== "" &&
        Number.isInteger(exyear / 1) &&
        exmonth !== "" &&
        Number.isInteger(exmonth / 1)
      ) {
        return true;
      } else return false;
    } else {
      if (
        subcode !== "" &&
        subname !== "" &&
        year !== "" &&
        Number.isInteger(year / 1) &&
        sem !== "" &&
        Number.isInteger(sem / 1)
      ) {
        return true;
      } else return false;
    }
  };

  return (
    <div>
      <Button
        startIcon={<AddIcon />}
        disabled={user !== "admin"}
        variant={`contained`}
        onClick={handleClickOpen}
        style={style}
      >
        {dialogName}
      </Button>
      <Dialog
        sx={{ backdropFilter: "blur(1px)" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  style={{ margin: 8 }}
                  variant="outlined"
                  label="Subject Code"
                  onInput={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                    subcode = e.target.value;
                  }}
                />

                <TextField
                  style={{ margin: 8 }}
                  variant="outlined"
                  label="Subject Name"
                  onInput={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                    subname = e.target.value;
                  }}
                />

                <TextField
                  disabled={table !== "studentinfo"}
                  style={{ margin: 8 }}
                  variant="outlined"
                  label="Grade"
                  onInput={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                    grade = e.target.value;
                  }}
                />
              </Grid>

              <Grid irem xs={12}>
                <TextField
                  select
                  variant="outlined"
                  label="Year"
                  onChange={(e) => {
                    year = e.target.value;
                  }}
                  style={{ width: "40%", margin: 8 }}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                </TextField>

                <TextField
                  select
                  variant="outlined"
                  label="Sem"
                  onChange={(e) => {
                    sem = e.target.value;
                  }}
                  style={{ width: "40%", margin: 8 }}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                </TextField>

                <TextField
                  disabled={table !== "studentinfo"}
                  variant="outlined"
                  label="Ex Year"
                  onInput={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                    exyear = e.target.value;
                  }}
                  style={{ width: "40%", margin: 8 }}
                />

                <TextField
                  disabled={table !== "studentinfo"}
                  variant="outlined"
                  label="Ex Month"
                  onInput={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                    exmonth = e.target.value.toString();
                  }}
                  style={{ width: "40%", margin: 8 }}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              if (check()) {
                Axios.post(`http://${ip}:6969/addinfo`, {
                  subcode: subcode,
                  subname: subname,
                  grade: grade,
                  year: year,
                  sem: sem,
                  exyear: exyear,
                  exmonth: exmonth,
                  rollno: rno,
                  table: table,
                }).then((resp) => {
                  if (resp.data.done) {
                    setdonealert(true);
                  } else if (resp.data.wrongvalue) {
                    setWrongAlert(true);
                  } else if (resp.data.dupe) {
                    setDupeAlert(true);
                  }
                });
                setOpen(false);
              } else {
                setOpen(false);
                setWrongAlert(true);
              }
            }}
            autoFocus
          >
            {butt1}
          </Button>
          <Button onClick={handleClose} color="error">
            {butt2}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        autoHideDuration={2500}
        onClose={() => {
          setdonealert(false);
        }}
        open={donealert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setdonealert(false);
          }}
          severity="success"
          variant="standard"
        >
          {`${rno} details added`}
        </Alert>
      </Snackbar>

      <Snackbar
        autoHideDuration={2500}
        onClose={() => {
          setDupeAlert(false);
        }}
        open={dupeAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setDupeAlert(false);
          }}
          severity="warning"
          variant="standard"
        >
          {`Record already exists`}
        </Alert>
      </Snackbar>

      <Snackbar
        autoHideDuration={2500}
        onClose={() => {
          setWrongAlert(false);
        }}
        open={wrongAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setWrongAlert(false);
          }}
          severity="error"
          variant="standard"
        >
          {`Enter proper values`}
        </Alert>
      </Snackbar>
    </div>
  );
}
