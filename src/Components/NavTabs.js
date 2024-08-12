import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Link, useHistory} from "react-router-dom"
import {Container} from "@material-ui/core"
import { fade } from '@material-ui/core/styles/colorManipulator';
import AddDataModel from "./AddDataModel/AddDataModel"

function TabPanel(props) {
  const { children, value, index, ...other } = props;
    

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: fade(theme.palette.background.paper,0.4)
  },
}));

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const history=useHistory()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Tabs
          
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab style={{ fontSize: "0.7em", maxWidth:"10%", fontWeight:"bold" }} label="Last 12 Hours" {...a11yProps(0)} onClick={()=>{history.push("/last12hours")}}/>
          <Tab style={{ fontSize: "0.7em", maxWidth:"10%", fontWeight:"bold"}} label="Week Report" {...a11yProps(1)} onClick={()=>{history.push("/week")}}/>
          <Tab style={{ fontSize: "0.7em", maxWidth:"10%", fontWeight:"bold" }} label="Month Report" {...a11yProps(2)} onClick={()=>{history.push("/month")}}/>
          <Tab style={{ fontSize: "0.7em", maxWidth:"10%", fontWeight:"bold" }} label="Year Report" {...a11yProps(3)} onClick={()=>{history.push("/year")}}/>
          
          <Tab style={{ fontSize: "0.7em", maxWidth:"10%", fontWeight:"bold" }} label="All History" {...a11yProps(4)} onClick={()=>{history.push("/allhistory")}}/>
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} >
        Last 12 Hours
      </TabPanel>
      <TabPanel value={value} index={1} >
        Week Report
      </TabPanel>
      <TabPanel value={value} index={2} >
        Month Report
      </TabPanel>
      <TabPanel value={value} index={3} >
        Year Report
      </TabPanel>
      
      <TabPanel value={value} index={4} >
        All History
      </TabPanel>
      <span style={{marginLeft:"auto"}}>
         <AddDataModel/>
      </span>
    </div>
    </Container>
  );
}


