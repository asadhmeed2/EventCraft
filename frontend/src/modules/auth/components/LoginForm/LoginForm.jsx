import React from "react";
import { LoadingButton } from "@mui/lab";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Box, Stack, TextField } from "@mui/material";
import { Input } from "../../../shared/forms/Input/Input";
import { InputOutlined } from "../../../shared/forms/InputOutlined";

const initFormValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("email is invalid").required("email is required"),
  password: Yup.string().required("password is required"),
});

const useStyles = (theme) => ({
  loginForm: {
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  inputField: {
    width: "100%",
    marginBottom: "20px",
  },
  submitBtn: {
    width: "100%",
    marginBottom: "10px",
  },
  cancelBtn: {
    width: "100%",
  },
});

// LoginForm component
export const LoginForm = ({ onClose, isModal, onLogin, loading }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={initFormValues}
      validationSchema={validationSchema}
      onSubmit={onLogin}
      validateOnChange={false}
      
    >
      {(props) => (
        <Form className={classes.loginForm}>
          <div className="flex flex-col items-center " >
            <div className="w-[400px]" >
              {/* email */}
              <Field
                name="email"
                type="email"
                label="Email"
                variant="outlined"
                as={InputOutlined}
                className='w-[100%] h-[40px] mb-[20px]'
                error={!!props.errors.email}
                helperText={props.errors.email ?? ""}
                
              />
            </div>
            <div className="w-[400px]" >
              {/* password */}
              <Field
                name="password"
                type="password"
                label="Password"
                as={InputOutlined}
                className='w-[100%] h-[40px] mb-[20px]'
                error={!!props.errors.password}
                helperText={props.errors.password ?? ""}
                />
                
            </div>

            {/* submit btn */}
            <Stack direction={"row"} spacing={2}  sx={{marginTop: "20px"}}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={loading}
                color={"secondary"}
                className={classes.submitBtn}
               
                
              >
                Sign In
              </LoadingButton>


            </Stack>
          </div>
        </Form>
      )}
    </Formik>
  );
};
