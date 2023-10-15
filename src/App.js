import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import { Container, AppBar, Toolbar, Typography } from '@material-ui/core';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';

const App = () => {
  const [userData, setUserData] = useState({ name: '', phone: '', email: '' });
  const [addressData, setAddressData] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
  });


  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              User Registration
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          
          <Routes>
            <Route path="/" exact element={<Step1 setUserData={setUserData} userData={userData}/>} />
            <Route path="/step1" exact element={<Step1 setUserData={setUserData} userData={userData}/>} />
            <Route path="/step2" element={<Step2 addressData={addressData} setAddressData={setAddressData}/>} />
            <Route path="/step3" element={<Step3 userData={userData} addressData={addressData}/>} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;
