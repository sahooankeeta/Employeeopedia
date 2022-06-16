import React from "react";

import { Card, CardActions, CardContent, ButtonBase } from "@mui/material";
import manimg from "./../../images/man.png";
import womanimg from "./../../images/woman.png";
import userimg from "./../../images/user.png";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./style";
import { deleteEmployee } from "../../actions";
const EmployeeCard = ({ employee }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <Card className={classes.card}>
      <ButtonBase
        style={{ flex: "1" }}
        onClick={() => history.push(`/employee/${employee._id}`)}
      >
        <CardContent className={classes.cardContent}>
          <img
            src={
              employee.sex === "M"
                ? manimg
                : employee.sex === "F"
                ? womanimg
                : userimg
            }
            alt={employee.sex}
            height="110px"
          />
          <div className={classes.info}>
            <h3 style={{ textTransform: "capitalize" }}>{employee.name}</h3>
            <div style={{ textTransform: "capitalize", fontWeight: "600" }}>
              {employee.role}
            </div>
            <div style={{ textTransform: "capitalize", fontWeight: "600" }}>
              {employee.dept} Department
            </div>
            <div style={{ fontWeight: "600" }}>{employee.email}</div>
          </div>
        </CardContent>
      </ButtonBase>

      <CardActions style={{ height: "60px" }}>
        <button
          className={classes.button}
          onClick={() => history.push(`/employee/edit/${employee._id}`)}
        >
          edit
        </button>
        <button
          className={classes.button}
          onClick={() => dispatch(deleteEmployee(employee._id))}
        >
          delete
        </button>
      </CardActions>
    </Card>
  );
};
export default EmployeeCard;
