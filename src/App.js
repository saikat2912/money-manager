// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavTabs from './Components/NavTabs';
import WeekData from "./Components/WeekReport/WeekData"
import MonthData from "./Components/MonthReport/MonthData"
import YearData from "./Components/YearReport/YearData"
import AllData from "./Components/AllReport/AllData"
import Last12HourData from "./Components/Last12HoursReport/Last12HoursData"
import {Switch,Route} from "react-router-dom";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <p className="App-title">
            Simple Money Manager
          </p>
          <NavTabs/>
        </header>
      </div>
      <div>
        <Switch>
          <Route path="/week">
            <WeekData/>
          </Route>
          <Route path="/month">
            <MonthData/>
          </Route>
          <Route path="/year">
            <YearData/>
          </Route>
          <Route path="/last12hours">
            <Last12HourData/>
          </Route>
          <Route path="/allhistory">
            <AllData/>
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
