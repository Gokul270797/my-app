import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Steppers } from './Steppers';
import { useNavigate } from 'react-router-dom';
export const Step1 = ({ userData, setUserData, history }) => {

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const validationErrors = {};

        if (!userData.name) {
            validationErrors.name = 'Name is required';
          }
          
          if (!userData.phone) {
            validationErrors.phone = 'Phone is required';
          }
      
          if (!/^\S+@\S+\.\S+$/.test(userData.email)) {
            validationErrors.email = 'Invalid email address';
          }

          if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
          } else {
            navigate('/step2', { replace: true });
          }
    };

    return (
        <div>
            <Steppers />
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                label="Name"
                                value={userData.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                                className='form-input'
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="phone"
                                label="Phone"
                                value={userData.phone}
                                onChange={handleChange}
                                className='form-input'
                                error={!!errors.phone}
                                helperText={errors.phone}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="email"
                                label="Email"
                                value={userData.email}
                                onChange={handleChange}
                                className='form-input'
                                error={!!errors.email}
                                helperText={errors.email}
                                required
                            />
                        </Grid>
                    </Grid>
                    <br />
                    <Button type="submit" variant="contained" color="primary">
                        Next
                    </Button>
                </form>
            </div>

        </div>

    );
};
