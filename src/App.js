import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import BodegaContainer from './containers/BodegaContainer';
import './App.css';
import ShowCenter from '../src/components/ShowCenter'



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
      <ReactMapGL
      {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/rossperkel/ck1gupqrl5gdr1cpp53dqft69"
      onViewportChange={(viewport) => {
        setViewport(viewport)
        }
        }> 
      <ShowCenter latitude={viewport.latitude} longitude={viewport.longitude} /> 
      <BodegaContainer latitude={viewport.latitude} longitude={viewport.longitude}/>  
    </ReactMapGL>
    </div>
  );
}


