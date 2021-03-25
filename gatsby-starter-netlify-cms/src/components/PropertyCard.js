import React, { useState, useEffect } from 'react'
import {Card} from 'react-bootstrap'
import { Link } from "@reach/router";
import Col from 'react-bootstrap/Col'
import { FirestoreDocument } from "@react-firebase/firestore";
import Loading from '../components/Loading'
import Amenity from '../components/Amenities';
import CardCalendar from '../components/CardCalendar'
import BedBathPax from '../components/BedBathPax'

const PropertyCard = (props) => {

    const [showAmenities, setShowAmenities] = useState()
    const [showCalendar, setShowCalendar] = useState()
    const [displayPrice, setDisplayPrice] = useState(null)
    const [dateURI, setDateURI] = useState('')

    useEffect(() => {

      if(props.dates){
        setDateURI(`?from=${props.dates.from}&to=${props.dates.to}`)
      }
      setDisplayPrice(props.item.baseDailyRate)
      return () => {
        setDisplayPrice(null)
      }
    }, [props])


    return (
    <Col xs={12} md={6} lg={4} className="prop-card-container" key={props.index}>
        
        <Card className="bg-dark text-white prop-card" style={{backgroundImage: `url(${props.item.picture})`}} id={props.item.uid}>
          {props.winterLet && 
          <div className="ribbon"><span>Winter Let</span></div>
          }
        {showAmenities && 
              <div className="card-img-overlay" style={{fontSize: "0.8rem", backgroundColor: "#fff", height: "fit-content", color:"#000"}}>
                <FirestoreDocument path={`/amenities/${props.item.uid}`}>
                                        {data => {
                                            return (!data.isLoading && data.value) ? 
                                            <div id="amenities">
                                                <h2>Amenities</h2>
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
            <div className="card-img-overlay" style={{backgroundColor: "#fff", height: "fit-content"}}>
              <CardCalendar id={props.item.uid}/>
            </div>

            }
          <Card.ImgOverlay style={{position:"relative", padding:"1rem"}}>
          <Link  to={`/properties/${props.item.uid}`+dateURI}style={{position:"absolute", top:0, left:0, width:"100%", height:"100%", background:"transparent"}}></Link>
          <section className="section prop-card-text">
          <Link to={`/properties/${props.item.uid}`+dateURI}  style={{position:"relative", zIndex:"2"}}>
            <Card.Text>
              <small className="text-muted">{props.item.type}</small>
              <small className="feature-text-price" style={{float:"right"}}>From {displayPrice}€/ Day</small>
            </Card.Text>
            <hr style={{margin:"0.5rem 0"}}/>
            <Card.Title style={{textAlign:"center"}}><span className="prop-card-title">{props.item.name}</span></Card.Title>
            <BedBathPax bedrooms={props.item.bedrooms} bathrooms={props.item.bathrooms} baseGuests={props.item.baseGuests} color="rgba(0,0,0)"/>
            <hr style={{margin:"0.5rem 0"}}/>
            <Card.Text style={{fontSize: "0.8rem"}}>
              <p style={{textAlign: "center"}}>{props.item.shortDescription}</p>
              <br />
              <br />
              <b>{props.item.city}</b>
            </Card.Text>
            </Link>
            <Card.Footer className="prop-card-footer-container" style={{borderRadius: "0 0 5px 5px"}}>
                <small className="prop-card-btn" onClick={() => setShowAmenities(!showAmenities)}>
                {showAmenities ? 
                <p className="card-footer-btn-txt">Hide Amenities</p>
                :<p className="card-footer-btn-txt">Amenities</p>
                  }</small>
                <small className="prop-card-btn" onClick={()=> props.handleGalleryClick(props.item.photos)}>
                <p className="card-footer-btn-txt">Gallery</p>
                  </small>
                <small className="prop-card-btn">
                <p className="card-footer-btn-txt" onClick={()=>setShowCalendar(!showCalendar)}>Calendar</p>
                  </small>
            </Card.Footer>     
          </section>
          
          </Card.ImgOverlay>   
        </Card>
      
      </Col>
      )}

      export default PropertyCard