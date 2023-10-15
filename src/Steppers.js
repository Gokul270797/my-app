import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel, TextField, Button, Container, AppBar, Toolbar, Typography } from '@material-ui/core';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { useLocation } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    stepper: {
      position: 'absolute',
      left: 0,
    },
    content: {
      marginLeft: '150px', // Adjust this margin to make space for the stepper
      marginTop: '24px',
    },
  }));
  
export const Steppers = () => {
    function getSteps() {
        return ['Step 1', 'Step 2', 'Step 3'];
    }
      
    const steps = getSteps();
    const classes = useStyles();

    function activeStep() {
        const currentPath = window.location.pathname;
        console.log('currentPath', currentPath)

        return currentPath === '/step1' ? 0 : currentPath === '/step2' ? 1 : 2;
    };

    return (
        <div className={classes.stepper}>
            <Stepper activeStep={activeStep()} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={label}>

                        <StepLabel> <Link to={`/step${index + 1}`}>{label}</Link></StepLabel>

                    </Step>
                ))}
            </Stepper>
        </div>
    )
}