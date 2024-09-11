import s from "./Form.module.scss";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addUser, editUser } from "../../features/usersSlice";
import { v4 as uuidv4 } from 'uuid';

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";

import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";

const Form = ({ title, id, name, age, email }) => {  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    defaultValues: {
      name: name || "",
      // age: age,
      email: email || "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    const lastId = uuidv4()

    if (!id) {      
      const newUser = { id: lastId, ...data };
      dispatch(addUser(newUser));
    } else {
      const updateUser = { id, ...data}
      dispatch(editUser(updateUser))
    }
    reset();
    navigate("/");
  };

  return (
    <Box className={s.form} component='form' onSubmit={handleSubmit(onSubmit)}>
      <h1>{title}</h1>

      <Box className={s.inputW}>
        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <TextField
              id='name-basic'
              label='Name'
              variant='filled'
              autoComplete='off'
              {...field}
            />
          )}
        />
        <p>{errors?.name?.message}</p>
      </Box>

      {/* <Box className={s.inputW}>
        <Controller
          name='age'
          control={control}
          render={({ field }) => (
            <TextField
              id='age-basic'
              label='Age'
              variant='filled'
              autoComplete='off'
              {...field}
            />
          )}
        />
        <p>{errors?.age?.message}</p>
      </Box> */}

      <Box className={s.inputW}>
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <TextField
              id='email-basic'
              label='Email'
              variant='filled'
              autoComplete='off'
              {...field}
            />
          )}
        />
        <p>{errors?.email?.message}</p>
      </Box>

      <Box className={s.btns}>
        <Button
          variant='contained'
          color='primary'
          type='submit'
          disabled={!isDirty && !isValid}
        >
          {id ? "Update" : "Add User"}
        </Button>
        <Button
          variant='contained'
          color='inherit'
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
