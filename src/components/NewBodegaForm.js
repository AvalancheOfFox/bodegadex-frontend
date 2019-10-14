import React, { Component } from 'react';
import { Formik, Field } from 'formik';

export default function NewBodegaForm() {
    return(
        <Formik initialValues={{name:"", latitude:"", longitude:""}}>
            {({values, errors, touched, handleChange, handleBlur}) => 
            <form>
                    <div className="input-row">
                        <label htmlFor="name">name</label>
                        <Field
                            name="name"
                            placeholder="Bodega Name Here"
                        />

                    

                    </div>
                <div className="input-row">
                    <label htmlFor="address">Address</label>
                    <Field
                    name="address"
                    placeholder="Address Here"
                    />
                </div>
                <div className="input-row">
                    <button type="submit">Submit</button>
                </div>
            </form>
        }
        </Formik>
    )
}
