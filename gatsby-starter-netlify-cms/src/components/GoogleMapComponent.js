import React, {useState, useEffect} from 'react';
import { GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import icon from '../img/smartavillas marker 2.svg'

const containerStyle = {
  height: '400px'
};


const GoogleMapComponent = (props) =>{

  const [map, setMap] = useState(null)
  const [center, setCenter] = useState(null)
  const [zoom, setZoom] = useState(null)

  useEffect(() => {
    setCenter({ lat: 37.1290033,
      lng: -7.6337298})
    setZoom(13)
    return () => {
      setCenter(null)
      setZoom(null)
    }
  }, [props])

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds()
    map.fitBounds(bounds)
    setMap(map)
  }, [])
 
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])


  const scrollToCard = (id) => {
    document.getElementById(id).scrollIntoView()
  }

return (
<LoadScript
      googleMapsApiKey="AIzaSyCC0VPgtgvuBoukr23_t9SVQuY_mWjrau8"
      preventGoogleFontsLoading={true}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: props.lat || center.lat,
          lng: props.lng || center.lng
        }}
        zoom={zoom}

      >
        {(props.isMarkerShown && props.list)?props.list.map((prop, index)=>{
    return (props.state.city[prop.city]
    && props.state.type[prop.type]
    && props.state.bedrooms[0] <= parseInt(prop.bedrooms) 
    && parseInt(prop.bedrooms) <= props.state.bedrooms[1]
    && props.state.bathrooms[0] <= parseInt(prop.bathrooms) 
    && parseInt(prop.bathrooms) <= props.state.bathrooms[1]
    && prop.latitude && prop.longitude)?
          <Marker position={{ lat: prop.latitude, lng: prop.longitude }} key={index} clickable={true} icon={icon} onClick={()=>scrollToCard(prop.uid)}/>
          : null
  }) : <>{(props.lat && props.lng)?<Marker position={{ lat: props.lat, lng: props.lng }} icon={icon} />: null}</>
    
  }
    </GoogleMap>
  </LoadScript>)
}

export default GoogleMapComponent