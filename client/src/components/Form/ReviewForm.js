import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useHistory } from "react-router-dom";
import {
  Button,
  Paper,
  Container,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import useStyles from "./styles";

import { getEmployee, createReview, updateReview } from "./../../actions";
const initialState = {
  reviewBy: "",
  reviewFor: "",
  rating: "",
  feedback: "",
};
const ReviewForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const profileID = useSelector((state) => state.profile.result._id);
  const { id } = useParams();
  const search = useLocation().search;
  const reviewID = new URLSearchParams(search).get("id");

  const [form, setForm] = React.useState(initialState);

  const employee = useSelector((state) => state.employee);
  let review = useSelector((state) =>
    reviewID ? state.employee.reviews.find((p) => p._id === reviewID) : null
  );

  const error = useSelector((state) => state.error);
  const isLoading = useSelector((state) => state.isLoading);
  React.useEffect(() => {
    if (review) {
      setForm({
        ...form,
        reviewBy: review.reviewBy,
        reviewFor: review.reviewFor,
        feedback: review.feedback,
        rating: review.rating,
      });
    } else {
      dispatch(getEmployee(id));
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviewID) {
      dispatch(updateReview(reviewID, form, history));
    } else {
      let review = form;
      review["reviewBy"] = profileID;
      review["reviewFor"] = id;
      setForm(review);

      dispatch(createReview(form, profileID, id, history));
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  if (isLoading) return <div>..loading</div>;
  if (error) return <div>{error}</div>;
  let content = (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <div style={{ fontSize: "18px", fontWeight: "600", color: "#58257d" }}>
          Review Form for {employee.name}
        </div>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            halfWidth
            type="number"
            name="rating"
            label="rating"
            onChange={handleChange}
            value={form.rating}
            style={{ marginBottom: "10px" }}
          />
          <TextareaAutosize
            onChange={handleChange}
            name="feedback"
            value={form.feedback}
            placeholder="feedback"
            style={{ width: "96%", padding: "5px" }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{ margin: "10px 0" }}
          >
            submit
          </Button>
        </form>
      </Paper>
    </Container>
  );

  return content;
};
export default ReviewForm;
