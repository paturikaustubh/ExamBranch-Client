// import NavBar from "./Components/NavBar"
import { useState, useRef } from "react";
// import Bait from "./Components/Bait"
import Truncate from "./Dialogs/Truncate";
import {
  MenuItem,
  TextField,
  Button,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Divider,
  DialogActions,
  Grid,
  Typography,
  Container,
  ButtonGroup,
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
  MenuList,
} from "@mui/material";
import { Alert, Snackbar } from "@mui/material";
import Axios from "axios";
import HelpIcon from "@mui/icons-material/Help";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import dayjs from "dayjs";

const Download = ({ ip }) => {
  const [year, setyear] = useState(0);
  const [sem, setsem] = useState(0);
  const [down, setDown] = useState(false);
  const [downErr, setDownErr] = useState(false);
  const [table, settable] = useState("Supply");
  const [openHelp, setOpenHelp] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [notFoundAlert, setNotFoundAlert] = useState(false);
  const anchor = useRef(null);

  let downOpts = ["Registered", "Un-Registered", "Report"];

  const handleyears = (e) => {
    setyear(e.target.value);
  };
  const handlesems = (e) => {
    setsem(e.target.value);
  };

  const handleClose = (event) => {
    if (anchor.current && anchor.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleDownloads = () => {
    if (selectedIndex === 0) {
      Axios({
        method: "post",
        url: `http://${ip}:6969/Download${table}`,
        params: { year: year, sem: sem },
        responseType: "blob",
      })
        .then((res) => {
          if (res.data.type === "text/csv") {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
              "download",
              `${
                year !== 0 ? `${year}-${sem}` : "Complete"
              } ${table} Registered ${dayjs().format("D_MMM_YY (h_mm_A)")}.csv`
            );
            document.body.appendChild(link);
            link.click();
            setDown(true);
          } else setNotFoundAlert(true);
        })
        .catch(() => {
          setDownErr(true);
        });
    } else if (selectedIndex === 1) {
      Axios({
        method: "post",
        url: `http://${ip}:6969/Download${table}Print`,
        params: { year: year, sem: sem },
        responseType: "blob",
        headers: {},
        table: table,
      })
        .then((res) => {
          if (res.data.type === "text/csv") {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
              "download",
              `${
                year !== 0 ? `${year}-${sem}` : "Complete"
              } ${table} Un-Registered ${dayjs().format(
                "D_MMM_YY (h_mm_A)"
              )}.csv`
            );
            document.body.appendChild(link);
            link.click();
            setDown(true);
          } else setNotFoundAlert(true);
        })
        .catch(() => {
          downErr(true);
        });
    } else if (selectedIndex === 2) {
      Axios({
        method: "post",
        url: `http://${ip}:6969/Download${table}Rep`,
        params: { year: year, sem: sem },
        responseType: "blob",
        headers: {},
        table: table,
      })
        .then((res) => {
          if (res.data.type === "text/csv") {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
              "download",
              `${table} Report ${dayjs().format("D_MMM_YY (h_mm_A)")}.csv`
            );
            document.body.appendChild(link);
            link.click();
            // alert("Downloading File")
            setDown(true);
          } else setNotFoundAlert(true);
        })
        .catch(() => {
          // alert("There was an error while downloading")
          setDownErr(true);
        });
    }
  };

  const handleMenuItemClick = (_, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <title>Download</title>
      <Grid container display={"flex"} justifyContent="center" mb={4}>
        <Typography
          variant="h3"
          component="span"
          fontWeight="600"
          color="info.main"
        >
          Download
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
            Download
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText textAlign="justify" fontWeight={500}>
            <h2 className="help">
              <>Overview</>
            </h2>
            <p>
              Download paid/registered entries (<code>Paid Log</code>), pending
              payment/registration entries (<code>Print Log</code>) and summary
              of the regitered students for a particualr exam (
              <code>Report</code>).
            </p>
            <Divider />
            <br />
            <h2 className="help">
              <>Parameters</>
            </h2>
            <p>
              <span className="helpHead">Exam</span> - Exam that you want to
              download the details of.
            </p>
            <p>
              <span className="helpHead">Year</span> - Students' year{" "}
              <Typography
                variant="h6"
                component={"span"}
                color="warning.main"
                fontWeight={500}
              >
                (NOT APPLICABLE FOR <code>REPORT</code>)
              </Typography>
            </p>
            <p>
              <span className="helpHead">Semester</span> - Students' semester{" "}
              <Typography
                variant="h6"
                component={"span"}
                color="warning.main"
                fontWeight={500}
              >
                (NOT APPLICABLE FOR <code>REPORT</code>)
              </Typography>
            </p>
            <Divider />
            <br />
            <h2 className="help">
              <>Procedure</>
            </h2>
            <p>
              Select the exam that you want to download the details of (by
              default it is always <code>Supplementary</code>). Then select the{" "}
              <code>Year</code> and <code>Semester</code> and then download the
              required details. By default both the values will be set to{" "}
              <code>All</code> and <code>Both</code> respectively. That is, the
              entire table will be downloaded irrespective of the year and
              semester.
            </p>
            <Divider />
            <br />
            <h2 className="help">
              <>Exceptions</>
            </h2>

            <p>
              If there is any problem while downloading, try restarting the
              server, this should solve the problem. If this doesn't work,
              contact the developer.
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size="large"
            onClick={() => {
              setOpenHelp(false);
            }}
          >
            okay
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} sm={4} md={2}>
          <TextField
            fullWidth
            size="large"
            label="Exam"
            select
            defaultValue={"Supply"}
            style={{
              backgroundColor: "white",
            }}
            onChange={(e) => {
              settable(e.target.value);
            }}
          >
            <MenuItem value={"Supply"}>Supplementary</MenuItem>,
            <MenuItem value={"Reval"}>Re-Evaluation</MenuItem>,
            <MenuItem value={"CBT"}>CBT</MenuItem>,
          </TextField>
        </Grid>
      </Grid>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={4} md={2}>
          <TextField
            fullWidth
            disabled={selectedIndex === 2}
            defaultValue={0}
            select
            size="large"
            style={{
              backgroundColor: "white",
            }}
            label="Year"
            onChange={handleyears}
          >
            {[
              <MenuItem value={0}>All</MenuItem>,
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
            disabled={selectedIndex === 2}
            defaultValue={0}
            select
            size="large"
            style={{
              backgroundColor: "white",
            }}
            label="Semester"
            onChange={handlesems}
          >
            {[
              <MenuItem value={0}>Both</MenuItem>,
              <MenuItem value={1}>1</MenuItem>,
              <MenuItem value={2}>2</MenuItem>,
            ]}
          </TextField>
        </Grid>
      </Grid>
      <ButtonGroup
        variant="contained"
        size="large"
        disabled={(year === 0 && sem !== 0) || (year !== 0 && sem === 0)}
      >
        <Button fullWidth onClick={handleDownloads}>
          {downOpts[selectedIndex]}
        </Button>
        <Button size="small" ref={anchor} onClick={() => setOpen(!open)}>
          {!open ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </Button>
      </ButtonGroup>
      <div align="right" style={{ bottom: 5, position: "fixed", right: 10 }}>
        <Truncate
          ip={ip}
          dialogName={`Truncate`}
          text={`This action cannot be undone!`}
          table={table}
          year={year}
          sem={sem}
          butt1={`Confirm`}
          butt2={`Cancel`}
          alertMess={`Records truncated`}
        />
      </div>

      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchor.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: "left center",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {downOpts.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      <Snackbar
        open={down}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => {
          setDown(false);
        }}
      >
        <Alert
          severity="success"
          variant="standard"
          onClose={() => {
            setDown(false);
          }}
        >{`Downloading file`}</Alert>
      </Snackbar>

      <Snackbar
        open={downErr}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => {
          setDownErr(false);
        }}
      >
        <Alert
          severity="error"
          variant="standard"
          onClose={() => {
            setDownErr(false);
          }}
        >
          There was an error while downloading
        </Alert>
      </Snackbar>

      <Snackbar
        open={notFoundAlert}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => {
          setNotFoundAlert(false);
        }}
      >
        <Alert
          severity="warning"
          variant="standard"
          onClose={() => {
            setNotFoundAlert(false);
          }}
        >
          No data found
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Download;
