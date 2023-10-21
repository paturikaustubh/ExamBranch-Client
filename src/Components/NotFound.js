import { Box, Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"

function NotFound() {
  return (
    <Box alignItems={"center"} textAlign={"center"} marginTop={20}>
      <Typography
        variant="h1"
        color={"error"}
        component={"span"}
        fontWeight={400}
      >
        Oops!{" "}
      </Typography>
      <Typography variant="h3" component={"span"} fontWeight={"light"}>
        Looks like you've lost...
      </Typography>
      <Typography my={2} variant="body1" component={"p"}>
        404: Page not found!
      </Typography>
      <Link to="/">
        <Button variant="outlined">Go back</Button>
      </Link>
    </Box>
  )
}

export default NotFound
