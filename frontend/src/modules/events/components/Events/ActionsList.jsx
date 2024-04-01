import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useEventCardHelpers } from "../../card/hooks/useEventCardHelpers";
import { useDeleteEventMutation } from "../../api/events.api";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomSnackbar from "../../../shared/components/CustomSnackbar/CustomSnackbar";

import { Menu, Transition } from '@headlessui/react'


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
      <Menu as="div" className="relative inline-block text-left ">
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          <MoreVertIcon />
        </Menu.Button>

        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute overflow-x-auto right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">

            {options.map((option) => (
              <Menu.Item
                key={option}
                selected={option === selectedOption}
                onClick={() => handelEventClick(option.replace(" ", ""))}
              >
                {({ active }) => (

                  <div className="group flex w-full items-center rounded-md px-2 py-2 text-sm">{option}</div>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
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
