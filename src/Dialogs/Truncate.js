import { React, useState } from "react"

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  Snackbar,
  Typography,
} from "@mui/material"

import Axios from "axios"

export default function AlertDialog(props) {
  const { text, dialogName, butt1, butt2, alertMess, table, year, sem, ip } =
    props
  const [open, setOpen] = useState(false)
  const [openalert, setopenalert] = useState(false)
  const [truncErr, setTruncErr] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleopenalert = () => {
    setopenalert(false)
  }
  return (
    <>
      <Button
        size="large"
        color="error"
        variant="contained"
        onClick={handleClickOpen}
        style={{ marginBottom: "4%" }}
      >
        {dialogName}
      </Button>
      <Dialog
        maxWidth
        sx={{ backdropFilter: "blur(1px)" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {year === 0 && sem === 0 ? (
            <Typography variant="h5">
              Are you sure about clearing{" "}
              <Typography
                variant="h4"
                component="span"
                color={"primary.main"}
                fontWeight={500}
              >
                {table}
              </Typography>{" "}
              table?
            </Typography>
          ) : (
            <Typography variant="h5">
              Are you sure about deleting{" "}
              <Typography
                variant="h4"
                color="primary.main"
                component="span"
                fontWeight={500}
              >
                {year}-{sem} {table}
              </Typography>{" "}
              details?
            </Typography>
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            variant="h6"
            color={"error.main"}
          >
            {text}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>{butt2}</Button>
          <Button
            color="warning"
            onClick={() => {
              Axios.post(`http://${ip}:6969/Trunc${table}`, {
                year: year,
                sem: sem,
              }).then((resp) => {
                if (resp.data.del) {
                  setopenalert(true)
                  setOpen(false)
                } else setTruncErr(true)
              })
            }}
            autoFocus
          >
            {butt1}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        sx={{ zIndex: 1 }}
        autoHideDuration={2500}
        onClose={handleopenalert}
        open={openalert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleopenalert} severity="success" variant="standard">
          {alertMess}
        </Alert>
      </Snackbar>

      <Snackbar
        sx={{ zIndex: 1 }}
        autoHideDuration={2500}
        onClose={() => setTruncErr(false)}
        open={truncErr}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setTruncErr(false)}
          severity="error"
          variant="standard"
        >
          There was an error while deleting
        </Alert>
      </Snackbar>
    </>
  )
}
