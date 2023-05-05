import React, { useState } from "react";
import {
  Box, Grid, FormHelperText, Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Text from "components/Text";
import SubmitButton from "components/SubmitButton";
import { signIn } from "lib/auth";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StyledTextField from "components/StyledForm/StyledTextField";
import Line from "components/Line";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required(),
  password: Yup.string().required(),
});

const Login = () => {
  const [error, setError] = useState(null);

  const onSubmit = async (payload) => {
    console.log(payload);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <Box sx={{ bgcolor: "#fff" }}>
      <Text size="lg" id="auth" color="#000">Login</Text>
      <Line
        xs={{ width: "100%", color: "#000", thickness: "4px" }}
        lg={{ width: "30%", color: "#000", thickness: "4px" }}
      />

      <br />
      <br />
      <br />

      <form onSubmit={formik.handleSubmit}>
        <div>
          <StyledTextField
            fullWidth
            id="email"
            name="email"
            label="Your E-mail"
            variant="outlined"
            onChange={formik.handleChange}
            autoComplete="off"
          />
          {formik.errors.email ? <FormHelperText error>{formik.errors.email}</FormHelperText> : null}
        </div>

        <br />

        <div>
          <StyledTextField
            fullWidth
            id="password"
            name="password"
            label="Your Password"
            variant="outlined"
            onChange={formik.handleChange}
            type="password"
            autocomplete="off"
          />
          {formik.errors.password ? <FormHelperText error>{formik.errors.password}</FormHelperText> : null}
        </div>

        <br />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <SubmitButton size="large" endIcon={<ArrowForwardIcon />}>Continue</SubmitButton>
        </Box>

        {error ? (
          <>
            <br />

            <Alert severity="error">{error}</Alert>
          </>
        ) : null}
      </form>
    </Box>
  );
};

export default Login;
