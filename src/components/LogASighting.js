import React, { Component } from 'react';
import { Formik, Field } from 'formik'


export default function LogASighting(props){
    
    console.log(props)
    const bodega_id = props.selectedBodega.id
    return(
        
    <Formik initialValues={{cat_id: "", bodega_id: bodega_id, description: "", color: ""}}>
        {({values, errors, touched, handleChange, handleBlur}) => (
                <form>
                    {JSON.stringify(values)}
                    <div className="input-row">
                        <label htmlFor="cat_id">Cat You Encountered</label>
                        <Field
                            component="select"
                            name="cat_id"
                            onChange={handleChange}
                            >
                                {props.selectedBodega.attributes.cats.map((cat) => {
                                return  <option value={cat.id}>{cat.name}</option>
                                })}
                        </Field>
                    </div>
                    <div className="input-row">
                        <label htmlFor="description">Description of your Encounter</label>
                        <Field name="description" placeholder="Describe here!" />
                    </div>
                    <div className="input-row">
                        <button type="submit">Submit</button>
                    </div>
                </form>
        )} 
    </Formik>
    )
    
}