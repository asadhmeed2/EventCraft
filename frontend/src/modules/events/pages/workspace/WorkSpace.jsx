import React, { useState, useEffect } from "react";
import { Events } from "../../components/Events/Events";
import "./workSpace.css";

import {
  CircularProgress,
} from "@mui/material";

import { useGetMyEvents } from "../../hooks/useGetMyEvents";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../shared/forms/SearchBar/SearchBar";
import CustomSnackbar from "../../../shared/components/CustomSnackbar/CustomSnackbar";

import { Button } from "../../../shared/forms/Button";

export const WorkSpace = (props) => {
  const navigate = useNavigate();
  // const [filteredEvents, setFilteredEvents] = useState({});
  const [eventsList, setEventsList] = useState([]);
  const [viewEventsList, setViewEventsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const { fetchMyEvents } = useGetMyEvents();

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchMyEvents();
        setEventsList(data);
        setViewEventsList(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    })();
  }, [fetchMyEvents]);

  const onDeleteEvent = function (eventId) {
    const newViewEvents = viewEventsList.filter(
      (event) => event._id !== eventId
    );
    const newEvents = eventsList.filter((event) => event._id !== eventId);
    setViewEventsList(newViewEvents);
    setEventsList(newEvents);
    setSnackbarMessage("Event deleted successfully.");
    setSnackbarOpen(true);
  };

  const handelSearch = (title) => {
    // const newFilter = { ...filteredEvents, title };
    // setFilteredEvents(newFilter);

    setViewEventsList(
      eventsList.filter((event) => event.title.includes(title))
    );
  };

  const onOpenCreateModel = () => {
    navigate("/addEvent");
  };

  return (
    <>
      <div className="flex flex-col m-5" >
        <h1 className="text-[4vw] font-[Lora] font-black mb-3 m-[10%] text-center"    
        >
          Which event you will manage today
        </h1>
        {eventsList.length === 0 ? (
          <>
            <div
            className="h-[50%] flex justify-evenly m-[5%] p-[4%] content-center"
            >
              <div
              className="text-[2vw] font-[Quintessential] h-[50vh]"

              >
                Let's Begin: Create Your First Event Today
              </div>
              <Button
                onClick={onOpenCreateModel}
                
                className="addButton"
              >
                Add Event
              </Button>
            </div>
          </>
        ) : (

     
          <div className="flex items-center justify-center pl-[10%] pr-[10%] m-[5%] gap-[10px] h-[50%]">
            <SearchBar handelSearch={handelSearch} />
            <Button
              onClick={onOpenCreateModel}
              
              className="addButton"
            >
              Add Event
            </Button>
          </div>
        )}
        {!isLoading && (
          <Events
            inHomePage={false}
            events={viewEventsList}
            handelSetEventLists={onDeleteEvent}
          />
        )}
        {!!isLoading && (
          <div className="flex justify-center" >
            <CircularProgress color="secondary" />
          </div>
        )}
      </div>

      {!!snackbarOpen && (
        <CustomSnackbar
          open={snackbarOpen}
          handleClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          severity={"success"}
          color="success"
        />
      )}
    </>
  );
};
