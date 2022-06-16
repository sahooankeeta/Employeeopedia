import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  InputAdornment,
  IconButton,
  Paper,
  Typography,
  Container,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { signin } from "../../actions";

import useStyles from "./styles";

const initialState = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [form, setForm] = useState(initialState);

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const error = useSelector((state) => state.error);
  const isLoading = useSelector((state) => state.isLoading);

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);

    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signin(form, history));
    setForm(initialState);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        {error && <Typography>{error}</Typography>}
        {isLoading && <Typography>...loading</Typography>}
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="Email Address"
            fullWidth
            onChange={handleChange}
            type="email"
            required
            value={form.email}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            name="password"
            value={form.password}
            label="Password"
            style={{ marginBottom: "10px" }}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{ margin: "10px 0" }}
            disabled={isLoading}
          >
            Sign In
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => history.push("/signup")}
          >
            Not registered? Sign Up Now
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SignIn;
