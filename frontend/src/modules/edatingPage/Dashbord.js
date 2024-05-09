import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
     <ListItemButton>
     <Link
                to="/"
                style={{
                  display: 'inline-flex',
                  color: "black",
                  textDecoration: "none",
                }}
              >
          <ListItemIcon>
            <CalendarMonthIcon />
          </ListItemIcon>
          <ListItemText primary="Events Joined" />
        </Link>
    </ListItemButton>
    <ListItemButton>
    <Link
                to="/workSpace"
                style={{
                  display: 'inline-flex',
                  color: "black",
                  textDecoration: "none",
                }}
              >
        <ListItemIcon>
          <EventNoteIcon />
        </ListItemIcon>
        <ListItemText primary="Events Created" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <InsertInvitationIcon />
      </ListItemIcon>
      <ListItemText primary="Add Events" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <EditCalendarIcon />
      </ListItemIcon>
      <ListItemText primary="Edit Events" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);