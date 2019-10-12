import React, { Component } from 'react';
import { Formik } from 'formik'


export default function LogASighting(){
    return(<form>
        <div className="input-row">
            <input type="text"
            name="name"
            id="name"
            />

        </div>

    </form>
    )
}