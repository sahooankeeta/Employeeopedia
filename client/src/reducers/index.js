import * as actionType from "../helpers/constants.js";

const initialState = {
  isLoading: false,
  profile: localStorage.getItem("profile")
    ? JSON.parse(localStorage.getItem("profile"))
    : {},
  allEmployees: localStorage.getItem("allEmployees")
    ? JSON.parse(localStorage.getItem("allEmployees"))
    : null,
  employee: localStorage.getItem("employee")
    ? JSON.parse(localStorage.getItem("employee"))
    : null,

  error: "",
};
const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, profile: action.data, isLoading: false, error: null };
    case actionType.SET_LOADING: //HANDLE LOADING EVENT
      return { ...state, isLoading: action.payload };
    case actionType.SET_ERROR: //HANDLE ERROR
      return { ...state, error: action.payload };
    case actionType.FETCH_ALL_EMPLOYEES: //FETCH ALL EMPLOYEES
      let allEmployees = action.employees?.filter(
        (item) => item.email !== state.profile.result.email
      );
      localStorage.setItem("allEmployees", JSON.stringify(allEmployees));
      return {
        ...state,
        allEmployees,

        isLoading: false,
        error: null,
      };
    case actionType.DELETE_EMPLOYEE:
      let employees = state.allEmployees.filter(
        (item) => item._id !== action.payload
      );
      return {
        ...state,
        allEmployees: employees,
      };
    case actionType.FETCH_EMPLOYEE:
      localStorage.setItem("employee", JSON.stringify(action.payload.employee));
      return {
        ...state,
        employee: action.payload.employee,
      };

    case actionType.TOGGLE_ADMIN:
      let employee = { ...state.employee, isAdmin: !state.employee.isAdmin };
      localStorage.setItem("employee", JSON.stringify(employee));

      return {
        ...state,
        employee,
      };
    case actionType.LOGOUT:
      localStorage.clear();

      return {
        ...state,
        employee: {},

        isLoading: false,
        error: "",
        profile: {},
      };
    default:
      return {
        ...state,
        profile: JSON.parse(localStorage.getItem("profile")),
        employee: JSON.parse(localStorage.getItem("employee")),

        allEmployees: JSON.parse(localStorage.getItem("allEmployees")),
        isLoading: false,
        error: "",
      };
  }
};
export default reducers;
