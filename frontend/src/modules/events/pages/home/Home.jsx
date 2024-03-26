import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../../landing/Layout";

import { useGeolocation } from "../../../shared/hooks/useGeolocation/useGeolocation";
import { useGetEvents } from "../../hooks/useGetEvents";

import FilterForm from "./components/FilterForm/FilterForm";
import SearchBar from "../../../shared/forms/SearchBar/SearchBar";

import { OurServicesList } from "./components/OurServicesList";

import { Events } from "../../components/Events/Events";

import "./home.css";
import { Spinner } from "../../../shared/components/Spinner/Spinner";

export function Home(props) {
  const [eventsList, setEventsList] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState({});

  const { isLoading, error, fetchEvents } = useGetEvents();
 
  const { currentPosition } = useGeolocation({
    disable: false,
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchEvents({
          ...filteredEvents,
          userPosition: currentPosition,
        });

        if (data) {
          setEventsList(data);
        }
      } catch { }
    })();
  }, [currentPosition, fetchEvents, filteredEvents]);

  const onJoinEvent = (event, userId) => {
    const eventsListClone = [...eventsList];
    const idx = eventsListClone.findIndex((evt) => event._id === evt._id);

    const updatedEvent = { ...eventsListClone[idx] };

    updatedEvent.attendance = [...updatedEvent.attendance, { _id: userId }];

    eventsListClone.splice(idx, 1, updatedEvent);

    setEventsList(eventsListClone);
  };

  const onCancelJoinEvent = (event, userId) => {
    const eventsListClone = [...eventsList];
    const idx = eventsListClone.findIndex((evt) => event._id === evt._id);

    const updatedEvent = { ...eventsListClone[idx] };

    updatedEvent.attendance = [
      ...updatedEvent.attendance.filter((user) => user._id !== userId),
    ];

    eventsListClone.splice(idx, 1, updatedEvent);

    setEventsList(eventsListClone);
  };

  const handleFilter = (filters) => {
    const newFilter = { ...filters, title: filteredEvents.title };
    setFilteredEvents(newFilter);
  };

  const handelSearch = (title) => {
    const newFilter = { ...filteredEvents, title };
    setFilteredEvents(newFilter);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Layout>
        <div className="joinContainer">
          <div className="video-background">
            <video autoPlay loop muted className="video">
              <source src={require("./IconsSource/planning.mp4")} type="video/mp4" />
              {/* Add additional source elements for different video formats */}
            </video>
            {/* Add other content on top of the video if needed */}
            <div className="content">
              <div className="joinHeader">

                <div className="h3 tracking-normal font-semibold text-[4vw] font-[Quintessential]">
                  Discover Exciting Events
                </div>
                <div className="h5 font-[ui-monospace] text-[2vw] font-black mt-2">Stay Up-to-Date with Nearby Events</div>

              </div>

              <div
                className="searchContainer pl-[20px] flex flex-col justify-center items-center"
              >
                <SearchBar
                  handelSearch={handelSearch}
                  handleFilter={handleFilter}
                  events={eventsList}
                />
                <div className="mt-5">

                  <FilterForm onFilter={handleFilter} eventsList={eventsList} />
                </div>
              </div>
            </div>
          </div>
          <div className="homeContainer">
            {!isLoading && (
              <Events
                inHomePage={true}
                events={eventsList}
                onJoinEvent={onJoinEvent}
                onCancelJoinEvent={onCancelJoinEvent}
              />
            )}
            {isLoading && (
              <div className="flex justify-center text-center">
                <Spinner/>
              </div>
            )}
          </div>
        </div>
        <OurServicesList />

      </Layout>
    </>
  );
}
