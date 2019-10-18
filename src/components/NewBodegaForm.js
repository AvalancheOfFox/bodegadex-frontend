import React from 'react';
import { Formik, Field } from 'formik';
import * as Yup from "yup";
import Error from '../components/Error';
// import Geocoder from "react-geocode";
const bodegaURL = `http://localhost:3000/bodegas`

const validationSchema = Yup.object().shape({
    name: Yup.string()
    .min(1, "Name must be at least one character.")
    .max(50, "Names must be shorter than 50 characters")
    .required("Must enter a name"),
})

export default function NewBodegaForm(props) {
    
    return(
        <Formik
        initialValues={{name:"", latitude: props.latitude, longitude: props.longitude}}
        validationSchema = { validationSchema }
        onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                const config = {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: values.name,
                        latitude: props.latitude,
                        longitude: props.longitude   
                    })
                }
                alert(JSON.stringify(values, null, 1))
                fetch(bodegaURL, config).then(r => r.json()).then(newBodegaObj => {
                    console.log(newBodegaObj, "this ConLog comes from end of POST fetch in NewBodegaForm. If you were to uncomment the next line, you'd get an error onSubmit of undefined - can't read latitude of undef.")
                    // props.handleNewBodegaSubmit(newBodegaObj)
                    
                })
                resetForm()
                setSubmitting(false);
            }

            }
        >
            {({
                values, 
                errors, 
                touched, 
                handleChange, 
                handleSubmit, 
                isSubmitting}) => 
                <form onSubmit={handleSubmit}>
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

                <div className="input-row">
                    <button type="submit" disabled={isSubmitting}>Submit</button>
                </div> 
            </form>
        }
        </Formik>
    )
}
