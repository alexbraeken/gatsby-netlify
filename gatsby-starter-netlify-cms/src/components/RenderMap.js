import React, {useState, useEffect} from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import icon from '../img/smartavillas marker 2.svg'
import Loading from '../components/Loading'
import BedBathPax from '../components/BedBathPax'

const renderMap = React.memo((props) =>{

    const [infoContent, setInfoContent] = useState(null)
    const [map, setMap] = useState(null)
  
    const onLoad = React.useCallback(
       (mapInstance) => {
        setMap(mapInstance)
        console.log(map)
    })
  
    const scrollToCard = (id) => {
        let card = document.getElementById(id)
        const blink = () => {
          card.style.opacity = (card.style.opacity === '1' || card.style.opacity === '' ? '0.2' : '1')
        }
        card.scrollIntoView({behavior: "smooth", block: "center"})
        setTimeout(function() {
          blink()
         }, 500)
         setTimeout(function() {
          blink()
        }, 1000)
        setTimeout(function() {
          blink()
         }, 1500)
         setTimeout(function() {
          blink()
        }, 2000)
      }
    
    
    
  
    const handleHover = (position, name, bed, bath, guests) =>{
        let infoWindowNode = document.createElement('div');
        let textNode = document.createElement('div');
        textNode.innerHTML = `${name} \n Bedrooms: ${bed} | Bathrooms: ${bath} | Sleeps: ${guests}`
        infoWindowNode.appendChild(textNode);
        const infowindow = new window.google.maps.InfoWindow({
        content: infoWindowNode,
        position: position,
        zIndex: 100
      });
      infowindow.open(map)
      console.log(infowindow)
    }
  
    return (<GoogleMap
          mapContainerStyle={{height:props.props.height}}
          center={{
            lat: props.props.lat || props.center.lat,
            lng: props.props.lng || props.center.lng
          }}
          zoom={props.zoom}
          onLoad={onLoad}
        >
          {(props.props.isMarkerShown && props.props.list)?
          <>
          {console.log(props.props.list)}
          {props.props.list.map((prop, index)=>{
          return (
            (props.props.state.city[prop.city]
            && props.props.state.type[prop.type]
            && props.props.state.bedrooms[0] <= parseInt(prop.bedrooms) 
      && props.props.state.bedrooms[0] <= parseInt(prop.bedrooms) 
            && props.props.state.bedrooms[0] <= parseInt(prop.bedrooms) 
            && parseInt(prop.bedrooms) <= props.props.state.bedrooms[1]
            && props.props.state.bathrooms[0] <= parseInt(prop.bathrooms) 
      && props.props.state.bathrooms[0] <= parseInt(prop.bathrooms) 
            && props.props.state.bathrooms[0] <= parseInt(prop.bathrooms) 
            && parseInt(prop.bathrooms) <= props.props.state.bathrooms[1]
            && prop.latitude && prop.longitude)?
                  <Marker position={{ lat: prop.latitude, lng: prop.longitude }} key={index} clickable={true} icon={icon} onClick={()=>scrollToCard(prop.uid)} title={prop.name} onMouseOver={()=>handleHover({ lat: prop.latitude, lng: prop.longitude }, prop.name, prop.bedrooms, prop.bathrooms, prop.baseGuests)}/>
                  : null
          )})}
          </>
          : <>{(props.props.lat && props.props.lng)?<Marker position={{ lat: props.props.lat, lng: props.props.lng }} icon={icon} />: null}</>   
        }
      </GoogleMap>)
})


export default renderMap