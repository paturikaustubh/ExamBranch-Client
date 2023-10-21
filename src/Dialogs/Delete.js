import { React, useState } from "react"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"

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
    butt1,
    butt2,
    alertMess,
    rollno,
    subcode,
    table,
    user,
    ip,
  } = props
  const [open, setOpen] = useState(false)
  const [buttvariant, setbuttvariant] = useState("outlined")
  const [openalert, setopenalert] = useState(false)

  const handleClickOpen = () => {
    setbuttvariant("contained")
    setOpen(true)
  }

  const handleClose = () => {
    setbuttvariant("outlined")
    setOpen(false)
  }

  const handleopenalert = () => {
    setopenalert(false)
  }
  return (
    <div>
      <Button
        startIcon={<DeleteOutlinedIcon />}
        disabled={user !== "admin"}
        size="large"
        color="error"
        variant={buttvariant}
        onClick={handleClickOpen}
        style={{ marginBottom: "1%" }}
      >
        {dialogName}
      </Button>
      <Dialog
        sx={{ backdropFilter: "blur(1px)" }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{title}</DialogTitle>

        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            color="warning"
            onClick={() => {
              setbuttvariant("outlined")
              Axios.post(`http://${ip}:6969/deleteinfo`, {
                rno: rollno,
                subcode: subcode,
                table: table,
              })
              setOpen(false)
              setopenalert(true)
            }}
            autoFocus
          >
            {butt1}
          </Button>
          <Button onClick={handleClose}>{butt2}</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        autoHideDuration={2500}
        onClose={handleopenalert}
        open={openalert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleopenalert} severity="success" variant="standard">
          {alertMess}
        </Alert>
      </Snackbar>
    </div>
  )
}
