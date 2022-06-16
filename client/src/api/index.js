import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

export const getAllEmployees = () => API.get("/employee/all");
export const signIn = (formData) => API.post("/employee/signin", formData);
export const signUp = (formData) => API.post("/employee/signup", formData);
export const fetchEmployee = (id) => API.get(`/employee/${id}`);

export const deleteEmployee = (id) => API.delete(`/employee/${id}`);
export const editEmployee = (id, formData) =>
  API.patch(`/employee/${id}`, formData);
export const editReview = (id, formData) =>
  API.patch(`/review/${id}`, formData);

export const addPendingReview = (formData) =>
  API.post("/review/pendingReview", formData);
export const createReview = (formData) => API.post("/review/create", formData);
export const removePendingReview = (profileID, id) =>
  API.post("/review/removePendingReview", { profileID, id });
export const toggleAdmin = (id) => API.get(`/employee/toggleAdmin/${id}`);
