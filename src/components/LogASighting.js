import React, { Component } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from "yup";
import Error from '../components/Error';

const validationSchema = Yup.object().shape({
    cat_id: Yup.string()
        .required("Must select an encountered cat"),
    description: Yup.string()
        .max(140, "Descriptions must be shorter than 140 characters")
        .required("Must enter an encounter description"),
    img: Yup.string()
        .required("You must upload an image of your encounter.")
})


export default function LogASighting(props){
    
    console.log(props)
    const bodega_id = props.selectedBodega.id
    return(
        
        <Formik
        initialValues={{ cat_id: "", bodega_id: bodega_id, description: "" }}
        validationSchema = { validationSchema }>
        {({
            values, 
            errors, 
            touched, 
            handleChange, 
            handleBlur, 
            handleSubmit,
            isSubmitting
        }) => (
                <form onSubmit={handleSubmit}>
                    {JSON.stringify(values)}
                    <div className="input-row">
                        <label htmlFor="cat_id">Cat You Encountered</label>
                        <Field
                            component="select"
                            name="cat_id"
                            onChange={handleChange}
                            className={touched.cat_id && errors.cat_id ? "has-errors" : null}
                            >
                                {props.selectedBodega.attributes.cats.map((cat) => {
                                return  <option value={cat.id}>{cat.name}</option>
                                })}
                        </Field>
                    </div>
                    <div className="input-row">
                        <label htmlFor="description">Description of your Encounter</label>
                        <Field
                        name="description"
                        placeholder="Describe here!"
                        className={touched.description && errors.description ? "has-errors" : null} />
                        <Error touched={touched.description} message={errors.description} />
                    </div>
                    <div className="input-row">
                        <button type="submit" disabled={isSubmitting}>Submit</button>
                    </div>
                </form>
        )} 
    </Formik>
    )
    
}