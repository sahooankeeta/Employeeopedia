import React from "react";
import {
  Container,
  Button,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
} from "@mui/material";

import * as actionType from "./../../helpers/constants";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import manimg from "./../../images/man.png";
import womanimg from "./../../images/woman.png";
import userimg from "./../../images/user.png";
import decode from "jwt-decode";
import useStyles from "./styles";
const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleViewProfile = () => {
    history.push(`/employee/${employee.result._id}`);
    handleCloseUserMenu();
  };

  const [employee, setEmployee] = React.useState(
    useSelector((state) => state.profile)
  );
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/");
    handleCloseUserMenu();
  };
  React.useEffect(() => {
    const token = employee?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setEmployee(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar
      position="static"
      style={{ marginBottom: "10px", backgroundColor: "#7b37ad" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className={classes.logo}
            onClick={() => history.push("/")}
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            EMPLOYEEOPEDIA
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            EMPLOYEEOPEDIA
          </Typography>

          {employee?.result ? (
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "auto",
              }}
            >
              <h3>{employee.result.name}</h3>
              <Box sx={{ flexGrow: 0, marginLeft: "10px" }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={employee.result.name}
                      src={
                        employee.result.sex === "M"
                          ? manimg
                          : employee.result.sex === "F"
                          ? womanimg
                          : userimg
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem key="profile" onClick={handleViewProfile}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>

                  <MenuItem key="logout" onClick={logout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          ) : (
            <Button
              style={{
                color: "blue",
                display: "block",
                backgroundColor: "white",
                marginLeft: "auto",
              }}
              onClick={() => history.push("/auth")}
            >
              sign in
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
