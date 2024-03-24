import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useEventCardHelpers } from "../../card/hooks/useEventCardHelpers";
import { useDeleteEventMutation } from "../../api/events.api";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import CustomSnackbar from "../../../shared/components/CustomSnackbar/CustomSnackbar";


export function ActionsList({ event, handelSetEventLists }) {
  const options = ["Attendees", "Edit Event", "Edit Card", "Delete"];
  const EventActions = {
    Attendees: "/event/attendees/" + event._id,
    EditEvent: "/editEvent/" + event._id,
    EditCard: "/editCard/" + event.cardID?._id,
    Delete: "",
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedOption, setSelectedOption] = React.useState("None");
  const { getEventCard } = useEventCardHelpers();

  const [deleteEvent] = useDeleteEventMutation();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  const handelEventClick = async (value) => {
    if (value === "Delete") {
      try {
        await deleteEvent({ id: event._id });
        handleClose();
        handelSetEventLists(event._id);
      } catch (error) {
        console.error("Error deleting event:", error);
        setSnackbarOpen(true);
        setSnackbarMessage("Error deleting event. Please try again.");
      }
    } else if (EventActions[value]) {
      navigate(EventActions[value]);
    }
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={anchorEl ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl)}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === selectedOption}
            onClick={() => handelEventClick(option.replace(" ", ""))}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>

      <CustomSnackbar
        open={snackbarOpen}
        handleClose={() => setSnackbarOpen(false)}
        severity="error"
        color="error"
        message={snackbarMessage}
      />
    </>
  );
}
