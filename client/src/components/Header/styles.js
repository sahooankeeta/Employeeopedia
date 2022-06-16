import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  appBar: {
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 15px",
  },
  logo: {
    fontFamily: "system-ui",
    border: "1px solid white",
    padding: "1px 10px",
    cursor: "pointer",
  },
}));
