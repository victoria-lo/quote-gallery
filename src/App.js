import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { Container, Grid, Chip, AppBar, Tab, Tabs, Box } from '@material-ui/core';
import './App.css';

const creds = require('./credentials.json')

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <p>{children}</p>
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
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}



function App() {
  useEffect(() => {
    getSheet();
  },[]);

  const [rows, setRows] = useState([]);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getSheet(){
    const doc = new GoogleSpreadsheet('1E8Gn22-c-je9q_JBQY7yfHDoBl9asFugSG79eiloQLQ');

    // Initialize Auth
    await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
    });

    // loads document properties and worksheets
    await doc.loadInfo(); 
    const sheet = doc.sheetsByIndex[0];
    const getRows = await sheet.getRows();
    setRows(getRows);
}

  return (
    <div>
      <AppBar position="static">
        <Tabs className="tab" value={value} onChange={handleChange} indicatorColor="primary"
    textColor="primary" centered aria-label="simple tabs">
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Success" {...a11yProps(1)} />
          <Tab label="Focus" {...a11yProps(2)} />
          <Tab label="Productivity" {...a11yProps(3)} />
          <Tab label="Love" {...a11yProps(4)} />
          <Tab label="Life" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <Container maxWidth="md">
      <TabPanel value={value} index={0}>
      <Grid className= "container" container justify="center">
        {rows.map((row, index)=>{
          return(
            <Grid className= "card" key={index} xs={12} sm={3}>
              <p>{`${row.Quotes}`}</p>
              <p style={{fontStyle:"italic"}}>{`- ${row.Quoter}`}</p>
              <Chip className= "chip" label={`${row.Category}`}/>
            </Grid>
          )
        })}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid className= "container" container justify="center">
          {rows.filter(row=> { 
            return row.Category === "Success"; 
            }).map((row, index)=>{
              return(
                <Grid className= "card" key={index} xs={12} sm={3}>
                  <p>{`${row.Quotes}`}</p>
                  <p style={{fontStyle:"italic"}}>{`- ${row.Quoter}`}</p>
                  <Chip className= "chip" label={`${row.Category}`}/>
                </Grid>
              )
          })}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Grid className= "container" container justify="center">
          {rows.filter(row=> { 
            return row.Category === "Focus"; 
            }).map((row, index)=>{
              return(
                <Grid className= "card" key={index} xs={12} sm={3}>
                  <p>{`${row.Quotes}`}</p>
                  <p style={{fontStyle:"italic"}}>{`- ${row.Quoter}`}</p>
                  <Chip className= "chip" label={`${row.Category}`}/>
                </Grid>
              )
          })}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <Grid className= "container" container justify="center">
          {rows.filter(row=> { 
            return row.Category === "Productivity"; 
            }).map((row, index)=>{
              return(
                <Grid className= "card" key={index} xs={12} sm={3}>
                  <p>{`${row.Quotes}`}</p>
                  <p style={{fontStyle:"italic"}}>{`- ${row.Quoter}`}</p>
                  <Chip className= "chip" label={`${row.Category}`}/>
                </Grid>
              )
          })}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={4}>
      <Grid className= "container" container justify="center">
          {rows.filter(row=> { 
            return row.Category === "Love"; 
            }).map((row, index)=>{
              return(
                <Grid className= "card" key={index} xs={12} sm={3}>
                  <p>{`${row.Quotes}`}</p>
                  <p style={{fontStyle:"italic"}}>{`- ${row.Quoter}`}</p>
                  <Chip className= "chip" label={`${row.Category}`}/>
                </Grid>
              )
          })}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={5}>
      <Grid className= "container" container justify="center">
          {rows.filter(row=> { 
            return row.Category === "Life"; 
            }).map((row, index)=>{
              return(
                <Grid className= "card" key={index} xs={12} sm={3}>
                  <p>{`${row.Quotes}`}</p>
                  <p style={{fontStyle:"italic"}}>{`- ${row.Quoter}`}</p>
                  <Chip className= "chip" label={`${row.Category}`}/>
                </Grid>
              )
          })}
        </Grid>
      </TabPanel>
      
    </Container>
    </div>
    
        
  );
}

export default App;
