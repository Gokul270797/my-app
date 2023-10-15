import React, { useState } from 'react';
import { TextField, Button, Container, Paper } from '@material-ui/core';
import { Steppers } from './Steppers';
import Grid from '@material-ui/core/Grid';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';

export const Step2 = ({ history, addressData, setAddressData }) => {
    const navigate = useNavigate();
    const handleChange = (e) => {
        setAddressData({ ...addressData, [e.target.name]: e.target.value });
    };
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};


        if (!addressData.addressLine1) {
            validationErrors.addressLine1 = 'Address Line 1 is required';
        }

        if (!addressData.city) {
            validationErrors.city = 'City is required';
        }

        if (!addressData.state) {
            validationErrors.state = 'State is required';
        }

        if (!addressData.country) {
            validationErrors.country = 'Country is required';
        }

        if (!addressData.pincode) {
            validationErrors.pincode = 'Pincode is required';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            navigate('/step3', { replace: true });

        }
    };

    return (
        <div>
            <Steppers />
            {/* <AddressForm /> */}
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                name="addressLine1"
                                label="Address Line 1"
                                value={addressData.addressLine1}
                                className='form-input'
                                onChange={handleChange}
                                error={!!errors.addressLine1}
                                helperText={errors.addressLine1}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="addressLine2"
                                label="Address Line 2"
                                value={addressData.addressLine2}
                                className='form-input'
                                onChange={handleChange}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="city"
                                label="City"
                                value={addressData.city}
                                className='form-input'
                                onChange={handleChange}
                                error={!!errors.city}
                                helperText={errors.city}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="state"
                                label="State"
                                value={addressData.state}
                                className='form-input'
                                onChange={handleChange}
                                error={!!errors.state}
                                helperText={errors.state}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="country"
                                label="Country"
                                value={addressData.country}
                                className='form-input'
                                onChange={handleChange}
                                error={!!errors.country}
                                helperText={errors.country}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="pincode"
                                label="Pincode"
                                value={addressData.pincode}
                                className='form-input'
                                onChange={handleChange}
                                error={!!errors.pincode}
                                helperText={errors.pincode}
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



const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
    },
}));

const AddressForm = () => {
    const classes = useStyles();
    const [address, setAddress] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);

        const components = results[0].address_components;
        const addressLine1 = components[0] ? components[0].long_name : '';
        const addressLine2 = components[1] ? components[1].long_name : '';
        const city = components[2] ? components[2].long_name : '';
        const state = components[4] ? components[4].long_name : '';
        const country = components[5] ? components[5].long_name : '';
        const pincode = components[6] ? components[6].long_name : '';

        setAddress(addressLine1);
        setAddress2(addressLine2);
        setCity(city);
        setState(state);
        setCountry(country);
        setPincode(pincode);
    };

    return (
        <Container>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <PlacesAutocomplete
                            value={address}
                            onChange={(value) => setAddress(value)}
                            onSelect={handleSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                    <TextField
                                        label="Address Line 1"
                                        variant="outlined"
                                        {...getInputProps({ placeholder: 'Address Line 1' })}
                                    />
                                    <div>
                                        {loading && <div>Loading...</div>}
                                        {suggestions.map((suggestion, index) => {
                                            const style = {
                                                backgroundColor: suggestion.active ? '#e6e6e6' : '#fff',
                                            };
                                            return (
                                                <div
                                                    {...getSuggestionItemProps(suggestion, { style })}
                                                    key={index}
                                                >
                                                    {suggestion.description}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Address Line 2"
                            variant="outlined"
                            value={address2}
                            onChange={(e) => setAddress2(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="City"
                            variant="outlined"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="State"
                            variant="outlined"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Country"
                            variant="outlined"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Pincode"
                            variant="outlined"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};