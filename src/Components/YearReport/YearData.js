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

export default function YearData() {
  const [yearData, setYearData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getYearData();
  }, []);
  async function getYearData() {
    fetch(`${backend_url}/yearReport`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setYearData(res);
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
      {yearData.length ? (
        <DisplayData inputData={yearData} />
      ) : (
        <p style={{ display: "flex", justifyContent: "center" }}>
          Nothing to display
        </p>
      )}
      {/* <DisplayData inputData={yearData}/> */}
    </>
  );
}
