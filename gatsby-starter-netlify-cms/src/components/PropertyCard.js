import React, { useState, useEffect, useRef } from 'react'
import {Card} from 'react-bootstrap'
import { Link } from "@reach/router"
import Col from 'react-bootstrap/Col'
import { FirestoreDocument } from "@react-firebase/firestore"
import Loading from '../components/Loading'
import Amenity from '../components/Amenities'
import CardCalendar from '../components/CardCalendar'
import BedBathPax from '../components/BedBathPax'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faImages, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { gsap } from "gsap"
import Slider from "react-slick"


const PropertyCard = (props) => {

    const [showAmenities, setShowAmenities] = useState()
    const [showCalendar, setShowCalendar] = useState()
    const [displayPrice, setDisplayPrice] = useState(null)
    const [dateURI, setDateURI] = useState('')
    const [showSlider, setShowSlider] = useState(false)


    const calendar = useRef()

    useEffect(() => {

      if(props.dates){
        setDateURI(`?from=${props.dates.from}&to=${props.dates.to}`)
      }
      setDisplayPrice(props.item.baseDailyRate)
      return () => {
        setDisplayPrice(null)
      }
    }, [props])

    useEffect(() => {
      if(showCalendar)gsap.fromTo(calendar.current, {yPercent: -50}, {yPercent: 0, ease: "Elastic.easeOut",  duration: 0.5});
    }, [showCalendar])

    const settings = {
      infinite: true,
      dots: false,
      initialSlide: 1,
      lazyLoad: true,
      className: "center prop-slider-card",
      centerPadding: "30px",
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      autoplay: false,
    };


    return (
    <Col xs={12} md={6} lg={4} className="prop-card-container" key={props.index}>
        
        <Card className="bg-dark text-white prop-card" style={{flexWrap:"wrap", flexDirection: "row"}} id={props.item.name}>
          {props.item.customData?.Winter_Let_Price && props.item.customData?.Winter_Let_Price.length > 0 &&
          <div className="ribbon"><span>Also Winter Let</span></div>
          }
        {showAmenities && 
              <div className="card-img-overlay card-amenities" >
                <FirestoreDocument path={`/amenities/${props.item.uid}`}>
                                        {data => {
                                            return (!data.isLoading && data.value) ? 
                                            <div id="amenities">
                                                <h3 style={{textAlign:"center"}}>Amenities</h3>
                                                <br />
                                                <div className="amenities-list">
                                                {Object.entries(data.value).map((amen, index) => {
                                                    
                                                        return (amen[1] && amen[0] !== "__id") ? 
                                                        <div key={index} className="amenity">
                                                          <Amenity amenity = {amen[0]} /></div> : null
                                                })}
                                                <br />
                                                </div>
                                            </div> : <Loading />
                                        }}
                                    </FirestoreDocument>
              </div>
            }
            {showCalendar && 
            <div ref={calendar} className="card-img-overlay calendar-container" style={{height: "fit-content"}}>
              <FirestoreDocument path={`PricingPeriods/${props.item.uid}`}>
                {data => {
                return (!data.isLoading && data.value) ? 
                  <CardCalendar id={props.item.uid} pricingPeriods={data.value}/>
                  :<Loading />
                }}
              </FirestoreDocument>
            </div>

            }
            <Link  to={`/properties/${props.item.uid}`+dateURI}style={{position:"absolute", top:0, left:0, width:"100%", height:"100%", background:"transparent"}}></Link>
            <div className="card-slider-container" style={{backgroundImage:`url(${props.item.picture})`}}>
    {!showSlider && <button type="button" data-role="none" className="slick-arrow slick-prev card-arrow" style={{display: "block"}} onClick={() => setShowSlider(!showSlider)}></button> }
    {!showSlider && <button type="button" data-role="none" className="slick-arrow slick-next card-arrow" style={{display: "block"}} onClick={() => setShowSlider(!showSlider)}></button> }
            <div style={{position: "absolute", top: "0", left:"0", width:"100%", height:"100%"}}>
            {showSlider && <Slider {...settings}>
                {props.item.photos.map((photo, index) => {
                  return (
                    <div key={index}>
                      <div className="prop-card-slider"  style={{backgroundImage:`url(${photo.url})`}}>
                      </div>
                    </div>
                  
                  )
                })
                }
              </Slider>
              }
            </div>
              <Card.Text>
                <small className="feature-text-type">{props.item.type}</small>
              </Card.Text>
            </div>
            <Card.ImgOverlay style={{position:"relative", padding:"1rem"}}>
              <section className="section prop-card-text">
              <Link to={`/properties/${props.item.uid}`+dateURI}  style={{position:"relative", zIndex:"2", width: "100%", display:"block", height:"100%"}}>
                <Card.Title style={{textAlign:"center"}}><span className="prop-card-title">{props.item.name}</span></Card.Title>
                <BedBathPax bedrooms={props.item.bedrooms} bathrooms={props.item.bathrooms} baseGuests={props.item.baseGuests} color="rgba(0,0,0)"/>
                <hr style={{margin:"0.5rem 0"}}/>
                <Card.Text style={{fontSize: "0.8rem"}}>
                  <span style={{textAlign: "center", display:"block"}}>{props.item.shortDescription}</span>
                </Card.Text>
                <div className="prop-card-description-ps">
                  <small style={{float:"left"}}>{props.item.city}</small>
                  <small style={{float:"right"}}>From <span className="feature-text-price">{displayPrice}€ </span>/ Night</small>
                </div>
                </Link>
                <Card.Footer className="prop-card-footer-container">
                  <div className="footer-btn-container">
                    <div className="footer-btn" onClick={() => setShowAmenities(!showAmenities)} style={showAmenities ? {backgroundColor: "#ffad77"}: {}}>
                      <FontAwesomeIcon icon={faList} style={{margin: "auto 20px", transform: "translateX(-50%)"}}/><small className="card-footer-btn-txt">Amenities</small>
                    </div>
                  </div>
                  <div className="footer-btn-container">
                    <div className="footer-btn" onClick={()=> props.handleGalleryClick(props.item.photos)}>
                    <FontAwesomeIcon icon={faImages} style={{margin: "auto 20px", transform: "translateX(-50%)"}}/><small className="card-footer-btn-txt">Gallery</small>
                    </div>
                  </div>
                  <div className="footer-btn-container">
                    <div className="footer-btn" onClick={()=>setShowCalendar(!showCalendar)} style={showCalendar ? {backgroundColor: "#ffad77"}: {}}>
                    <FontAwesomeIcon icon={faCalendarAlt} style={{margin: "auto 20px", transform: "translateX(-50%)"}}/><small className="card-footer-btn-txt">Calendar</small>
                    </div>
                  </div>
                </Card.Footer>     
              </section>
            </Card.ImgOverlay>   
        </Card>
      
      </Col>
      )}

      export default PropertyCard