import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployees } from "../../actions";
import EmployeeCard from "./../Employee/EmployeeCard";
import Grid from "@mui/material/Grid";
import useStyles from "./styles";
const AdminHome = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const allEmployees = useSelector((state) => state.allEmployees);
  const error = useSelector((state) => state.error);
  const isLoading = useSelector((state) => state.isLoading);

  React.useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  if (error) return <div>{error}</div>;
  if (isLoading) return <div>loading . . .</div>;

  return (
    <main className={classes.content}>
      <Grid container alignItems="stretch" spacing={3}>
        {allEmployees?.length > 0 ? (
          allEmployees.map((employee, id) => (
            <Grid key={employee._id} item xs={12} sm={6} md={4} lg={3}>
              <EmployeeCard employee={employee} key={`employee-${id}`} />
            </Grid>
          ))
        ) : (
          <Grid key="none" item>
            <div
              style={{ color: "#4e1e72", fontWeight: "600", fontSize: "22px" }}
            >
              No employees to show yet
            </div>
          </Grid>
        )}
      </Grid>
    </main>
  );
};
export default AdminHome;
