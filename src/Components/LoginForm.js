import Axios from "axios"

import {
  Paper,
  TextField,
  Button,
  Snackbar,
  Alert,
  InputAdornment,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  Box,
  Container,
} from "@mui/material"
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined"
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined"
import logo from "../Components/GCET-logo.png"
import { useState } from "react"

const LoginForm = ({ settoken, setuser, ip }) => {
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [wrong, setwrong] = useState(false)
  return (
    <Container maxWidth="md">
      <title>Login</title>
      <Box align="center" alignItems={"center"} mt={4}>
        <Paper
          sx={{ p: 4 }}
          onSubmit={(e) => {
            e.preventDefault()
          }}
          elevation={4}
        >
          <Typography
            align="center"
            variant="h2"
            fontWeight={500}
            color="primary.main"
          >
            Welcome!
          </Typography>

          <img src={logo} alt="College Logo" width={"23%"} />

          <Container maxWidth="xl">
            <form>
              <div>
                <TextField
                  fullWidth
                  autoFocus
                  type="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  style={{ marginBottom: "4%", marginTop: "4%" }}
                  label="Username"
                  onChange={(e) => {
                    setusername(e.target.value)
                  }}
                />
              </div>

              <div>
                <TextField
                  fullWidth
                  style={{ marginBottom: "1%", m: 1 }}
                  type={showPass ? "text" : "password"}
                  label="Password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setpassword(e.target.value)
                  }}
                />
                <FormGroup>
                  <FormControlLabel
                    style={{
                      marginBottom: "2%",
                    }}
                    label="Show password"
                    control={
                      <Checkbox
                        onClick={(e) => {
                          if (e.target.checked) {
                            setShowPass(true)
                          } else setShowPass(false)
                        }}
                      />
                    }
                  ></FormControlLabel>
                </FormGroup>
              </div>

              <Button
                size="large"
                disabled={username === "" || password === ""}
                startIcon={<LoginOutlinedIcon />}
                type="submit"
                variant="contained"
                onClick={() => {
                  Axios.post(`http://${ip}:6969/Login`, {
                    username: username,
                    password: password,
                  }).then((resp) => {
                    if (resp.data["goahead"]) {
                      setuser(resp.data["username"])
                      settoken(true)
                    } else {
                      setwrong(true)
                    }
                  })
                }}
              >
                Login
              </Button>
            </form>
          </Container>
        </Paper>
      </Box>

      <Snackbar
        open={wrong}
        autoHideDuration={2500}
        onClose={() => {
          setwrong(false)
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          variant="standard"
          severity="warning"
          onClose={() => {
            setwrong(false)
          }}
        >
          Invalid Credentials
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default LoginForm
