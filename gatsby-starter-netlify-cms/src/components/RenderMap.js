import React from 'react';
import { GoogleMap, Marker, OverlayView, MarkerClusterer} from '@react-google-maps/api';
import icon from '../img/smartavillas marker 2.svg'
import icon2 from '../img/map marker.png'
import BedBathPax from '../components/BedBathPax'

const options = {
  gridSize: 50,
  styles: [
    {
      textColor: 'white',
      url: '/img/clustermarker.png',
      height: 40,
      width: 40
    },
   {
      textColor: 'white',
      url: '/img/clustermarker.png',
      height: 50,
      width: 50
    },
   {
      textColor: 'white',
      url: '/img/clustermarker2.png',
      height: 50,
      width: 50
    }
  ]
}



export default class renderMap extends React.Component{

  constructor(props){
    super(props);
    this.state={
      overlay: null,
      map: null,
      center: {},
      propList: [],
      bounds: null,
      isMobile: false
    }
    this.onLoad = this.onLoad.bind(this);
    this.scrollToCard = this.scrollToCard.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.refreshPropList = this.refreshPropList.bind(this);
    this.fetchPropList = this.fetchPropList.bind(this);
    this.refreshBounds = this.refreshBounds.bind(this);
    this.checkMobile = this.checkMobile.bind(this);
}
checkMobile = () => {
  const isTabletOrMobile = window.matchMedia("(max-width: 900px)").matches
  this.setState({isMobile: isTabletOrMobile})
}

componentDidMount(){
  if(this.props.props.isMarkerShown && this.props.props.list)
  {
    this.refreshPropList()
  }
  else {
    this.setState({center: { lat: this.props.props.lat, lng: this.props.props.lng }})
  }
}

componentDidUpdate(prevProps){
  if(this.props.props.isMarkerShown && this.props.props.list && this.fetchPropList()?.length !== this.state.propList?.length)this.refreshPropList()
}

fetchPropList = () => {
  let propArray = []
  this.props.props.list.forEach((prop, index)=>{
    if(this.props.props.state.city[prop.city]
      && this.props.props.state.type[prop.type]
      && this.props.props.state.bedrooms[0] <= parseInt(prop.bedrooms) 
&& this.props.props.state.bedrooms[0] <= parseInt(prop.bedrooms) 
      && this.props.props.state.bedrooms[0] <= parseInt(prop.bedrooms) 
      && parseInt(prop.bedrooms) <= this.props.props.state.bedrooms[1]
      && this.props.props.state.bathrooms[0] <= parseInt(prop.bathrooms) 
&& this.props.props.state.bathrooms[0] <= parseInt(prop.bathrooms) 
      && this.props.props.state.bathrooms[0] <= parseInt(prop.bathrooms) 
      && parseInt(prop.bathrooms) <= this.props.props.state.bathrooms[1]
      && prop.latitude && prop.longitude) propArray.push(prop)
  })
  return propArray
}

refreshPropList = () => {
  this.setState({propList: this.fetchPropList()},()=>{
    this.refreshBounds(this.state.map)
  })
}

refreshBounds = (mapInstance) => {
  if(mapInstance){
    const bounds = new window.google.maps.LatLngBounds();
    this.state.propList.forEach(prop => {
      bounds.extend({ lat: prop.latitude, lng: prop.longitude });
    });

    this.setState({bounds: bounds})

    let center = bounds.getCenter() ? { lat: parseFloat(bounds.getCenter().lat()), lng: parseFloat(bounds.getCenter().lng())} : this.props.center;
    
    this.setState({center: center})

    mapInstance.fitBounds(bounds);
  }
}
  
    onLoad = 
       (mapInstance) => {
        this.setState({map:mapInstance})
        mapInstance.addListener("dragend", ()=>{
          this.setState({center:{lat:this.state.map.getCenter().lat(), lng:this.state.map.getCenter().lng()}})
        })
        if(this.props.props.isMarkerShown && this.props.props.list)this.refreshBounds(mapInstance)
    }


  
    scrollToCard = (id) => {
        let card = document.getElementById(id)
        if(card){
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
          zoom={this.props.zoom}
          onLoad={this.onLoad}
          gestureHandling= {this.state.isMobile ? "cooperative" : "greedy" }
          onMouseOut={()=>this.handleMouseOut()}
          center={this.state.center}
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
          <MarkerClusterer options={options} maxZoom={14}>
            {(clusterer)=> 
            this.state.propList.map((prop, index)=>{
              return <Marker position={{ lat: prop.latitude, lng: prop.longitude }} key={index} clusterer={clusterer} clickable={true} icon={icon} onClick={()=>this.scrollToCard(prop.uid)} title={prop.name} onMouseOver={()=>this.handleHover({ lat: prop.latitude, lng: prop.longitude }, prop.name, prop.bedrooms, prop.bathrooms, prop.baseGuests, prop.picture, prop.baseDailyRate)}/>
            } 
          )}
          </MarkerClusterer>
          : <>{(this.props.props.lat && this.props.props.lng)?<Marker position={{ lat: this.props.props.lat, lng: this.props.props.lng }} icon={icon2} />: null}</>   
        }
      </GoogleMap>)}
}


