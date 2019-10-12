import React, { Component } from 'react';
import { Formik } from 'formik'


export default function LogASighting(){
   
    return(
    <Formik initialValues={{name:"", bodega: ""}}>
        {({values, errors, touched, handleChange, handleBlur}) => (
                <form>
                    {JSON.stringify(values)}
                    <label htmlFor="name">Cat Name</label>
                    <div className="input-row">
                        <input type="text"
                            name="name"
                            id="name"
                            placeholder="What's this kitty's name?"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />
                    </div>
                    <label htmlFor="bodega">Bodega Name</label>
                    <div className="input-row">
                        <input type="text"
                            name="bodega"
                            id="bodega"
                            placeholder="What's this kitty's bodega?"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.bodega}
                        />
                    </div>
                    <div className="input-row">
                        <button type="submit">Submit</button>
                    </div>
                </form>
        )} 
    </Formik>
    )
    
}