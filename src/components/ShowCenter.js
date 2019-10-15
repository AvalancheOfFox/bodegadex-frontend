import React, { useState } from 'react';
import crosshairs from "../svgs/crosshairs.svg";


export default function ShowCenter(props){
    
    // on hover, this component should highlight the center of the map so users can see where exactly they're targeting. 
    return(
        <div>
           <img src={crosshairs} id="crosshairs"/>
        </div>
    )

    
}