/* eslint-disable no-labels */
/* eslint-disable eqeqeq */
import {
  TextField,
  Autocomplete,
  Alert,
  Snackbar,
  Button,
  Grid,
  Paper,
  Backdrop,
  CircularProgress,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Divider,
  DialogContent,
  Typography,
  Container,
} from "@mui/material"
import water from "./Components/clgLogo.png"
import SearchIcon from "@mui/icons-material/Search"
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined"
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined"
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined"
import HelpIcon from "@mui/icons-material/Help"
import { useState, useEffect } from "react"
import Axios from "axios"

import Barcode from "react-barcode"

const Reval = ({ ip }) => {
  const [openHelp, setOpenHelp] = useState(false)
  const [rollno, setrollno] = useState("")
  const [costs, setcosts] = useState("")
  const [month, setMonth] = useState(0)
  const [year, setYear] = useState(0)
  const [regular, setregular] = useState("")
  const [printTab, setPrintTab] = useState(false)
  const [reg, setreg] = useState(false)
  const [printed, setPrinted] = useState(false)
  const [found, setFound] = useState(false)
  const [codesA, setCodesA] = useState([])
  const [codesB, setCodesB] = useState([])
  const [codesC, setCodesC] = useState([])
  const [codesD, setCodesD] = useState([])
  const [codesE, setCodesE] = useState([])
  const [codesF, setCodesF] = useState([])
  const [codesG, setCodesG] = useState([])
  const [codesH, setCodesH] = useState([])
  const [subsA, setsubsA] = useState([])
  const [subsB, setsubsB] = useState([])
  const [subsC, setsubsC] = useState([])
  const [subsD, setsubsD] = useState([])
  const [subsE, setsubsE] = useState([])
  const [subsF, setsubsF] = useState([])
  const [subsG, setsubsG] = useState([])
  const [subsH, setsubsH] = useState([])
  const [namesA, setNamesA] = useState([])
  const [namesB, setNamesB] = useState([])
  const [namesC, setNamesC] = useState([])
  const [namesD, setNamesD] = useState([])
  const [namesE, setNamesE] = useState([])
  const [namesF, setNamesF] = useState([])
  const [namesG, setNamesG] = useState([])
  const [namesH, setNamesH] = useState([])
  const [gen, setGen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mapper, setMapper] = useState({})
  const [openPrintDialog, setOpenPrintDialog] = useState(false)
  const [noData, setNoData] = useState(false)

  const [costErr, setCostErr] = useState(false)
  let subcodes = []

  useEffect(() => {
    Axios.post(`http://${ip}:6969/getCosts`).then((res) => {
      if (res.data.err) setCostErr(true)
      else {
        setcosts(res.data.arr[0]["rev"])
      }
    })
  }, [ip])

  const goBack = () => {
    setCodesA([])
    setCodesB([])
    setCodesC([])
    setCodesD([])
    setCodesE([])
    setCodesF([])
    setCodesG([])
    setCodesH([])

    setsubsA([])
    setsubsB([])
    setsubsC([])
    setsubsD([])
    setsubsE([])
    setsubsF([])
    setsubsG([])
    setsubsH([])

    setGen(false)
    setreg(false)
  }

  const goBackp = () => {
    setCodesA([])
    setCodesB([])
    setCodesC([])
    setCodesD([])
    setCodesE([])
    setCodesF([])
    setCodesG([])
    setCodesH([])

    setsubsA([])
    setsubsB([])
    setsubsC([])
    setsubsD([])
    setsubsE([])
    setsubsF([])
    setsubsG([])
    setsubsH([])

    setGen(false)
    setreg(false)
  }

  const rendlastbuttons = () => {
    if (found) {
      return (
        <>
          <div align="right" style={{ marginTop: "1%", marginRight: "8%" }}>
            <Button
              size="large"
              startIcon={<LocalPrintshopOutlinedIcon />}
              variant="outlined"
              style={{
                backgroundColor: "white",
              }}
              onClick={() => setOpenPrintDialog(true)}
            >
              Print
            </Button>
          </div>
        </>
      )
    }
  }

  const getcost = (i) => {
    let k = costs
    // eslint-disable-next-line array-callback-return
    if (i == 1) {
      return k * subsA.length
    } else if (i == 2) {
      return k * subsB.length
    } else if (i == 3) {
      return k * subsC.length
    } else if (i == 4) {
      return k * subsD.length
    } else if (i == 5) {
      return k * subsE.length
    } else if (i == 6) {
      return k * subsF.length
    } else if (i == 7) {
      return k * subsG.length
    } else if (i == 8) {
      return k * subsH.length
    }
  }

  const rend11 = () => {
    if (found) {
      return (
        <>
          <Grid
            mb={2}
            container
            spacing={4}
            justifyContent="space-around"
            alignItems={"center"}
          >
            <Grid item xs={5}>
              <Autocomplete
                disabled={namesA.length === 0 || (gen && subsA.length === 0)}
                readOnly={gen || printTab}
                style={{ backgroundColor: "white" }}
                size="large"
                multiple
                onChange={(_e, val) => {
                  subcodes = []
                  val.forEach((value) => {
                    subcodes.push(
                      Object.keys(mapper).find((key) => mapper[key] === value)
                    )
                  })
                  setCodesA(subcodes)
                  setsubsA(val)
                }}
                disableCloseOnSelect
                options={namesA}
                getOptionLabel={(option) => option}
                defaultValue={[...subsA]}
                filterSelectedOptions
                renderInput={(val) => (
                  <TextField fullWidth {...val} label="1-1" />
                )}
              />
            </Grid>

            <Grid item xs={5}>
              <Autocomplete
                disabled={namesB.length === 0 || (gen && subsB.length === 0)}
                readOnly={gen || printTab}
                style={{ backgroundColor: "white" }}
                size="large"
                multiple
                onChange={(_e, val) => {
                  subcodes = []
                  val.forEach((value) => {
                    subcodes.push(
                      Object.keys(mapper).find((key) => mapper[key] === value)
                    )
                  })
                  setCodesB(subcodes)
                  setsubsB(val)
                }}
                disableCloseOnSelect
                options={namesB}
                getOptionLabel={(option) => option}
                defaultValue={[...subsB]}
                filterSelectedOptions
                renderInput={(val) => (
                  <TextField fullWidth {...val} label="1-2" />
                )}
              />
            </Grid>
            <Grid item xs={1}>
              {(gen || printTab) && getcost(1) + getcost(2)}
            </Grid>
          </Grid>

          <Grid
            mb={2}
            container
            spacing={4}
            justifyContent="space-around"
            alignItems={"center"}
          >
            <Grid item xs={5}>
              <Autocomplete
                disabled={namesC.length === 0 || (gen && subsC.length === 0)}
                readOnly={gen || printTab}
                style={{
                  backgroundColor: "white",
                }}
                size="large"
                multiple
                onChange={(_e, val) => {
                  subcodes = []
                  val.forEach((value) => {
                    subcodes.push(
                      Object.keys(mapper).find((key) => mapper[key] === value)
                    )
                  })
                  setCodesC(subcodes)
                  setsubsC(val)
                }}
                disableCloseOnSelect
                options={namesC}
                getOptionLabel={(option) => option}
                defaultValue={[...subsC]}
                filterSelectedOptions
                renderInput={(val) => (
                  <TextField fullWidth {...val} label="2-1" />
                )}
              />
            </Grid>
            <Grid item xs={5}>
              <Autocomplete
                disabled={namesD.length === 0 || (gen && subsD.length === 0)}
                readOnly={gen || printTab}
                style={{
                  backgroundColor: "white",
                }}
                size="large"
                multiple
                onChange={(_e, val) => {
                  subcodes = []
                  val.forEach((value) => {
                    subcodes.push(
                      Object.keys(mapper).find((key) => mapper[key] === value)
                    )
                  })
                  setCodesD(subcodes)
                  setsubsD(val)
                }}
                disableCloseOnSelect
                options={namesD}
                getOptionLabel={(option) => option}
                defaultValue={[...subsD]}
                filterSelectedOptions
                renderInput={(val) => (
                  <TextField fullWidth {...val} label="2-2" />
                )}
              />
            </Grid>
            <Grid item xs={1}>
              {(gen || printTab) && getcost(3) + getcost(4)}
            </Grid>
          </Grid>

          <Grid
            mb={2}
            container
            spacing={4}
            justifyContent="space-around"
            alignItems={"center"}
          >
            <Grid item xs={5}>
              <Autocomplete
                disabled={namesE.length === 0 || (gen && subsE.length === 0)}
                readOnly={gen || printTab}
                style={{
                  backgroundColor: "white",
                }}
                size="large"
                multiple
                onChange={(_e, val) => {
                  subcodes = []
                  val.forEach((value) => {
                    subcodes.push(
                      Object.keys(mapper).find((key) => mapper[key] === value)
                    )
                  })
                  setCodesE(subcodes)
                  setsubsE(val)
                }}
                disableCloseOnSelect
                options={namesE}
                getOptionLabel={(option) => option}
                defaultValue={[...subsE]}
                filterSelectedOptions
                renderInput={(val) => (
                  <TextField fullWidth {...val} label="3-1" />
                )}
              />
            </Grid>
            <Grid item xs={5}>
              <Autocomplete
                disabled={namesF.length === 0 || (gen && subsF.length === 0)}
                readOnly={gen || printTab}
                style={{
                  backgroundColor: "white",
                }}
                size="large"
                multiple
                onChange={(_e, val) => {
                  subcodes = []
                  val.forEach((value) => {
                    subcodes.push(
                      Object.keys(mapper).find((key) => mapper[key] === value)
                    )
                  })
                  setCodesF(subcodes)
                  setsubsF(val)
                }}
                disableCloseOnSelect
                options={namesF}
                getOptionLabel={(option) => option}
                defaultValue={[...subsF]}
                filterSelectedOptions
                renderInput={(val) => (
                  <TextField fullWidth {...val} label="3-2" />
                )}
              />
            </Grid>
            <Grid item xs={1}>
              {(gen || printTab) && getcost(5) + getcost(6)}
            </Grid>
          </Grid>

          <Grid
            container
            spacing={4}
            justifyContent="space-around"
            alignItems={"center"}
          >
            <Grid item xs={5}>
              <Autocomplete
                disabled={namesG.length === 0 || (gen && subsG.length === 0)}
                readOnly={gen || printTab}
                style={{
                  backgroundColor: "white",
                }}
                size="large"
                multiple
                onChange={(_e, val) => {
                  subcodes = []
                  val.forEach((value) => {
                    subcodes.push(
                      Object.keys(mapper).find((key) => mapper[key] === value)
                    )
                  })
                  setCodesG(subcodes)
                  setsubsG(val)
                }}
                disableCloseOnSelect
                options={namesG}
                getOptionLabel={(option) => option}
                defaultValue={[...subsG]}
                filterSelectedOptions
                renderInput={(val) => (
                  <TextField fullWidth {...val} label="4-1" />
                )}
              />
            </Grid>
            <Grid item xs={5}>
              <Autocomplete
                disabled={namesH.length === 0 || (gen && subsH.length === 0)}
                readOnly={gen || printTab}
                style={{
                  backgroundColor: "white",
                }}
                size="large"
                multiple
                onChange={(_e, val) => {
                  subcodes = []
                  val.forEach((value) => {
                    subcodes.push(
                      Object.keys(mapper).find((key) => mapper[key] === value)
                    )
                  })
                  setCodesH(subcodes)
                  setsubsH(val)
                }}
                disableCloseOnSelect
                options={namesH}
                getOptionLabel={(option) => option}
                defaultValue={[...subsH]}
                filterSelectedOptions
                renderInput={(val) => (
                  <TextField fullWidth {...val} label="4-2" />
                )}
              />
            </Grid>
            <Grid item xs={1}>
              {(gen || printTab) && getcost(7) + getcost(8)}
            </Grid>
          </Grid>
          {(gen || printTab) && (
            <>
              <h4 style={{ marginLeft: "40%", marginTop: "2%" }}>
                {" "}
                <>
                  {" "}
                  Grand Total:{" "}
                  {getcost(1) +
                    getcost(2) +
                    getcost(3) +
                    getcost(4) +
                    getcost(5) +
                    getcost(6) +
                    getcost(7) +
                    getcost(8)}{" "}
                  (
                  {subsA.length +
                    subsB.length +
                    subsC.length +
                    subsD.length +
                    subsE.length +
                    subsF.length +
                    subsG.length +
                    subsH.length}{" "}
                  Subjects )
                </>
              </h4>
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
          )}
          {!gen && (
            <div className="genstudentcopy">
              <Button
                size="large"
                style={{ marginLeft: "4%", marginTop: "2%" }}
                startIcon={<ListAltOutlinedIcon />}
                onClick={() => {
                  setGen(true)
                }}
              >
                Generate Student Copy
              </Button>
              <style>{`@media print{.genstudentcopy{display:none;}}`}</style>
            </div>
          )}
        </>
      )
    }
  }

  const check = () => {
    return (
      codesA.length +
      codesB.length +
      codesC.length +
      codesD.length +
      codesE.length +
      codesF.length +
      codesG.length +
      codesH.length
    )
  }

  const init = (data) => {
    for (let i = 0; i < data.subcodes.length; i++) {
      if (Object.keys(data.subcodes[i]) == "A") {
        for (
          let j = 0;
          j < data.subcodes[i]["A"].length &&
          codesA.length < data.subcodes[i]["A"].length;
          j++
        ) {
          setCodesA(data.subcodes[i]["A"])
          setsubsA(data.subnames[i]["A"])
          setNamesA(data.subnames[i]["A"])
        }
      }
      //1sem2
      else if (Object.keys(data.subcodes[i]) == "B") {
        for (
          let j = 0;
          j < data.subcodes[i]["B"].length &&
          codesB.length < data.subcodes[i]["B"].length;
          j++
        ) {
          setCodesB(data.subcodes[i]["B"])
          setsubsB(data.subnames[i]["B"])
          setNamesB(data.subnames[i]["B"])
        }
      }
      //2sem1
      else if (Object.keys(data.subcodes[i]) == "C") {
        for (
          let j = 0;
          j < data.subcodes[i]["C"].length &&
          codesC.length < data.subcodes[i]["C"].length;
          j++
        ) {
          setCodesC(data.subcodes[i]["C"])
          setsubsC(data.subnames[i]["C"])
          setNamesC(data.subnames[i]["C"])
        }
      }
      //2sem2
      else if (Object.keys(data.subcodes[i]) == "D") {
        for (
          let j = 0;
          j < data.subcodes[i]["D"].length &&
          codesD.length < data.subcodes[i]["D"].length;
          j++
        ) {
          setCodesD(data.subcodes[i].D)
          setsubsD(data.subnames[i].D)
          setNamesD(data.subnames[i].D)
        }
      }
      //3sem1
      else if (Object.keys(data.subcodes[i]) == "E") {
        for (
          let j = 0;
          j < data.subcodes[i]["E"].length &&
          codesE.length < data.subcodes[i]["E"].length;
          j++
        ) {
          setCodesE(data.subcodes[i]["E"])
          setsubsE(data.subnames[i]["E"])
          setNamesE(data.subnames[i]["E"])
        }
      }
      //3sem2
      else if (Object.keys(data.subcodes[i]) == "F") {
        for (
          let j = 0;
          j < data.subcodes[i]["F"].length &&
          codesF.length < data.subcodes[i]["F"].length;
          j++
        ) {
          setCodesF(data.subcodes[i]["F"])
          setsubsF(data.subnames[i]["F"])
          setNamesF(data.subnames[i]["F"])
        }
      }
      //4sem1
      else if (Object.keys(data.subcodes[i]) == "G") {
        for (
          let j = 0;
          j < data.subcodes[i]["G"].length &&
          codesG.length < data.subcodes[i]["G"].length;
          j++
        ) {
          setCodesG(data.subcodes[i]["G"])
          setsubsG(data.subnames[i]["G"])
          setNamesG(data.subnames[i]["G"])
        }
      }
      //4sem2
      else if (Object.keys(data.subcodes[i]) == "H") {
        for (
          let j = 0;
          j < data.subcodes[i]["H"].length &&
          codesH.length < data.subcodes[i]["H"].length;
          j++
        ) {
          setCodesH(data.subcodes[i]["H"])
          setsubsH(data.subnames[i]["H"])
          setNamesH(data.subnames[i]["H"])
        }
      }
    }
  }

  const revalsearch = (e) => {
    e.preventDefault()
    setLoading(true)
    setPrinted(false)
    if (rollno !== "" && rollno.length === 10) {
      Axios.post(`http://${ip}:6969/Revalsearch`, {
        rno: rollno,
        exmonth: month,
        exyear: year,
      }).then((resp) => {
        setregular(resp.data.reg)

        if (resp.data.value > 0) {
          init(resp.data)
          setMapper(resp.data.mapper)
          setLoading(false)
          if (check() === resp.data.value) {
            setFound(true)
            setPrintTab(resp.data.printTab)
            setLoading(false)
          } else {
            setLoading(false)
          }
        } else {
          setNoData(true)
          setLoading(false)
        }
      })
    } else {
      setNoData(true)
      setLoading(false)
    }
  }
  const handlerollno = (e) => {
    goBackp()
    setFound(false)
    setPrintTab(false)
    e.target.value = e.target.value.toUpperCase()
    setrollno(e.target.value)
    setFound(false)
  }
  const handlecosts = (e) => {
    setcosts(e.target.value)
  }
  const handlemonth = (e) => {
    setMonth(e.target.value)
  }
  const handleyear = (e) => {
    setYear(e.target.value)
  }

  return (
    <Container maxWidth="xl">
      <style>{`@media print{.search{display:none;}`}</style>
      <title>Re-Evaluation Form</title>
      <div align="center" className="lbuttons">
        <Grid container display={"flex"} justifyContent="center" mb={4}>
          <Typography
            variant="h3"
            component="span"
            fontWeight="600"
            color="info.main"
          >
            Re-Evaluation
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
      </div>

      <Dialog
        sx={{ backdropFilter: "blur(1px)" }}
        open={openHelp}
        onClose={() => setOpenHelp(false)}
        maxWidth
      >
        <DialogTitle
          justifyContent={"space-between"}
          display="flex"
          alignItems={"center"}
        >
          <Typography variant="h3" color="primary.main" fontWeight={600}>
            Re-Evaluation
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText textAlign="justify" fontWeight={500}>
            <h2 className="help">
              <>Overview</>
            </h2>
            <p>
              Lets you register a student for Re-Evaluation of subject(s) of his
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
                <>Paid Re-Evaluation</>
              </code>{" "}
              / <code>Print Re-Evaluation</code> as the table, based on the
              requirement.
            </p>
            <Divider />
            <br />
            <h2 className="help">
              <>Parameters</>
            </h2>
            <p>
              <span className="helpHead">Cost</span> - Cost for each subject,
              irrespective of the semester.
            </p>
            <p>
              <span className="helpHead">Exam Month</span> - Month of the
              previous semester (1-12)
            </p>
            <p>
              <span className="helpHead">Exam Year</span> - Year of previous
              semester (ex: 2023)
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
                All the above fields must be full to search!
              </Typography>
            </p>
            <Divider />
            <br />
            <h2 className="help">
              <>Procedure</>
            </h2>
            <p>
              Upon recieving the data, select only those subjects that the
              student intends to apply. Once done, generate student copy by
              selecting{" "}
              <code>
                <>Generate Student Copy</>
              </code>
              . Now, print the reciept from the PRINT button at the bottom. Once
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
              section (<>Misc</> {">"} <>Manage Database</>). Here, select{" "}
              <code>
                <>Print Re-Evaluation</>
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
            size="large"
            onClick={() => {
              setOpenHelp(false)
            }}
          >
            okay
          </Button>
        </DialogActions>
      </Dialog>

      <form>
        <Grid container spacing={2} mb={4} className="costs">
          <Grid item xs={12} sm={4} md={2}>
            <TextField
              fullWidth
              onChange={handlecosts}
              disabled
              value={costs}
              size="large"
              label="Cost"
              style={{
                backgroundColor: "white",
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className="costs" mb={2}>
          <Grid item xs={12} sm={4} md={2}>
            <TextField
              fullWidth
              onChange={handlemonth}
              size="large"
              label="Exam Month"
              style={{
                marginRight: "2%",
                backgroundColor: "white",
              }}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <TextField
              fullWidth
              onChange={handleyear}
              size="large"
              label="Exam Year"
              style={{ backgroundColor: "white" }}
            />
          </Grid>
        </Grid>
        <style>{`@media print{.costs{display:none;}}`}</style>

        <Grid container spacing={2} alignItems="center" mb={3}>
          <Grid item xs={12} sm={8} md={4}>
            <TextField
              fullWidth
              className="lbuttons"
              label="Hall Ticket Number"
              onInput={handlerollno}
              size="large"
              style={{
                backgroundColor: "white",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={8}>
            {!printTab && (
              <Button
                size="large"
                startIcon={<SearchIcon />}
                className="search"
                variant="contained"
                type="submit"
                onClick={revalsearch}
                disabled={
                  rollno.length !== 10 ||
                  found ||
                  year <= 0 ||
                  month <= 0 ||
                  costs <= 0
                }
              >
                Search
              </Button>
            )}

            {printTab && (
              <>
                <Button
                  color="success"
                  size="large"
                  startIcon={<HowToRegOutlinedIcon />}
                  className="search"
                  variant="contained"
                  onClick={() => {
                    setLoading(true)
                    Axios.post(`http://${ip}:6969/Registerreval`, {
                      rno: rollno,
                      A: codesA,
                      B: codesB,
                      C: codesC,
                      D: codesD,
                      E: codesE,
                      F: codesF,
                      G: codesG,
                      H: codesH,
                      k: regular,
                    }).then((resp) => {
                      if (resp.data["registered"]) {
                        setLoading(false)
                        setreg(true)
                        setPrintTab(false)
                        setFound(false)
                        setPrinted(true)
                      } else if (resp.data.err) {
                        setLoading(false)
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
                  Values have been fetched from Print Re-Evaluation table
                </Typography>
              </>
            )}
          </Grid>
        </Grid>
      </form>

      {found && !printed && (
        <>
          <Paper
            sx={{
              padding: "2%",
              backgroundImage: `url(${water})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            elevation={0}
          >
            <Grid
              container
              spacing={4}
              columns={12}
              align="center"
              style={{
                marginBottom: "1%",
              }}
            >
              <Grid item xs={4}>
                <h3>
                  <>{rollno} (Re-Evaluation)</>
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
            {found && rend11()}
            {found && gen && (
              <>
                <hr />

                <Grid
                  container
                  spacing={4}
                  columns={12}
                  align="center"
                  style={{
                    marginBottom: "1%",
                  }}
                >
                  <Grid item xs={4}>
                    <h3>
                      <>{rollno} (Re-Evaluation)</>
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
              </>
            )}
            {found && gen && rend11()}
            {gen && (
              <div align="center">
                <h4>
                  <>
                    AFTER PAYING THE FEE IN ACCOUNTS SECTION, THE RECEIPT MUST
                    BE SUBMITTED IN THE EXAM BRANCH TO COMPLETE YOUR
                    REGISTRATION
                  </>
                </h4>
              </div>
            )}

            {found && gen && (
              <>
                <hr />
                <Grid
                  container
                  spacing={4}
                  columns={12}
                  align="center"
                  style={{
                    marginBottom: "1%",
                  }}
                >
                  <Grid item xs={4}>
                    <h3>
                      <>{rollno} (Re-Evaluation)</>
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
              </>
            )}
            {found && gen && rend11()}
          </Paper>
          <div className="lbuttons">
            <style>{`@media print{.lbuttons{display:none;}}`}</style>
            {gen && found && !reg && rendlastbuttons()}
            {gen && found && reg && goBack()}
          </div>
        </>
      )}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        open={costErr}
        autoHideDuration={2500}
        onClose={() => {
          setCostErr(false)
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          variant="standard"
          severity="warning"
          onClose={() => {
            setCostErr(false)
          }}
        >
          Cost not loaded. Check the database
        </Alert>
      </Snackbar>

      <Snackbar
        open={reg}
        autoHideDuration={2500}
        onClose={() => {
          setreg(false)
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          variant="standard"
          severity="success"
          onClose={() => {
            setreg(false)
          }}
        >
          {`Registered for ${rollno}`}
        </Alert>
      </Snackbar>

      <Snackbar
        open={noData}
        autoHideDuration={2500}
        onClose={() => {
          setNoData(false)
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          variant="standard"
          severity="warning"
          onClose={() => {
            setNoData(false)
          }}
        >
          {`No data found`}
        </Alert>
      </Snackbar>

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
              <li>
                Only one page is available during print. If you find two or more
                pages, reduce the scale of the content.
              </li>
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
          <Button
            size="large"
            color="warning"
            onClick={() => setOpenPrintDialog(false)}
          >
            Cancel
          </Button>
          <Button
            size="large"
            onClick={() => {
              Axios.post(`http://${ip}:6969/printReval`, {
                rno: rollno,
                A: codesA,
                B: codesB,
                C: codesC,
                D: codesD,
                E: codesE,
                F: codesF,
                G: codesG,
                H: codesH,
              }).then((resp) => {
                if (resp.data.done) {
                  setOpenPrintDialog(false)
                  window.print()
                  setPrinted(true)
                  setFound(false)
                  goBackp()
                  return false
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

export default Reval
