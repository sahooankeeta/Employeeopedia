import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { DEPARTMENTS } from "./../../helpers/constants";
import {
  Avatar,
  Button,
  Paper,
  MenuItem,
  InputLabel,
  Typography,
  Container,
  FormControl,
  Select,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { useHistory, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { signup, editEmployee } from "../../actions";

import useStyles from "./styles";

const initialState = {
  name: "",
  role: "",
  dept: "",
  sex: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [form, setForm] = useState(initialState);
  const employee = useSelector((state) =>
    id ? state.allEmployees.find((p) => p._id === id) : null
  );

  React.useEffect(() => {
    if (employee)
      setForm({
        ...form,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        dept: employee.dept,
        sex: employee.sex,
      });
  }, [id]);

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id)
      dispatch(
        editEmployee(
          id,
          {
            name: form.name,
            email: form.email,
            role: form.role,
            dept: form.dept,
            sex: form.sex,
          },
          history
        )
      );
    else {
      dispatch(signup(form, history));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {id ? "Edit Employee" : "Create employee"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Full Name"
            value={form.name}
            onChange={handleChange}
            autoFocus
            required
            fullWidth
            style={{ marginBottom: "10px" }}
            className={classes.input}
          />
          <TextField
            value={form.role}
            name="role"
            label="Role"
            onChange={handleChange}
            //className={classes.input}
            required
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <TextField
            value={form.email}
            name="email"
            label="Email Address"
            onChange={handleChange}
            required
            type="email"
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <FormControl
            sx={{ m: 1, minWidth: 150 }}
            style={{ margin: "0", marginRight: "10px" }}
          >
            <InputLabel id="demo-simple-select-label">Dept</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Dept"
              value={form.dept}
              onChange={(e) => setForm({ ...form, dept: e.target.value })}
            >
              {DEPARTMENTS.map((dept, id) => (
                <MenuItem value={dept} key={`dept-${id}`}>
                  {dept}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            sx={{ m: 1, minWidth: 150 }}
            style={{ margin: "0", marginRight: "10px" }}
          >
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Sex"
              value={form.sex}
              onChange={(e) => setForm({ ...form, sex: e.target.value })}
            >
              <MenuItem value="M">male</MenuItem>
              <MenuItem value="F">female</MenuItem>
              <MenuItem value="">no answer</MenuItem>
            </Select>
          </FormControl>

          {!id && (
            <>
              <TextField
                name="password"
                label="Password"
                value={form.password}
                onChange={handleChange}
                fullWidth
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                style={{ margin: "10pX 0" }}
              />
            </>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: "10px 0" }}
          >
            {id ? "edit" : "create"}
          </Button>
          {!id && (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => history.push("/auth")}
            >
              already registered? Sign In Now
            </Button>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
