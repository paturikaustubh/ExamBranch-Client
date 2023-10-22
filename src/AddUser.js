import React from "react";
import { useState } from "react";
import Axios from "axios";
import {
  Alert,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Snackbar,
  Typography,
  Container,
  TextField,
  Button,
  MenuItem,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Divider,
  DialogActions,
  IconButton,
} from "@mui/material";

import HelpIcon from "@mui/icons-material/Help";

const AddUser = ({ ip }) => {
  const [userName, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [delname, setdelname] = useState("");
  const [added, setadded] = useState(false);
  const [existed, setexisted] = useState(false);
  const [wrongpass, setwrongpass] = useState(false);
  const [deleted, setdeleted] = useState(false);
  const [action, setAction] = useState("add");
  const [showPass, setShowPass] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);

  return (
    <Container maxWidth="xl">
      <title>Manage Users</title>
      <Grid container display={"flex"} justifyContent="center" mb={4}>
        <Typography
          variant="h3"
          component="span"
          fontWeight="600"
          color="info.main"
        >
          Manage Users
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
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            select
            size="large"
            label="Action"
            style={{
              backgroundColor: "white",
            }}
            onChange={(e) => {
              setAction(e.target.value);
            }}
            value={action}
          >
            <MenuItem value={"add"}>Add User</MenuItem>
            <MenuItem value={"delete"}>Delete User</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Container maxWidth="md">
        <Paper style={{ padding: "4%" }}>
          {action === "add" && (
            <>
              <Grid container spacing={1} mb={4}>
                <Grid item>
                  <Typography
                    variant="h3"
                    color="primary.main"
                    fontWeight={500}
                  >
                    Add User
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={1} mb={4}>
                <Grid item xs={12}>
                  <Typography variant="h6">Enter Username</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    error={userName.length > 15}
                    size="large"
                    placeholder="Username"
                    style={{ backgroundColor: "white" }}
                    autoFocus
                    value={userName}
                    onChange={(e) => {
                      setusername(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} mb={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">Enter Password</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    disabled={userName === "" || userName.length > 15}
                    type={showPass ? "text" : "password"}
                    error={password !== cpassword && cpassword.length > 0}
                    value={password}
                    color={
                      password === cpassword &&
                      password.length > 0 &&
                      cpassword.length > 0
                        ? "success"
                        : "primary"
                    }
                    size="large"
                    placeholder="Password"
                    style={{ backgroundColor: "white" }}
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} mb={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    disabled={userName === "" || userName.length > 15}
                    type={showPass ? "text" : "password"}
                    error={password !== cpassword && cpassword.length > 0}
                    value={cpassword}
                    color={
                      password === cpassword &&
                      password.length > 0 &&
                      cpassword.length > 0
                        ? "success"
                        : "primary"
                    }
                    size="large"
                    placeholder="Confirm Password"
                    style={{ backgroundColor: "white" }}
                    onChange={(e) => {
                      setcpassword(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormGroup>
                    <FormControlLabel
                      label="Show Password"
                      control={
                        <Checkbox
                          onClick={(e) => {
                            if (e.target.checked) {
                              setShowPass(true);
                            } else setShowPass(false);
                          }}
                        />
                      }
                    ></FormControlLabel>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} textAlign={"right"} mt={2}>
                  <Button
                    size="large"
                    disabled={
                      userName === "" ||
                      password !== cpassword ||
                      password === ""
                    }
                    variant="contained"
                    type="submit"
                    onClick={() => {
                      if (password === cpassword) {
                        Axios.post(`http://${ip}:6969/AddUser`, {
                          userName: userName,
                          password: password,
                        }).then((resp) => {
                          if (resp.data["Valid"]) {
                            setadded(true);
                            setusername("");
                            setpassword("");
                            setcpassword("");
                          } else {
                            setexisted(true);
                          }
                        });
                      } else {
                        setwrongpass(true);
                      }
                    }}
                  >
                    Add User
                  </Button>
                </Grid>
              </Grid>
            </>
          )}

          {action === "delete" && (
            <>
              <Grid container spacing={1} mb={4}>
                <Grid item>
                  <Typography variant="h3" color="error.main" fontWeight={500}>
                    Delete User
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1} mb={2} alignItems="center">
                <Grid item xs={12}>
                  <Typography variant="h6">Enter Username</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    value={delname}
                    autoFocus
                    size="large"
                    placeholder="Username"
                    style={{ backgroundColor: "white" }}
                    onChange={(e) => {
                      setdelname(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} textAlign={"right"}>
                  <Button
                    size="large"
                    color="error"
                    variant="contained"
                    disabled={delname === "" || delname === "admin"}
                    onClick={() => {
                      Axios.post(`http://${ip}:6969/DelUser`, {
                        userName: delname,
                      }).then((resp) => {
                        if (resp.data["done"]) {
                          setdeleted(true);
                          setdelname("");
                        }
                      });
                    }}
                  >
                    Delete User
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Paper>
      </Container>

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
            Manage Users
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText textAlign="justify" fontWeight={500}>
            <h2 className="help">
              <>Overview</>
            </h2>
            <p>You can either add/delete users from the database.</p>
            <Divider />
            <br />
            <h2 className="help">
              <>Parameters</>
            </h2>
            <p>
              <span className="helpHead">Username</span> - Username that you
              wnat to add/delete
            </p>
            <p>
              <span className="helpHead">Password</span> - Password for that
              user. This should be unique to all the users
            </p>
            <p>
              <Typography
                variant="h5"
                component={"span"}
                color="error"
                fontWeight={500}
              >
                Do not share your password with anyone other than department
                staff.
              </Typography>
            </p>
            <Divider />
            <br />
            <h2 className="help">
              <>Procedure</>
            </h2>
            <p>
              If you want to add a user, select <code>Add User</code> from the{" "}
              <code>Action</code> menu. Then, enter their userName and password.
              You must confirm your password by re-entering it for a second
              time, and then click <code>Add User</code> button.
            </p>
            <p>
              If you want to delete a user, select <code>Delete User</code> from
              the <code>Action</code> menu. Then enter the userName and click{" "}
              <code>Delete</code> button.
            </p>
            <Divider />
            <br />
            <h2 className="help">
              <>Exceptions</>
            </h2>
            <p>
              If you want to change your password, you first need to delte your
              account from <code>Delete User</code> tab and create a new one
              from <code>Add User</code> tab.
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

      <Snackbar
        open={added}
        onClose={() => {
          setadded(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2500}
      >
        <Alert
          severity="success"
          variant="standard"
          onClose={() => {
            setadded(false);
          }}
        >
          {`User added successfully`}
        </Alert>
      </Snackbar>

      <Snackbar
        open={existed}
        onClose={() => {
          setexisted(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2500}
      >
        <Alert
          severity="warning"
          variant="standard"
          onClose={() => {
            setexisted(false);
          }}
        >
          {`${userName} already exists`}
        </Alert>
      </Snackbar>

      <Snackbar
        open={wrongpass}
        onClose={() => {
          setwrongpass(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2500}
      >
        <Alert
          severity="error"
          variant="standard"
          onClose={() => {
            setwrongpass(false);
          }}
        >
          Incorrect credentials
        </Alert>
      </Snackbar>

      <Snackbar
        open={deleted}
        onClose={() => {
          setdeleted(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2500}
      >
        <Alert
          severity="success"
          variant="standard"
          onClose={() => {
            setdeleted(false);
          }}
        >
          {`Deleted user`}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddUser;
