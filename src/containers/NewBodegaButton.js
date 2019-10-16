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
                    <NewBodegaForm latitude={this.props.lat} longitude={this.props.long}/>
            </ReactModal>
                <span onClick={(e) => this.flipModalClick(e)} >
                Log A New Bodega
                </span>
            </div>

        )
    }
}