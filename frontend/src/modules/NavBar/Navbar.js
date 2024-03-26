import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";

import "./navbar.css";
import { EventCardListItems } from "../landing/Dashbord";
import { useSelector } from "react-redux";
import { useInit } from "../shared/hooks/useInit/useInit";
import { useAuthHelpers } from "../auth/hooks/useAuthHelpers/useAuthHelpers";

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: "#fdfdfd", // Adding the desired color
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const Navbar = () => {
  const rdxUser = useSelector((state) => state.user);
  const rdxEvents = useSelector((state) => state.events);

  useInit();

  const navigate = useNavigate();

  const { logout } = useAuthHelpers();
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const onLogin = () => {
    navigate("login");
  };

  const onLogout = () => {
    logout();
    navigate("/");
  };

  const onCloseLogin = () => {
    setOpenAuthModal(false);
  };

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <nav className="">
      <Box sx={{ flexGrow: 1 }}>
        <CssBaseline />

        <AppBar position="absolute" open={open}>
          <Toolbar xs={{ display: "flex" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {rdxEvents.isEditingEventCard && (
                <IconButton
                  edge="start"
                  color="secondary"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  className="menuIconButton"
                >
                  <MenuIcon />
                </IconButton>
              )}

              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className="logoTypography"
                fontFamily= "Quintessential"
                fontWeight={900}
                fontSize={'calc(12px + 1vw)'}
              >
                <Link
                  to="/"
                  style={{
                    color: "#AAC22B",
                    textDecoration: "none",
                    marginLeft: "1%",
                    
                    display: 'flex',
                   alignItems: 'center'
                  }}
                 
                >
                  <div  className="logoImage"></div>
                 <span>EVENT CRAFT</span> 
                </Link>
              </Typography>
              {rdxUser.loggedIn && (
                <Typography
                  component="h1"
                  variant="h6"
                  color="#AAC22B"
                  noWrap
                  className="logoTypography"
                  fontFamily= "Quintessential"
                  fontWeight={700}
                  fontSize={'calc(12px + 0.9vw)'}
                >
                  <Link
                    to="/workspace" className="button-30"
                  
                  >
                    workspace 📆
                  </Link>
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                right: '0.5%',
                position: "absolute",
              }}
            >
              {/* <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}

              {/* <Button
              color="inherit"
              className="aboutButton"
              onClick={onLogin}
            >
              About us
            </Button> */}

              {!rdxUser.loggedIn && (
                <Button
                  color="inherit"
                  className="loginButton"
                  onClick={onLogin}
                  fontSize={'calc(12px + 1vw)'}
                >
                  Login
                </Button>
              )}

              {rdxUser.loggedIn && (
                <Button
                  color="inherit"
                  className="loginButton"
                  onClick={onLogout}
                  fontSize={'calc(12px + 1vw)'}
                >
                  logout
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        {rdxEvents.isEditingEventCard && (
          <Drawer variant="permanent" open={open}>
            <Toolbar>
              <IconButton onClick={toggleDrawer} className="chevronIconButton">
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <>
                <EventCardListItems />
              </>
            </List>
          </Drawer>
        )}
      </Box>
    </nav>
  );
};

export default Navbar;
