import Axios from "axios";
import React, { useState } from "react";

import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Snackbar,
  Typography,
  Container,
} from "@mui/material";

import {
  TextField,
  MenuItem,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import HelpIcon from "@mui/icons-material/Help";
import UploadFormat from "./TemplateImgs/resultsUploadFormat.png";
import UploadExample from "./TemplateImgs/resultsUploadeExample.png";
import FolderLoc from "./TemplateImgs/folderLocation.png";
import Console from "./TemplateImgs/consoleLog.png";

const Update = ({ ip }) => {
  const [openHelp, setOpenHelp] = useState(false);
  const [loc, setloc] = useState("");
  const [clicked, setclicked] = useState(false);
  const [task, settask] = useState(false);
  const [year, setyear] = useState(0);
  const [sem, setsem] = useState(0);
  const [table, settable] = useState("regular");
  const [paidtable, setpaidtable] = useState("Supple");
  const [exYear, setexyear] = useState(0);
  const [exMonth, setexmonth] = useState(0);
  const [up, setUp] = useState(false);
  const [paidUp, setPaidUp] = useState(false);
  const [tot, setTot] = useState(0);
  const [erTot, setErTot] = useState(0);
  const [type, settype] = useState("results");
  const [err, setErr] = useState(false);
  const [codeFileErr, setCodeFileErr] = useState(false);
  const [codeUpErr, setCodeUpErr] = useState(false);
  const [codeUpDone, setCodeUpDone] = useState(false);
  const [errFiles, setErrFiles] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const goback = () => {
    setclicked(false);
    settask(false);
  };

  const handletable = (e) => {
    settable(e.target.value);
  };
  const handleyears = (e) => {
    setyear(e.target.value);
  };
  const handlesems = (e) => {
    setsem(e.target.value);
  };

  return (
    <Container maxWidth="xl">
      <title>Upload</title>
      <Grid container display={"flex"} justifyContent="center" mb={4}>
        <Typography
          variant="h3"
          component="span"
          fontWeight="600"
          color="info.main"
        >
          Upload
          <Tooltip title="Help">
            <IconButton
              onClick={() => {
                setOpenHelp(true);
              }}
              color="primary"
            >
              <HelpIcon />
            </IconButton>
          </Tooltip>
        </Typography>
      </Grid>

      <div id="dialog">
        <Dialog
          sx={{ backdropFilter: "blur(1px)" }}
          open={openHelp}
          onClose={() => {
            setOpenHelp(false);
          }}
          maxWidth
        >
          <DialogTitle
            justifyContent={"space-between"}
            display="flex"
            alignItems={"center"}
          >
            <Typography variant="h3" color="primary.main" fontWeight={600}>
              Upload
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText textAlign="justify" fontWeight={500}>
              <h2 className="help">
                <>Overview</>
              </h2>
              <p>
                Upload results/regisered student's details into the database.
              </p>
              <p>
                The files MUST have <code>.csv</code> as it's extension.
              </p>
              <Divider />
              <br />
              {type === "results" ? (
                <>
                  <h2 className="help">
                    <>Parameters (Results)</>
                  </h2>
                  <p>
                    <span className="helpHead">Exam</span> - Type of exam
                    results you are uploading (Regular/Supplementary/CBT)
                  </p>
                  <p>
                    <span className="helpHead">Year</span> - Student's year
                    during the exam (1/2/3/4)
                  </p>
                  <p>
                    <span className="helpHead">Semester</span> - Student's
                    semester during the exam (1/2)
                  </p>
                  <p>
                    <span className="helpHead">Exam Year</span> - Academic year
                    of the exam (ex: 2023)
                  </p>
                  <p>
                    <span className="helpHead">Exam Month</span> - Month of the
                    academic year of the exam (1-12)
                  </p>
                  <p>
                    <span className="helpHead">Folder Location</span> - Folder's
                    location of the file(s) to be uploaded
                  </p>
                  <Divider />
                  <br />
                  <h2 className="help">
                    <>Procedure</>
                  </h2>
                  <p>In excel, enter all the details in the right format</p>
                  <div align="center">
                    <img src={UploadFormat} alt="Results upload format" />
                  </div>
                  <p>
                    For every item inside {"<>"}, replace the slot with their
                    respective values
                  </p>
                  <div align="center">
                    <img src={UploadExample} alt="Results upload example" />
                  </div>
                  <br />
                  <p>
                    <Typography
                      variant="h5"
                      component={"span"}
                      color="error"
                      fontWeight={500}
                    >
                      THE SUBJECT CODE AND SUBJECT NAME MUST BE SEPARATED WITH
                      '-' ONLY. SPACE IN BETWEEN IS NOT ACCEPTED
                    </Typography>
                  </p>
                  <p>
                    Once all the data is entered into the excel, save the file
                    as <code>csv</code> file.
                    <br />
                    Ex: <code>3-1Regular.csv</code>
                  </p>
                  <p>
                    Change the exam (if required) and enter all the parameters
                    correctly and paste the folder location of the file(s)
                  </p>
                  <div align="center">
                    <img
                      src={FolderLoc}
                      alt="Folder location"
                      width={"550px"}
                    ></img>
                  </div>
                  <br />
                  <p>Once done, you can now upload the files.</p>
                  <p>
                    <Typography
                      variant="h5"
                      component={"span"}
                      color="error"
                      fontWeight={500}
                    >
                      ONE FILE MUST CONTAIN ONE SHEET ONLY
                    </Typography>
                  </p>
                  <Divider />
                  <br />
                </>
              ) : (
                <>
                  <h2 className="help">
                    <>Parameters (Registered Entries)</>
                  </h2>
                  <p>
                    <span className="helpHead">Exam</span> - Registered entries
                    for the exam you are uploading
                    (Supplementary/Re-Evaluation/CBT)
                  </p>
                  <p>
                    <span className="helpHead">Folder Location</span> - Folder
                    location of the file(s)
                  </p>
                  <Divider />
                  <br />
                  <h2 className="help">
                    <span className="helpHead">
                      Procedure (Registered Entries)
                    </span>
                  </h2>
                  <p>
                    There is no file format as the table will already be in the
                    right format. Use this option to upload only when the
                    entries of the table are deleted from the database.
                  </p>
                  <p>
                    Best works with latest copy of the table. The table can be
                    downloaded from the <code>Download</code> Section
                  </p>
                  <p>After selecting the exam, paste the folder location</p>
                  <div align="center">
                    <img
                      src={FolderLoc}
                      alt="Folder Location"
                      width={"550px"}
                    />
                  </div>
                  <br />
                  <div>
                    <>YOU ARE NOT SUPPOSED TO MAKE ANY CHANGES TO THE FILE!</>
                  </div>
                  <div>
                    Upload the file the way it was after it was downloaded. Any
                    change in the file leads to inconsistency of data in the
                    database
                  </div>
                  <p />
                  <Divider />
                  <br />
                </>
              )}
              <h2 className="help">
                <>Exceptions</>
              </h2>
              <p>
                If there is any problem while uploading, you will be alerted
                with the reason. If there are any error files (un-uploaded
                files), the file names will be displayed in the log. To access
                the log, click <code>F12</code> button, and go to{" "}
                <code>Console</code> section.
              </p>
              <div align="center">
                <img src={Console} width="550px" alt="Console"></img>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenHelp(false);
              }}
            >
              okay
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} sm={4} md={2}>
          <TextField
            fullWidth
            select
            style={{
              backgroundColor: "white",
            }}
            defaultValue={"results"}
            onChange={(e) => {
              settype(e.target.value);
            }}
          >
            {[
              <MenuItem value={"results"}>Results</MenuItem>,
              <MenuItem value={"paid"}>Registered Entries</MenuItem>,
              <MenuItem value={"codes"}>Code Names</MenuItem>,
            ]}
          </TextField>
        </Grid>
      </Grid>
      {type === "results" && (
        <>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={4} md={2}>
              <TextField
                fullWidth
                select
                defaultValue={"regular"}
                size="large"
                style={{
                  backgroundColor: "white",
                }}
                label="Exam"
                onChange={handletable}
                disabled={clicked}
              >
                {[
                  <MenuItem value={"regular"}>Regular</MenuItem>,
                  <MenuItem value={"supply"}>
                    Supplementary/Re-Evaluation
                  </MenuItem>,
                  <MenuItem value={"cbt"}>CBT</MenuItem>,
                ]}
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={4} md={2}>
              <TextField
                fullWidth
                select
                size="large"
                allowClear
                style={{
                  backgroundColor: "white",
                }}
                label="Year"
                onChange={handleyears}
                disabled={clicked}
              >
                {[
                  <MenuItem value={1}>1</MenuItem>,
                  <MenuItem value={2}>2</MenuItem>,
                  <MenuItem value={3}>3</MenuItem>,
                  <MenuItem value={4}>4</MenuItem>,
                ]}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <TextField
                fullWidth
                select
                size="large"
                style={{
                  backgroundColor: "white",
                }}
                label="Semester"
                onChange={handlesems}
                disabled={clicked}
              >
                {[
                  <MenuItem value={1}>1</MenuItem>,
                  <MenuItem value={2}>2</MenuItem>,
                ]}
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={4} md={2}>
              <TextField
                fullWidth
                label="Exam Year"
                size="large"
                style={{
                  backgroundColor: "white",
                }}
                disabled={clicked}
                onChange={(e) => {
                  if (parseInt(e.target.value) > 2000) {
                    setexyear(parseInt(e.target.value));
                  } else {
                    setexyear(0);
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <TextField
                fullWidth
                label="Exam Month"
                size="large"
                style={{
                  backgroundColor: "white",
                }}
                disabled={clicked}
                onChange={(e) => {
                  if (
                    parseInt(e.target.value) >= 1 &&
                    parseInt(e.target.value) <= 12
                  ) {
                    setexmonth(parseInt(e.target.value));
                  } else {
                    setexmonth(0);
                  }
                }}
              />
            </Grid>
          </Grid>
          <Dialog
            open={openConfirmDialog}
            maxWidth="sm"
            fullWidth
            sx={{ backdropFilter: "blur(1px)" }}
          >
            <DialogTitle component={"div"}>
              <Typography component={"span"} variant="h4">
                Upload for{" "}
              </Typography>
              <Typography component={"span"} variant="h3" color="error.main">
                {table.toUpperCase()}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                This will upload {type} values of {table}.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                size="large"
                color="error"
                onClick={() => setOpenConfirmDialog(false)}
              >
                Cancel
              </Button>
              <Button
                size="large"
                color="primary"
                onClick={() => {
                  Axios.post(`http://${ip}:6969/Update${table}`, {
                    acYear: year,
                    sem: sem,
                    exYear: exYear,
                    exMonth: exMonth,
                    loc: loc,
                  }).then((resp) => {
                    if (resp.data["done"]) {
                      setTot(resp.data["tot"]);
                      setErTot(resp.data["ertot"]);
                      setUp(true);
                      goback();
                    }
                    if (resp.data.err) {
                      setErr(true);
                    }
                    if (resp.data["ertot"] > 0) {
                      setErTot(resp.data["ertot"]);
                      console.log(`${table} error files:\n${resp.data.erf}`);
                      setErrFiles(true);
                    }
                  });
                }}
              >
                Upload
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}

      {year !== 0 &&
        sem !== 0 &&
        exYear !== 0 &&
        exMonth !== 0 &&
        type === "results" && (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="large"
                placeholder="Folder Location"
                style={{
                  backgroundColor: "white",
                }}
                disabled={clicked}
                onChange={(e) => {
                  setloc(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              {!task && (
                <Button
                  size="large"
                  disabled={loc.length === 0}
                  startIcon={<FileUploadOutlinedIcon />}
                  type="submit"
                  variant="contained"
                  onClick={() => setOpenConfirmDialog(true)}
                >
                  Upload
                </Button>
              )}
            </Grid>
          </Grid>
        )}

      {type === "paid" && (
        <>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={4} md={2}>
              <TextField
                fullWidth
                select
                label="Exam"
                defaultValue={"Supple"}
                size="large"
                style={{
                  backgroundColor: "white",
                }}
                onChange={(e) => {
                  setpaidtable(e.target.value);
                }}
                disabled={clicked}
              >
                {[
                  <MenuItem value={"Supple"}>Supplementary</MenuItem>,
                  <MenuItem value={"Reval"}>Re-Evaluation</MenuItem>,
                  <MenuItem value={"Cbt"}>CBT</MenuItem>,
                ]}
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="large"
                placeholder="Folder location"
                style={{
                  backgroundColor: "white",
                }}
                onChange={(e) => {
                  setloc(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                size="large"
                variant="contained"
                disabled={loc.length === 0}
                onClick={() => setOpenConfirmDialog(true)}
              >{`Update Paid ${paidtable}`}</Button>
            </Grid>
          </Grid>
          <Dialog
            open={openConfirmDialog}
            maxWidth="sm"
            fullWidth
            sx={{ backdropFilter: "blur(1px)" }}
          >
            <DialogTitle component={"div"}>
              <Typography component={"span"} variant="h4">
                Upload for{" "}
              </Typography>
              <Typography component={"span"} variant="h3" color="error.main">
                {paidtable.toUpperCase()}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                This will upload {type} values of {paidtable}.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                size="large"
                color="error"
                onClick={() => setOpenConfirmDialog(false)}
              >
                Cancel
              </Button>
              <Button
                size="large"
                color="primary"
                onClick={() => {
                  Axios.post(`http://${ip}:6969/UpdatePaid${paidtable}`, {
                    loc: loc,
                  }).then((resp) => {
                    if (resp.data["done"]) {
                      // alert(
                      //   `Uploaded ${resp.data["tot"]} files.\nWith ${resp.data["ertot"]} error files.`
                      // )
                      setOpenConfirmDialog(false);
                      setTot(resp.data["tot"]);
                      setErTot(resp.data["ertot"]);
                      setPaidUp(true);
                    }
                    if (resp.data["tot"] > 0) {
                      console.log(
                        `Paid ${table} error files:\n${resp.data["erf"]}`
                      );
                    }
                    if (resp.data.err) {
                      setErr(true);
                    }
                  });
                }}
              >
                Upload
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}

      {type === "codes" && (
        <>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12}>
              <Typography variant="h6" color={"error"}>
                The file name MUST be <code>code-names.csv</code>
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="large"
                placeholder="Folder Location"
                sx={{ backgroundColor: "white" }}
                onChange={(e) => {
                  setloc(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                size="large"
                variant="contained"
                onClick={() => {
                  Axios.post(`http://${ip}:6969/codeNames`, {
                    loc: loc,
                  }).then((resp) => {
                    if (resp.data.fileErr) setCodeFileErr(true);
                    else if (resp.data.upErr) setCodeUpErr(true);
                    else if (resp.data.done) setCodeUpDone(true);
                  });
                }}
              >
                upload
              </Button>
            </Grid>
          </Grid>
        </>
      )}

      <Snackbar
        open={up}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => {
          setUp(false);
        }}
      >
        <Alert
          variant="standard"
          severity="success"
          onClose={() => {
            setUp(false);
          }}
        >{`Uploaded ${tot} file(s).\nWith ${erTot} error file(s)`}</Alert>
      </Snackbar>

      <Snackbar
        open={paidUp}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => {
          setPaidUp(false);
        }}
      >
        <Alert
          variant="standard"
          severity="success"
          onClose={() => {
            setPaidUp(false);
          }}
        >{`Uploaded ${tot} file(s).\nWith ${erTot} error file(s)`}</Alert>
      </Snackbar>

      <Snackbar
        open={err}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => {
          setErr(false);
        }}
      >
        <Alert
          variant="standard"
          severity="error"
          onClose={() => {
            setErr(false);
          }}
        >{`There was a problem while uploading`}</Alert>
      </Snackbar>

      <Snackbar
        open={codeFileErr}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => {
          setCodeFileErr(false);
        }}
      >
        <Alert
          variant="standard"
          severity="warning"
          onClose={() => {
            setCodeFileErr(false);
          }}
        >{`File not found`}</Alert>
      </Snackbar>

      <Snackbar
        open={codeUpErr}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => {
          setCodeUpErr(false);
        }}
      >
        <Alert
          variant="standard"
          severity="error"
          onClose={() => {
            setCodeUpErr(false);
          }}
        >{`There was a problem while uploading`}</Alert>
      </Snackbar>

      <Snackbar
        open={codeUpDone}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => {
          setCodeUpDone(false);
        }}
      >
        <Alert
          variant="standard"
          severity="success"
          onClose={() => {
            setCodeUpDone(false);
          }}
        >{`File uploaded`}</Alert>
      </Snackbar>

      <Snackbar
        open={errFiles}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => {
          setErrFiles(false);
        }}
      >
        <Alert
          variant="standard"
          severity="error"
          onClose={() => {
            setErrFiles(false);
          }}
        >{`${erTot} file(s) not uploaded. Check console for file names.`}</Alert>
      </Snackbar>
    </Container>
  );
};

export default Update;
