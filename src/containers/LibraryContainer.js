import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import * as libraryData from '../data/libraryData.json'

export default class LibContainer extends React.Component{

    // const {selectedLib, setSelectedLib} = useState(null)

    formatLat = (string) => {
        return parseFloat(string.split(",")[0])
    }

    formatLong = (string) => {
        return parseFloat(string.split(",")[1])
    }

    render() {
    return(
        { libraryData.locations.map((library) => (
            <Marker key={library.data.branchid}
                latitude={this.formatLat(library.data.position)}
                longitude={this.formatLong(library.data.position)}
            >
                <button className="libIcon" onClick={(e) => {
                    e.preventDefault()
                    setSelectedLib(library)
                }}>
                    <img src="/book.svg" alt="Library Location" />
                </button>
            </Marker>
        )
        )
    }

    {selectedLib ? (
        <Popup
            latitude={formatLat(selectedLib.data.position)}
            longitude={formatLong(selectedLib.data.position)}
            onClose={() => setSelectedLib(null)}
        >
            <div>
                <h3>{selectedLib.data.title}</h3>
                <h5>{selectedLib.data.address}</h5>
                <p>Phone Number: {selectedLib.data.phone}</p>
                <a href={selectedLib.data.path}>Library Website</a>
            </div>
        </Popup>
    ) : null
    }
    )
}
}