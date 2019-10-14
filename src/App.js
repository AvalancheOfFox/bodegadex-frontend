import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import BodegaContainer from './containers/BodegaContainer';
import './App.css';
import NewBodegaButton from './containers/NewBodegaButton';



export default function App() {


  const [viewport, setViewport] = useState({
    latitude: 40.700687,  //NOT IN DEGREES! 
    longitude: -73.987514,
    zoom: 15, //higher = more zoomed in
    height: '100vh',
    width: '100vw'
  })
 
 
  return (
    <div>
      <NewBodegaButton/>
      <ReactMapGL
      {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/rossperkel/ck1gupqrl5gdr1cpp53dqft69"
      onViewportChange={(viewport) => {
        setViewport(viewport)
        }
        }> 
      <BodegaContainer/>  
    </ReactMapGL>
    </div>
  );
}


