import { React, useState } from "react"
import { Grid, MenuItem, TextField } from "@mui/material"

let disable = false

export let subcode = 0
export let subname = ""
export let grade = ""
export let year = 0
export let sem = 0
export let rollno = ""
export let refCode = ""
export let exyear = 0
export let exmonth = 0
export let error = disable

function EditDetails(props) {
  const [exyearerror, setexyearerror] = useState(false)
  const [disablesave, setdisablesave] = useState(false)

  disable = disablesave

  const {
    orCode,
    orName,
    orGrade,
    orYear,
    orSem,
    orExyear,
    orExmonth,
    rno,
    refcode,
  } = props

  subcode = orCode
  subname = orName
  grade = orGrade
  year = parseInt(orYear)
  sem = parseInt(orSem)
  exyear = parseInt(orExyear)
  exmonth = parseInt(orExmonth)
  refCode = refcode
  rollno = rno

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            style={{ margin: 5 }}
            variant="outlined"
            label="Subject Code"
            defaultValue={orCode}
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase()
              subcode = e.target.value
            }}
          />

          <TextField
            style={{ margin: 5 }}
            variant="outlined"
            label="Subject Name"
            defaultValue={orName}
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase()
              subname = e.target.value
            }}
          />

          <TextField
            style={{ margin: 5 }}
            variant="outlined"
            label="Grade"
            defaultValue={orGrade}
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase()
              grade = e.target.value
            }}
          />
        </Grid>

        <Grid irem xs={12}>
          <TextField
            variant="outlined"
            label="Year"
            select
            defaultValue={orYear}
            onChange={(e) => {
              year = e.target.value
            }}
            style={{ width: "40%", margin: 5 }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
          </TextField>

          <TextField
            variant="outlined"
            label="Sem"
            select
            defaultValue={orSem}
            onChange={(e) => {
              sem = e.target.value
            }}
            style={{ width: "40%", margin: 5 }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
          </TextField>

          <TextField
            error={exyearerror}
            label="Ex Year"
            defaultValue={orExyear}
            onChange={(e) => {
              if (
                Number.isInteger(e.target.value / 1) &&
                e.target.value !== ""
              ) {
                setexyearerror(false)
                setdisablesave(false)
                e.target.value = e.target.value.toUpperCase()
                exyear = e.target.value
              } else {
                setexyearerror(true)
                setdisablesave(true)
              }
            }}
            style={{ width: "40%", margin: 5 }}
          />

          <TextField
            variant="outlined"
            label="Month"
            defaultValue={orExmonth}
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase()
              exmonth = e.target.value
            }}
            style={{ width: "40%", margin: 5 }}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default EditDetails
