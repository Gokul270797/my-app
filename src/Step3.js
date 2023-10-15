import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography , Paper, Grid, makeStyles} from '@material-ui/core';
import { Steppers } from './Steppers';
import { Alert } from '@material-ui/lab';

export const Step3 = ({ userData, addressData }) => {
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);


    useEffect(() => {
    axios.post('', {
        userData,
        addressData
    })
        .then((response) => {
            setSuccess(true)
            // Handle the response
        })
        .catch((error) => {
            setFailure(true)
            // Handle errors
        });
    }, []);
    //https://webhook.site/e22f42fb-7573-45df-b34a-a5e3a42549c8

    return (
        <div>
            <Steppers />
            {/* Display a summary of user and address data here */}

            {
                success && <Alert severity="success" color="info" onClick={() => setSuccess(false)}>
                    User info updated!
                </Alert>
            }
            {failure}
             {
                failure && <Alert severity="error" onClick={() => setFailure(false)}>
                    Something went wront!
                </Alert>
            }
                        <div  className="form-container">
                <SummaryComponent userData={userData} addressData={addressData}/>
            </div>
        </div>
    );
};

//https://webhook.site/e22f42fb-7573-45df-b34a-a5e3a42549c8



const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

const SummaryComponent = (props) => {
  const classes = useStyles;

  return (
    <Paper className={classes.paper} id="summary">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Name:</strong> {props.userData.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Phone:</strong> {props.userData.phone}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Email:</strong> {props.userData.email}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Address Line 1:</strong> {props.addressData.addressLine1}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Address Line 2:</strong> {props.addressData.addressLine2}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>City:</strong> {props.addressData.city}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>State:</strong> {props.addressData.state}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Country:</strong> {props.addressData.country}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Pincode:</strong> {props.addressData.pincode}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SummaryComponent;
