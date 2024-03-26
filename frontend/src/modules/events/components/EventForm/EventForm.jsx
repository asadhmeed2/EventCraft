import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LoadingButton } from "@mui/lab";
import { Formik, Form, Field } from "formik";
import Autocomplete from "@mui/material/Autocomplete";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { Icon } from "leaflet";
import {
  useAddEventMutation,
  useUpdateEventMutation,
} from "../../api/events.api";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { CardView } from "../../card/components/CardView/CardView";
import { exportAsCanvas } from "../../../shared/utils";
import { ItemTypes } from "../../card/components/CardEdit/CardEdit";
import { Map } from "../../../shared/components/Map/Map";
import { useGeolocation } from "../../../shared/hooks/useGeolocation/useGeolocation";
import {
  getEventLocationLat,
  getEventLocationLng,
  getEventLocationTitle,
} from "../../event.utils";
import CustomSnackbar from "../../../shared/components/CustomSnackbar/CustomSnackbar";

const validationSchema = Yup.object({
  category: Yup.string().required("category is required"),
  isPublic: Yup.string().required("visibility is required"),
  title: Yup.string().required("title is required"),
  description: Yup.string().nullable(),
  location: Yup.string().required("location is required"),
  startDate: Yup.string().required("start date is required"),
  endDate: Yup.string().required("end date is required"),
});

const initCardItem = {
  type: ItemTypes.TEXT,
  left: 20,
  top: 90,
  position: "absolute",
  text: "",
  fontSize: 40,
  decoration: "",
  style: "",
  color: "",
  zIndex: 3,
};
const initCardItem2 = {
  type: ItemTypes.TEXT,
  left: 20,
  top: 190,
  position: "absolute",
  text: "",
  fontSize: 20,
  decoration: "",
  style: "",
  color: "",
  zIndex: 1,
};

const initBgImageCardItem = {
  type: ItemTypes.IMAGE,
  left: 0,
  top: 0,
  position: "absolute",
  style: "",
  color: "",
  width: "500",
  height: "300",
  zIndex: 0,
};

const bgCategoryImages = {
  wedding:
    "https://images.unsplash.com/photo-1518554581070-c6049f9d28d8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  party:
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  sport:
    "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=1876&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};
const publicPrivate = [
  { name: "Public", value: true },
  { name: "Private", value: false },
];

const categories = [
  { name: "Wedding", id: "wedding" },
  { name: "Party", id: "party" },
  { name: "Sport", id: "sport" },
];

export const EventForm = ({ isAddFlow, model }) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [addEvent, { isLoading: pendingAddEvent }] = useAddEventMutation();
  const [updateEvent, { isLoading: pendingEditEvent }] =
    useUpdateEventMutation();

  const exportRef = useRef(null);
  const formikRef = useRef(null);

  const { currentPosition, setCurrentPosition } = useGeolocation({
    disable: !isAddFlow,
  });

  const position = [
    getEventLocationLat(model?.location) ?? 32.81781057069659,
    getEventLocationLng(model?.location) ?? 35.00259862330999,
  ];

  const onSaveCard = async () => {
    if (exportRef.current) {
      const temp = await exportAsCanvas(exportRef.current, "test");
      return temp;
    }
  };

  const [Results, setResults] = useState([]);

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [38, 38],
  });

  const timeoutRef = useRef(null);

  const fetchData = (value) => {
    const url = `https://geocode.maps.co/search?q=${value}&api_key=${process.env.REACT_APP_FREE_GEO_API_KEY}`;
    if (value) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        fetch(url)
          .then((response) => response.json())
          .then((results) => {
            console.log(results);
            setResults(results);
          });
      }, 500);
    }
  };

  const handleChange = (value) => {
    if (value) {
      fetchData(value);
    }
  };

  const handleEvent = async (formValues) => {
    try {
      if (isAddFlow) {
        const eventData = await addEvent({
          ...formValues,
          card: {
            items: [
              { ...initCardItem2, text: formValues.description },
              { ...initCardItem, text: formValues.title },
              {
                ...initBgImageCardItem,
                src: bgCategoryImages[formValues.category],
              },
            ],
          },
          userId: user.currentUser.id,
        });
        if (eventData.data[0] && eventData.data[0]._id) {
          setSnackbarOpen(true);
        }
      } else {
        const eventData = await updateEvent({
          formData: {
            ...formValues,
            card: model.card,
            userId: user.currentUser.id,
          },
          id: model._id,
        });
        if (eventData?.data?.success) {
          navigate("/workSpace");
        }
      }
    } catch (error) {
      return <div>Error: {error.message}</div>;
    }
  };

  const onChangeMapMarker = useCallback(
    async (data) => {
      const location = await (
        await fetch(
          `https://geocode.maps.co/reverse?lat=${data.lat}&lon=${data.lng}&api_key=${process.env.REACT_APP_FREE_GEO_API_KEY}`
        )
      ).json();

      setCurrentPosition(data);
      formikRef.current?.setFieldValue(
        "location",
        `${location["display_name"]}:${data.lat}:${data.lng}`
      );
    },
    [setCurrentPosition]
  );

  const onChangeLocation = useCallback(
    (e, value) => {
      const location = Results.find((loc) => loc.display_name === value);

      const lat = location?.lat;
      const lng = location?.lon;

      if (lng && lat) {
        setCurrentPosition({ lng, lat });
      }
      if (value && lat && lng) {
        formikRef.current.setFieldValue("location", `${value}:${lat}:${lng}`);
      } else {
        formikRef.current.setFieldValue("location", ``);
      }
    },
    [Results, setCurrentPosition]
  );

  const initFormValues = useMemo(() => {
    const startDate = model?.startDate ? dayjs(model.startDate) : null;
    const endDate = model?.endDate ? dayjs(model.endDate) : null;

    return {
      category: model?.category || "",
      title: model?.title || "",
      description: model?.description || "",
      location: model?.location || "",
      isPublic: model?.isPublic || false,
      startDate,
      endDate,
    };
  }, [model]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  return (
    <Formik 
      innerRef={formikRef}
      initialValues={initFormValues}
      validationSchema={validationSchema}
      enableReinitialize
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values) => {
        if (isAddFlow) {
          const img = await onSaveCard();
          img.toBlob(async (result) => {
            await handleEvent({ ...values, img: result });
          });
        } else await handleEvent({ ...values, img: model?.card?.img });
      }}
    >
      {(props) => (
        <Form> 
          <Stack
            direction={"row"}
            width={"100%"}
            justifyContent={"space-around"}
            sx={{    display: "flex;",
            flexDirection: "row;",
            width: "100%;",
            justifyContent:" center;",
            flexWrap: "wrap;",
            gap:" 2%;"}}
          >
            <Stack gap={5}>
              <Box
                sx={{ boxShadow: "rgba(17, 12, 46, 0.08) 0px 48px 100px 0px" }}
              >
                <CardView
                  ref={exportRef}
                  title={props.values.title}
                  item={initCardItem}
                  descTitle={props.values.description}
                  descItem={initCardItem2}
                  bgItem={initBgImageCardItem}
                  model={model}
                  bgUrl={bgCategoryImages[props.values.category]}
                />
              </Box>

              <Map
                icon={customIcon}
                position={currentPosition || position}
                setPosition={onChangeMapMarker}
                isAddFlow={isAddFlow}
              />
            </Stack>

            <Divider sx={{ mt: 2, mb: 2 }} />
            <Card>
              <CardContent>
                <Stack sx={{ gap: 2, pt: 2 }}>
                  {/* category */}
                  <Field
                    name="category"
                    select
                    type="text"
                    label="Category"
                    variant="outlined"
                    as={TextField}
                    error={!!props.errors.category}
                    helperText={props.errors.category ?? ""}
                  >
                    {categories.map(({ name, id }) => (
                      <MenuItem key={name} value={String(id)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Field>

                  {/* isPublic */}
                  <Field
                    name="isPublic"
                    select
                    type="text"
                    label="Visibility"
                    variant="outlined"
                    as={TextField}
                    error={!!props.errors.isPublic}
                    helperText={props.errors.isPublic ?? ""}
                  >
                    {publicPrivate.map(({ name, value }) => (
                      <MenuItem key={name} value={value}>
                        {name}
                      </MenuItem>
                    ))}
                  </Field>

                  {/* title */}
                  <Field
                    name="title"
                    type="text"
                    label="Title"
                    variant="outlined"
                    as={TextField}
                    error={!!props.errors.title}
                    helperText={props.errors.title ?? ""}
                  />

                  {/* description */}
                  <Field
                    name="description"
                    label="Description"
                    variant="outlined"
                    as={TextField}
                    multiline
                    error={!!props.errors.description}
                    helperText={props.errors.description ?? ""}
                    item={initCardItem2}
                  />

                  {/* location */}

                  <Field name="location">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors },
                      meta,
                    }) => (
                      <Autocomplete
                        name="location"
                        freeSolo
                        type="text"
                        label="location"
                        variant="outlined"
                        value={getEventLocationTitle(field.value)}
                        onChange={onChangeLocation}
                        error={!!props.errors.location}
                        helperText={props.errors.location ?? ""}
                        options={
                          Results?.map((option) => option.display_name) || []
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            onChange={(e) => handleChange(e.target.value)}
                            label="location"
                          />
                        )}
                      />
                    )}
                  </Field>

                  {/* start date */}
                  <DateTimePicker
                    name="startDate"
                    label="Start Date"
                    value={props.values.startDate} // Pass the value directly to the DateTimePicker
                    onChange={(value) => {
                      props.setFieldValue("startDate", value);
                    }}
                    renderInput={(props) => <TextField {...props} />} // Render input
                    views={["year", "month", "day", "hours", "minutes"]}
                    slotProps={{
                      textField: {
                        helperText: props.errors.startDate ?? "",
                        error: !!props.errors.startDate,
                      },
                    }}
                  />

                  {/* end date */}
                  <DateTimePicker
                    name="endDate"
                    label="End Date"
                    value={props.values.endDate} // Pass the value directly to the DateTimePicker
                    onChange={(value) => {
                      props.setFieldValue("endDate", value);
                    }}
                    renderInput={(props) => <TextField {...props} />} // Render input
                    views={["year", "month", "day", "hours", "minutes"]}
                    slotProps={{
                      textField: {
                        helperText: props.errors.endDate ?? "",
                        error: !!props.errors.endDate,
                      },
                    }}
                  />

                  {/* submit btn */}
                  <Stack
                    justifyContent={"center"}
                    direction={"row"}
                    spacing={2}
                    color={"#AAC22B"}
                  >
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      loading={pendingAddEvent || pendingEditEvent}
                    >
                      {isAddFlow ? "Add" : "Edit"}
                    </LoadingButton>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
          
          <CustomSnackbar
            open={snackbarOpen}
            handleClose={() => {
              setSnackbarOpen(false);
              navigate("/workSpace");
            }}
            message="Event added successfully!"
            security="success"
            color="success"
          />
        </Form>
      )}
    </Formik>
  );
};
