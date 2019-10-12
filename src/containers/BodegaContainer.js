import React, { Component, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import shopImg from "../svgs/xyz.svg";
import ReactModal from 'react-modal'; 




export default class BodegaContainer extends React.Component {
    state = {
        bodegas: [],
        selectedBodega: null,
        showModal: false
    }


    componentDidMount() {
        fetch(`http://localhost:3000/bodegas`)
        .then(res => res.json())
        .then(data => this.setState({
            bodegas: data.data
        }))
    }


    handleModalClick = (e) => {
        debugger
        e.preventDefault()
        this.setState({
            showModal: !this.state.showModal
        })
    }



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
            ) //end of mBM map
        
        } //end of makeBodegaMarkers

    setSelectedBodega = (bodega, e) => {
        e.preventDefault()
        this.setState({
            selectedBodega: bodega
        })
    }

    logCatEncounter = (e) =>{
        debugger
        e.preventDefault()
        console.log("I was clicked")
    }

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
                    shouldCloseOnEsc={true}
            />
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
                                <ul>{this.state.selectedBodega.attributes.cats.map((cat) => cat.name)}</ul>
                                <button className="logButton" onClick={(e) => this.handleModalClick(e)}>Log A New Sighting!</button>
                            </div>
                        </Popup>
                    )
                }</div>
            </div>
        );
    }
}