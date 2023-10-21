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
} from "@mui/material"

import Axios from "axios"

export default function AlertDialog(props) {
  const {
    dialogName,
    title,
    text,
    color,
    linkTo,
    butt1,
    butt2,
    successMess,
    errMess,
    butt1Color,
    butt2Color,
    ip,
  } = props
  const [open, setOpen] = useState(false)
  const [openalert, setopenalert] = useState(false)

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
        color={color}
        variant={open ? "contained" : "outlined"}
        onClick={handleClickOpen}
      >
        {dialogName}
      </Button>

      <Dialog
        sx={{ backdropFilter: "blur(1px)" }}
        open={open}
        onClose={handleClose}
        maxWidth
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color={butt2Color}>
            {butt2}
          </Button>
          <Button
            color={butt1Color}
            onClick={() => {
              Axios.post(`http://${ip}:6969/${linkTo}`, {}).then((resp) => {
                if (resp.data.ans || resp.data.del) {
                  setopenalert(true)
                  setOpen(false)
                }
              })
            }}
            autoFocus
          >
            {butt1}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ALERTS */}
      <>
        <Snackbar
          autoHideDuration={2500}
          onClose={handleopenalert}
          open={openalert}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleopenalert}
            severity="success"
            variant="standard"
          >
            {successMess}
          </Alert>
        </Snackbar>
        <Snackbar
          autoHideDuration={2500}
          onClose={handleopenalert}
          open={openalert}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleopenalert}
            severity="success"
            variant="standard"
          >
            {errMess}
          </Alert>
        </Snackbar>
      </>
    </>
  )
}
