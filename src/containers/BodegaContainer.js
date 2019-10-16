import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import shopImg from "../svgs/xyz.svg";
import ReactModal from 'react-modal'; 
import LogASighting from '../components/LogASighting'
import NewCatForm from '../components/NewCatForm'

export default class BodegaContainer extends React.Component {
    state = {
        bodegas: [],
        selectedBodega: null,
        showModal: false,
        showNewCatModal: false
    }

// initial fetch to backend to get bodegas
    componentDidMount() {
        fetch(`http://localhost:3000/bodegas`)
        .then(res => res.json())
        .then(data => this.setState({
            bodegas: data.data
        }))
    }

// opens/closes our new sightings modal
    handleModalClick = (e) => {
        e.preventDefault()
        this.setState({
            showModal: !this.state.showModal
        })
    }

// opens/closes our new cat modal
    newCatModalClick = (e) => {
        e.preventDefault()
        this.setState({
            showNewCatModal: !this.state.showNewCatModal
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
                contentLabel="Log A Sighting Modal"
                shouldFocusAfterRender={true}
                shouldCloseOnEsc={true}
                shouldCloseOnOverlayClick={true}
            >
                <button onClick={(e) => this.handleModalClick(e)}>
                    Back To Map
                </button>
                <LogASighting selectedBodega={this.state.selectedBodega}/>
            </ReactModal>
            <ReactModal
                isOpen={this.state.showNewCatModal}
                contentLabel="Log A New Cat Modal"
                    shouldFocusAfterRender={true}
                    shouldCloseOnEsc={true}
                    shouldCloseOnOverlayClick={true}
            >
                    <button onClick={(e) => this.newCatModalClick(e)}>
                        Back To Map
                </button>
                    <NewCatForm selectedBodega={this.state.selectedBodega} selectedCats={this.state.selectedBodega ? this.state.selectedBodega.attributes.cats : null}/>
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
                                <div className="bodegaCard">
                                <h3>{this.state.selectedBodega.attributes.name}</h3>
                                <h5>Cats!</h5>
                                <ul>
                                {(this.state.selectedBodega.attributes.cats.length > 0) ? this.state.selectedBodega.attributes.cats.map((cat) => <p className="catName">{cat.name}</p>) : <p>This store has no cats.</p>}</ul>
                                <ul>{(this.state.selectedBodega.attributes.sightings.length > 0) ? this.state.selectedBodega.attributes.sightings.map((sighting) => {
                                    return <div>
                                                <h5>Encounters</h5>
                                                <div>
                                                <img src={sighting.img} className="cat-img" alt="The cat that was encountered"></img>
                                                <p>Description of this encounter: {sighting.description}</p>
                                                </div>
                                            </div>
                                }
                                    ) : <p>There have been no sightings here.</p>
                            } 
                            </ul>
                                <button className="logSightingButton" onClick={(e) => this.handleModalClick(e)}>Log A New Sighting!</button>
                                <button className="logCatButton" onClick={(e) => this.newCatModalClick(e)}>Log A New Cat</button>
                            </div>
                        </Popup>
                    )
                }
                </div>
            </div>
        );
    }
}