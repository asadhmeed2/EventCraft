import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Stack, createTheme } from "@mui/material";

import withAuth from "./modules/auth/hooks/useAuth/withAuth";

import Navbar from "./modules/NavBar/Navbar";
import { Home } from "./modules/events/pages/home/Home";
import { WorkSpace } from "./modules/events/pages/workspace/WorkSpace";
import EventPage from "./modules/events/pages/EventPage";
import { CardEdit } from "./modules/events/card/components/CardEdit/CardEdit";

import "./App.css";
import "./output.css";
import EditEventPage from "./modules/events/pages/EditEventPage";
import { EventAttendeesPage } from "./modules/events/pages/EventAttendeesPage/EventAttendeesPage";
import { LoginPage } from "./modules/auth/pages/LoginPage/LoginPage";
import { RegisterPage } from "./modules/auth/pages/RegisterPage/RegisterPage";

import Footer from "./modules/footer/Footer";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2222",
        contrastText: "#000",
      },
      secondary: {
        main: "#aac22b",
        contrastText: "#fff",
      },
      text: { main: "#fff" },
    },
  });
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <Stack direction={"row"}>
          <Router>
            <Box>
              <Navbar />
            </Box>
            <Box
              sx={{
                flex: 1,
                backgroundColor: "#aac22b26",
                width: "-webkit-fill-available",
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
              
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/eventPage/:id"
                  element={
                    <EventPage
                      imageUrl="\Frame-1-3-min-1-3.png"
                      lat="32.81781057069659"
                      lng="35.00259862330999"
                    />
                  }
                />

                <Route path="/workSpace" element={withAuth(WorkSpace)} />
                <Route path="/editCard/:id" element={withAuth(CardEdit)} />
                <Route
                  path="/event/attendees/:id"
                  element={withAuth(EventAttendeesPage)}
                />

                <Route
                  path="/editEvent/:id"
                  element={withAuth(EditEventPage)}
                />

                <Route path="/addEvent" element={withAuth(EditEventPage)} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Footer /> {/* Render Footer component here */}
            </Box>
          </Router>
        </Stack>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
