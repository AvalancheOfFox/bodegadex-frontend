import React, { Component } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from "yup";
import Error from '../components/Error';


const validationSchema = Yup.object().shape({
    name: Yup.string()
    .min(1, "Name must be at least one character.")
    .max(15, "Names must be shorter than 15 characters")
    .required("Must enter a name")
})

export default function NewCatForm(props){

    console.log(props)

    return(
        <Formik initialValues={{name: "", bodega_id: props.selectedBodega.id}}
        validationSchema={validationSchema}
        >
            {({ values, errors, touched, handleChange, handleBlur }) => (
            <form>
                {JSON.stringify(values)}
                <div className = "input-row">
                    <label htmlFor="name">Congrats! You've met a new cat. What's their name?</label>
                    <Field
                    name="name"
                    placeholder="Type their name here!"
                    className={touched.name && errors.name ? "has-errors" : null }
                    />
                    <Error touched={touched.name} message={errors.name}/>
                </div>

                <div className="input-row">
                    <button onClick={(e, values) => props.handleCatFormSubmit(e, values)}>Submit</button>
                </div>
            </form>
            )} 
        </Formik>
    )
}