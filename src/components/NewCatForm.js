import React, { Component } from 'react';
import { Formik, Field } from 'formik'


export default function NewCatForm(){

    return(
        <Formik initialValues={{name: ""}}>
            {({ values, errors, touched, handleChange, handleBlur }) => (
            <form>
                {JSON.stringify(values)}
                <div className = "input-row">
                    <label htmlFor="name">Congrats! You've met a new cat. What's their name?</label>
                    <Field name="name" placeholder="Type their name here!" />
                </div>
                <div className="input-row">
                    <button type="submit">Submit</button>
                </div>
            </form>
            )} 
        </Formik>
    )
}