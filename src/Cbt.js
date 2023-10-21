import { useState, useEffect } from "react"
import {
  TextField,
  MenuItem,
  Button,
  Paper,
  Autocomplete,
  Backdrop,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Divider,
  Tooltip,
  DialogContent,
  Typography,
  Grid,
  Container,
} from "@mui/material"
import { Alert, Snackbar } from "@mui/material"
import Axios from "axios"
import water from "./Components/clgLogo.png"
import { useRef } from "react"
import SearchIcon from "@mui/icons-material/Search"
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined"
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined"
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined"
import HelpIcon from "@mui/icons-material/Help"
import Barcode from "react-barcode"

const Cbt = ({ ip }) => {
  const branches = useRef([])
  const [branch, setbranch] = useState([])
  const [rollno, setrollno] = useState("")
  const [basecosts, setbasecosts] = useState("")
  const [addcosts, setaddcosts] = useState("")
  const [maxcosts, setmaxcosts] = useState("")
  const [subs, setsubs] = useState([])
  const [data, setdata] = useState(0)
  const [gen, setgen] = useState(false)
  const [render, setrender] = useState(false)
  const [reg, setreg] = useState(false)
  const [changed, setchanged] = useState(false)
  const [invalid, setinvalid] = useState(false)
  const [regyear, setregyear] = useState(0)
  const [mapper, setmapper] = useState({})
  const [names, setnames] = useState([])
  const [year, setyear] = useState(0)
  const [sem, setsem] = useState(0)
  const [clicked, setclick] = useState(false)
  const [regSubs, setRegSubs] = useState([])
  const [empty, setEmpty] = useState(false)
  const [printData, setPrintData] = useState(false)
  const [printErrAlert, setPrintErrAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openHelp, setOpenHelp] = useState(false)
  const [openPrintDialog, setOpenPrintDialog] = useState(false)

  let subcodes = []

  useEffect(() => {
    Axios.post(`http://${ip}:6969/Branch`).then((res) => {
      res.data.forEach((e) => {
        setbranch((b) => [...b, <MenuItem value={e}>{e}</MenuItem>])
      })
    })
    Axios.post(`http://${ip}:6969/getCosts`).then((res) => {
      setbasecosts(res.data.arr[0]["cbc"])
      setaddcosts(res.data.arr[0]["cac"])
      setmaxcosts(res.data.arr[0]["cfc"])
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [false])

  const handlebranch = (e) => {
    setPrintData(false)
    branches.current = e.target.value
  }
  const handlerollno = (e) => {
    e.target.value = e.target.value.toUpperCase()
    setEmpty(false)
    setPrintData(false)
    setrollno(e.target.value)
    setrender(false)
    setclick(false)
  }
  const handlebasecosts = (e) => {
    setbasecosts(e.target.value)
  }
  const handleaddcosts = (e) => {
    setaddcosts(e.target.value)
  }
  const handlemaxcosts = (e) => {
    setmaxcosts(e.target.value)
  }
  const handleyears = (e) => {
    setPrintData(false)
    setyear(e.target.value)
  }
  const handlesems = (e) => {
    setPrintData(false)
    setsem(e.target.value)
  }

  const calc = () => {
    if (subs.length > 0) {
      if (subs.length === 1) {
        return (
          <>
            <h3>
              {" "}
              <>
                Grand Total: {basecosts} ({subs.length} Subject)
              </>
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Barcode
                value={rollno}
                width={2}
                height={40}
                displayValue={false}
              />
            </div>
          </>
        )
      } else if (subs.length >= 5) {
        return (
          <>
            <h3>
              {" "}
              <br />
              <>
                Grand Total: {maxcosts} ({subs.length} Subjects)
              </>
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Barcode
                value={rollno}
                width={2}
                height={40}
                displayValue={false}
              />
            </div>
          </>
        )
      } else {
        if (!isNaN(parseInt(basecosts)) && !isNaN(parseInt(addcosts))) {
          let b = parseInt(basecosts)
          let ad = parseInt(addcosts)
          return (
            <>
              <h3>
                {" "}
                <br />
                <>
                  Grand Total: {b + ad * (subs.length - 1)} ({subs.length}{" "}
                  Subjects)
                </>
              </h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Barcode
                  value={rollno}
                  width={2}
                  height={40}
                  displayValue={false}
                />
              </div>
            </>
          )
        }
      }
    }
  }
  const rendsubs = () => {
    if (clicked && render) {
      return (
        <>
          <Paper
            style={{
              marginTop: "2%",
              marginBottom: "1%",
              padding: "2%",
              backgroundImage: `url(${water})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            elevation={0}
          >
            <div align="center">
              <Grid container spacing={4} columns={12} align="center">
                <Grid item xs={4}>
                  <h3>
                    <>{rollno} (CBT)</>
                  </h3>
                </Grid>
                <Grid item xs={4}>
                  <h2>
                    <>Exam Branch Copy</>
                  </h2>
                </Grid>
                <Grid item xs={4}>
                  <h3>
                    <>
                      {new Date().getDate()}/{new Date().getMonth() + 1}/
                      {new Date().getFullYear()}
                    </>
                  </h3>
                </Grid>
              </Grid>

              <Grid container textAlign="center" mt={1}>
                <Grid item xs={12}>
                  <h3>{`${year}-${sem} (${branches.current})`}</h3>
                </Grid>
              </Grid>
              <Container maxWidth="md">
                <Autocomplete
                  readOnly={gen || printData}
                  multiple
                  onChange={(_e, val) => {
                    subcodes = []
                    val.forEach((value) => {
                      subcodes.push(
                        Object.keys(mapper).find((key) => mapper[key] === value)
                      )
                    })
                    setsubs(subcodes)
                    setRegSubs(val)
                    if (val.length === 0) {
                      setEmpty(true)
                    } else setEmpty(false)
                  }}
                  disableCloseOnSelect
                  options={names}
                  getOptionLabel={(option) => option}
                  defaultValue={[...names]}
                  filterSelectedOptions
                  renderInput={(val) => <TextField {...val} label="Subjects" />}
                />
              </Container>

              {calc()}
            </div>
            {gen && rend11()}
            {gen && rend22()}
            {!gen && (
              <Button
                disabled={empty}
                style={{ marginLeft: "4%", marginTop: "2%" }}
                startIcon={<ListAltOutlinedIcon />}
                onClick={() => {
                  setgen(true)
                }}
              >
                Generate Student Copy
              </Button>
            )}
          </Paper>
          <div className="lastbuttons" align="right">
            <style>{`@media print{.lastbuttons{display:none;}`}</style>
            {gen && (
              <Button
                size="large"
                className="print"
                onClick={() => {
                  setOpenPrintDialog(true)
                }}
                startIcon={<LocalPrintshopOutlinedIcon />}
                variant="outlined"
                style={{ marginRight: "8%", backgroundColor: "white" }}
              >
                Print
              </Button>
            )}
          </div>
        </>
      )
    }
  }

  const rend11 = () => {
    return (
      <div>
        <br />
        <hr />
        <br />
        <Grid container spacing={4} columns={12} align="center">
          <Grid item xs={4}>
            <h3>
              <>{rollno} (CBT)</>
            </h3>
          </Grid>
          <Grid item xs={4}>
            <h2>
              <>Student Copy</>
            </h2>
          </Grid>
          <Grid item xs={4}>
            <h3>
              <>
                {new Date().getDate()}/{new Date().getMonth() + 1}/
                {new Date().getFullYear()}
              </>
            </h3>
          </Grid>
        </Grid>
        <Grid container textAlign="center" mt={1}>
          <Grid item xs={12}>
            <h3>{`${year}-${sem} (${branches.current})`}</h3>
          </Grid>
        </Grid>
        <br />
        <div align="center">
          <Container maxWidth="md">
            <Autocomplete
              readOnly={gen}
              multiple
              disableCloseOnSelect
              options={regSubs}
              getOptionLabel={(option) => option}
              defaultValue={[...regSubs]}
              filterSelectedOptions
              renderInput={(val) => <TextField {...val} label="Subjects" />}
            />
          </Container>

          {calc()}
          <br />
          <h4>
            <>
              AFTER PAYING THE FEE IN ACCOUNTS SECTION, THE RECEIPT MUST BE
              SUBMITTED IN THE EXAM BRANCH TO COMPLETE YOUR REGISTRATION
            </>
          </h4>
        </div>
        <br />
        <br />
      </div>
    )
  }

  const rend22 = () => {
    return (
      <div>
        <br />
        <hr />
        <br />
        <Grid container spacing={4} columns={12} align="center">
          <Grid item xs={4}>
            <h3>
              <>{rollno} (CBT)</>
            </h3>
          </Grid>
          <Grid item xs={4}>
            <h2>
              <>Accounts Copy</>
            </h2>
          </Grid>
          <Grid item xs={4}>
            <h3>
              <>
                {new Date().getDate()}/{new Date().getMonth() + 1}/
                {new Date().getFullYear()}
              </>
            </h3>
          </Grid>
        </Grid>

        <Grid container textAlign="center" mt={1}>
          <Grid item xs={12}>
            <h3>{`${year}-${sem} (${branches.current})`}</h3>
          </Grid>
        </Grid>
        <br />
        <div align="center">
          <Container maxWidth="md">
            <Autocomplete
              readOnly={gen}
              multiple
              disableCloseOnSelect
              options={regSubs}
              getOptionLabel={(option) => option}
              defaultValue={[...regSubs]}
              filterSelectedOptions
              renderInput={(val) => <TextField {...val} label="Subjects" />}
            />
          </Container>

          {calc()}
        </div>
      </div>
    )
  }

  return (
    <Container maxWidth="xl">
      <style>{`@media print{.search{display:none;}`}</style>
      <title>CBT Form</title>
      <Grid
        container
        display={"flex"}
        justifyContent="center"
        mb={4}
        alignItems="center"
        className="costs"
      >
        <style>{`@media print{.costs{display:none;}`}</style>
        <Typography
          variant="h3"
          component="span"
          fontWeight="600"
          color="info.main"
        >
          CBT
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
          <Typography variant="h3" color="primary.main" fontWeight={600}>
            CBT
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText textAlign="justify" fontWeight={500}>
            <h2 className="help">
              <>Overview</>
            </h2>
            <p>
              Lets you register a student for Written Test for subjects of his
              choice. If the costs are to be changed, you can change the costs
              from{" "}
              <code>
                <>Costs</>
              </code>{" "}
              section (Misc {">"} Costs)
            </p>
            <p>
              If you feel any data of the student is missing, you can always add
              it from{" "}
              <code>
                <>Manage Database</>
              </code>{" "}
              section (<>Misc</> {">"} <>Manage Database</>) by selecting{" "}
              <code>
                <>Student Database</>
              </code>{" "}
              /{" "}
              <code>
                <>Paid CBT</>
              </code>{" "}
              / <code>Print CBT</code> as the table, based on the requirement.
            </p>
            <Divider />
            <br />
            <h2 className="help">
              <>Parameters</>
            </h2>
            <p>
              <span className="helpHead">Base Cost</span> - Initial cost for the
              written test (Applicable for one subject only)
            </p>
            <p>
              <span className="helpHead">Additional Cost</span> - Extra cost
              added to{" "}
              <code>
                <>Base Cost</>
              </code>{" "}
              for ever additional subject until the total subjects are 3
            </p>
            <p>
              <span className="helpHead">Max Cost</span> - Maximum cost for the
              student (SAME FOR 4/5 SUBJECTS)
            </p>
            <p>
              <span className="helpHead">Exam Year</span> - Academic year of
              when the exam will be conducted (ex: 2023)
            </p>
            <p>
              <span className="helpHead">Branch</span> - Branch of the student
              (ex: CSE)
            </p>
            <p>
              <span className="helpHead">Year</span> - Year of the student they
              are studying (1/2/3/4)
            </p>
            <p>
              <span className="helpHead">Semester</span> - Semester of the
              student they are studying (1/2)
            </p>
            <p>
              <span className="helpHead">Hall Ticket Number</span> - Roll number
              of the student (MAX 10 CHARACTERS)
            </p>
            <p>
              <Typography
                variant="h5"
                component={"span"}
                color="error"
                fontWeight={500}
              >
                All the above fields must be full to proceed with search.
              </Typography>
            </p>
            <Divider />
            <br />
            <h2 className="help">
              <>Procedure</>
            </h2>
            <p>
              Upon recieving the data, selet only those subjects that the
              student intends to write. Once done, generate student copy by
              selecting{" "}
              <code>
                <>Generate Student Copy</>
              </code>
              . Now, print the receipt from the PRINT button at the bottom. Once
              the student pays the fee at the Accounts Section, register for the
              student by searching for their roll number.
            </p>
            <Divider />
            <br />
            <h2 className="help">
              <>Exceptions</>
            </h2>
            <p>
              After printing and BEFORE registering, if the student wants to
              change the subjects/if the entered parameter's details is
              incorrect, you need to delete the subjects that the student has
              taken a print for. You can do this in{" "}
              <code>
                <>Manage Database</>
              </code>{" "}
              section (<>Misc</> {">"} <>Manage Database</>
              ). Here, select{" "}
              <code>
                <>Print CBT</>
              </code>{" "}
              table. Now search for the roll number and click Delete to delete
              the entries.
              <p>
                <Typography
                  variant="h5"
                  component={"span"}
                  color="error"
                  fontWeight={500}
                >
                  Only then you are supposed to continue with the re-print
                  process.
                </Typography>
              </p>
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

      <form
        onSubmit={(e) => {
          e.preventDefault()
          setLoading(true)
          if (rollno !== "" && rollno.length === 10) {
            Axios.post(`http://${ip}:6969/CbtSearch`, {
              acyear: year,
              sem: sem,
              rno: rollno,
              reg: regyear,
              branch: branches.current,
            }).then((resp) => {
              if (resp.data.out.length > 0) {
                setdata(resp.data["out"].length)
                setsubs(resp.data["ans"])
                setmapper(resp.data["mapper"])
                setnames(resp.data["names"])
                setRegSubs(resp.data["names"])

                for (let i = 0; i < resp.data["out"].length; i++) {
                  if (
                    names.length === data &&
                    Object.keys(mapper).length === data
                  ) {
                    setclick(true)
                    setrender(true)
                    window.scrollTo({
                      top: 200,
                      behavior: "smooth",
                    })
                  } else {
                    setrender(false)
                  }
                }
                if (resp.data.print) setPrintData(true)
                setLoading(false)
              } else {
                setclick(false)
                setrender(false)
                setinvalid(true)
                setdata(0)
                setgen(false)
                setclick(false)
                setrender(false)
                setreg(false)
                setsubs([])
                setLoading(false)
              }
            })
          }
        }}
      >
        <Grid container spacing={2} className="costs" mb={4}>
          <style>{`@media print{.costs{display:none;}`}</style>
          <Grid item xs={4} md={2}>
            <TextField
              fullWidth
              onChange={handlebasecosts}
              value={basecosts}
              disabled
              size="large"
              label="Base cost"
              style={{
                backgroundColor: "white",
              }}
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <TextField
              fullWidth
              onChange={handleaddcosts}
              value={addcosts}
              disabled
              size="large"
              label="Additional cost"
              style={{
                backgroundColor: "white",
              }}
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <TextField
              fullWidth
              onChange={handlemaxcosts}
              value={maxcosts}
              disabled
              size="large"
              label="Max cost"
              style={{
                backgroundColor: "white",
              }}
            />
          </Grid>
        </Grid>
        {/*  --------------------COSTS END-------------------- */}

        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={2} sm={6}>
            <TextField
              fullWidth
              className="lastbuttons"
              autoFocus
              onChange={(e) => {
                setregyear(e.target.value)
              }}
              disabled={clicked}
              size="large"
              label="Exam Year"
              style={{
                backgroundColor: "white",
              }}
            />
          </Grid>
          <Grid item xs={12} md={2} sm={6}>
            <TextField
              fullWidth
              className="lastbuttons"
              select
              size="large"
              style={{
                backgroundColor: "white",
              }}
              label="Branch"
              onChange={handlebranch}
              disabled={clicked}
            >
              {branch}
            </TextField>
          </Grid>
        </Grid>
        {/* ---------- EXAM YEAR AND BRANCH END ---------- */}

        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={2} sm={6}>
            <TextField
              fullWidth
              className="lastbuttons"
              select
              size="large"
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
          <Grid item xs={12} md={2} sm={6}>
            <TextField
              fullWidth
              className="lastbuttons"
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
        {/*   ---------- YEAR AND SEM END ----------*/}

        <Grid container spacing={2} display="flex" alignItems="center">
          <Grid item xs={12} sm={8} md={4}>
            <TextField
              fullWidth
              className="lastbuttons"
              label="Hall Ticket Number"
              disabled={gen}
              onInput={handlerollno}
              size="large"
              style={{
                backgroundColor: "white",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={8} className="search">
            {!gen && !printData && (
              <>
                <Button
                  size="large"
                  startIcon={<SearchIcon />}
                  className="search"
                  type="submit"
                  variant="contained"
                  disabled={
                    rollno.length !== 10 ||
                    clicked ||
                    basecosts === 0 ||
                    maxcosts === 0 ||
                    addcosts === 0 ||
                    year === 0 ||
                    sem === 0 ||
                    regyear <= 2015
                  }
                >
                  Search
                </Button>
              </>
            )}

            {printData && (
              <>
                <Button
                  color="success"
                  size="large"
                  className="search"
                  variant="contained"
                  startIcon={<HowToRegOutlinedIcon />}
                  onClick={() => {
                    setLoading(true)
                    Axios.post(`http://${ip}:6969/CbtRegister`, {
                      acyear: year,
                      sem: sem,
                      subcode: subs,
                      rno: rollno,
                      subname: regSubs,
                      branch: branches.current,
                    }).then((resp) => {
                      if (resp.data["succ"]) {
                        setLoading(false)
                        setreg(true)
                        setdata(0)
                        setgen(false)
                        setclick(false)
                        setrender(false)
                        setsubs([])
                        setmapper({})
                        setnames([])
                        setPrintData(false)
                      }
                    })
                  }}
                >
                  Register
                </Button>
                <Typography
                  variant="h6"
                  fontWeight={500}
                  component="span"
                  color="warning.main"
                  ml={2}
                >
                  Values have been fetched from Print CBT table
                </Typography>
              </>
            )}
          </Grid>
        </Grid>
      </form>

      {rendsubs()}
      <Snackbar ////  SUB CHANGE
        autoHideDuration={2500}
        open={changed}
        onClose={() => {
          setchanged(false)
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="warning"
          variant="standard"
          onClose={() => {
            setchanged(false)
          }}
        >
          Subjects have been changed
        </Alert>
      </Snackbar>
      <Snackbar ////  REGISTERED
        autoHideDuration={2500}
        open={reg}
        onClose={() => {
          setreg(false)
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="standard"
          onClose={() => {
            setreg(false)
          }}
        >{`Registered for ${rollno}`}</Alert>
      </Snackbar>
      <Snackbar ////  INVALID
        autoHideDuration={2500}
        open={invalid}
        onClose={() => {
          setinvalid(false)
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="warning"
          variant="standard"
          onClose={() => {
            setinvalid(false)
          }}
        >
          No CBT fee pending or check details
        </Alert>
      </Snackbar>

      <Snackbar ////  PRINT ERROR ALERT
        autoHideDuration={2500}
        open={printErrAlert}
        onClose={() => {
          setPrintErrAlert(false)
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="warning"
          variant="standard"
          onClose={() => {
            setPrintErrAlert(false)
          }}
        >
          There was a problem with print action
        </Alert>
      </Snackbar>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        open={openPrintDialog}
        fullWidth
        onClose={() => setOpenPrintDialog(false)}
      >
        <DialogTitle>
          <Typography variant="h4">
            Print for{" "}
            <Typography
              variant="h3"
              color="info.main"
              component="span"
              fontWeight={500}
            >
              {rollno}
            </Typography>
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText textAlign="justify" fontWeight={500}>
            <Typography color={"error"} variant="h6" textAlign={"left"}>
              Ensure the print options satisfy the following conditions:
            </Typography>
            <ul>
              <li>The paper size is set to A4</li>
              <li>
                Only one page is available during print. If you find two or more
                pages, reduce the scale of the content.
              </li>
              <li>
                The <code>Margin</code> value is set to <code>None</code>.
              </li>
              <li>Re-scale the content to fit in entire page.</li>
              <li>
                <code>Print headers and footers</code> are un-checked/disabled.
              </li>
              <li>
                <code>Print backgrounds/background graphics</code> are
                checked/enabled.
              </li>
            </ul>

            <Typography color="primary.main">
              All the above options can be found under{" "}
              <code>Additional settings/More settings</code> section.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="warning" onClick={() => setOpenPrintDialog(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              Axios.post(`http://${ip}:6969/printCbt`, {
                acyear: year,
                sem: sem,
                subcode: subs,
                rno: rollno,
                subname: regSubs,
                branch: branches.current,
              }).then((resp) => {
                if (resp) {
                  if (resp.data.done) {
                    setOpenPrintDialog(false)
                    window.print()
                    setdata(0)
                    setgen(false)
                    setclick(false)
                    setrender(false)
                    setreg(false)
                    setsubs([])
                    setmapper({})
                    setnames([])
                    // return false
                  } else if (resp.data.err) {
                    setPrintErrAlert(true)
                  }
                }
              })
            }}
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Cbt
