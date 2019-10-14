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

    newCatForm = (e) =>{
        e.preventDefault()
        console.log("A new cat button was pressed. This should trigger a new modal with an form that takes a name and has a pre-set bodega id to post a new cat on submit")
    }

    render() {
        return (
            <div>
            <ReactModal 
                isOpen={this.state.showModal}
                contentLabel="Log A Cat Modal"
                shouldFocusAfterRender={true}
                shouldCloseOnEsc={true}
                shouldCloseOnOverlayClick={true}
            >
                <button onClick={(e) => this.handleModalClick(e)}>
                    Back To Map
                </button>
                <LogASighting selectedBodega={this.state.selectedBodega}/>
            </ReactModal>
           <div>{this.makeBodegaMarkers()}
                {
                    this.state.selectedBodega && (
                        <Popup
                            latitude={this.state.selectedBodega.attributes.latitude}
                            longitude={this.state.selectedBodega.attributes.longitude}
                            closeButton={true}
                            // closeOnClick and closeOnEsc seem to be nonresponsive?
                            closeOnClick={false}
                            shouldCloseOnEsc={true}
                            onClose={() => this.clearSelected()}
                        >
                            <div>
                                <h3>{this.state.selectedBodega.attributes.name}</h3>
                                <h5>Cats!</h5>
                                <ul>{(this.state.selectedBodega.attributes.cats.length > 0) ? this.state.selectedBodega.attributes.cats.map((cat) => <p>{cat.name}</p>) : <p>This store has no cats.</p>}</ul>
                                <ul>{(this.state.selectedBodega.attributes.sightings.length > 0) ? this.state.selectedBodega.attributes.sightings.map((sighting) => {
                                    return <div>
                                                <h5>Encounters</h5>
                                                <div>
                                                <img src={sighting.img} className="cat-img"></img>
                                                <p>Description of this encounter: {sighting.description}</p>
                                                </div>
                                            </div>
                                }
                                    ) : <p>There have been no sightings here.</p>
                            } 
                            </ul>
                                <button className="logSightingButton" onClick={(e) => this.handleModalClick(e)}>Log A New Sighting!</button>
                                <button className="logCatButton" onClick={(e) => this.newCatForm(e)}>Log A New Cat</button>
                            </div>
                        </Popup>
                    )
                }
                </div>
            </div>
        );
    }
}