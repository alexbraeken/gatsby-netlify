import React, { useState } from 'react'
import {Card} from 'react-bootstrap'
import { Link } from "@reach/router";
import Col from 'react-bootstrap/Col'
import { FirestoreDocument } from "@react-firebase/firestore";
import Loading from '../components/Loading'
import Amenity from '../components/Amenities';

const PropertyCard = (props) => {

    const [showAmenities, setShowAmenities] = useState();

    return (
    <Col xs={12} md={6} lg={4} className="prop-card-container" key={props.index}>
        
        <Card className="bg-dark text-white prop-card" style={{backgroundImage: `url(${props.item.picture})`}}>
        {showAmenities && 
              <div className="card-img-overlay" style={{fontSize: "0.8rem", backgroundColor: "#fff", height: "fit-content", color:"#000"}}>
                <FirestoreDocument path={`/amenities/${props.data.gridItems.ids[props.index]}`}>
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
          <Card.ImgOverlay style={{position:"relative"}}>
          <Link  to={`/properties/${props.data.gridItems.ids[props.index]}`}style={{position:"absolute", top:0, left:0, width:"100%", height:"100%", background:"transparent"}}></Link>
          <section className="section prop-card-text">
          <Link to={`/properties/${props.data.gridItems.ids[props.index]}`}  style={{position:"relative", zIndex:"2"}}>
            <Card.Text>
              <small className="text-muted">{props.item.type}</small>
              <small className="text-muted" style={{float:"right"}}>{props.item.baseDailyRate} € / Day</small>
            </Card.Text>
            <hr style={{margin:"0.5rem 0"}}/>
            <Card.Title style={{textAlign:"center"}}>{props.item.name}</Card.Title>
            <div className="header-icons" style={{margin:"auto"}}>
              <div className="icon-info">
                  <img alt="smartavillas - bed" src="/img/bedroom1.png" />
                      <span className="tooltiptext">Bedrooms</span>
                      <div className="text-number">
                          <h3>{props.item.bedrooms}</h3>
                      </div>
              </div>
              <div className="icon-info">
                  <img alt="smartavillas - bath" src="/img/bathroom3.png" />
                  <span className="tooltiptext">Bathrooms</span>
                  <div className="text-number">
                      <h3>{props.item.bathrooms}</h3>
                  </div>
              </div>
              <div className="icon-info">
                  <img alt="smartavillas - sleeps" src="/img/people.png" />
                  <span className="tooltiptext">Sleeps</span>
                  <div className="text-number">
                      <h3>{props.item.baseGuests}</h3>
                  </div>
              </div>
            </div>
            <hr style={{margin:"0.5rem 0"}}/>
            <Card.Text style={{fontSize: "0.8rem"}}>
              {props.item.shortDescription}
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
                <p className="card-footer-btn-txt">Calendar</p>
                  </small>
            </Card.Footer>     
          </section>
          
          </Card.ImgOverlay>   
        </Card>
      
      </Col>
      )}

      export default PropertyCard