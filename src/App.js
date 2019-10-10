import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import './App.css';
import * as libraryData from './data/libraryData.json'

export default function App() {

  const [viewport, setViewport] = useState({
    latitude: 40.700687,  //NOT IN DEGREES! 
    longitude: -73.987514,
    zoom: 15, //higher = more zoomed in
    height: '100vh',
    width: '100vw'
  })
  const [selectedLib,setSelectedLib] = useState(null)

  const formatLat = (string) => {
    return parseFloat(string.split(",")[0])
  }

  const formatLong = (string) => {
    return parseFloat(string.split(",")[1])
  }

  return (
    <div>
      <ReactMapGL
      {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/rossperkel/ck1gupqrl5gdr1cpp53dqft69"
      onViewportChange={(viewport) => {
        setViewport(viewport)
        }
        } > 
    {libraryData.locations.map((library) => (
      <Marker key={library.data.branchid}
      latitude={formatLat(library.data.position)}
      longitude={formatLong(library.data.position)}
      >
        <button className="libIcon" onClick={(e) =>{
          e.preventDefault()
          setSelectedLib(library)
        }}>
          <img src="/book.svg" alt="Library Location"/>
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
    ) : null}
    </ReactMapGL>
    </div>
  );
}


