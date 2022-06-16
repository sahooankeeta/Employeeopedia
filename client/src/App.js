import React from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Grow from "@mui/material/Grow";
import {
  Header,
  Home,
  AdminHome,
  SignIn,
  ReviewForm,
  EmployeePage,
  SignUp,
} from "./components";
const App = () => {
  const employee = useSelector((state) => state.profile);

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Header />
        <Grow in>
          <Container maxWidth="xl">
            <Switch>
              <Route
                path="/auth"
                exact
                component={() =>
                  !employee?.result ? <SignIn /> : <Redirect to="/" />
                }
              />
              <Route path="/employee/:id" exact component={EmployeePage} />
              <Route path="/signup" exact component={SignUp} />

              <Route path="/review/form/:id" component={ReviewForm} />
              <Route path="/review/form" component={ReviewForm} />
              <Route path="/employee/edit/:id" component={SignUp} />
              <Route
                path="/home"
                exact
                component={() =>
                  employee?.result ? (
                    employee?.result?.isAdmin ? (
                      <AdminHome />
                    ) : (
                      <Home />
                    )
                  ) : (
                    <Redirect to="/auth" />
                  )
                }
              />
              <Route
                path="/"
                exact
                component={() =>
                  employee?.result ? <Redirect to="/home" /> : <Home />
                }
              />
            </Switch>
          </Container>
        </Grow>
      </Container>
    </BrowserRouter>
  );
};
export default App;
