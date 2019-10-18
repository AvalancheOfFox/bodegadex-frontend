import React, {Component} from 'react';
import ReactModal from 'react-modal';
import NewBodegaForm from '../components/NewBodegaForm'

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
        // console.log(this.props, 'props of NewBodegaButton')
        return(
            <div className="newBodegaSpan">
            <ReactModal
                isOpen={this.state.showModal}
                contentLabel="Log New Bodega Modal"
                shouldFocusAfterRender={true}
                shouldCloseOnEsc={true}
                shouldCloseOnOverlayClick={true}
                ariaHideApp={false}
            >
                    <button onClick={(e) => this.flipModalClick(e)}>
                    Back To Map</button>
                    <NewBodegaForm handleNewBodegaSubmit={(obj) =>this.props.handleNewBodegaSubmit(obj)} latitude={this.props.lat} longitude={this.props.long}/>
            </ReactModal>
                <span onClick={(e) => this.flipModalClick(e)} >
                Log A New Bodega
                </span>
            </div>

        )
    }
}