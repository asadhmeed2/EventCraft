import React from "react";

import { Grid, Stack, TextField } from "@mui/material";

import { LoadingButton } from "@mui/lab";

import { Formik, Form, Field } from "formik";

import * as Yup from "yup";
import { InputOutlined } from "../../../shared/forms/InputOutlined";

const initFormValues = {
  email: "",
  name: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("email is invalid").required("email is required"),
  name: Yup.string().required("name is required"),
  phoneNumber: Yup.string()
    .matches(
      /^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/,
      "phone number is not valid"
    )
    .required("phone is required"),
  password: Yup.string().required("password is required"),
  confirmPassword: Yup.string()
    .when((value, schema) => {
      return value && value.length > 0
        ? schema.oneOf([Yup.ref("password")], "Passwords must match")
        : schema;
    })
    .required("confirmPassword is required"),
});

export const RegisterForm = ({ onClose, isModal, onRegister, loading }) => {
  return (
    <Formik
      initialValues={initFormValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
        onRegister(values);
      }}
      validateOnChange={false}
    >
      {(props) => (
        <Form>
          <div className="flex flex-col gap-5">
            <Grid justifyContent={"center"} sx={{ gap: 2 }} container>
              {/* Name */}
              <Field
                name="name"
                type="text"
                label="Name"
                variant="outlined"
                as={InputOutlined}
                error={!!props.errors.name}
                helperText={props.errors.name ?? ""}
              />

              {/* email */}
              <Field
                name="email"
                type="email"
                label="Email"
                variant="outlined"
                as={InputOutlined}
                error={!!props.errors.email}
                helperText={props.errors.email ?? ""}
              />
            </Grid>

            <Grid justifyContent={"center"} sx={{ gap: 2 }} container>
              {/* password */}
              <Field
                name="password"
                type="password"
                label="password"
                as={InputOutlined}
                variant="outlined"
                error={!!props.errors.password}
                helperText={props.errors.password ?? ""}
              />

              {/* confirm password */}

              <Field
                name="confirmPassword"
                type="password"
                label="confirm password"
                as={InputOutlined}
                variant="outlined"
                error={!!props.errors.confirmPassword}
                helperText={props.errors.confirmPassword ?? ""}
              />
            </Grid>

            {/* password */}
            <Grid
              sx={{
                justifyContent: {
                  xs: "center",
                  sm: "start",
                },
              }}
              container
            >
              <Field
                name="phoneNumber"
                type="text"
                label="phone number"
                as={InputOutlined}
                variant="outlined"
                error={!!props.errors.phoneNumber}
                helperText={props.errors.phoneNumber ?? ""}
              />
            </Grid>

            {/* submit btn */}
            <Stack justifyContent={"center"} direction={"row"} spacing={2}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={loading}
                color="secondary"
              >
                Sign up
              </LoadingButton>

              {isModal && (
                <LoadingButton
                  color="secondary"
                  variant="outlined"
                  onClick={onClose}
                >
                  cancel
                </LoadingButton>
              )}
            </Stack>
          </div>
        </Form>
      )}
    </Formik>
  );
};
