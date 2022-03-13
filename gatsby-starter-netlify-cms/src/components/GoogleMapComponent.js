import React, {useState, useEffect} from 'react';
import { useLoadScript} from '@react-google-maps/api';
import Loading from '../components/Loading'
import RenderMap from '../components/RenderMap'

const GoogleMapComponent = (props) =>{

  const [center, setCenter] = useState(null)
  const [zoom, setZoom] = useState(null)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GATSBY_GOOGLE_MAPS_API_KEY 
  })

  useEffect(() => {
    setCenter({ lat: 37.1391462,
      lng: -7.6286182})
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