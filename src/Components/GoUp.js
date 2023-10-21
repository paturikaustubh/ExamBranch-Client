import React, { useState } from "react"
import { Fab, Zoom } from "@mui/material"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"

function GoToTop() {
  const [show, setShow] = useState(false)
  window.onscroll = () => {
    if (document.documentElement.scrollTop > 150) setShow(true)
    else setShow(false)
  }
  return (
    <>
      <style>{`@media print{.dontPrint{visibility:hidden;}}`}</style>
      <Zoom in={show} className="dontPrint">
        <Fab
          disableRipple
          color="primary"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }}
          style={{ position: "fixed", right: 40, bottom: 30 }}
        >
          <ArrowUpwardIcon />
        </Fab>
      </Zoom>
    </>
  )
}

export default GoToTop
