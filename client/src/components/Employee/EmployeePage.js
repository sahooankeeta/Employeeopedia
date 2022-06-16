import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Paper,
  Grid,
  Box,
  Button,
  Typography,
  Tab,
  Tabs,
  InputLabel,
  MenuItem,
  Select,
  Rating,
  FormControl,
} from "@mui/material";

import manimg from "./../../images/man.png";
import womanimg from "./../../images/woman.png";
import userimg from "./../../images/user.png";

import { DEPARTMENTS } from "../../helpers/constants";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getEmployee, addPendingReview, toggleAdmin } from "../../actions";
import useStyles from "./style";
const initialState = {
  dept: "",
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const EmployeePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const user = useSelector((state) => state.profile.result);

  const { id } = useParams();

  const employee = useSelector((state) => state.employee);
  const [admin, setAdmin] = React.useState(false);

  const error = useSelector((state) => state.error);
  const isLoading = useSelector((state) => state.isLoading);

  const [form, setForm] = React.useState(initialState);

  React.useEffect(() => {
    if (id) {
      dispatch(getEmployee(id));
    }
  }, [dispatch, id]);
  React.useEffect(() => {
    if (employee) setAdmin(employee.isAdmin);
  }, [dispatch]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPendingReview({ ...form, ["employee"]: employee._id }));
    clear();
  };
  const handleAdmin = (e) => {
    e.preventDefault();
    dispatch(toggleAdmin(id));
    setAdmin(!employee.isAdmin);
  };

  const clear = () => setForm(initialState);
  if (isLoading) return <div>..loading</div>;
  if (error) return <div>{error}</div>;

  if (employee)
    return (
      <Container
        style={{
          display: "grid",
          alignContent: "center",
          background: "white",
          padding: "15px",
        }}
      >
        <div
          style={{
            margin: "15px auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 0",
            width: "100%",
          }}
        >
          <img
            src={
              employee.sex === "M"
                ? manimg
                : employee.sex === "F"
                ? womanimg
                : userimg
            }
            alt={employee.sex}
            style={{ marginRight: "20px", height: "20vw", maxHeight: "170px" }}
          />
          <div style={{ color: "#672e91", fontWeight: "600" }}>
            {admin && (
              <div
                style={{
                  backgroundColor: "#7b37ad",
                  textTransform: "capitalize",
                  color: "white",
                }}
              >
                admin
              </div>
            )}
            <h3>{employee.name}</h3>
            <div>{employee.email}</div>
            <div>{employee.role}</div>
            <div>{employee.dept} Department</div>

            {user.isAdmin && (
              <div style={{ marginTop: "10px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "10px" }}
                  onClick={() => history.push(`/employee/edit/${employee._id}`)}
                >
                  edit
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAdmin}
                >
                  {admin ? "remove admin" : "make admin"}
                </Button>
              </div>
            )}
          </div>
        </div>
        {user.isAdmin && (
          <div>
            <h3>Get reviewed by :</h3>
            <form onSubmit={handleSubmit}>
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

              <Button type="submit" variant="contained" color="primary">
                apply
              </Button>
            </form>
          </div>
        )}

        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            width: "80%",
            margin: "auto",
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="reviews" {...a11yProps(0)} />
              {(id === user._id || user.isAdmin) && (
                <Tab label="pending" {...a11yProps(1)} />
              )}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {employee.reviews?.length > 0 ? (
              employee.reviews.map((item) => (
                <Paper
                  elevation={3}
                  style={{ marginBottom: "10px", padding: "10px 15px" }}
                >
                  <Rating defaultValue={item.rating} precision={0.1} readOnly />
                  <div>" {item.feedback} "</div>
                  <div style={{ textTransform: "capitalize" }}>
                    ~ {item.reviewBy.name}
                  </div>
                  {user.isAdmin && (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() =>
                        history.push(`/review/form?id=${item._id}`)
                      }
                    >
                      edit
                    </Button>
                  )}
                </Paper>
              ))
            ) : (
              <div>No reviews yet</div>
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {(id === user._id || user.isAdmin) && (
              <Grid item xs={12} sm={12} md={12}>
                {employee?.pendingReviews?.length > 0 ? (
                  employee.pendingReviews.map((item, id) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      key={`pending-${id}`}
                    >
                      <div
                        onClick={() => history.push(`/employee/${item._id}`)}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "85%",
                        }}
                      >
                        <div>{item.name}</div>
                        <div>{item.dept}</div>
                      </div>
                      {user._id === employee._id && (
                        <button
                          className={classes.button}
                          onClick={() => {
                            history.push(`/review/form/${item._id}`);
                          }}
                        >
                          Review
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <div>No pending review requests yet</div>
                )}
              </Grid>
            )}
          </TabPanel>
        </Box>
      </Container>
    );
};
export default EmployeePage;
