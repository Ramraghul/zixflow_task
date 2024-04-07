import React from 'react';
import { TextField, Button, Grid, makeStyles, FormControl, InputLabel, MenuItem, FormHelperText, Select } from '@material-ui/core';
import { Person, Email, Phone, LocationCity, LocationOn } from '@material-ui/icons';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { createNewContact } from '../../redux/actions/userContactAction';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
    firstName: Yup.string().matches(/^[A-Za-z]+$/, 'First Name must contain only alphabets').min(3, 'First Name must be at least 3 characters').required('First Name is required'),
    lastName: Yup.string().matches(/^[A-Za-z]+$/, 'Last Name must contain only alphabets').min(3, 'Last Name must be at least 3 characters').required('Last Name is required'),
    gender: Yup.string().required('Gender is required').oneOf(['MALE', 'FEMALE', 'OTHERS'], 'Invalid Gender'),
    address: Yup.object().shape({
        line1: Yup.string().min(8, 'Address Line 1 must be at least 8 characters').required('Address Line 1 is required'),
        line2: Yup.string(),
        city: Yup.string().required('City is required'),
        country: Yup.string().matches(/^[A-Z]+$/, 'Country must contain only uppercase letters').required('Country is required'),
        zipCode: Yup.string().max(10, 'Zip Code must be at most 10 characters').required('Zip Code is required')
    }),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().matches(/^\d+$/, 'Phone must contain only digits').required('Phone is required'),
    other: Yup.string()
});

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(2),
    },
    formContainer: {
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        borderRadius: '8px',
        padding: theme.spacing(3),
        marginTop: '5rem'
    },
    formItem: {
        marginBottom: theme.spacing(2),
    },
}));
function CreateContact() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const initialValues = {
        firstName: '',
        lastName: '',
        gender: '',
        address: {
            line1: '',
            line2: '',
            city: '',
            country: '',
            zipCode: ''
        },
        email: '',
        phone: '',
        other: ''
    };

    const handleSubmit = (values, { setSubmitting }) => {
        dispatch(createNewContact(values, navigate));
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, isSubmitting }) => (
                <Form className={classes.root}>
                    <div className={classes.formContainer}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4} className={classes.formItem}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="First Name"
                                    name="firstName"
                                    error={errors.firstName && touched.firstName}
                                    helperText={errors.firstName && touched.firstName ? errors.firstName : ''}
                                    InputProps={{
                                        startAdornment: <Person />
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} className={classes.formItem}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Last Name"
                                    name="lastName"
                                    error={errors.lastName && touched.lastName}
                                    helperText={errors.lastName && touched.lastName ? errors.lastName : ''}
                                    InputProps={{
                                        startAdornment: <Person />
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} className={classes.formItem}>
                                <FormControl fullWidth error={errors.gender && touched.gender}>
                                    <InputLabel>Gender</InputLabel>
                                    <Field
                                        as={Select}
                                        name="gender"
                                        fullWidth
                                    >
                                        <MenuItem value="MALE">Male</MenuItem>
                                        <MenuItem value="FEMALE">Female</MenuItem>
                                        <MenuItem value="OTHERS">Others</MenuItem>
                                    </Field>
                                    {errors.gender && touched.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                                </FormControl>

                            </Grid>
                            <Grid item xs={12} sm={6} md={4} className={classes.formItem}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Address Line 1"
                                    name="address.line1"
                                    error={errors.address && errors.address.line1 && touched.address && touched.address.line1}
                                    helperText={errors.address && errors.address.line1 && touched.address && touched.address.line1 ? errors.address.line1 : ''}
                                    InputProps={{
                                        startAdornment: <LocationOn />
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} className={classes.formItem}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Address Line 2"
                                    name="address.line2"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} className={classes.formItem}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="City"
                                    name="address.city"
                                    error={errors.address && errors.address.city && touched.address && touched.address.city}
                                    helperText={errors.address && errors.address.city && touched.address && touched.address.city ? errors.address.city : ''}
                                    InputProps={{
                                        startAdornment: <LocationCity />
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} className={classes.formItem}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Country"
                                    name="address.country"
                                    error={errors.address && errors.address.country && touched.address && touched.address.country}
                                    helperText={errors.address && errors.address.country && touched.address && touched.address.country ? errors.address.country : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} className={classes.formItem}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Zip Code"
                                    name="address.zipCode"
                                    error={errors.address && errors.address.zipCode && touched.address && touched.address.zipCode}
                                    helperText={errors.address && errors.address.zipCode && touched.address && touched.address.zipCode ? errors.address.zipCode : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} className={classes.formItem}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    error={errors.email && touched.email}
                                    helperText={errors.email && touched.email ? errors.email : ''}
                                    InputProps={{
                                        startAdornment: <Email />
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} className={classes.formItem}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Phone"
                                    name="phone"
                                    error={errors.phone && touched.phone}
                                    helperText={errors.phone && touched.phone ? errors.phone : ''}
                                    InputProps={{
                                        startAdornment: <Phone />
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.formItem}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Other"
                                    name="other"
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.formItem}>
                                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>Submit</Button>
                            </Grid>
                        </Grid>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default CreateContact;
