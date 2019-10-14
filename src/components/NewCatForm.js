import React, { Component } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from "yup";
import Error from '../components/Error';
let catsURL = `http://localhost:3000/cats`

const validationSchema = Yup.object().shape({
    name: Yup.string()
    .min(1, "Name must be at least one character.")
    .max(15, "Names must be shorter than 15 characters")
    .required("Must enter a name")
})

export default function NewCatForm(props){

    console.log(props.selectedCats)

    return(
        <Formik initialValues={{name: "", bodega_id: props.selectedBodega.id}}
        validationSchema={validationSchema}
        onSubmit={(values,{setSubmitting, resetForm}) => {
            setSubmitting(true);
            const config = {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cat: values })
                }
                alert(JSON.stringify(values, null, 1))
            fetch(catsURL, config).then(r => r.json()).then(newCatObj => {
                console.log(newCatObj)
                props.selectedCats.push(newCatObj)
            })
            resetForm()
            setSubmitting(false);
        }}
        >
            {({ 
                values, 
                errors, 
                touched, 
                handleChange, 
                handleBlur,
                handleSubmit, 
                isSubmitting }) => (
            <form onSubmit={handleSubmit}>
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
                    <button type="submit" disabled={isSubmitting}>Submit</button>
                </div>
            </form>
            )} 
        </Formik>
    )
}