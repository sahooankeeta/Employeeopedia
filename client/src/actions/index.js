import * as api from "../api/index.js";
import {
  AUTH,
  FETCH_ALL_EMPLOYEES,
  SET_LOADING,
  LOGOUT,
  SET_ERROR,
  FETCH_EMPLOYEE,
  DELETE_EMPLOYEE,
  FETCH_REVIEW,
  TOGGLE_ADMIN,
} from "./../helpers/constants";
export const signin = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const { data } = await api.signIn(formData);

    dispatch({ type: SET_LOADING, payload: false });
    if (data?.error) dispatch({ type: SET_ERROR, payload: data.error });
    else {
      dispatch({ type: AUTH, data });
      if (!data?.result?.isAdmin) router.push(`/employee/${data.result._id}`);
    }
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: "try again" });
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const { data } = await api.signUp(formData);

    dispatch({ type: SET_LOADING, payload: false });
    if (data?.error) dispatch({ type: SET_ERROR, payload: data.error });
    router.push("/home");
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: err.message });
    dispatch({ type: SET_LOADING, payload: false });
  }
};
export const getAllEmployees = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const { data } = await api.getAllEmployees();

    if (data?.error) dispatch({ type: SET_ERROR, payload: data.error });
    else
      dispatch({
        type: FETCH_ALL_EMPLOYEES,
        employees: data,
      });
    dispatch({ type: SET_LOADING, payload: false });
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: err.message });
    dispatch({ type: SET_LOADING, payload: false });
  }
};
export const getEmployee = (id) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });

  try {
    const { data } = await api.fetchEmployee(id);
    if (data?.error) dispatch({ type: SET_ERROR, payload: data.error });
    else
      dispatch({
        type: FETCH_EMPLOYEE,
        payload: {
          employee: {
            ...data.employee,
            pendingReviews: data.allPendingReviews,
            reviews: data.reviews,
          },
        },
      });
    dispatch({ type: SET_LOADING, payload: false });
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: err.message });
    dispatch({ type: SET_LOADING, payload: false });
  }
};
export const deleteEmployee = (id) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const { data } = await api.deleteEmployee(id);
    if (data?.error) dispatch({ type: SET_ERROR, payload: data.error });
    dispatch({ type: DELETE_EMPLOYEE, payload: id });
    dispatch({ type: SET_LOADING, payload: false });
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: err.message });
    dispatch({ type: SET_LOADING, payload: false });
  }
};
export const editEmployee = (id, formData, router) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const { data } = await api.editEmployee(id, formData);
    if (data?.error) dispatch({ type: SET_ERROR, payload: data.error });
    dispatch({ type: SET_LOADING, payload: false });
    router.push("/home");
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: err.message });
    dispatch({ type: SET_LOADING, payload: false });
  }
};
export const addPendingReview = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addPendingReview(formData);
    if (data?.error) dispatch({ type: SET_ERROR, payload: data.error });
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: err.message });
    dispatch({ type: SET_LOADING, payload: false });
  }
};
export const createReview =
  (formData, profileID, id, router) => async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const { data } = await api.createReview(formData);
      dispatch({ type: SET_LOADING, payload: false });
      if (data?.error) dispatch({ type: SET_ERROR, payload: data.error });
      dispatch(removePendingReview(profileID, id));
      router.push(`/employee/${formData.reviewBy}`);
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: "try again" });
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

export const updateReview = (id, form, router) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const { data } = await api.editReview(id, form);
    if (data?.error) dispatch({ type: SET_ERROR, payload: data.error });
    dispatch({ type: SET_LOADING, payload: false });
    router.push(`/employee/${form.reviewFor}`);
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: err.message });
    dispatch({ type: SET_LOADING, payload: false });
  }
};
export const removePendingReview = (profileId, id) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const { data } = await api.removePendingReview(profileId, id);
    if (data?.error) dispatch({ type: SET_ERROR, payload: data.error });

    dispatch({ type: SET_LOADING, payload: false });
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: "try again" });
    dispatch({ type: SET_LOADING, payload: false });
  }
};
export const toggleAdmin = (id) => async (dispatch) => {
  const { data } = await api.toggleAdmin(id);
  if (data?.error) dispatch({ type: SET_ERROR, payload: data.error });

  dispatch({ type: TOGGLE_ADMIN });
};
