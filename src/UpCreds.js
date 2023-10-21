import React, { useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import Axios from "axios";
const UpCreds = ({ ip }) => {
  const [loc, setloc] = useState("");
  const upload = () => {
    if (loc !== "") {
      Axios.post(`http://${ip}:6969/uploadcreds`, {
        loc: loc,
      }).then((resp) => {
        if (resp.data["done"]) {
          alert("Updated");
        }
      });
    } else {
      alert("Give location");
    }
  };
  return (
    <>
      <title>Upload Credits</title>
      <center>
        <Grid container display={"flex"} justifyContent="center" mb={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h3"
              component="span"
              fontWeight="600"
              color="info.main"
            >
              Manage Credits
            </Typography>
          </Grid>
        </Grid>
      </center>

      <Container maxWidth="xl">
        <Typography mt={4} mb={1}>
          Enter folder location of the file(s)
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
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
          <Grid item xs={12} sm={6} md={4}>
            <Button
              size="large"
              variant="contained"
              disabled={loc.length === 0}
              onClick={upload}
            >
              Upload
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default UpCreds;
