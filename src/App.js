import { useState, useRef, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Outlet,
} from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";

import Supply from "./Supply";
import Reval from "./Reval";
import LoginForm from "./Components/LoginForm";
import NavBar from "./Components/NavBar";
import Download from "./Download";
import Update from "./Update";
import Cbt from "./Cbt";
import Backup from "./Backup";
import AddUser from "./AddUser";
import Costs from "./Costs";
import Details from "./Details";
import UpCreds from "./UpCreds";
import TEST69 from "./TEST";
import AutoEx from "./AutocompleteEx";
import GoUp from "./Components/GoUp";
import NotFound from "./Components/NotFound";
import "./Components/App.css";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import ipFile from "./serverIP.txt";

const App = () => {
  const timeOutRef = useRef(null);
  const [token, settoken] = useState(false);
  const [user, setuser] = useState("");
  const [isIdle, setIsIdle] = useState(false);
  const [ip, setIp] = useState("");

  const adminPages = [
    {
      path: "/Update",
      component: <Update user={user} ip={ip} />,
    },
    {
      path: "/Download",
      component: <Download user={user} ip={ip} />,
    },
    {
      path: "/Costs",
      component: <Costs user={user} ip={ip} />,
    },
    {
      path: "/Backup",
      component: <Backup user={user} ip={ip} />,
    },
    {
      path: "/AddUser",
      component: <AddUser user={user} ip={ip} />,
    },
    {
      path: "/UpCreds",
      component: <UpCreds user={user} ip={ip} />,
    },
  ];

  const defaultPages = [
    {
      path: "/Supply",
      component: <Supply user={user} ip={ip} />,
    },
    {
      path: "/Reval",
      component: <Reval user={user} ip={ip} />,
    },
    {
      path: "/Cbt",
      component: <Cbt user={user} ip={ip} />,
    },
    {
      path: "/Manage-Database",
      component: <Details user={user} ip={ip} />,
    },
  ];

  const handleUserIdle = () => {
    setIsIdle(true);
  };
  const handleUserActive = () => {
    user.length > 0 ? setIsIdle(true) : setIsIdle(false);
  };
  useIdleTimer({
    onIdle: handleUserIdle,
    onActive: handleUserActive,
    timeout: 5 * 1000 * 60, // *1000 (1K) for seconds, **60 for minutes
    ref: timeOutRef,
  });

  useEffect(() => {
    fetch(ipFile)
      .then((response) => response.text())
      .then((data) => setIp(data));
  }, [ip]);

  if (!token) {
    return (
      <LoginForm
        settoken={settoken}
        setuser={setuser}
        setIsIdle={setIsIdle}
        ip={ip}
      />
    );
  }

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            {token && <Redirect to="/Supply" />}
          </Route>

          {token && (
            <>
              <div className="Navbar">
                <style>{`@media print{.Navbar{display:none;}}`}</style>
                <NavBar user={user} ip={ip} />
              </div>
              <GoUp />

              {defaultPages.map((element, indx) => (
                <Route exact path={element.path} key={indx}>
                  {element.component}
                </Route>
              ))}

              {user === "devboi" && (
                <>
                  <Route exact path="/TEST69">
                    <div style={{ marginTop: "4px" }}>
                      <TEST69 ip={ip} />
                    </div>
                  </Route>
                  <Route exact path="/TEST69_01">
                    <div style={{ marginTop: "4px" }}>
                      <AutoEx ip={ip} />
                    </div>
                  </Route>
                </>
              )}

              {adminPages.map((element, indx) => (
                <Route exact path={element.path} key={indx}>
                  {element.component}
                </Route>
              ))}
            </>
          )}

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
      <Dialog
        open={isIdle && token}
        fullWidth
        sx={{ backdropFilter: "blur(1.5px)" }}
      >
        <DialogTitle>
          <Typography color="error.main" variant="h5" fontWeight={"400"}>
            You have been away for long
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography component="span" variant="h6" fontWeight={400}>
              Continue as{" "}
              <Typography
                color="primary.main"
                component="span"
                variant={"h5"}
                fontWeight={500}
              >
                {user}
              </Typography>
              ?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="warning"
            onClick={() => {
              setIsIdle(false);
              settoken(false);
            }}
          >
            switch user
          </Button>
          <Button onClick={() => setIsIdle(false)}>continue</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// function LazyLoad() {
//   return (
//     <Suspense>
//       <Outlet />
//     </Suspense>
//   )
// }

export default App;
