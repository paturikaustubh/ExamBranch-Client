import React, { useState } from "react"
import { Link as ReLink } from "react-router-dom"

import {
  AppBar,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  Tabs,
  Toolbar,
  Typography,
  styled,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material"

import MenuIcon from "@mui/icons-material/Menu"
import PlagiarismOutlinedIcon from "@mui/icons-material/PlagiarismOutlined"
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined"
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined"
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined"
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined"
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined"
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined"
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined"
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined"
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined"

export default function NavBar({ user }) {
  const [value, setValue] = useState(2)
  const [openMenu, setOpenMenu] = useState(false)
  const [newTab, setNewTab] = useState(false)
  const [newTabIcon, setNewTabIcon] = useState()
  const [newTabName, setNewTabName] = useState("")
  const [openLogout, setOpenLogout] = useState(false)

  const NavButt = styled(Button)(() => ({
    color: "#f5f5f5",
    border: 0,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 4,
    "&:hover": {
      border: 1,
    },
  }))

  const DomLink = styled(ReLink)(() => ({
    color: "grey",
  }))

  const adminTabs = [
    {
      value: 0,
      name: "CBT",
      to: "/Cbt",
      icon: <DriveFileRenameOutlineOutlinedIcon />,
    },
    {
      value: 1,
      name: "Re-Evaluation",
      to: "/Reval",
      icon: <PlagiarismOutlinedIcon />,
    },
    {
      value: 2,
      name: "Supplementary",
      to: "/Supply",
      icon: <ArticleOutlinedIcon />,
    },
    {
      value: 3,
      name: "Download",
      to: "/Download",
      icon: <FileDownloadOutlinedIcon />,
    },
    {
      value: 4,
      name: "Upload",
      to: "/Update",
      icon: <FileUploadOutlinedIcon />,
    },
  ]

  const misc = [
    {
      value: 0,
      name: "Backup",
      to: "/Backup",
      icon: <BackupOutlinedIcon />,
    },
    {
      value: 1,
      name: "Manage Costs",
      to: "/Costs",
      icon: <CurrencyRupeeOutlinedIcon />,
    },

    {
      value: 2,
      name: "Manage Credits",
      to: "/UpCreds",
      icon: <GradeOutlinedIcon />,
    },
    {
      value: 3,
      name: "Manage Database",
      to: "/Manage-Database",
      icon: <StorageOutlinedIcon />,
    },

    {
      value: 4,
      name: "Manage Users",
      to: "/AddUser",
      icon: <PeopleAltOutlinedIcon />,
    },
  ]

  const nonAdTabs = [
    {
      value: 0,
      name: "CBT",
      to: "/Cbt",
      icon: <DriveFileRenameOutlineOutlinedIcon />,
    },
    {
      value: 1,
      name: "Re-Evaluation",
      to: "/Reval",
      icon: <PlagiarismOutlinedIcon />,
    },
    {
      value: 2,
      name: "Supplementary",
      to: "/Supply",
      icon: <ArticleOutlinedIcon />,
    },
    {
      value: 3,
      name: "Manage Database",
      to: "/Manage-Database",
      icon: <StorageOutlinedIcon />,
    },
  ]

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(3px)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onMouseEnter={() => setOpenMenu(true)}
            onClick={() => setOpenMenu(true)}
            sx={{
              display: { xs: "flex", md: "none" },
              ...(user === "admin" && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          {user === "admin" ? (
            <>
              <IconButton
                color="inherit"
                onMouseEnter={() => setOpenMenu(true)}
                onClick={() => setOpenMenu(true)}
              >
                <MenuIcon />
              </IconButton>
              <Tabs value={value} sx={{ display: { xs: "none", md: "flex" } }}>
                {adminTabs.map((element, indx) => (
                  <DomLink to={element.to} key={indx}>
                    <NavButt
                      startIcon={element.icon}
                      size="large"
                      disableRipple
                      value={element.value}
                      variant="outlined"
                      onClick={() => {
                        setValue(element.value)
                        setNewTab(false)
                      }}
                    >
                      <>{element.name}</>
                    </NavButt>
                  </DomLink>
                ))}

                {newTab && (
                  <>
                    <NavButt startIcon={newTabIcon}>
                      <>{newTabName}</>
                    </NavButt>
                  </>
                )}
              </Tabs>
            </>
          ) : (
            <>
              <Tabs
                value={value}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                {nonAdTabs.map((element, indx) => (
                  <div>
                    <DomLink to={element.to} key={indx}>
                      <NavButt
                        startIcon={element.icon}
                        size="large"
                        disableRipple
                        value={element.value}
                        variant="outlined"
                        onClick={() => {
                          setValue(element.value)
                          setNewTab(false)
                        }}
                      >
                        {element.name}
                      </NavButt>
                    </DomLink>
                  </div>
                ))}
              </Tabs>
            </>
          )}
          <Tabs>
            {user === "devboi" && (
              <DomLink to="/TEST69">
                <NavButt size="large" disableRipple variant="outlined">
                  Test
                </NavButt>
              </DomLink>
            )}
          </Tabs>
          <Typography
            variant="h6"
            component={"a"}
            ml={"auto"}
            color={"#f5f5f5"}
            onClick={() => {
              setOpenLogout(true)
            }}
            sx={{ cursor: "pointer" }}
          >
            {user}
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Drawer
        anchor="left"
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        sx={{
          backdropFilter: "blur(1.3px)",
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 270,
          },
        }}
        onMouseLeave={() => setOpenMenu(false)}
      >
        <List
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" p={2} fontWeight={"bold"}>
            Pages
          </Typography>
          <Divider />
          {user === "admin" &&
            adminTabs.map((element, indx) => {
              return (
                <DomLink to={element.to} key={indx}>
                  <ListItem
                    key={element.value}
                    id={element.value}
                    disablePadding
                  >
                    <ListItemButton
                      onClick={() => {
                        setOpenMenu(false)
                        setValue(indx)
                      }}
                    >
                      <ListItemIcon>{element.icon}</ListItemIcon>
                      <ListItemText
                        sx={{ textDecorationColor: "black" }}
                        primary={
                          <Typography variant="body2" color={"black"}>
                            {element.name}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                </DomLink>
              )
            })}
          {user !== "admin" &&
            nonAdTabs.map((element, indx) => {
              return (
                <DomLink to={element.to} key={indx}>
                  <ListItem
                    key={element.value}
                    id={element.value}
                    disablePadding
                  >
                    <ListItemButton
                      onClick={() => {
                        setOpenMenu(false)
                        setValue(indx)
                      }}
                    >
                      <ListItemIcon>{element.icon}</ListItemIcon>
                      <ListItemText
                        sx={{ textDecorationColor: "black" }}
                        primary={
                          <Typography variant="body2" color={"black"}>
                            {element.name}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                </DomLink>
              )
            })}
        </List>
        <List sx={{ ...(user !== "admin" && { display: "none" }) }}>
          <Typography variant="h6" p={2} fontWeight={"bold"}>
            Misc
          </Typography>

          <Divider />
          {misc.map((element, indx) => (
            <DomLink to={element.to} key={indx}>
              <ListItem key={element.value} id={element.value} disablePadding>
                <ListItemButton
                  onClick={() => {
                    setOpenMenu(false)
                    setNewTabName(element.name)
                    setNewTab(true)
                    setNewTabIcon(element.icon)
                    setValue(adminTabs.length)
                  }}
                >
                  <ListItemIcon>{element.icon}</ListItemIcon>
                  <ListItemText
                    sx={{ textDecorationColor: "black" }}
                    primary={
                      <Typography variant="body2" color={"black"}>
                        {element.name}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </DomLink>
          ))}
        </List>
      </Drawer>

      <Dialog
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        fullWidth
        sx={{ backdropFilter: "blur(1px)" }}
      >
        <DialogTitle>
          <Typography variant="h4" color={"info.main"} fontWeight={500}>
            Logout
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body1" sx={{ "&:hover": { cursor: "copy" } }}>
              Are you sure you want to log out from{" "}
              <Typography
                variant="h5"
                color={"primary.main"}
                fontWeight={500}
                component="span"
              >
                {user}
              </Typography>{" "}
              ?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setOpenLogout(false)}>
            cancel
          </Button>
          <Button onClick={() => window.location.replace("/")}>logout</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
