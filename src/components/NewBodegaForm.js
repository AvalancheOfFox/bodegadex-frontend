import React, { Component } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from "yup";
import Error from '../components/Error';
// import Geocoder from "react-geocode";


const validationSchema = Yup.object().shape({
    name: Yup.string()
    .min(1, "Name must be at least one character.")
    .max(50, "Names must be shorter than 50 characters")
    .required("Must enter a name"),
    // address: Yup.string()
    // .max(50, "Addresses must be shorter than 50 characters")
    // .required("You must enter an address")
})

export default function NewBodegaForm(props) {
    console.log(props)
    return(
        <Formik
        initialValues={{name:"", latitude: props.latitude, longitude: props.longitude}}
        validationSchema = { validationSchema }
        >
            {({
                values, 
                errors, 
                touched, 
                handleChange, 
                handleBlur, 
                handleSubmit, 
                isSubmitting}) => 
            <form onSubmit={(e) => props.handleNewBodegaSubmit(e)}>
                {JSON.stringify(values)}
                <div className="input-row">
                    <label htmlFor="name">name</label>
                    <Field
                        name="name"
                        placeholder="Bodega Name Here"
                        className={touched.name && errors.name ? "has-errors" : null}
                    />
                        <Error touched={touched.name} message={errors.name} />
                </div>

                <div>
                    <p>You're currently creating a new bodega at {props.latitude} degrees lat and {props.longitude} degrees long.</p>
                </div>

                {/* <div className="input-row">
                    <label htmlFor="address">Address</label>
                    <Field
                    name="address"
                    placeholder="Address Here"
                            className={touched.address && errors.address ? "has-errors" : null}
                    />
                        <Error touched={touched.address} message={errors.address} />
                </div>*/}
                <div className="input-row">
                    <button type="submit" disabled={isSubmitting}>Submit</button>
                </div> 
            </form>
        }
        </Formik>
    )
}
