import s from "./LoginPage.module.scss";

import { useNavigate } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";

const schemaLogIn = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const LoginPage = () => {
  const navigate = useNavigate();  

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schemaLogIn),
  });

  const onSubmit = data => {
    reset();
    navigate("/", { state: { user: data } });
  };

  return (
    <Box className={s.form} component="form" onSubmit={handleSubmit(onSubmit)}>
      <h1>Log In to make actions</h1>
      <h2>secret password 123 <br />secret email i@asd</h2>

      <Box className={s.inputW}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              id="email-basic"
              label="Email"
              variant="filled"
              autoComplete="off"
              {...field}
            />
          )}
        />
        <p>{errors?.email?.message}</p>
      </Box>

      <Box className={s.inputW}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              type="password"
              id="password-basic"
              label="Password"
              variant="filled"
              autoComplete="off"
              {...field}
            />
          )}
        />
        <p>{errors?.password?.message}</p>
      </Box>

      <Box className={s.btns}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!isDirty && !isValid}
        >
          Log In
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
