import React, {Component} from 'react';
import ReactModal from 'react-modal';
import NewBodegaForm from '../components/NewBodegaForm'

export default class NewBodegaButton extends Component {

    state ={
        showModal: false
    }

    logNewBodega = (e) =>{
        e.preventDefault()
        this.setState({
            showModal: !this.state.showModal
        })
        console.log("LogNewBodega was clicked. Here a modal should pop asking users for the bodega name and the address. The address wil get geocoded and then submitted data will be posted to db")
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
                    <NewBodegaForm />
            </ReactModal>
                <span onClick={(e) => this.logNewBodega(e)} >
               Log A New Bodega
                </span>
            </div>

        )
    }
}