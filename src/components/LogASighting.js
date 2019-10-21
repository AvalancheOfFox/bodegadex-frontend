import React from 'react';
import { Formik, Field } from 'formik';
import * as Yup from "yup";
import Error from '../components/Error';

let sightingsURL = `http://localhost:3000/sightings`

const validationSchema = Yup.object().shape({
    cat_id: Yup.string()
        .required("Must select an encountered cat"),
    description: Yup.string()
        .max(140, "Descriptions must be shorter than 140 characters")
        .required("Must enter an encounter description"),
    img: Yup.string()
    .min(1, "Image URL must not be empty")
        .required("You must upload an image url of your encounter.")
})


export default function LogASighting(props){
    
    console.log(props)
    const bodega_id = props.selectedBodega.id

    return(
        
        <Formik initialValues={{ cat_id: `${props.selectedBodega.attributes.cats[0].id}`, bodega_id: bodega_id, description: "", img:""}}
        validationSchema = { validationSchema }
        onSubmit={(values,{setSubmitting, resetForm}) => {
            console.log("being hit")
            debugger
            setSubmitting(true);
            console.log(values)
                const config = {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        cat_id: values.cat_id,
                        bodega_id: values.bodega_id,
                        description: values.description,
                        img: values.img
                        })
                }
                alert(JSON.stringify(values, null, 1))
                fetch(sightingsURL, config).then(r => r.json()).then(newSightingObj => {
                    console.log(newSightingObj)
                    props.selectedBodega.attributes.sightings.push(newSightingObj)
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
            handleSubmit,
            isSubmitting
        }) => (
                <form onSubmit={handleSubmit}>
                    {JSON.stringify(values)}

                    {/* cat_collection select */}
                    <div className="input-row">
                        <label htmlFor="cat_id">Cat You Encountered</label>
                        <Field
                            component="select"
                            name="cat_id"
                            placeholder={props.selectedBodega.attributes.cats[0].id}
                            onChange={handleChange}
                            className={touched.cat_id && errors.cat_id ? "has-errors" : null}
                            >
                                {props.selectedBodega.attributes.cats.map((cat) => {
                                return  <option value={cat.id}>{cat.name}</option>
                                })}
                        </Field>
                    </div>

                    {/*  description field*/}
                    <div className="input-row">
                        <label htmlFor="description">Description of your Encounter</label>
                        <Field
                        name="description"
                        placeholder="Describe here!"
                        className={touched.description && errors.description ? "has-errors" : null} />
                        <Error touched={touched.description} message={errors.description} />
                    </div>
                    
                    {/* image URL field */}
                    <div className="input-row">
                        <label htmlFor="img">Image URL</label>
                        <Field
                            name="img"
                            placeholder="Please paste your image URL here!"
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


