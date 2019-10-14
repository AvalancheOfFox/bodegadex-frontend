import React, { Component } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from "yup";
import Error from '../components/Error';


const validationSchema = Yup.object().shape({
    name: Yup.string()
    .min(1, "Name must be at least one character.")
    .max(50, "Names must be shorter than 50 characters")
    .required("Must enter a name"),
    address: Yup.string()
    .max(50, "Names must be shorter than 50 characters")
    .required("Must enter an address")
})

export default function NewBodegaForm() {
    return(
        <Formik
        initialValues={{name:"", latitude:"", longitude:""}}
        validationSchema = { validationSchema }
        >
            {({values, errors, touched, handleChange, handleBlur}) => 
            <form>
                <div className="input-row">
                    <label htmlFor="name">name</label>
                    <Field
                        name="name"
                        placeholder="Bodega Name Here"
                        className={touched.name && errors.name ? "has-errors" : null}
                    />
                        <Error touched={touched.name} message={errors.name} />
                </div>

                <div className="input-row">
                    <label htmlFor="address">Address</label>
                    <Field
                    name="address"
                    placeholder="Address Here"
                            className={touched.address && errors.address ? "has-errors" : null}
                    />
                        <Error touched={touched.address} message={errors.address} />
                </div>
                <div className="input-row">
                    <button type="submit">Submit</button>
                </div>
            </form>
        }
        </Formik>
    )
}
