import React from 'react';

import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';


const GoogleMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCC0VPgtgvuBoukr23_t9SVQuY_mWjrau8&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>{

  const filteredSearch = (props.list)? props.state.filteredSearch: null;
  const popover = (prop) => (
  <Popover id="popover-basic">
    <Popover.Title as="h3">Properties with {prop}</Popover.Title>
                    <Popover.Content>
                      <h3>{prop.name}</h3>
                      <hr />
                      <div className="header-icons" style={{margin:"auto"}}>
                        <div className="icon-info">
                            <img alt="smartavillas - bed" src="/img/bedroom1.png" />
                                <span className="tooltiptext">Bedrooms</span>
                                <div className="text-number">
                                    <h3>{prop.bedrooms}</h3>
                                </div>
                        </div>
                        <div className="icon-info">
                            <img alt="smartavillas - bath" src="/img/bathroom3.png" />
                            <span className="tooltiptext">Bathrooms</span>
                            <div className="text-number">
                                <h3>{prop.bathrooms}</h3>
                            </div>
                        </div>
                        <div className="icon-info">
                            <img alt="smartavillas - sleeps" src="/img/people.png" />
                            <span className="tooltiptext">Sleeps</span>
                            <div className="text-number">
                                <h3>{prop.baseGuests}</h3>
                            </div>
                        </div>
                      </div>
                    </Popover.Content> 
  </Popover>
  )

return (
<GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    {(props.isMarkerShown && props.list)?props.list.map((prop, index)=>{
      return (props.state.city.includes(prop.city) === filteredSearch && props.state.propType.indexOf(prop.type) === -1
      && props.state.bedrooms[0] <= parseInt(prop.bedrooms) 
      && parseInt(prop.bedrooms) <= props.state.bedrooms[1]
      && props.state.bathrooms[0] <= parseInt(prop.bathrooms) 
      && parseInt(prop.bathrooms) <= props.state.bathrooms[1])?
        (
          <OverlayTrigger trigger="click" placement="right" overlay={()=>popover(prop)} key={index}>
            <Marker position={{ lat: prop.latitude, lng: prop.longitude }} key={index}/>
          </OverlayTrigger>) : null
    }) : <Marker position={{ lat: props.lat, lng: props.lng }} />
      
    }
  </GoogleMap>)
}
)
export default GoogleMapComponent