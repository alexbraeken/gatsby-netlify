import React, {useState, useEffect} from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import icon from '../img/smartavillas marker 2.svg'
import BedBathPax from '../components/BedBathPax'
import Loading from '../components/Loading'
import RenderMap from '../components/RenderMap'

const GoogleMapComponent = (props) =>{

  const [map, setMap] = useState(null)
  const [center, setCenter] = useState(null)
  const [zoom, setZoom] = useState(null)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCC0VPgtgvuBoukr23_t9SVQuY_mWjrau8" 
  })

  useEffect(() => {
    setCenter({ lat: 37.1290033,
      lng: -7.6337298})
    setZoom(13)
    return () => {
      setCenter(null)
      setZoom(null)
    }
  }, [])


 if (loadError) {
  return <div>Map cannot be loaded right now, sorry.</div>
}

return isLoaded ? <RenderMap props={props} center={center} zoom={zoom}/> : <Loading />

}

export default GoogleMapComponent