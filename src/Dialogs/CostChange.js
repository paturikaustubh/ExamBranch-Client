import { React, useState, useEffect } from "react"

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
  Grid,
  TextField,
  Divider,
} from "@mui/material"

import Axios from "axios"

export default function AlertDialog(props) {
  const {
    dialogName,
    title,
    color,
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
  const [supBase, setSupBase] = useState()
  const [supAdd, setSupAdd] = useState()
  const [supMax, setSupMax] = useState()
  const [reval, setReval] = useState()
  const [cbtBase, setCbtBase] = useState()
  const [cbtAdd, setCbtAdd] = useState()
  const [cbtMax, setCbtMax] = useState()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleopenalert = () => {
    setopenalert(false)
  }

  useEffect(() => {
    Axios.post(`http://${ip}:6969/getCosts`).then((resp) => {
      setSupBase(resp.data.arr[0])
      setSupAdd(resp.data.arr[1])
      setSupMax(resp.data.arr[2])
      setReval(resp.data.arr[3])
      setCbtBase(resp.data.arr[4])
      setCbtAdd(resp.data.arr[5])
      setCbtMax(resp.data.arr[6])
    })
  }, [])

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
          <DialogContentText>
            <Typography variant="h5" mb={2}>
              Supplementary
            </Typography>
            <Grid
              container
              textAlign={"center"}
              spacing={2}
              mb={2}
              columns={12}
            >
              <Grid item xs={4}>
                <TextField
                  type="number"
                  size="large"
                  label="Base Cost"
                  defaultValue={supBase}
                  onChange={(e) => {
                    setSupBase(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  size="large"
                  label="Additional Cost"
                  defaultValue={supAdd}
                  onChange={(e) => {
                    setSupAdd(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  size="large"
                  label="Maximum Cost"
                  defaultValue={supMax}
                  onChange={(e) => {
                    setSupMax(e.target.value)
                  }}
                />
              </Grid>
            </Grid>
            {/* <Grid container textAlign={"center"} spacing={2} mb={2} columns={12}>
        <Grid item xs={3}>
          <TextField
type="number" size="large" label="Fine-1" />
        </Grid>
        <Grid item xs={3}>
          <TextField
type="number" size="large" label="Fine-2" />
        </Grid>
        <Grid item xs={3}>
          <TextField
type="number" size="large" label="Fine-3" />
        </Grid>
        <Grid item xs={3}>
          <TextField
type="number" size="large" label="Fine-4" />
        </Grid>
      </Grid> */}

            <br />
            <Divider />
            <br />

            <Typography variant="h5" mb={2}>
              Re-Evaluation
            </Typography>
            <Grid container alignContent={"space-around"} spacing={4}>
              <Grid item sx={3}>
                <TextField
                  type="number"
                  size="large"
                  label="Cost"
                  defaultValue={reval}
                  onChange={(e) => {
                    setReval(e.target.value)
                  }}
                />
              </Grid>
            </Grid>

            <br />
            <Divider />
            <br />

            <Typography variant="h5" mb={2}>
              CBT
            </Typography>
            <Grid
              container
              textAlign={"center"}
              spacing={2}
              mb={2}
              columns={12}
            >
              <Grid item xs={4}>
                <TextField
                  type="number"
                  size="large"
                  label="Base Cost"
                  defaultValue={cbtBase}
                  onChange={(e) => {
                    setCbtBase(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  size="large"
                  label="Additional Cost"
                  defaultValue={cbtAdd}
                  onChange={(e) => {
                    setCbtAdd(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  size="large"
                  label="Maximum Cost"
                  defaultValue={cbtMax}
                  onChange={(e) => {
                    setCbtMax(e.target.value)
                  }}
                />
              </Grid>
            </Grid>
            {/* <Grid container textAlign={"center"} spacing={2} mb={2} columns={12}>
        <Grid item xs={3}>
          <TextField
type="number" size="large" label="Fine-1" />
        </Grid>
        <Grid item xs={3}>
          <TextField
type="number" size="large" label="Fine-2" />
        </Grid>
        <Grid item xs={3}>
          <TextField
type="number" size="large" label="Fine-3" />
        </Grid>
        <Grid item xs={3}>
          <TextField
type="number" size="large" label="Fine-4" />
        </Grid>
      </Grid> */}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color={butt2Color}>
            {butt2}
          </Button>
          <Button
            color={butt1Color}
            onClick={() => {
              Axios.post(`http://${ip}:6969/Costs`, {
                sbc: supBase,
                sac: supAdd,
                smc: supMax,
                reval: reval,
                cbc: cbtBase,
                cac: cbtAdd,
                cmc: cbtMax,
              }).then((resp) => {
                if (resp.data.done) {
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
