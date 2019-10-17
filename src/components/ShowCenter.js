import React from 'react';
import crosshairs from "../svgs/crosshairs.svg";
import catFace from "../svgs/cat-face-1024x1024.png"


export default function ShowCenter(props){
    
    // on hover, this component should highlight the center of the map so users can see where exactly they're targeting. 
    return(
        <div>
           <img src={catFace} id="crosshairs" alt="Crosshairs overlaid on the map to show the user the geographic point they target when they create a new bodega point."/>
        </div>
    )

    
}