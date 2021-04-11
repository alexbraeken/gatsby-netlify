import React, {useState, useEffect} from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow, OverlayView} from '@react-google-maps/api';
import icon from '../img/smartavillas marker 2.svg'
import Loading from '../components/Loading'
import BedBathPax from '../components/BedBathPax'
import { map } from 'lodash';

export default class renderMap extends React.Component{

  constructor(props){
    super(props);
    this.state={
      overlay: null,
      map: null,
      center: {}
    }
    this.onLoad = this.onLoad.bind(this);
    this.scrollToCard = this.scrollToCard.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
}

  
    onLoad = 
       (mapInstance) => {
        this.setState({map:mapInstance})
        mapInstance.addListener("dragend", ()=>{
          this.setState({center:{lat:this.state.map.getCenter().lat(), lng:this.state.map.getCenter().lng()}})
        })
    }


  
    scrollToCard = (id) => {
        let card = document.getElementById(id)
        if(card){const blink = () => {
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
        }, 2000)}
        
      }
    
    
    
  
    handleHover = (position, name, bed, bath, guests, img, baseDailyRate) =>{
        this.setState({overlay:{position:position, name:name, bed:bed, bath:bath, guests:guests, img:img, baseDailyRate: baseDailyRate}})
    }
  
    handleMouseOut = () =>{
      this.setState({overlay:null})
    }
render(){
    return (<GoogleMap
          mapContainerStyle={{height:this.props.props.height}}
          center={{
            lat: this.state.center.lat || this.props.props.lat || this.props.center.lat,
            lng: this.state.center.lng || this.props.props.lng || this.props.center.lng
          }}
          zoom={this.props.zoom}
          onLoad={this.onLoad}
          gestureHandling= "greedy"
          onMouseOut={()=>this.handleMouseOut()}
        >
          {this.state.overlay &&
          <OverlayView
      position={this.state.overlay.position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div style={{backgroundColor:"#fff", borderRadius:"4px", padding:"5px", display:"flex", justifyContent:"center", flexWrap:"wrap", maxWidth:"300px"}}>
        <img src={this.state.overlay.img} style={{maxWidth:"100%",flex:"1 1 100%"}}/>
      <h4>{this.state.overlay.name}</h4>
      <div className="map-price"><p className="feature-text-price" style={{float:"right"}}>From {this.state.overlay.baseDailyRate}€/ Day</p></div>
      <BedBathPax bedrooms={this.state.overlay.bed} bathrooms={this.state.overlay.bath} baseGuests={this.state.overlay.guests} color="rgba(0,0,0)"/>
      </div>
    </OverlayView>}
          {(this.props.props.isMarkerShown && this.props.props.list)?
          <>
          {this.props.props.list.map((prop, index)=>{
          return (
            (this.props.props.state.city[prop.city]
            && this.props.props.state.type[prop.type]
            && this.props.props.state.bedrooms[0] <= parseInt(prop.bedrooms) 
      && this.props.props.state.bedrooms[0] <= parseInt(prop.bedrooms) 
            && this.props.props.state.bedrooms[0] <= parseInt(prop.bedrooms) 
            && parseInt(prop.bedrooms) <= this.props.props.state.bedrooms[1]
            && this.props.props.state.bathrooms[0] <= parseInt(prop.bathrooms) 
      && this.props.props.state.bathrooms[0] <= parseInt(prop.bathrooms) 
            && this.props.props.state.bathrooms[0] <= parseInt(prop.bathrooms) 
            && parseInt(prop.bathrooms) <= this.props.props.state.bathrooms[1]
            && prop.latitude && prop.longitude)?
                  <Marker position={{ lat: prop.latitude, lng: prop.longitude }} key={index} clickable={true} icon={icon} onClick={()=>this.scrollToCard(prop.uid)} title={prop.name} onMouseOver={()=>this.handleHover({ lat: prop.latitude, lng: prop.longitude }, prop.name, prop.bedrooms, prop.bathrooms, prop.baseGuests, prop.picture, prop.baseDailyRate)}/>
                  : null
          )})}
          </>
          : <>{(this.props.props.lat && this.props.props.lng)?<Marker position={{ lat: this.props.props.lat, lng: this.props.props.lng }} icon={icon} />: null}</>   
        }
      </GoogleMap>)}
}


