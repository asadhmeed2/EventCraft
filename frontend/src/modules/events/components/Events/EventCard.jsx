import React, { useState } from "react";
import {

  Box,
} from "@mui/material";

import { ActionsList } from "./ActionsList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEventHelpers } from "../../hooks/useEventHelper";
import { LoadingButton } from "@mui/lab";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CustomSnackbar from "../../../shared/components/CustomSnackbar/CustomSnackbar";
import QRCode from "qrcode.react";

import {Button} from '../../../shared/forms/Button'

export const EventCard = ({
  event,
  inHomePage,
  handelSetEventLists,
  userJoined,
  onJoinEvent,
  onCancelJoinEvent,
}) => {
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const {
    joinEvent,
    pendingJoinEvent,
    cancelJoinedEvent,
    pendingCancelJoinedEvent,
  } = useEventHelpers();

  const rdxUser = useSelector((state) => state.user);
  const downloadQR = () => {
    const canvas = document.getElementById("123456");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qrCode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handelEventClick = (e) => {
    navigate(`/eventPage/${event._id}`);
  };

  const onUserJoinEvent = async (e) => {
    if (rdxUser.loggedIn) {
      e.stopPropagation();
      const eventJoined = await joinEvent(rdxUser.currentUser.id, event._id);

      if (eventJoined?._id) {
        onJoinEvent(event, rdxUser.currentUser.id);
      }
    } else {
      setOpenSnackbar(true);
    }
  };

  const handleWhatsAppShare = () => {
    const imageUrl = event.cardID?.img;
    const location = event.location.split(":")[0];
    const text = event.title;
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    console.log("Image URL:", imageUrl); // Log the image URL to verify correctness

    const message = `

      Location: ${location}
              
      Text: ${text}
              
      Date: ${currentDate}
              
      Event Poster: ${imageUrl}
      `;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const onCancelUserJoinEvent = async (e) => {
    e.stopPropagation();
    const eventJoined = await cancelJoinedEvent(
      rdxUser.currentUser.id,
      event._id
    );

    if (eventJoined?._id) {
      onCancelJoinEvent(event, rdxUser.currentUser.id);
    }
  };

  return (
    <>
      <div className="w-[20em] h-[25em] shadow overflow-hidden flex flex-col  rounded-[30px]"
      >
        <div onClick={handelEventClick}>
          <img
            className=" h-[200px] object-cover"
            src={event.cardID?.img}
            alt="green iguana"

          />
        </div>
          <div className="h-[100%]" >
            <h6 className="text-secondary">
              {event.title.charAt(0).toUpperCase() + event.title.substring(1)}
            </h6>
            <h6 className=" flex-1 mb-2">
              {event.description}
            </h6>
            <div >
              {event?.location?.split(":")[0]}
            </div>
            <div >
              {event.date}
            </div>
          </div>

        <div
          className="cardActions flex items-center justify-around p-[8px] shadow-2xl border border-slate-50">
          {inHomePage && !userJoined && (
            <Button
              loading={pendingJoinEvent}
              color="secondary"
              onClick={onUserJoinEvent}
            >
              join
            </Button>
          )}
          {rdxUser.loggedIn && (
            <>
              {inHomePage && userJoined && (
                <Button
                  loading={pendingCancelJoinedEvent}
                  color="secondary"
                  onClick={onCancelUserJoinEvent}
                >
                  cancel
                </Button>
              )}

              {!inHomePage && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "left",
                      gap: "30%;",
                      marginLeft: "5%;",
                      alignItems: "center;",
                      fontSize: "45px;",
                    }}
                  >
                    <WhatsAppIcon
                      color="secondary"
                      onClick={handleWhatsAppShare}
                      fontSize="45px;"
                      style={{ cursor: "pointer" }}
                    />

                    <QRCode
                      id="123456"
                      value={`http://localhost:3000/eventPage/${event._id}`}
                      size={40} // Example size
                      fgColor="#aac22b" //
                      includeMargin={false}
                      onClick={downloadQR}
                      style={{ cursor: "pointer" }}
                    />
                  </Box>
                  <Button  color="secondary">
                    <ActionsList
                      event={event}
                      handelSetEventLists={handelSetEventLists}
                    />
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {openSnackbar && (
        <CustomSnackbar
          color="red"
          open={openSnackbar}
          handleClose={handleCloseSnackbar}
          message="Please log in to join the event."
          severity="warning"
          onClick={() => navigate(`/login`)}
        />
      )}
    </>
  );
};
