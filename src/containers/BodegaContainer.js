import React, { Component, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import shopImg from "../svgs/xyz.svg";
import ReactModal from 'react-modal'; 
import LogASighting from '../components/LogASighting'




export default class BodegaContainer extends React.Component {
    state = {
        bodegas: [],
        selectedBodega: null,
        showModal: false
    }

// initial fetch to backend to get bodegas
    componentDidMount() {
        fetch(`http://localhost:3000/bodegas`)
        .then(res => res.json())
        .then(data => this.setState({
            bodegas: data.data
        }))
    }

// opens/closes our modal
    handleModalClick = (e) => {
        e.preventDefault()
        this.setState({
            showModal: !this.state.showModal
        })
    }
// creates our markers from fetched bodegas
    makeBodegaMarkers = () => {
    return this.state.bodegas.map((bodega) => 
            <Marker key={bodega.id}
                latitude={bodega.attributes.latitude}
                longitude={bodega.attributes.longitude}
                onClick={(e) => this.setSelectedBodega(null, e)}
            >
                <button className="bodegaIcon" onClick={(e) => {
                    e.preventDefault()
                    this.setSelectedBodega(bodega, e)
                }}>
                    <img src = {shopImg} alt="Bodega Location" />
                </button>
            </Marker>
            ) 
        
        } //end of makeBodegaMarkers

        // sets our selectedBodega in state
    setSelectedBodega = (bodega, e) => {
        e.preventDefault()
        this.setState({
            selectedBodega: bodega
        })
    }
// clears our selectedBodega state to null
    clearSelected =() =>{
        this.setState({
            selectedBodega: null
        })
    }

    render() {
        return (
            <div>
            <ReactModal 
                isOpen={this.state.showModal}
                contentLabel="Log A Cat Modal"
                shouldFocusAfterRender={true}
                shouldCloseOnEsc={true}
            >
                <button onClick={(e) => this.handleModalClick(e)}>
                    Back To Map
                </button>
                <LogASighting />
            </ReactModal>
           <div>{this.makeBodegaMarkers()}
                {
                    this.state.selectedBodega && (
                        <Popup
                            latitude={this.state.selectedBodega.attributes.latitude}
                            longitude={this.state.selectedBodega.attributes.longitude}
                            closeButton={true}
                            closeOnClick={false}
                            onClose={() => this.clearSelected()}
                        >
                            <div>
                                <h3>{this.state.selectedBodega.attributes.name}</h3>
                                <h5>Cats!</h5>
                                <ul>{(this.state.selectedBodega.attributes.cats.length > 0) ? this.state.selectedBodega.attributes.cats.map((cat) => cat.name) : <p>This store has no cats.</p>}</ul>
                                <button className="logButton" onClick={(e) => this.handleModalClick(e)}>Log A New Sighting!</button>
                            </div>
                        </Popup>
                    )
                }</div>
            </div>
        );
    }
}