import React from "react";

import { EventCard } from "./EventCard";
import { Grid, Typography } from "@mui/material";

export function Events({ inHomePage, events, editModel, handelSetEventLists }) {
  const groupedEvents = events.length ?events?.reduce((event, obj) => {
    const { category, ...rest } = obj;
    if (!event[category]) {
      event[category] = [rest]; // Create a new array for the category
    } else {
      event[category].push(rest); // Push the object to the existing array
    }
    return event;
  }, {}):{};

  return (
    <>
      <div className="categoryContainer">
        {inHomePage ? (
          Object.entries(groupedEvents).map(([category, items]) => (
            <div key={category}>
              <Typography variant="h4" gutterBottom color="">
                {category.charAt(0).toUpperCase() + category.substring(1)}
              </Typography>
              <Grid container spacing={3}>
                {items.map((event, index) => (
                  <Grid item key={event._id} xs={12} sm={6} md={5} spacing={3}>
                    <EventCard event={event} inHomePage />
                  </Grid>
                ))}
              </Grid>
            </div>
          ))
        ) : (
          <Grid container spacing={2}>
            {events.map((event, index) => (
              <Grid item key={index} xs={12} sm={6} md={5}>
                <EventCard
                  event={event}
                  editModel={editModel}
                  handelSetEventLists={handelSetEventLists}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </>
  );
}
