import { React, useState } from "react";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

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
  let {
    title,
    dialogName,
    butt1,
    butt2,
    doneMess,
    errMess,
    orCode,
    orName,
    orGrade,
    orYear,
    orSem,
    orExyear,
    orExmonth,
    rno,
    table,
    regdate,
    user,
    registrant,
    refcode,
    branch,
    ip,
  } = props;

  const [open, setOpen] = useState(false);
  const [buttvariant, setbuttvariant] = useState("outlined");
  const [donealert, setdonealert] = useState(false);
  const [erralert, seterralert] = useState(false);
  const [fill, setFill] = useState(false);

  const handleClickOpen = () => {
    setbuttvariant("contained");
    setOpen(true);
  };

  const handleClose = () => {
    setbuttvariant("outlined");
    setOpen(false);
  };

  const check = () => {
    if (table === "studentinfo") {
      if (
        orCode !== "" &&
        orName !== "" &&
        orGrade !== "" &&
        orYear !== "" &&
        Number.isInteger(orYear / 1) &&
        orSem !== "" &&
        Number.isInteger(orSem / 1) &&
        orExyear !== "" &&
        Number.isInteger(orExyear / 1) &&
        orExmonth !== "" &&
        Number.isInteger(orExmonth / 1)
      ) {
        return true;
      } else return false;
    } else {
      if (
        orCode !== "" &&
        orName !== "" &&
        orYear !== "" &&
        Number.isInteger(orYear / 1) &&
        orSem !== "" &&
        Number.isInteger(orSem / 1)
      ) {
        return true;
      } else return false;
    }
  };

  return (
    <div>
      <Button
        startIcon={<ModeEditOutlinedIcon />}
        disabled={user !== "admin"}
        size="large"
        variant={buttvariant}
        onClick={handleClickOpen}
        style={{ marginBottom: "2%" }}
      >
        {dialogName}
      </Button>
      <Dialog
        sx={{ backdropFilter: "blur(1px)" }}
        open={open}
        onClose={handleClose}
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
                  defaultValue={orCode}
                  onInput={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                    orCode = e.target.value;
                  }}
                />

                <TextField
                  style={{ margin: 8 }}
                  variant="outlined"
                  label="Subject Name"
                  defaultValue={orName}
                  onInput={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                    orName = e.target.value;
                  }}
                />

                <TextField
                  disabled={table !== "studentinfo"}
                  style={{ margin: 8 }}
                  variant="outlined"
                  label="Grade"
                  defaultValue={orGrade}
                  onInput={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                    orGrade = e.target.value;
                  }}
                />
              </Grid>

              <Grid irem xs={12}>
                <TextField
                  select
                  variant="outlined"
                  label="Year"
                  defaultValue={orYear}
                  onChange={(e) => {
                    orYear = e.target.value;
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
                  defaultValue={orSem}
                  onChange={(e) => {
                    orSem = e.target.value;
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
                  defaultValue={orExyear}
                  onInput={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                    orExyear = e.target.value;
                  }}
                  style={{ width: "40%", margin: 8 }}
                />

                <TextField
                  disabled={table !== "studentinfo"}
                  variant="outlined"
                  label="Ex Month"
                  defaultValue={orExmonth}
                  onInput={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                    orExmonth = e.target.value.toString();
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
                setbuttvariant("outlined");
                Axios.post(`http://${ip}:6969/editinfo`, {
                  subcode: orCode,
                  subname: orName,
                  grade: orGrade,
                  year: orYear,
                  sem: orSem,
                  exyear: orExyear,
                  exmonth: orExmonth,
                  rno: rno,
                  table: table,
                  regdate: regdate,
                  registrant: registrant,
                  branch: branch,
                  refcode: refcode,
                }).then((resp) => {
                  if (resp.data.done) {
                    setdonealert(true);
                  } else {
                    seterralert(true);
                  }
                });
                setOpen(false);
              } else setFill(true);
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
          {doneMess}
        </Alert>
      </Snackbar>

      <Snackbar
        autoHideDuration={2500}
        onClose={() => {
          seterralert(false);
        }}
        open={erralert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            seterralert(false);
          }}
          severity="error"
          variant="standard"
        >
          {errMess}
        </Alert>
      </Snackbar>

      <Snackbar
        autoHideDuration={2500}
        onClose={() => {
          setFill(false);
        }}
        open={fill}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setFill(false);
          }}
          severity="warning"
          variant="standard"
        >
          {`Enter all options correctly`}
        </Alert>
      </Snackbar>
    </div>
  );
}
