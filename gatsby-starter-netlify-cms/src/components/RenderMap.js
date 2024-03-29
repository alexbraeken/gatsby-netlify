import React from 'react';
import { Link } from "@reach/router"
import { GoogleMap, Marker, OverlayView, MarkerClusterer} from '@react-google-maps/api';
import icon from '../img/smartavillas marker 2.svg'
import icon3 from '../img/smartavillas marker 3.svg'
import infoIcon from '../img/heart.svg'
import restaurantIcon from '../img/restaurant.svg'
import golfIcon from '../img/golf-marker.svg'
import horseIcon from '../img/horse-marker.svg' 
import BedBathPax from '../components/BedBathPax'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

const options = {
  gridSize: 50,
  minClusterSize: 3,
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

const infoOptions = {
  gridSize: 50,
  styles: [
    {
      textColor: 'white',
      url: '/img/multi-info-marker.png',
      height: 50,
      width: 50
    },
   {
      textColor: 'white',
      url: '/img/multi-info-marker.png',
      height: 50,
      width: 50
    },
   {
      textColor: 'white',
      url: '/img/multi-info-marker.png',
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
      isMobile: false,
      eyeHover : false,
      markers: [],
      activityCoords: []
    }
    this.onLoad = this.onLoad.bind(this);
    this.markerOnLoad = this.markerOnLoad.bind(this);
    this.MarkerClustererOnLoad = this.MarkerClustererOnLoad.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.refreshPropList = this.refreshPropList.bind(this);
    this.refreshBounds = this.refreshBounds.bind(this);
    this.handleBoundsChange = this.handleBoundsChange.bind(this);
    this.checkMobile = this.checkMobile.bind(this);
    this.refreshMarkers = this.refreshMarkers.bind(this);
    this.addMarkerListener = this.addMarkerListener.bind(this);
    this.addMarkerClustererListener = this.addMarkerClustererListener.bind(this);
    this.handleInfoClick = this.handleInfoClick.bind(this);
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
  if(this.props.props.activities && this.props.props.activityCoords)
  {
    this.setState({activityCoords: this.props.props.activityCoords})
  }
}

componentDidUpdate(prevProps){
  if(this.props.props.isMarkerShown && this.props.props.list && this.props.props.list?.length !== this.state.propList?.length)this.refreshPropList()
  if(this.props.props.cardDisplayNum !== prevProps.props.cardDisplayNum){
    this.refreshMarkers(this.state.markers)
  }
  if(this.props.props.activities && this.props.props.activityCoords)
  {
    this.setState({activityCoords: this.props.props.activityCoords})
  }
}


refreshPropList = () => {
  this.setState({propList: this.props.props.list},()=>{
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

handleBoundsChange = () => {
  if(this.state.map && !(this.props.props.lat && this.props.props.lng)){
    let boundedProps = []
    this.state.markers.forEach(marker=> {
      if(this.state.map.getBounds().contains(marker.marker.getPosition())){
        boundedProps.push(marker.id)
      } 
    })
    if(this.props.props.boundProps !== boundedProps)this.props.props.handleMapBoundProperties(boundedProps)
  }
}
  
    onLoad = 
       (mapInstance) => {
        mapInstance.setTilt(45)
        this.setState({map:mapInstance})
        mapInstance.addListener("dragend", ()=>{
          this.setState({center:{lat:this.state.map.getCenter().lat(), lng:this.state.map.getCenter().lng()}})
        })
        if(this.props.props.isMarkerShown && this.props.props.list)this.refreshBounds(mapInstance)
    }

    markerOnLoad = (marker, id) => {
      this.setState(prevState=> ({markers: [...prevState.markers, {marker: marker, id: id}]}))
      this.addMarkerListener({marker: marker, id: id})
    }

    MarkerClustererOnLoad = (cluster) => {
      this.addMarkerClustererListener(cluster)
    }

    refreshMarkers = (markers) => {
      for(let i = 0; i < markers.length; i++ ){
        this.addMarkerListener(markers[i])
      }
    }

    addMarkerListener = (marker) => {
      let card = document.getElementById(marker.marker.title)
      if(card){
        card.addEventListener("mouseenter", ()=> {
          marker.marker.setIcon(icon3)
          marker.marker.setAnimation(window.google.maps.Animation.BOUNCE)
        })
        card.addEventListener("focusin", ()=> {
          marker.marker.setIcon(icon3)
          marker.marker.setAnimation(window.google.maps.Animation.BOUNCE)
        })
        card.addEventListener("mouseleave", ()=> {
          marker.marker.setIcon(icon)
          marker.marker.setAnimation(null)
        })
        card.addEventListener("focusout", ()=> {
          marker.marker.setIcon(icon)
          marker.marker.setAnimation(null)
        })
      }
    }

    addMarkerClustererListener = (clusterer) => {
      clusterer.clusters.forEach(cluster => {
        cluster.markers.forEach(marker => {
          let card = document.getElementById(marker.title)
          if(card){
            card.addEventListener("mouseenter", ()=> {
              if(cluster.clusterIcon.div)cluster.clusterIcon.div.classList.add("bounce-animation")
            })
            card.addEventListener("focusin", ()=> {
              if(cluster.clusterIcon.div)cluster.clusterIcon.div.classList.add("bounce-animation")
            })
            card.addEventListener("mouseleave", ()=> {
              if(cluster.clusterIcon.div)cluster.clusterIcon.div.classList.remove("bounce-animation")
            })
            card.addEventListener("focusout", ()=> {
              if(cluster.clusterIcon.div)cluster.clusterIcon.div.classList.remove("bounce-animation")
            })
          }
        })
      })
      
    }

    
    handleClick = (position, name, bed, bath, guests, img, baseDailyRate, currencySymbol, uid) =>{
        this.setState({overlay:{position:position, name:name, bed:bed, bath:bath, guests:guests, img:img, baseDailyRate: baseDailyRate, currSymbol: currencySymbol, uid: uid}})
    }
  
    handleMouseOut = () =>{
      this.setState({overlay:null})
    }

    handleInfoClick = (position, name, type, img, link) => {
      this.setState({overlay: {position: position, name: name, type: type, img: img, link: link}})
    }


render(){
    return (<GoogleMap
          mapContainerStyle={{height:this.props.props.height, position: this.props.props.position || 'relative', width: this.props.props.width || '100%'}}
          options={{
            disableDefaultUI:true,
            tilt: 45,
            styles: [
              {
                featureType: "all",
                stylers: [{ "saturation": this.props.props.saturation || 0 }],
              },
              {
                featureType: "administrative",
                elementType: "labels",
                stylers: [{ visibility: this.props.props.visibility || "on"}],
              },
              {
                featureType: "administrative",
                elementType: "geometry",
                stylers: [{ lightness: this.props.props.lightness || 0}],
              },
              {
                featureType: "road",
                elementType: "labels",
                stylers: [{ visibility: this.props.props.visibility || "on"}],
              },
              {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ lightness: this.props.props.lightness || 0}],
              },
              {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: this.props.props.roadStroke || ""}],
              },
              {
                featureType: "road",
                elementType: "geometry.fill",
                stylers: [{ color: this.props.props.roadFill || ""}],
              },
              {
                featureType: "transit",
                elementType: "labels",
                stylers: [{ visibility: this.props.props.visibility || "on"}],
              },
              {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [{ lightness: this.props.props.lightness || 0}],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ lightness: this.props.props.lightness || 0}],
              },
              {
                featureType: "landscape",
                elementType: "labels",
                stylers: [{ visibility: this.props.props.visibility || "on"}],
              },
              {
                featureType: "poi",
                stylers: [{ visibility: this.props.props.visibility || "on" }],
              },
              {
                featureType: "poi.business",
                stylers: [{ visibility: "off" }],
              }
            ]
          }}
          zoom={this.props.props.zoom || this.props.zoom}
          onLoad={this.onLoad}
          gestureHandling= {this.state.isMobile ? "cooperative" : "greedy" }
          onMouseOut={()=>this.handleMouseOut()}
          onBoundsChanged={()=>this.handleBoundsChange()}
          center={this.state.center}
        >
          {(this.props.props.isMarkerShown && this.props.props.list)?
            <>
              {this.state.overlay &&
                <OverlayView
                  position={this.state.overlay.position}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <div className="map-overlay-view" style={{backgroundColor:"#fff", borderRadius:"4px", padding:"5px", display:"flex", justifyContent:"center", flexWrap:"wrap", maxWidth:"300px"}}>
                  <div style={{display: "none"}} className="bounce-animation"></div>
                  <Link to={`/properties/${this.state.overlay.uid}`}>
                    <div className="overlay-view-link">
                      <FontAwesomeIcon icon={faEye} className="overlay-view-icon"/>
                      <span className="link-text">View</span>
                    </div>
                  </Link>
                  <img src={this.state.overlay.img} style={{maxWidth:"100%",flex:"1 1 100%"}} alt={this.state.overlay.name} />
                  <Link to={`/properties/${this.state.overlay.uid}`}><div style={{height: "100%", display:"flex"}}><h4 className="overlay-name">{this.state.overlay.name}</h4></div></Link>
                  <div className="map-price"><p className="feature-text-price" style={{float:"right"}}>From {this.state.overlay.baseDailyRate}€/ Day</p></div>
                  <BedBathPax bedrooms={this.state.overlay.bed} bathrooms={this.state.overlay.bath} baseGuests={this.state.overlay.guests} color="rgba(0,0,0)"/>
                  </div>
                </OverlayView>}
              <MarkerClusterer onClusteringEnd={this.MarkerClustererOnLoad} options={options} maxZoom={14}>
                {(clusterer)=> 
                  this.state.propList.map((prop, index)=>{
                    return <Marker onLoad={(marker)=>{this.markerOnLoad(marker, prop.uid)}} position={{ lat: prop.latitude, lng: prop.longitude }} key={index} clusterer={clusterer} clickable={true} icon={icon} title={prop.name} id={prop.uid} onClick={()=>this.handleClick({ lat: prop.latitude, lng: prop.longitude }, prop.name, prop.bedrooms, prop.bathrooms, prop.baseGuests, prop.picture, prop.baseDailyRate, prop.currencySymbol, prop.uid)}/>
                  })
                }
              </MarkerClusterer>
            </>
          : 
          <>
            {(this.props.props.lat && this.props.props.lng)?
              <>
                {this.state.overlay &&
                <OverlayView
                  position={this.state.overlay.position}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <div className="map-overlay-view" style={{backgroundColor:"#fff", borderRadius:"4px", padding:"5px", display:"flex", justifyContent:"center", flexWrap:"wrap", maxWidth:"300px"}}>
                  <img src={this.state.overlay.img} style={{maxWidth:"100%",flex:"1 1 100%"}} alt={this.state.overlay.name}/>
                  <a href={this.state.overlay.link}><div style={{height: "100%", display:"flex"}}><h4 className="overlay-name">{this.state.overlay.name}</h4></div></a>
                      <div className="map-price"><small className="orangeText">{this.state.overlay.type}</small></div>
                  </div>
                </OverlayView>
                }
                <Marker position={{ lat: this.props.props.lat, lng: this.props.props.lng }} icon={icon3}/>
                {this.state.activityCoords?
                  <MarkerClusterer options={infoOptions} maxZoom={14}>
                    {(infoClusterer)=>
                      this.state.activityCoords.map((activity, index) => {
                        let markerIcon = infoIcon;
                        switch(activity.type){
                          case "Restaurant": markerIcon = restaurantIcon
                          break;
                          case "Golf": markerIcon = golfIcon
                          break;
                          case "Horse Riding": markerIcon = horseIcon
                          break;
                        }
                        return <Marker 
                                  position={{ lat: activity.lat, lng: activity.lng }} 
                                  icon={markerIcon}
                                  key={index}
                                  clusterer={infoClusterer}
                                  clickable={true} 
                                  title={activity.name}
                                  onClick={()=>{
                                    this.handleInfoClick({lat: activity.lat, lng: activity.lng }, activity.name, activity.type, activity.img, activity.link)}
                                  }/>
                      })
                    }
                  </MarkerClusterer>
                :null
                }
              </>
            :null
            }
          </>   
        }
      </GoogleMap>)}
}


