import React, {Component} from 'react';

export default class ButtonContainer extends Component {

    logNewBodega = (e) =>{
        e.preventDefault()
        console.log("LogNewBodega was clicked. Here a modal should pop asking users for the bodega name and the address. The address wil get geocoded and then submitted data will be posted to db")
    }
    


    render(){



        return(
            
                <span>
                <button onClick={(e) => this.logNewBodega(e)} >Log A New Bodega</button>
                </span>
          

        )
    }
}