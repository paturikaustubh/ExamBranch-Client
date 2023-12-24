/* eslint-disable no-labels */
/* eslint-disable eqeqeq */
import {
  Alert,
  Snackbar,
  TextField,
  Button,
  Paper,
  Backdrop,
  Grid,
  CircularProgress,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Divider,
  DialogActions,
  Autocomplete,
  Container,
  Box,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import HelpIcon from "@mui/icons-material/Help";
// import NavBar from "./Components/NavBar"
import water from "./Components/clgLogo.png";
import { useState, useEffect } from "react";
// import Bait from "./Components/Bait"
import Axios from "axios";

import Barcode from "react-barcode";
import dayjs from "dayjs";

const Supply = ({ ip, user: userName }) => {
  const [openHelp, setOpenHelp] = useState(false);
  const [rollNo, setrollno] = useState("");
  const [basecosts, setbasecosts] = useState("");
  const [addcosts, setaddcosts] = useState("");
  const [maxcosts, setmaxcosts] = useState("");
  const [found, setFound] = useState(false);
  const [mapper, setMapper] = useState({});
  const [subsA, setsubsA] = useState([]);
  const [subsB, setsubsB] = useState([]);
  const [subsC, setsubsC] = useState([]);
  const [subsD, setsubsD] = useState([]);
  const [subsE, setsubsE] = useState([]);
  const [subsF, setsubsF] = useState([]);
  const [subsG, setsubsG] = useState([]);
  const [subsH, setsubsH] = useState([]);
  const [codesA, setCodesA] = useState([]);
  const [codesB, setCodesB] = useState([]);
  const [codesC, setCodesC] = useState([]);
  const [codesD, setCodesD] = useState([]);
  const [codesE, setCodesE] = useState([]);
  const [codesF, setCodesF] = useState([]);
  const [codesG, setCodesG] = useState([]);
  const [codesH, setCodesH] = useState([]);
  const [namesA, setNamesA] = useState([]);
  const [namesB, setNamesB] = useState([]);
  const [namesC, setNamesC] = useState([]);
  const [namesD, setNamesD] = useState([]);
  const [namesE, setNamesE] = useState([]);
  const [namesF, setNamesF] = useState([]);
  const [namesG, setNamesG] = useState([]);
  const [namesH, setNamesH] = useState([]);
  const [Achange, setAchange] = useState(false);
  const [Bchange, setBchange] = useState(false);
  const [Cchange, setCchange] = useState(false);
  const [Dchange, setDchange] = useState(false);
  const [Echange, setEchange] = useState(false);
  const [Fchange, setFchange] = useState(false);
  const [Gchange, setGchange] = useState(false);
  const [Hchange, setHchange] = useState(false);
  const [printSup, setPrintSup] = useState(false);
  const [done, setDone] = useState(false);
  const [rollchange, setrollchange] = useState(false);
  const [printed, setPrinted] = useState(false);
  const [gen, setGen] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reg, setReg] = useState(false);
  const [regErr, setRegErr] = useState(false);
  const [fine, setFine] = useState(0);
  const [openPrintDialog, setOpenPrintDialog] = useState(false);
  const [enableFine, setEnableFine] = useState(true);
  let subCodes = [];

  useEffect(() => {
    setLoading(true);
    Axios.post(`http://${ip}:6969/getCosts`).then((res) => {
      if (res.data.err)
        alert("Error while fetching costs! Re-upload correct costs again.");
      else {
        setbasecosts(res.data.arr[0]["sbc"]);
        setaddcosts(res.data.arr[0]["sac"]);
        setmaxcosts(res.data.arr[0]["sfc"]);

        let today = new Date();
        let fine1 = new Date(res.data.arr[0]["fine_1Dt"]);
        let fine2 = new Date(res.data.arr[0]["fine_2Dt"]);
        let fine3 = new Date(res.data.arr[0]["fine_3Dt"]);
        setFine(() => {
          if (today >= fine1 && today < fine2) return res.data.arr[0]["fine_1"];
          if (today >= fine2 && today < fine3) return res.data.arr[0]["fine_2"];
          if (today >= fine3) return res.data.arr[0]["fine_3"];
          return 0;
        });
      }
    });
    setLoading(false);
  }, [ip]);

  const goBack = () => {
    setCodesA([]);
    setCodesB([]);
    setCodesC([]);
    setCodesD([]);
    setCodesE([]);
    setCodesF([]);
    setCodesG([]);
    setCodesH([]);

    setsubsA([]);
    setsubsB([]);
    setsubsC([]);
    setsubsD([]);
    setsubsE([]);
    setsubsF([]);
    setsubsG([]);
    setsubsH([]);

    setGen(false);
  };

  const rendlastbuttons = () => {
    if (found && gen) {
      return (
        <>
          <div align="right" style={{ marginTop: "1%", marginBottom: "2%" }}>
            <Button
              size="large"
              startIcon={<LocalPrintshopOutlinedIcon />}
              style={{ backgroundColor: "white", marginRight: "8%" }}
              variant="outlined"
              onClick={() => setOpenPrintDialog(true)}
            >
              Print
            </Button>
          </div>
        </>
      );
    }
  };

  const getcost = (i) => {
    let k = [basecosts, addcosts, maxcosts];
    // eslint-disable-next-line array-callback-return
    k = k.map((e) => {
      if (!isNaN(parseInt(e))) {
        return parseInt(e);
      }
    });
    k = k.filter((e) => {
      return e !== undefined;
    });
    if (k.length !== 3) {
      window.location.reload(false);
    }
    if (i == 1) {
      let aCost = 0;
      if (subsA.length !== 0) {
        if (subsA.length == 1) {
          aCost = k[0];
        } else if (subsA.length > 1 && subsA.length < 4) {
          aCost = k[0] + k[1] * (subsA.length - 1);
        } else if (subsA.length >= 4) {
          aCost = k[2];
        }
        if (enableFine && fine > 0 && aCost > 0) aCost += fine;
        return aCost;
      } else {
        return 0;
      }
    } else if (i == 2) {
      let bCost = 0;
      if (subsB.length !== 0) {
        if (subsB.length == 1) {
          bCost = k[0];
        } else if (subsB.length > 1 && subsB.length < 4) {
          bCost = k[0] + k[1] * (subsB.length - 1);
        } else if (subsB.length >= 4) {
          bCost = k[2];
        }
        if (enableFine && fine > 0 && bCost > 0) bCost += fine;
        return bCost;
      } else {
        return 0;
      }
    } else if (i == 3) {
      let cCost = 0;
      if (subsC.length !== 0) {
        if (subsC.length == 1) {
          cCost = k[0];
        } else if (subsC.length > 1 && subsC.length < 4) {
          cCost = k[0] + k[1] * (subsC.length - 1);
        } else if (subsC.length >= 4) {
          cCost = k[2];
        }
        if (enableFine && fine > 0 && cCost > 0) cCost += fine;
        return cCost;
      } else {
        return 0;
      }
    } else if (i == 4) {
      let dCost = 0;
      if (subsD.length !== 0) {
        if (subsD.length == 1) {
          dCost = k[0];
        } else if (subsD.length > 1 && subsD.length < 4) {
          dCost = k[0] + k[1] * (subsD.length - 1);
        } else if (subsD.length >= 4) {
          dCost = k[2];
        }
        if (enableFine && fine > 0 && dCost > 0) dCost += fine;
        return dCost;
      } else {
        return 0;
      }
    } else if (i == 5) {
      let eCost = 0;
      if (subsE.length !== 0) {
        if (subsE.length == 1) {
          eCost = k[0];
        } else if (subsE.length > 1 && subsE.length < 4) {
          eCost = k[0] + k[1] * (subsE.length - 1);
        } else if (subsE.length >= 4) {
          eCost = k[2];
        }
        if (enableFine && fine > 0 && eCost > 0) eCost += fine;
        return eCost;
      } else {
        return 0;
      }
    } else if (i == 6) {
      let fCost = 0;
      if (subsF.length !== 0) {
        if (subsF.length == 1) {
          fCost = k[0];
        } else if (subsF.length > 1 && subsF.length < 4) {
          fCost = k[0] + k[1] * (subsF.length - 1);
        } else if (subsF.length >= 4) {
          fCost = k[2];
        }
        if (enableFine && fine > 0 && fCost > 0) fCost += fine;
        return fCost;
      } else {
        return 0;
      }
    } else if (i == 7) {
      let gCost = 0;
      if (subsG.length !== 0) {
        if (subsG.length == 1) {
          gCost = k[0];
        } else if (subsG.length > 1 && subsG.length < 4) {
          gCost = k[0] + k[1] * (subsG.length - 1);
        } else if (subsG.length >= 4) {
          gCost = k[2];
        }
        if (enableFine && fine > 0 && gCost > 0) gCost += fine;
        return gCost;
      } else {
        return 0;
      }
    } else if (i == 8) {
      let hCost = 0;
      if (subsH.length !== 0) {
        if (subsH.length == 1) {
          hCost = k[0];
        } else if (subsH.length > 1 && subsH.length < 4) {
          hCost = k[0] + k[1] * (subsH.length - 1);
        } else if (subsH.length >= 4) {
          hCost = k[2];
        }
        if (enableFine && fine > 0 && hCost > 0) hCost += fine;
        return hCost;
      } else {
        return 0;
      }
    }
  };

  const rend11 = () => {
    if (found) {
      return (
        <>
          <Grid mb={2} container spacing={4} alignItems={"center"} px={2}>
            <Grid item xs={5}>
              <Autocomplete
                disabled={namesA.length === 0 || (gen && subsA.length === 0)}
                readOnly={gen || printSup}
                style={{ backgroundColor: "white" }}
                multiple
                onChange={(_e, val) => {
                  subCodes = [];
                  val.forEach((value) => {
                    subCodes.push(
                      Object.keys(mapper).find((key) => mapper[key] === value)
                    );
                  });
                  setCodesA(subCodes);
                  setsubsA(val);
                }}
                disableCloseOnSelect
                options={namesA}
                getOptionLabel={(option) => option}
                defaultValue={[...subsA]}
                filterSelectedOptions
                renderInput={(val) => <TextField {...val} label="1-1" />}
              />
            </Grid>

            <Grid item xs={5}>
              <Autocomplete
                disabled={namesB.length === 0 || (gen && subsB.length === 0)}
                readOnly={gen || printSup}
                style={{ backgroundColor: "white" }}
                multiple
                onChange={(_e, val) => {
                  subCodes = [];
                  val.forEach((value) => {
                    subCodes.push(
                      Object.keys(mapper).find((key) => mapper[key] === value)
                    );
                  });
                  setCodesB(subCodes);
                  setsubsB(val);
                }}
                disableCloseOnSelect
                options={namesB}
                getOptionLabel={(option) => option}
                defaultValue={[...subsB]}
                filterSelectedOptions
                renderInput={(val) => <TextField {...val} label="1-2" />}
              />
            </Grid>
            <Grid item xs={2}>
              {(gen || printSup) && getcost(1) + getcost(2)}
              {(getcost(1) > 0 || getcost(2) > 0) && (gen || printSup)
                ? enableFine
                  ? ` (${fine} Fine/Sem)`
                  : ""
                : ""}
            </Grid>
          </Grid>

          <Grid mb={2} container spacing={4} alignItems={"center"} px={2}>
            <Grid item xs={5}>
              <Autocomplete
                disabled={namesC.length === 0 || (gen && subsC.length === 0)}
                readOnly={gen || printSup}
                style={{
                  backgroundColor: "white",
                }}
                multiple
                onChange={(_e, val) => {
                  subCodes = [];
                  val.forEach((value) => {
                    subCodes.push(
                      Object.keys(mapper).find((key) => mapper[key] === value)
                    );
                  });
                  setCodesC(subCodes);
                  setsubsC(val);
                }}
                disableCloseOnSelect
                options={namesC}
                getOptionLabel={(option) => option}
                defaultValue={[...subsC]}
                filterSelectedOptions
                renderInput={(val) => <TextField {...val} label="2-1" />}
              />
            </Grid>
            <Grid item xs={5}>
              <Autocomplete
                disabled={namesD.length === 0 || (gen && subsD.length === 0)}
                readOnly={gen || printSup}
                style={{
                  backgroundColor: "white",
                }}
                multiple
                onChange={(_e, val) => {
                  subCodes = [];
                  val.forEach((value) => {
                    subCodes.push(
                      Object.keys(mapper).find((key) => mapper[key] === value)
                    );
                  });
                  setCodesD(subCodes);
                  setsubsD(val);
                }}
                disableCloseOnSelect
                options={namesD}
                getOptionLabel={(option) => option}
                defaultValue={[...subsD]}
                filterSelectedOptions
                renderInput={(val) => <TextField {...val} label="2-2" />}
              />
            </Grid>
            <Grid item xs={2}>
              {(gen || printSup) && getcost(3) + getcost(4)}
              {(getcost(3) > 0 || getcost(4) > 0) && (gen || printSup)
                ? enableFine
                  ? ` (${fine} Fine/Sem)`
                  : ""
                : ""}
            </Grid>
          </Grid>

          <Grid mb={2} container spacing={4} alignItems={"center"} px={2}>
            <Grid item xs={5}>
              <Autocomplete
                disabled={namesE.length === 0 || (gen && subsE.length === 0)}
                readOnly={gen || printSup}
                style={{
                  backgroundColor: "white",
                }}
                multiple
                onChange={(_e, val) => {
                  subCodes = [];
                  val.forEach((value) => {
                    subCodes.push(
                      Object.keys(mapper).find((key) => mapper[key] === value)
                    );
                  });
                  setCodesE(subCodes);
                  setsubsE(val);
                }}
                disableCloseOnSelect
                options={namesE}
                getOptionLabel={(option) => option}
                defaultValue={[...subsE]}
                filterSelectedOptions
                renderInput={(val) => <TextField {...val} label="3-1" />}
              />
            </Grid>
            <Grid item xs={5}>
              <Autocomplete
                disabled={namesF.length === 0 || (gen && subsF.length === 0)}
                readOnly={gen || printSup}
                style={{
                  backgroundColor: "white",
                }}
                multiple
                onChange={(_e, val) => {
                  subCodes = [];
                  val.forEach((value) => {
                    subCodes.push(
                      Object.keys(mapper).find((key) => mapper[key] === value)
                    );
                  });
                  setCodesF(subCodes);
                  setsubsF(val);
                }}
                disableCloseOnSelect
                options={namesF}
                getOptionLabel={(option) => option}
                defaultValue={[...subsF]}
                filterSelectedOptions
                renderInput={(val) => <TextField {...val} label="3-2" />}
              />
            </Grid>
            <Grid item xs={2}>
              {(gen || printSup) && getcost(5) + getcost(6)}
              {(getcost(5) > 0 || getcost(6) > 0) && (gen || printSup)
                ? enableFine
                  ? ` (${fine} Fine/Sem)`
                  : ""
                : ""}
            </Grid>
          </Grid>

          <Grid container spacing={4} alignItems={"center"} px={2}>
            <Grid item xs={5}>
              <Autocomplete
                disabled={namesG.length === 0 || (gen && subsG.length === 0)}
                readOnly={gen || printSup}
                style={{
                  backgroundColor: "white",
                }}
                multiple
                onChange={(_e, val) => {
                  subCodes = [];
                  val.forEach((value) => {
                    subCodes.push(
                      Object.keys(mapper).find((key) => mapper[key] === value)
                    );
                  });
                  setCodesG(subCodes);
                  setsubsG(val);
                }}
                disableCloseOnSelect
                options={namesG}
                getOptionLabel={(option) => option}
                defaultValue={[...subsG]}
                filterSelectedOptions
                renderInput={(val) => <TextField {...val} label="4-1" />}
              />
            </Grid>
            <Grid item xs={5}>
              <Autocomplete
                disabled={namesH.length === 0 || (gen && subsH.length === 0)}
                readOnly={gen || printSup}
                style={{
                  backgroundColor: "white",
                }}
                multiple
                onChange={(_e, val) => {
                  subCodes = [];
                  val.forEach((value) => {
                    subCodes.push(
                      Object.keys(mapper).find((key) => mapper[key] === value)
                    );
                  });
                  setCodesH(subCodes);
                  setsubsH(val);
                }}
                disableCloseOnSelect
                options={namesH}
                getOptionLabel={(option) => option}
                defaultValue={[...subsH]}
                filterSelectedOptions
                renderInput={(val) => <TextField {...val} label="4-2" />}
              />
            </Grid>
            <Grid item xs={2}>
              {(gen || printSup) && getcost(7) + getcost(8)}
              {(getcost(7) > 0 || getcost(8) > 0) && (gen || printSup)
                ? enableFine
                  ? ` (${fine} Fine/Sem)`
                  : ""
                : ""}
            </Grid>
          </Grid>
          {(gen || printSup) && (
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
                  value={rollNo}
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
                style={{ marginLeft: 4, marginTop: "1%" }}
                startIcon={<ListAltOutlinedIcon />}
                onClick={() => {
                  setGen(true);
                }}
              >
                Generate Student Copy
              </Button>
              <style>{`@media print{.genstudentcopy{display:none;}}`}</style>
            </div>
          )}
        </>
      );
    }
  };

  const init = (data) => {
    for (let i = 0; i < data.subCodes.length; i++) {
      if (Object.keys(data.subCodes[i]) == "A") {
        for (
          let j = 0;
          j < data.subCodes[i]["A"].length &&
          codesA.length < data.subCodes[i]["A"].length;
          j++
        ) {
          setCodesA(data.subCodes[i]["A"]);
          setsubsA(data.subNames[i]["A"]);
          setNamesA(data.subNames[i]["A"]);
        }
      }
      //1sem2
      else if (Object.keys(data.subCodes[i]) == "B") {
        for (
          let j = 0;
          j < data.subCodes[i]["B"].length &&
          codesB.length < data.subCodes[i]["B"].length;
          j++
        ) {
          setCodesB(data.subCodes[i]["B"]);
          setsubsB(data.subNames[i]["B"]);
          setNamesB(data.subNames[i]["B"]);
        }
      }
      //2sem1
      else if (Object.keys(data.subCodes[i]) == "C") {
        for (
          let j = 0;
          j < data.subCodes[i]["C"].length &&
          codesC.length < data.subCodes[i]["C"].length;
          j++
        ) {
          setCodesC(data.subCodes[i]["C"]);
          setsubsC(data.subNames[i]["C"]);
          setNamesC(data.subNames[i]["C"]);
        }
      }
      //2sem2
      else if (Object.keys(data.subCodes[i]) == "D") {
        for (
          let j = 0;
          j < data.subCodes[i]["D"].length &&
          codesD.length < data.subCodes[i]["D"].length;
          j++
        ) {
          setCodesD(data.subCodes[i].D);
          setsubsD(data.subNames[i].D);
          setNamesD(data.subNames[i].D);
        }
      }
      //3sem1
      else if (Object.keys(data.subCodes[i]) == "E") {
        for (
          let j = 0;
          j < data.subCodes[i]["E"].length &&
          codesE.length < data.subCodes[i]["E"].length;
          j++
        ) {
          setCodesE(data.subCodes[i]["E"]);
          setsubsE(data.subNames[i]["E"]);
          setNamesE(data.subNames[i]["E"]);
        }
      }
      //3sem2
      else if (Object.keys(data.subCodes[i]) == "F") {
        for (
          let j = 0;
          j < data.subCodes[i]["F"].length &&
          codesF.length < data.subCodes[i]["F"].length;
          j++
        ) {
          setCodesF(data.subCodes[i]["F"]);
          setsubsF(data.subNames[i]["F"]);
          setNamesF(data.subNames[i]["F"]);
        }
      }
      //4sem1
      else if (Object.keys(data.subCodes[i]) == "G") {
        for (
          let j = 0;
          j < data.subCodes[i]["G"].length &&
          codesG.length < data.subCodes[i]["G"].length;
          j++
        ) {
          setCodesG(data.subCodes[i]["G"]);
          setsubsG(data.subNames[i]["G"]);
          setNamesG(data.subNames[i]["G"]);
        }
      }
      //4sem2
      else if (Object.keys(data.subCodes[i]) == "H") {
        for (
          let j = 0;
          j < data.subCodes[i]["H"].length &&
          codesH.length < data.subCodes[i]["H"].length;
          j++
        ) {
          setCodesH(data.subCodes[i]["H"]);
          setsubsH(data.subNames[i]["H"]);
          setNamesH(data.subNames[i]["H"]);
        }
      }
    }
  };

  const supplysearch = (e) => {
    setLoading(true);
    setPrinted(false);
    e.preventDefault();

    Axios.post(`http://${ip}:6969/Supplysearch`, {
      rno: rollNo,
      gr: "F",
    }).then((resp) => {
      if (resp.data.value > 0) {
        init(resp.data);
        setMapper(resp.data.mapper);
        setLoading(false);
        setLoading(false);
        setFound(true);
        setPrintSup(resp.data.printTab);
      } else {
        setLoading(false);
        setNotFound(true);
      }
    });
  };
  const handlerollno = (e) => {
    goBack();
    setFound(false);
    setPrintSup(false);
    e.target.value = e.target.value.toUpperCase();
    setrollno(e.target.value);
    setFound(false);
  };
  const handlebasecosts = (e) => {
    setbasecosts(e.target.value);
  };
  const handleaddcosts = (e) => {
    setaddcosts(e.target.value);
  };
  const handlemaxcosts = (e) => {
    setmaxcosts(e.target.value);
  };

  return (
    <>
      <title>Supplementary Form</title>
      <div align="center" className="costs">
        <Grid container display={"flex"} justifyContent="center" mb={4}>
          <Typography
            variant="h3"
            component="span"
            fontWeight="600"
            color="info.main"
          >
            Supplementary
            <Tooltip title="Help">
              <IconButton
                size="large"
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
            Supplementary
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText textAlign="justify" fontWeight={500}>
            <h2 className="help">
              <>Overview</>
            </h2>
            <p>
              Lets you register a student for Supplementary exam for subjects of
              their choice. If the costs are to be changed, you can change them
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
                <>Paid Supplementary</>
              </code>{" "}
              / <code>Print Supplementary</code> as the table, based on the
              requirement.
            </p>
            <Divider />
            <br />
            <h2 className="help">
              <>Parameters</>
            </h2>
            <p>
              <span className="helpHead">Base Cost</span> - Initial cost for
              supplementary (Applicable for one subject only)
            </p>
            <p>
              <span className="helpHead">Additional Cost</span> - Extra cost
              added to{" "}
              <code>
                <>Base Cost</>
              </code>{" "}
              for ever additional subject until the total is 3
            </p>
            <p>
              <span className="helpHead">Max Cost</span> - Maximum cost for the
              student (SAME FOR 4/5 SUBJECTS)
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
                All the above parameters must be full for searching!
              </Typography>
            </p>
            <Divider />
            <br />
            <h2 className="help">
              <>Procedure</>
            </h2>
            <p>
              Upon recieving the data, select only those subjects that the
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
              taken a print for. You can do this in <code>Manage Database</code>{" "}
              section (<>Misc</> {">"} <>Manage Database</>). Here, select{" "}
              <code>Print Supplementary</code> table. Now search for the roll
              number and click Delete to delete the entries.
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
              setOpenHelp(false);
            }}
          >
            okay
          </Button>
        </DialogActions>
      </Dialog>

      <Box>
        <Container maxWidth="xl" className="costs">
          <form style={{ marginBottom: 50 }}>
            <style>{`@media print{.costs{display:none;}}`}</style>

            <Grid container spacing={2} mb={2}>
              <Grid item md={2} sm={4} xs={12} className="costs">
                <TextField
                  disabled
                  fullWidth
                  onChange={handlebasecosts}
                  value={basecosts}
                  label="Base Cost"
                  style={{
                    backgroundColor: "white",
                  }}
                />
              </Grid>

              <Grid item md={2} sm={4} xs={12} className="costs">
                <TextField
                  disabled
                  fullWidth
                  onChange={handleaddcosts}
                  value={addcosts}
                  label="Additional cost"
                  style={{
                    backgroundColor: "white",
                  }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} mb={4} className="costs">
              <Grid item md={2} sm={4} xs={12}>
                <TextField
                  disabled
                  fullWidth
                  onChange={handlemaxcosts}
                  value={maxcosts}
                  label="Max cost"
                  style={{
                    backgroundColor: "white",
                  }}
                />
              </Grid>
              <Grid item md={2} sm={4} xs={6}>
                {fine !== 0 && (
                  <TextField
                    disabled
                    fullWidth
                    error
                    onChange={(e) => setFine(e.target.value)}
                    value={fine}
                    label="Fine"
                    style={{
                      backgroundColor: "#ffe3e0",
                    }}
                  />
                )}
              </Grid>
              <Grid item md={2} sm={4} xs={6}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={enableFine}
                        onChange={() => setEnableFine((prevVal) => !prevVal)}
                      />
                    }
                    label="Enable fine"
                  />
                </FormGroup>
              </Grid>
            </Grid>

            {/*  --------------------COSTS END-------------------- */}

            <Grid container spacing={2} alignItems={"center"}>
              <Grid item md={4} sm={6} xs={12}>
                <TextField
                  fullWidth
                  className="costs"
                  autoFocus
                  onInput={handlerollno}
                  label="Hall Ticket Number"
                  style={{
                    backgroundColor: "white",
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={4} md={8}>
                {!printSup && (
                  <Button
                    size="large"
                    startIcon={<SearchIcon />}
                    className="costs"
                    variant="contained"
                    type="submit"
                    onClick={supplysearch}
                    disabled={
                      rollNo.length !== 10 ||
                      basecosts <= 0 ||
                      addcosts <= 0 ||
                      maxcosts <= 0
                    }
                  >
                    Search
                  </Button>
                )}
                {printSup && (
                  <>
                    <Button
                      color="success"
                      size="large"
                      className="costs"
                      variant="contained"
                      startIcon={<HowToRegOutlinedIcon />}
                      onClick={() => {
                        setLoading(true);
                        Axios.post(`http://${ip}:6969/Registersupply`, {
                          rno: rollNo,
                          A: codesA,
                          B: codesB,
                          C: codesC,
                          D: codesD,
                          E: codesE,
                          F: codesF,
                          G: codesG,
                          H: codesH,
                          userName: userName,
                        }).then((resp) => {
                          if (resp.data["registered"]) {
                            setLoading(false);
                            setReg(true);
                            setPrintSup(false);
                            setFound(false);
                          } else if (resp.data.err) {
                            setLoading(false);
                            setRegErr(true);
                          }
                        });
                      }}
                    >
                      Register
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>

      {found && !printed && !reg && (
        <Box>
          <Container maxWidth="xl">
            <Paper
              sx={{
                backgroundImage: `url(${water})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                overflow: "auto",
              }}
              elevation={0}
            >
              <Grid
                container
                columns={12}
                alignContent={"space-around"}
                textAlign={"center"}
                style={{
                  marginBottom: "1%",
                }}
              >
                <Grid item xs={4}>
                  <h3>
                    <>{rollNo} (Supplementary)</>
                  </h3>
                </Grid>
                <Grid item xs={4}>
                  <h2>
                    <>Exam Branch Copy</>
                  </h2>
                </Grid>
                <Grid item xs={4}>
                  <h3>
                    <>{dayjs().format("D MMM, YYYY (h:mm A)")}</>
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
                        <>{rollNo} (Supplementary)</>
                      </h3>
                    </Grid>
                    <Grid item xs={4}>
                      <h2>
                        <>Student Copy</>
                      </h2>
                    </Grid>
                    <Grid item xs={4}>
                      <h3>
                        <>{dayjs().format("D MMM, YYYY (h:mm A)")}</>
                      </h3>
                    </Grid>
                  </Grid>
                </>
              )}

              {found && gen && rend11()}

              <br />
              {found && gen && (
                <>
                  <div align="center">
                    <h4>
                      <>
                        AFTER PAYING THE FEE IN ACCOUNTS SECTION, THE RECEIPT
                        MUST BE SUBMITTED IN THE EXAM BRANCH TO COMPLETE YOUR
                        REGISTRATION
                      </>
                    </h4>
                  </div>
                </>
              )}

              {found && gen && (
                <>
                  <hr />
                  <Grid
                    container
                    justifyContent={"space-around"}
                    columns={12}
                    align="center"
                    style={{
                      marginBottom: "1%",
                    }}
                  >
                    <Grid item xs={4}>
                      <h3>
                        <>{rollNo} (Supplementary)</>
                      </h3>
                    </Grid>
                    <Grid item xs={4}>
                      <h2>
                        <>Accounts Copy</>
                      </h2>
                    </Grid>
                    <Grid item xs={4}>
                      <h3>
                        <>{dayjs().format("D MMM, YYYY (h:mm A)")}</>
                      </h3>
                    </Grid>
                  </Grid>
                  {() => {
                    setDone(true);
                  }}
                </>
              )}

              {found && gen && rend11()}

              {done &&
                window.scrollTo({
                  top: 100,
                  behavior: "smooth",
                })}
            </Paper>
            <div className="costs">
              <style>{`@media print{.costs{display:none;}}`}</style>
              {gen && found && !reg && rendlastbuttons()}
              {gen && found && reg && goBack()}
            </div>
          </Container>
        </Box>
      )}

      {/* {<Autocomplete label="Hello"></Autocomplete>} */}

      <Snackbar
        open={reg}
        autoHideDuration={2500}
        onClose={() => {
          setReg(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setReg(false);
          }}
          variant="standard"
        >{`Registered for ${rollNo}`}</Alert>
      </Snackbar>

      <Snackbar
        open={notFound}
        autoHideDuration={2500}
        onClose={() => {
          setNotFound(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setNotFound(false);
          }}
          variant="standard"
          severity="error"
        >{`No data found for ${rollNo}`}</Alert>
      </Snackbar>

      <Snackbar
        open={Achange}
        autoHideDuration={2500}
        onClose={() => {
          setAchange(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setAchange(false);
          }}
          variant="standard"
          severity="error"
        >{`1-1 values have been changed`}</Alert>
      </Snackbar>

      <Snackbar
        open={Bchange}
        autoHideDuration={2500}
        onClose={() => {
          setBchange(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setBchange(false);
          }}
          variant="standard"
          severity="warning"
        >{`1-2 values have been changed`}</Alert>
      </Snackbar>
      <Snackbar
        open={Cchange}
        autoHideDuration={2500}
        onClose={() => {
          setCchange(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setCchange(false);
          }}
          variant="standard"
          severity="warning"
        >{`2-1 values have ben changed`}</Alert>
      </Snackbar>

      <Snackbar
        open={Dchange}
        autoHideDuration={2500}
        onClose={() => {
          setDchange(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setDchange(false);
          }}
          variant="standard"
          severity="error"
        >{`2-2 values have been changed`}</Alert>
      </Snackbar>

      <Snackbar
        open={Echange}
        autoHideDuration={2500}
        onClose={() => {
          setEchange(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setEchange(false);
          }}
          variant="standard"
          severity="warnig"
        >{`3-1 values have been changed`}</Alert>
      </Snackbar>

      <Snackbar
        open={Fchange}
        autoHideDuration={2500}
        onClose={() => {
          setFchange(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setFchange(false);
          }}
          variant="standard"
          severity="error"
        >{`3-2 values have been changed`}</Alert>
      </Snackbar>

      <Snackbar
        open={Gchange}
        autoHideDuration={2500}
        onClose={() => {
          setGchange(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setGchange(false);
          }}
          variant="standard"
          severity="warning"
        >{`4-1 values have been changed`}</Alert>
      </Snackbar>

      <Snackbar
        open={Hchange}
        autoHideDuration={2500}
        onClose={() => {
          setHchange(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setHchange(false);
          }}
          variant="standard"
          severity="warning"
        >{`4-2 values have been changed`}</Alert>
      </Snackbar>

      <Snackbar
        open={rollchange}
        autoHideDuration={2500}
        onClose={() => {
          setrollchange(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setrollchange(false);
          }}
          variant="standard"
          severity="warning"
        >{`Hall ticket number has been changed`}</Alert>
      </Snackbar>

      <Snackbar
        open={regErr}
        autoHideDuration={2500}
        onClose={() => {
          setRegErr(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setRegErr(false);
          }}
          variant="standard"
          severity="warning"
        >{`There was an erre while registering. Check console (F12)`}</Alert>
      </Snackbar>

      <Dialog
        className="jimpanchi"
        open={openPrintDialog}
        fullWidth
        onClose={() => setOpenPrintDialog(false)}
      >
        <style>{`@media print{.jimpanchi{display:none;}}`}</style>
        <DialogTitle>
          <Typography variant="h4">
            Print for{" "}
            <Typography
              variant="h3"
              color="info.main"
              component="span"
              fontWeight={500}
            >
              {rollNo}
            </Typography>
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText fontWeight={500}>
            <Typography color={"error"} variant="h6">
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
                <code>Print backgrounds</code>/<code>Background graphics</code>{" "}
                are checked/enabled.
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
              setOpenPrintDialog(false);
              Axios.post(`http://${ip}:6969/printSupply`, {
                rno: rollNo,
                A: codesA,
                B: codesB,
                C: codesC,
                D: codesD,
                E: codesE,
                F: codesF,
                G: codesG,
                H: codesH,
                userName: userName,
              }).then((resp) => {
                if (resp.data.done) {
                  window.print();
                  setPrinted(true);
                  setFound(false);
                  goBack();
                  return false;
                }
              });
            }}
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Supply;
