import React, {Component} from 'react';
import ReactModal from 'react-modal';
import NewBodegaForm from '../components/NewBodegaForm'
import App from '../App';

let geocoderApi = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'

export default class NewBodegaButton extends Component {

    state ={
        showModal: false
    }


    flipModalClick = (e) => {
        e.preventDefault()
        this.setState({
            showModal: !this.state.showModal
        })
    }

    // handleNewBodegaSubmit = (e) => {
    //     e.preventDefault()
    //     let address = e.target[1].attributes.value.value
    //     console.log(e, "this is e")
    //     console.log(address, "this is e.target[1]attributes.value")

    //     debugger
    //     fetch(geocoderApi + `${address}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         debugger
    //         console.log(data)
    //     })
    // }

    handleNewBodegaSubmit = (e) => {
        e.preventDefault()
        console.log(this.props.lat, "this is lat")
        console.log(this.props.long, "this is long")

        // fetch(`http://localhost:3000/bodegas`)
    }

    
    render(){
        return(
            <div className="newBodegaSpan">
            <ReactModal
                isOpen={this.state.showModal}
                contentLabel="Log New Bodega Modal"
                shouldFocusAfterRender={true}
                shouldCloseOnEsc={true}
                shouldCloseOnOverlayClick={true}
            
            >
                    <button onClick={(e) => this.flipModalClick(e)}>
                    Back To Map</button>
                    <NewBodegaForm handleNewBodegaSubmit={this.handleNewBodegaSubmit} latitude={this.props.lat} longitude={this.props.long}/>
            </ReactModal>
                <span onClick={(e) => this.flipModalClick(e)} >
                Log A New Bodega
                </span>
            </div>

        )
    }
}