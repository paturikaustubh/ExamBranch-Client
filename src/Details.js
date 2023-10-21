import { useState, useEffect } from "react"
import Axios from "axios"
import "./Details.css"

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined"
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined"

import HelpIcon from "@mui/icons-material/Help"
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import AddIcon from "@mui/icons-material/Add"

import {
  Paper,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Button,
  Alert,
  Snackbar,
  ListSubheader,
  Autocomplete,
  Tooltip,
  Backdrop,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
  Grid,
  Container,
  Typography,
} from "@mui/material"

const Details = ({ user, ip }) => {
  const [searched, setsearched] = useState(false)
  const [rno, setrno] = useState("")
  const [arr, setarr] = useState({})
  const [found, setfound] = useState(false)
  const [miss, setmiss] = useState(false)
  const [year, setyear] = useState(0)
  const [sem, setsem] = useState(0)
  const [rollchange, setrollchange] = useState(false)
  const [rollerror, setrollerror] = useState(false)
  const [changed, setchanged] = useState(false)
  const [download, setdownload] = useState(false)
  const [addNew, setAddNew] = useState(false)
  const [table, settable] = useState("studentinfo")
  const [deleted, setDeleted] = useState(false)
  const [deletedError, setDeletedError] = useState(false)
  const [printSubs, setPrintSubs] = useState([])
  const [loading, setLoading] = useState(false)
  const [openHelp, setOpenHelp] = useState(false)
  const [dupe, setDupe] = useState(false)

  useEffect(() => {
    Axios.post(`http://${ip}:6969/getInfo`, {
      rno: rno,
      year: year,
      sem: sem,
      table: table,
    }).then((resp) => {
      setFCount(resp.data.fCount)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arr])

  const [editDetails, setEditDetails] = useState({
    subcode: "",
    subname: "",
    grade: "",
    acyear: 0,
    sem: 0,
    exyear: 0,
    exmonth: 0,
    rno: "",
    table: "",
    regDate: "",
    registrant: "",
    branch: "",
    refCode: "",
  })
  const [delDetails, setDelDetails] = useState({})
  const [openEdit, setOpenEdit] = useState(false)
  const [donealert, setdonealert] = useState(false)
  const [addAlert, setAddAlert] = useState(false)
  const [erralert, seterralert] = useState(false)
  const [fill, setFill] = useState(false)
  const [openAddNew, setOpenAddNew] = useState(false)
  const [wrongAlert, setWrongAlert] = useState(false)
  const [dupeAlert, setDupeAlert] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [fCount, setFCount] = useState(0)

  const printDetails = () => {
    if (
      (table === "printcbt" ||
        table === "printsupply" ||
        table === "printreval") &&
      found &&
      searched
    ) {
      return (
        <Grid container spacing={3} alignItems="center">
          <Grid item lg={3} md={6}>
            <Autocomplete
              fullWidth
              readOnly
              sx={{
                marginTop: "4%",
                backgroundColor: "white",
              }}
              size="large"
              multiple
              disableCloseOnSelect
              options={printSubs}
              getOptionLabel={(option) => option}
              defaultValue={[...printSubs]}
              filterSelectedOptions
              renderInput={(val) => <TextField {...val} label="Subjects" />}
            />
          </Grid>
        </Grid>
      )
    }
  }

  const handleyears = (value) => {
    setchanged(true)
    setyear(value.target.value)
  }
  const handlesems = (value) => {
    setchanged(true)
    setsem(value.target.value)
  }

  function EditButton(props) {
    const [variant, setVariant] = useState("outlined")

    return (
      <Button
        disabled={user !== "admin"}
        startIcon={<ModeEditOutlinedIcon />}
        disableElevation
        variant={variant}
        sx={{ backgroundColor: "white", marginBottom: 1 }}
        onMouseEnter={() => setVariant("contained")}
        onMouseLeave={() => setVariant("outlined")}
        onClick={async () => {
          setEditDetails(props.values)
          setOpenEdit(true)
        }}
      >
        edit
      </Button>
    )
  }
  function AddDetailsButton() {
    const [variant, setVariant] = useState("outlined")

    return (
      <Button
        disabled={user !== "admin"}
        size="large"
        startIcon={<AddIcon />}
        disableElevation
        variant={variant}
        sx={{ backgroundColor: "white" }}
        onMouseEnter={() => setVariant("contained")}
        onMouseLeave={() => setVariant("outlined")}
        onClick={() => {
          setOpenAddNew(true)
        }}
      >
        add new record
      </Button>
    )
  }
  function DeleteButton(props) {
    const { subcode, subname } = props.values
    const [variant, setVariant] = useState("outlined")

    return (
      <Button
        disabled={user !== "admin"}
        startIcon={<DeleteOutlinedIcon />}
        disableElevation
        color="error"
        variant={variant}
        sx={{ backgroundColor: "white" }}
        onMouseEnter={() => setVariant("contained")}
        onMouseLeave={() => setVariant("outlined")}
        onClick={() => {
          setDelDetails({ subcode: subcode, subname: subname })
          setOpenDelete(true)
        }}
      >
        delete
      </Button>
    )
  }

  function DupeButton() {
    const [buttVariant, setButtVariant] = useState("outlined")

    return (
      <Button
        sx={{ backgroundColor: "white" }}
        disableElevation
        name="dupeSubs"
        size="large"
        variant={buttVariant}
        onMouseEnter={() => setButtVariant("contained")}
        onMouseLeave={() => setButtVariant("outlined")}
        onClick={() => {
          setLoading(true)
          Axios.get(`http://${ip}:6969/subcode-count`).then((resp) => {
            resp.data.done ? setLoading(false) : setLoading(true)
          })
          setDupe(true)
        }}
      >
        dup. subjects
      </Button>
    )
  }

  function FiltrButton() {
    const [buttVariant, setButtVariant] = useState("outlined")

    return (
      <Button
        name="filter"
        size="large"
        startIcon={<FilterAltOutlinedIcon />}
        disabled={sem !== 0 && year === 0}
        variant={buttVariant}
        onMouseEnter={() => setButtVariant("contained")}
        onMouseLeave={() => setButtVariant("outlined")}
        onClick={() => {
          Axios.post(`http://${ip}:6969/getInfo`, {
            rno: rno,
            year: year,
            sem: sem,
            table: table,
          }).then((resp) => {
            if (resp.data.info.length > 0) {
              setLoading(true)
              setarr(resp.data["info"])
              setchanged(false)
              setmiss(false)
              setfound(true)
              setsearched(true)
              window.scrollTo({
                top: 280,
                behavior: "smooth",
              })
              setLoading(false)
            } else {
              setmiss(true)
            }
          })
        }}
      >
        Filter
      </Button>
    )
  }

  function DownloadButton() {
    const [buttVariant, setButtVariant] = useState("outlined")

    return (
      <Button
        name="download"
        startIcon={<FileDownloadOutlinedIcon />}
        size="large"
        variant={buttVariant}
        onMouseEnter={() => setButtVariant("contained")}
        onMouseLeave={() => setButtVariant("outlined")}
        onClick={() => {
          Axios({
            method: "post",
            url: `http://${ip}:6969/downInfo`,
            params: {
              rno: rno,
              year: year,
              sem: sem,
              table: table,
            },
            responseType: "blob",
          }).then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `${rno}_${table}.csv`)
            document.body.appendChild(link)
            link.click()
            setdownload(true)
          })
        }}
      >
        Download
      </Button>
    )
  }

  const check = () => {
    if (table === "studentinfo") {
      if (
        editDetails.subcode !== "" &&
        editDetails.subname !== "" &&
        editDetails.grade !== "" &&
        editDetails.grade.length <= 3 &&
        editDetails.acyear !== "" &&
        Number.isInteger(editDetails.acyear / 1) &&
        editDetails.sem !== "" &&
        Number.isInteger(editDetails.sem / 1) &&
        editDetails.exyear !== "" &&
        Number.isInteger(editDetails.exyear / 1) &&
        editDetails.exmonth !== "" &&
        Number.isInteger(editDetails.exmonth / 1)
      ) {
        return true
      } else return false
    } else {
      if (
        editDetails.subcode !== "" &&
        editDetails.subname !== "" &&
        editDetails.acyear !== "" &&
        Number.isInteger(editDetails.acyear / 1) &&
        editDetails.sem !== "" &&
        Number.isInteger(editDetails.sem / 1)
      ) {
        return true
      } else return false
    }
  }

  const handleEditDetailsChange = (e) => {
    if (
      e.target.name === "subcode" ||
      e.target.name === "subname" ||
      e.target.name === "grade"
    )
      e.target.value = e.target.value.toUpperCase()
    setEditDetails((prevVals) => ({
      ...prevVals,
      [e.target.name]: e.target.value,
    }))
  }

  //====================||  MAIN JSX  ||====================\\
  return (
    <>
      <title>Manage Dtabase</title>
      <Grid container display={"flex"} justifyContent="center" mb={4}>
        <Typography
          variant="h3"
          component="span"
          fontWeight="600"
          color="info.main"
        >
          Manage Database
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
            Manage Database
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText textAlign="justify" fontWeight={500}>
            <h2 className="help">
              <>Overview</>
            </h2>
            <p>
              Add, edit or delete records of <code>Student Database</code> (main
              database), <code>Paid Entries</code> (paid/registered student's
              details) and <code>Print Entries</code> (un-paid/un-registered
              student's details) from the database.
            </p>
            <p>
              Only the admin can perform the above operations, any other user
              can only access the values/read the values. But all the users can
              download the table as a <code>.csv</code> file.
            </p>
            <Divider />
            <br />
            <h2 className="help">
              <>Parameters</>
            </h2>
            <p>
              <span className="helpHead">Roll Nuber</span> - Roll number of the
              student.
            </p>
            <Divider />
            <br />
            <h2 className="help">
              <>Procedure</>
            </h2>
            <p>
              Search for student's roll number and hit Search. All the details
              related to thar sudent will be displayed.
            </p>
            {table === "studentinfo" && (
              <>
                <p>
                  <Typography
                    variant="h5"
                    component={"span"}
                    color="error"
                    fontWeight={500}
                  >
                    This table doesn't specifically show
                    registered/un-registered entries.
                  </Typography>
                </p>
              </>
            )}
            {table !== "printsupply" &&
              table !== "printreval" &&
              table !== "printcbt" && (
                <>
                  <p>
                    If there are no entries/if you want to add a new entry to
                    the existing data, select <code>Add Details</code> to add
                    new records.
                  </p>
                  <p>
                    If you want to edit/delete any details of the student,
                    select <code>Edit</code>/<code>Delete</code> option from{" "}
                    <code>Action</code> column.
                  </p>
                </>
              )}
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
      <Container maxWidth="xl">
        <form>
          <Grid container spacing={3} alignItems={"center"} mb={2}>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <TextField
                fullWidth
                select
                variant="outlined"
                label="Table"
                sx={{
                  backgroundColor: "white",
                }}
                defaultValue="studentinfo"
                onChange={(e) => {
                  setAddNew(false)
                  settable(e.target.value)
                  setsearched(false)
                }}
              >
                <MenuItem value={"studentinfo"}>Student Database</MenuItem>
                <ListSubheader style={{ backgroundColor: "#d4d4d4" }}>
                  Paid Entries
                </ListSubheader>
                <MenuItem value={"paidsupply"}>Supplementary</MenuItem>
                <MenuItem value={"paidreevaluation"}> Re-Evaluation</MenuItem>
                <MenuItem value={"paidcbt"}>CBT</MenuItem>
                <ListSubheader style={{ backgroundColor: "#d4d4d4" }}>
                  Print Entries
                </ListSubheader>
                <MenuItem value={"printsupply"}>Print Supplementary</MenuItem>
                <MenuItem value={"printreval"}>Print Re-Evaluation</MenuItem>
                <MenuItem value={"printcbt"}>Print CBT</MenuItem>
              </TextField>
            </Grid>

            <Grid item sm={4} xs={12}>
              {table === "studentinfo" && <DupeButton />}
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems="center">
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <TextField
                fullWidth
                error={rollerror || rno.includes(" ")}
                size="large"
                label="Roll Number"
                style={{
                  backgroundColor: "white",
                }}
                onInput={(e) => {
                  e.target.value = e.target.value.toUpperCase()
                  setrollchange(true)
                  setsearched(false)
                  setrno(e.target.value)
                  setyear(0)
                  setAddNew(false)
                  setsem(0)
                  setfound(false)
                  if (e.target.value === "" && rollchange) {
                    setrollerror(true)
                  } else {
                    setrollerror(false)
                  }
                }}
                autoFocus
              />
            </Grid>
            <Grid item md={2} xs={12}>
              {!searched &&
                !addNew && ( //  SEARCH BUTTON
                  <Button
                    size="large"
                    name="search"
                    startIcon={<SearchOutlinedIcon />}
                    type="submit"
                    disabled={
                      rollerror ||
                      !rollchange ||
                      rno.length !== 10 ||
                      rno.includes(" ")
                    }
                    variant={"contained"}
                    onClick={(e) => {
                      e.preventDefault()
                      setLoading(true)
                      Axios.post(`http://${ip}:6969/getInfo`, {
                        rno: rno,
                        year: year,
                        sem: sem,
                        table: table,
                      }).then((resp) => {
                        if (resp.data.info) {
                          setarr(resp.data["info"])
                          setmiss(false)
                          setchanged(false)
                          setsearched(true)
                          setfound(true)
                          setLoading(false)
                          window.scrollTo({
                            top: 280,
                            behavior: "smooth",
                          })
                          if (resp.data.printSubs.length > 0) {
                            setPrintSubs(resp.data.printSubs)
                            setmiss(false)
                            setchanged(false)
                            setsearched(true)
                            setfound(true)
                            setLoading(false)
                          }
                        } else if (resp.data.miss) {
                          setsearched(false)
                          setmiss(true)
                          if (
                            table === "studentinfo" ||
                            table === "paidsupply" ||
                            table === "paidreval" ||
                            table === "paidcbt"
                          )
                            setAddNew(true)
                          else setAddNew(false)
                          setLoading(false)
                        }
                      })
                    }}
                  >
                    Search
                  </Button>
                  // --------------------------------
                )}

              {found &&
                arr.length > 0 &&
                rno === arr[0]["rollno"] &&
                searched &&
                table !== "printcbt" &&
                table !== "printsupply" &&
                table !== "printreval" && <DownloadButton />}

              {(table === "printcbt" ||
                table === "printsupply" ||
                table === "printreval") &&
                found &&
                searched && (
                  <Button
                    name="delete"
                    size="large"
                    variant={"contained"}
                    color="error"
                    onClick={() => {
                      Axios.post(`http://${ip}:6969/delete${table}`, {
                        rollno: rno,
                      }).then((resp) => {
                        if (resp.data.done) {
                          setfound(false)
                          setDeleted(true)
                          setsearched(false)
                        } else if (resp.data.err) {
                          setDeletedError(true)
                        }
                      })
                    }}
                  >
                    Delete
                  </Button>
                )}

              {addNew &&
                (table !== "printcbt" ||
                  table !== "printsupply" ||
                  table !== "printreval") && <AddDetailsButton />}
            </Grid>
          </Grid>
        </form>

        {found &&
          found &&
          arr.length > 0 &&
          rno !== "*" &&
          searched &&
          table !== "printcbt" &&
          table !== "printsupply" &&
          table !== "printreval" && (
            <div className="Tab">
              {found && arr.length > 0 && (
                <Paper
                  elevation={4}
                  sx={{
                    overflow: "auto",
                    padding: 2,
                    marginTop: 10,
                    marginBottom: 5,
                    maxHeight: "40rem",
                  }}
                >
                  <Grid
                    container
                    spacing={2}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Grid item xs={12}>
                      <Typography
                        variant="h3"
                        fontWeight={500}
                        pt={2}
                        pl={2}
                        component="span"
                        color="primary.main"
                      >
                        {rno}{" "}
                        <Typography
                          variant="h5"
                          component="span"
                          color="error"
                          sx={{
                            ...(fCount === 0 && { display: "none" }),
                          }}
                        >
                          ({fCount}/{arr.length})
                        </Typography>
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    spacing={2}
                    my={3}
                    alignItems="center"
                    display={"flex"}
                    justifyItems={"flex-end"}
                  >
                    <Grid item xs={4} md={2}>
                      <TextField
                        fullWidth
                        label="Year"
                        size="large"
                        error={sem !== 0 && year === 0}
                        onChange={handleyears}
                        defaultValue={year}
                        select
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
                    <Grid item xs={4} md={2}>
                      <TextField
                        fullWidth
                        label="Semester"
                        size="large"
                        error={sem !== 0 && year === 0}
                        onChange={handlesems}
                        defaultValue={sem}
                        select
                      >
                        {[
                          <MenuItem value={0}>Both</MenuItem>,
                          <MenuItem value={1}>1</MenuItem>,
                          <MenuItem value={2}>2</MenuItem>,
                        ]}
                      </TextField>
                    </Grid>
                    <Grid item xs={4} md={3}>
                      {changed && <FiltrButton />}
                    </Grid>
                    <Grid item xs={12} md={5} textAlign="right">
                      {!changed && <AddDetailsButton />}
                    </Grid>
                  </Grid>

                  <Table stickyHeader>
                    <TableHead>
                      <TableRow sx={{ color: "#d6d6d6" }}>
                        <TableCell
                          sx={{ backgroundColor: "#d5d5d5" }}
                          align="center"
                        >
                          <h3>
                            <>S No.</>
                          </h3>
                        </TableCell>
                        <TableCell
                          sx={{ backgroundColor: "#d5d5d5" }}
                          align="center"
                        >
                          <h3>
                            <>Code</>
                          </h3>
                        </TableCell>
                        <TableCell
                          sx={{ backgroundColor: "#d5d5d5" }}
                          align="center"
                        >
                          <h3>
                            <>Subject</>
                          </h3>
                        </TableCell>
                        {table === "studentinfo" && (
                          <TableCell
                            sx={{ backgroundColor: "#d5d5d5" }}
                            align="center"
                          >
                            <h3>
                              <>Grade</>
                            </h3>
                          </TableCell>
                        )}
                        <TableCell
                          sx={{ backgroundColor: "#d5d5d5" }}
                          align="center"
                        >
                          <h3>
                            <>Year</>
                          </h3>
                        </TableCell>
                        <TableCell
                          sx={{ backgroundColor: "#d5d5d5" }}
                          align="center"
                        >
                          <h3>
                            <>Semester</>
                          </h3>
                        </TableCell>
                        {table === "studentinfo" && (
                          <>
                            <TableCell
                              sx={{ backgroundColor: "#d5d5d5" }}
                              align="center"
                            >
                              <h3>
                                <>Exam Year</>
                              </h3>
                            </TableCell>
                            <TableCell
                              sx={{ backgroundColor: "#d5d5d5" }}
                              align="center"
                            >
                              <h3>
                                <>Exam Month</>
                              </h3>
                            </TableCell>
                            <TableCell
                              sx={{ backgroundColor: "#d5d5d5" }}
                              align="center"
                            >
                              <h3>
                                <>Credits</>
                              </h3>
                            </TableCell>
                          </>
                        )}

                        {table !== "studentinfo" && (
                          <>
                            <TableCell
                              sx={{ backgroundColor: "#d5d5d5" }}
                              align="center"
                            >
                              <h3>
                                <>Registered Date</>
                              </h3>
                            </TableCell>

                            <TableCell
                              sx={{ backgroundColor: "#d5d5d5" }}
                              align="center"
                            >
                              <h3>
                                <>Registrant</>
                              </h3>
                            </TableCell>
                          </>
                        )}

                        <TableCell
                          sx={{ backgroundColor: "#d5d5d5" }}
                          align="center"
                        >
                          <h3>
                            <>Actions</>
                          </h3>
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    {arr.map((val, indx) => {
                      return (
                        <TableRow
                          key={indx}
                          sx={{
                            ...(table === "studentinfo" &&
                              (val.grade === "F" ||
                                val.grade.toLowerCase() === "ab") && {
                                backgroundColor: "#e57373",
                              }),
                            "&:hover": {
                              backgroundColor: "#f1f1f1",
                              ...(table === "studentinfo" &&
                                (val.grade === "F" ||
                                  val.grade.toLowerCase() === "ab") && {
                                  backgroundColor: "#f44336",
                                }),
                            },
                          }}
                        >
                          <TableCell align="center">{indx + 1}</TableCell>
                          <TableCell align="center">{val.subcode}</TableCell>
                          <TableCell align="center">{val.subname}</TableCell>

                          {table === "studentinfo" && (
                            <TableCell align="center">{val.grade}</TableCell>
                          )}
                          <TableCell align="center">{val.acyear}</TableCell>
                          <TableCell align="center">{val.sem}</TableCell>

                          {table === "studentinfo" && (
                            <>
                              <TableCell align="center">{val.exyear}</TableCell>
                              <TableCell align="center">
                                {val.exmonth}
                              </TableCell>

                              <TableCell align="center">
                                {`${val.credits} (${val.gradepoint} x ${val.ocredits})`}
                              </TableCell>
                            </>
                          )}

                          {table !== "studentinfo" && (
                            <>
                              <TableCell align="center">
                                {val.regdate}
                              </TableCell>
                              <TableCell align="center">{val.user}</TableCell>
                            </>
                          )}

                          <TableCell>
                            <div>
                              <EditButton
                                values={{
                                  subcode: val.subcode,
                                  subname: val.subname,
                                  grade: val.grade,
                                  acyear: val.acyear,
                                  sem: val.sem,
                                  exyear: val.exyear,
                                  exmonth: val.exmonth,
                                  rno: rno,
                                  table: table,
                                  regDate: val.regdate,
                                  registrant: val.user,
                                  branch: val.branch,
                                  refCode: val.subcode,
                                }}
                              />
                            </div>
                            <DeleteButton values={val} />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </Table>
                </Paper>
              )}
            </div>
          )}

        {printDetails()}
      </Container>
      {/* ====================||  EDIT  DELETE  ADD_NEW  ||==================== */}
      <>
        <Dialog
          maxWidth
          sx={{ backdropFilter: "blur(1px)" }}
          open={openEdit}
          onClose={() => setOpenEdit(false)}
        >
          <DialogTitle id="alert-dialog-title">
            <Typography
              variant="h5"
              color="primary.main"
              component="span"
              fontWeight={500}
            >
              {editDetails.refCode} - {editDetails.subname}
            </Typography>
          </DialogTitle>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (check()) {
                Axios.post(`http://${ip}:6969/editinfo`, {
                  subcode: editDetails.subcode,
                  subname: editDetails.subname,
                  grade: editDetails.grade,
                  year: editDetails.acyear,
                  sem: editDetails.sem,
                  exyear: editDetails.exyear,
                  exmonth: editDetails.exmonth,
                  rno: rno,
                  table: table,
                  regdate: editDetails.regDate,
                  registrant: editDetails.registrant,
                  branch: editDetails.branch,
                  refcode: editDetails.refCode,
                }).then((resp) => {
                  if (resp.data.done) {
                    if (table === "studentinfo") {
                      const newArray = arr.map((obj) => {
                        if (obj.subcode === editDetails.refCode) {
                          return {
                            ...obj,
                            subcode: editDetails.subcode,
                            subname: editDetails.subname,
                            grade: editDetails.grade,
                            acyear: editDetails.acyear,
                            sem: editDetails.sem,
                            exyear: editDetails.exyear,
                            exmonth: editDetails.exmonth,
                          }
                        }
                        return obj
                      })

                      setarr(newArray)
                    } else {
                      const newArray = arr.map((obj) => {
                        if (obj.subcode === editDetails.refCode) {
                          return {
                            ...obj,
                            subcode: editDetails.subcode,
                            subname: editDetails.subname,
                            acyear: editDetails.acyear,
                            sem: editDetails.sem,
                          }
                        }
                        return obj
                      })

                      setarr(newArray)
                    }

                    setdonealert(true)
                  } else {
                    seterralert(true)
                  }
                })
                setOpenEdit(false)
              } else setFill(true)
            }}
          >
            <DialogContent dividers>
              <DialogContentText id="alert-dialog-description">
                <Grid container spacing={2} mb={4}>
                  <Grid item sm={4} xs={12}>
                    <TextField
                      fullWidth
                      name="subcode"
                      variant="outlined"
                      label="Subject Code"
                      defaultValue={editDetails.subcode}
                      onInput={handleEditDetailsChange}
                    />
                  </Grid>

                  <Grid item sm={4} xs={12}>
                    <TextField
                      fullWidth
                      name="subname"
                      variant="outlined"
                      label="Subject Name"
                      defaultValue={editDetails.subname}
                      onInput={handleEditDetailsChange}
                    />
                  </Grid>

                  <Grid item sm={4} xs={12}>
                    <TextField
                      fullWidth
                      name="grade"
                      disabled={table !== "studentinfo"}
                      variant="outlined"
                      label="Grade"
                      defaultValue={editDetails.grade}
                      onInput={handleEditDetailsChange}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} alignItems="center">
                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      name="acyear"
                      select
                      variant="outlined"
                      label="Year"
                      defaultValue={editDetails.acyear}
                      onChange={handleEditDetailsChange}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      name="sem"
                      select
                      variant="outlined"
                      label="Sem"
                      defaultValue={editDetails.sem}
                      onChange={handleEditDetailsChange}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      type="number"
                      name="exyear"
                      disabled={table !== "studentinfo"}
                      variant="outlined"
                      label="Ex Year"
                      defaultValue={editDetails.exyear}
                      onInput={handleEditDetailsChange}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      type="number"
                      name="exmonth"
                      disabled={table !== "studentinfo"}
                      variant="outlined"
                      label="Ex Month"
                      defaultValue={editDetails.exmonth}
                      onInput={handleEditDetailsChange}
                    />
                  </Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setOpenEdit(false)} color="error">
                cancel
              </Button>
              <Button type="submit" autoFocus>
                save
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        <Dialog
          sx={{ backdropFilter: "blur(1px)" }}
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          fullWidth
        >
          <DialogTitle>
            <Typography variant="h5" component={"span"}>
              Delete
              <Typography
                variant="h4"
                component={"span"}
                color="primary.main"
                fontWeight={500}
              >{` ${delDetails.subcode}-${delDetails.subname} `}</Typography>
              record?
            </Typography>
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
              <Typography
                color="error"
                variant="h6"
              >{`This action cannot be undone!`}</Typography>
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpenDelete(false)}>cancel</Button>
            <Button
              color="warning"
              onClick={async () => {
                Axios.post(`http://${ip}:6969/deleteinfo`, {
                  rno: rno,
                  subcode: delDetails.subcode,
                  table: table,
                }).then((resp) => {
                  if (resp.data.done) {
                    const newArr = arr.filter((value) => {
                      return value.subcode !== delDetails.subcode
                    })
                    setarr(newArr)
                    setOpenDelete(false)
                    setDeleted(true)
                  }
                })
              }}
              autoFocus
            >
              delete
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          maxWidth
          sx={{ backdropFilter: "blur(1px)" }}
          open={openAddNew}
          onClose={() => setOpenAddNew(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <Typography variant="h5" component={"span"}>
              Add record for{" "}
              <Typography
                variant="h4"
                component={"span"}
                color="primary.main"
                fontWeight={500}
              >
                {rno}
              </Typography>
            </Typography>
          </DialogTitle>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (check()) {
                Axios.post(`http://${ip}:6969/addinfo`, {
                  subcode: editDetails.subcode,
                  subname: editDetails.subname,
                  grade: editDetails.grade,
                  year: editDetails.acyear,
                  sem: editDetails.sem,
                  exyear: editDetails.exyear,
                  exmonth: editDetails.exmonth,
                  rollno: rno,
                  table: table,
                }).then((resp) => {
                  if (resp.data.done) {
                    setarr((prevVals) => [...prevVals, editDetails])
                    setAddAlert(true)
                  } else if (resp.data.wrongvalue) {
                    setWrongAlert(true)
                  } else if (resp.data.dupe) {
                    setDupeAlert(true)
                  }
                })
                setOpenAddNew(false)
              } else {
                setOpenAddNew(false)
                setWrongAlert(true)
              }
            }}
          >
            <DialogContent dividers>
              <DialogContentText id="alert-dialog-description">
                <Grid container spacing={2} mb={4}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="subcode"
                      variant="outlined"
                      label="Subject Code"
                      onInput={handleEditDetailsChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="subname"
                      variant="outlined"
                      label="Subject Name"
                      onInput={handleEditDetailsChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="grade"
                      disabled={table !== "studentinfo"}
                      variant="outlined"
                      label="Grade"
                      onInput={handleEditDetailsChange}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="acyear"
                      select
                      variant="outlined"
                      label="Year"
                      onChange={handleEditDetailsChange}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="sem"
                      select
                      variant="outlined"
                      label="Sem"
                      onChange={handleEditDetailsChange}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="exyear"
                      disabled={table !== "studentinfo"}
                      variant="outlined"
                      label="Ex Year"
                      onInput={handleEditDetailsChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="exmonth"
                      disabled={table !== "studentinfo"}
                      variant="outlined"
                      label="Ex Month"
                      onInput={handleEditDetailsChange}
                    />
                  </Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setOpenAddNew(false)} color="error">
                cancel
              </Button>
              <Button type="submit" autoFocus>
                save
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </>
      {/* ====================||  ALERTS  ||==================== */}
      <>
        <Snackbar ////  NO DATA!!
          autoHideDuration={2500}
          open={miss}
          onClose={() => {
            setmiss(false)
          }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity="warning"
            variant="standard"
            onClose={() => {
              setmiss(false)
            }}
          >{`No data found`}</Alert>
        </Snackbar>
        <Snackbar ////  DOWNLOADING
          autoHideDuration={2500}
          open={download}
          onClose={() => {
            setdownload(false)
          }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity="success"
            variant="standard"
            onClose={() => {
              setdownload(false)
            }}
          >{`Downloading ${rno}'s details`}</Alert>
        </Snackbar>
        <Snackbar ////  DELETING PAID SUCCESS
          autoHideDuration={2500}
          open={deleted}
          onClose={() => {
            setDeleted(false)
          }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity="success"
            variant="standard"
            onClose={() => {
              setDeleted(false)
            }}
          >{`Deleted ${rno}'s details`}</Alert>
        </Snackbar>
        <Snackbar ////  DELETING PAID ERROR
          autoHideDuration={2500}
          open={deletedError}
          onClose={() => {
            setDeletedError(false)
          }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity="success"
            variant="standard"
            onClose={() => {
              setDeletedError(false)
            }}
          >{`There was a problem while deleting ${rno}'s print details`}</Alert>
        </Snackbar>
        <Snackbar
          open={dupe}
          autoHideDuration={3500}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => setDupe(false)}
        >
          <Alert
            severity="info"
            variant="standard"
            onClose={() => setDupe(false)}
          >
            Check server console for duplicate subject names
          </Alert>
        </Snackbar>
        <Snackbar
          autoHideDuration={2500}
          onClose={() => {
            setdonealert(false)
          }}
          open={donealert}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => {
              setdonealert(false)
            }}
            severity="success"
            variant="standard"
          >
            Values updated!
          </Alert>
        </Snackbar>
        <Snackbar
          autoHideDuration={2500}
          onClose={() => {
            seterralert(false)
          }}
          open={erralert}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => {
              seterralert(false)
            }}
            severity="error"
            variant="standard"
          >
            {`Error while updating ${rno}-${editDetails.subcode} details`}
          </Alert>
        </Snackbar>
        <Snackbar
          autoHideDuration={2500}
          onClose={() => {
            setFill(false)
          }}
          open={fill}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => {
              setFill(false)
            }}
            severity="warning"
            variant="standard"
          >
            {`Enter all options correctly`}
          </Alert>
        </Snackbar>
        <Snackbar
          autoHideDuration={2500}
          onClose={() => {
            setAddAlert(false)
          }}
          open={addAlert}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => {
              setAddAlert(false)
            }}
            severity="success"
            variant="standard"
          >
            {`${rno} details added`}
          </Alert>
        </Snackbar>
        <Snackbar
          autoHideDuration={2500}
          onClose={() => {
            setDupeAlert(false)
          }}
          open={dupeAlert}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => {
              setDupeAlert(false)
            }}
            severity="warning"
            variant="standard"
          >
            {`Record already exists`}
          </Alert>
        </Snackbar>
        <Snackbar
          autoHideDuration={2500}
          onClose={() => {
            setWrongAlert(false)
          }}
          open={wrongAlert}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => {
              setWrongAlert(false)
            }}
            severity="error"
            variant="standard"
          >
            {`Enter proper values`}
          </Alert>
        </Snackbar>
      </>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

export default Details
