// eslint-disable-next-line no-unused-vars
import React, { useState } from "react"
import Axios from "axios"

import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
  Container,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
  Alert,
  Snackbar,
} from "@mui/material"

import HelpIcon from "@mui/icons-material/Help"

import BackupLoc from "./TemplateImgs/backupLoc.png"

const Back = ({ ip }) => {
  const [loc, setloc] = useState("")
  const [opt, setopt] = useState("backup")
  const [started, setstarted] = useState(false)
  const [restore, setrestore] = useState(false)
  const [updated, setupdated] = useState(false)
  const [updatefail, setupdatefail] = useState(false)
  const [downloading, setdownloading] = useState(false)
  const [downerror, setdownerror] = useState(false)
  const [openHelp, setOpenHelp] = useState(false)

  const rest = () => {
    setrestore(true)
    Axios.post(`http://${ip}:6969/UpBack`, {
      loc: loc,
    }).then((resp) => {
      if (resp.data.done) {
        setupdated(true)
      } else if (resp.data.err) {
        setupdatefail(true)
        console.log(
          "BACKUP ERROR!!\nCheck for duplicates OR there is data already in the database OR the format of the CSV file might be wrong."
        )
      }
    })
  }

  return (
    <Container maxWidth="xl">
      <title>Backup and Restore</title>
      <Grid
        container
        display={"flex"}
        justifyContent="center"
        mb={4}
        alignItems="center"
      >
        <Typography
          variant="h3"
          component="span"
          fontWeight="600"
          color="info.main"
        >
          Backup and Restore
          <Tooltip title="Help">
            <IconButton
              onClick={() => {
                setOpenHelp(true)
              }}
              color="primary"
            >
              <HelpIcon />
            </IconButton>
          </Tooltip>
        </Typography>
      </Grid>

      <Grid
        container
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        mb={4}
      >
        <Grid item md={2} sm={4} xs={12}>
          <TextField
            fullWidth
            select
            label="Action"
            size="large"
            style={{
              backgroundColor: "white",
            }}
            defaultValue={"backup"}
            onChange={(e) => {
              setopt(e.target.value)
            }}
          >
            {[
              <MenuItem value={"backup"}>Backup</MenuItem>,
              <MenuItem value={"restore"}>Restore</MenuItem>,
            ]}
          </TextField>
        </Grid>
      </Grid>
      <Grid
        container
        gap={2}
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        {opt === "backup" && (
          <>
            <Grid item md={2} sm={4} xs={12}>
              <Button
                size="large"
                variant="contained"
                style={{ marginRight: "1%" }}
                onClick={() => {
                  setstarted(true)
                  Axios.post(`http://${ip}:6969/DownBack`, {
                    responseType: "blob",
                  })
                    .then((resp) => {
                      if (resp.data.del !== false) {
                        const url = window.URL.createObjectURL(
                          new Blob([resp.data])
                        )
                        const link = document.createElement("a")
                        link.href = url
                        link.setAttribute("download", `backup.csv`)
                        document.body.appendChild(link)
                        link.click()
                        setdownloading(true)
                      } else {
                        setdownerror(true)
                      }
                    })
                    .catch()
                }}
              >
                Create Backup
              </Button>
            </Grid>
          </>
        )}
        {opt === "restore" && (
          <>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h5" color="error">
                  <>
                    The file name MUST be <code>"backup.csv"</code>
                  </>
                </Typography>
              </Grid>
            </Grid>
            <Grid container gap={4}>
              <Grid item sm={4} xs={12}>
                <TextField
                  fullWidth
                  label="Folder Location"
                  size="large"
                  style={{
                    backgroundColor: "white",
                  }}
                  onChange={(e) => {
                    setloc(e.target.value)
                  }}
                />
              </Grid>
              <Grid item md={2} sm={4} xs={12} alignSelf={"center"}>
                <Button
                  size="large"
                  variant="contained"
                  onClick={rest}
                  htmlType="submit"
                >
                  Restore
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>

      <Snackbar
        autoHideDuration={2500}
        open={started}
        onClose={() => {
          setstarted(false)
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="info"
          variant="standard"
          onClose={() => {
            setstarted(false)
          }}
        >
          Backup started
        </Alert>
      </Snackbar>

      <Snackbar
        autoHideDuration={2500}
        open={restore}
        onClose={() => {
          setrestore(false)
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="info"
          variant="standard"
          onClose={() => {
            setrestore(false)
          }}
        >
          Restore started. Check server console for progress.
        </Alert>
      </Snackbar>

      <Snackbar
        autoHideDuration={2500}
        open={updated}
        onClose={() => {
          setupdated(false)
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="standard"
          onClose={() => {
            setupdated(true)
          }}
        >
          Restored data
        </Alert>
      </Snackbar>

      <Snackbar
        autoHideDuration={2500}
        open={updatefail}
        onClose={() => {
          setupdatefail(false)
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="error"
          variant="standard"
          onClose={() => {
            setupdatefail(false)
          }}
        >
          There was a problem while restoring
        </Alert>
      </Snackbar>

      <Snackbar
        autoHideDuration={2500}
        open={downloading}
        onClose={() => {
          setdownloading(false)
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="standard"
          onClose={() => {
            setdownloading(false)
          }}
        >
          Started downloading
        </Alert>
      </Snackbar>

      <Snackbar
        autoHideDuration={2500}
        open={downerror}
        onClose={() => {
          setdownerror(false)
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="error"
          variant="standard"
          onClose={() => {
            setdownerror(false)
          }}
        >
          There was a problem while downloading file
        </Alert>
      </Snackbar>

      <Dialog
        sx={{ backdropFilter: "blur(1px)" }}
        open={openHelp}
        onClose={() => {
          setOpenHelp(false)
        }}
        maxWidth
      >
        <DialogTitle
          justifyContent={"space-between"}
          display="flex"
          alignItems={"center"}
        >
          {opt === "backup" ? (
            <Typography variant="h3" color="primary.main" fontWeight="600">
              Backup
            </Typography>
          ) : (
            <Typography variant="h3" color="primary.main" fontWeight="600">
              Restore
            </Typography>
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText textAlign="justify" fontWeight={500}>
            <h2 className="help">
              <>Overview</>
            </h2>
            <p>
              You can create a backup of entire student's details table as a{" "}
              <code>.csv</code> file. You can even restore the data from any
              previous backup file.
            </p>
            <Divider />
            <h2 className="help">
              <>Parameters</>
            </h2>
            <p>
              <span className="helpHead">Action</span> - Action that you want to
              perform. Ex: <code>Backup</code> or <code>Restore</code>
            </p>
            <p style={{ ...(opt === "backup" && { display: "none" }) }}>
              <span className="helpHead">Folder Location</span> - Folder
              location of the backup file that is to be uploaded
            </p>
            <Divider />
            <br />
            <h2 className="help">
              <>Procedure</>
            </h2>
            <p style={{ ...(opt === "restore" && { display: "none" }) }}>
              Select <code>Create Backup</code> button to start fetching data
              from the table and downloading it as a <code>.csv</code> file
            </p>
            <p style={{ ...(opt === "backup" && { display: "none" }) }}>
              Once the backup file is ready with proper name, copy the folder
              path of the file
            </p>
            <div align="center">
              <img
                src={BackupLoc}
                alt="Folder location"
                width={"550px"}
                style={{ ...(opt === "backup" && { display: "none" }) }}
              />
            </div>
            <p style={{ ...(opt === "backup" && { display: "none" }) }}>
              {" "}
              and paste it in the text box provide. Then click{" "}
              <code>Restore</code> button and the restoration gets started. You
              can check the progress in the server's console.
            </p>

            <Divider />
            <br />
            <h2 className="help">
              <>Exceptions</>
            </h2>
            <p style={{ ...(opt === "backup" && { display: "none" }) }}>
              During restoring, if there is no file found with the proper name,
              the restoration will not be started. And if there is any problem
              with the file, the restoration will be stopped.
            </p>
            <p style={{ ...(opt === "restore" && { display: "none" }) }}>
              Once after clicking the <code>Create Backup</code> button, it
              might take some time to download; based on the client's system
              configuration.
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenHelp(false)
            }}
          >
            okay
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Back
