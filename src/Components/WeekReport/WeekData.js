import { useEffect, useState } from "react";
import DisplayData from "../DisplayDataTable/DisplayData";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { backend_url } from "../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function WeekData() {
  const [weekData, setWeekData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getWeekData();
  }, []);
  async function getWeekData() {
    // const rawData=fetch("http://localhost:5080/weekReport",{METHOD:"GET"})
    // const jsonData=await rawData.json()
    // .then(res=>setWeekData(jsonData))
    fetch(`${backend_url}/weekReport`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setWeekData(res);
        setLoading(false);
      });
  }
  const classes = useStyles();
  if (loading) {
    return (
      <div
        className={classes.root}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      <br />
      {weekData.length ? (
        <DisplayData inputData={weekData} />
      ) : (
        <p style={{ display: "flex", justifyContent: "center" }}>
          Nothing to display
        </p>
      )}
      {/* <DisplayData inputData={weekData}/> */}
    </>
  );
}
