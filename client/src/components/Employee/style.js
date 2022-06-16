import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  card: {
    height: "200px",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
    padding: "0 15px",
  },
  content: { flexGrow: 1, position: "relative" },
  button: {
    border: "none",
    padding: "5px 8px",
    textTransform: "capitalize",
    color: "white",
    backgroundColor: "#7b37ad",

    letterSpacing: "1px",
    fontWeight: "600",
    cursor: "pointer",
  },
  info: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "left",
    marginLeft: "10px",
    color: "#672e91",
  },
}));
