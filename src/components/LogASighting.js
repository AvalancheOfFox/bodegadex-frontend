import React, { Component } from 'react';
import { Formik, Field } from 'formik'


export default function LogASighting(props){
    
    console.log(props)
    const bodega_id = props.bodega_id
    return(
        
    <Formik initialValues={{cat_id:"", bodega_id: bodega_id }}>
        {({values, errors, touched, handleChange, handleBlur}) => (
                <form>
                    {JSON.stringify(values)}
                    <label htmlFor="cat">Cat You Encountered</label>
                    <Field component="select" name="color">
                        {props.selectedBodega.attributes.cats.map((cat) => {
                           return  <option value={cat.id}>{cat.name}</option>
                        })}
                    </Field>
                    
                    <div className="input-row">
                        <button type="submit">Submit</button>
                    </div>
                </form>
        )} 
    </Formik>
    )
    
}