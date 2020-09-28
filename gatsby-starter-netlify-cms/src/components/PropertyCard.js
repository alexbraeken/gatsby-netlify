import React, { useState } from 'react'
import {Card} from 'react-bootstrap'
import { Link } from "@reach/router";
import Col from 'react-bootstrap/Col'
import { FirestoreDocument } from "@react-firebase/firestore";

const PropertyCard = (props) => {

    const [showAmenities, setShowAmenities] = useState();

    return (
    <Col xs={12} md={6} lg={4} className="prop-card-container" key={props.index}>
        
        <Card className="bg-dark text-white prop-card" style={{backgroundImage: `url(${props.item.picture})`}}>
          <Card.ImgOverlay >
          
          <section className="section prop-card-text" style={{padding: "1.5rem 1.5rem"}}>
          <Link to={`/properties/${props.data.gridItems.ids[props.index]}`} >
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
            {showAmenities && 
              <Card.Text style={{fontSize: "0.8rem", position:"absolute", top:"0px", height:"100px", width:"100%"}}>
                <FirestoreDocument path={`/amenities/${props.data.gridItems.ids[props.index]}`}>
                                        {data => {
                                            return (!data.isLoading && data.value) ? 
                                            <div id="amenities">
                                                <h2>Amenities</h2>
                                                <br />
                                                <div className="amenities-list">
                                                {Object.entries(data.value).map((amen, index) => {
                                                    
                                                        return (amen[1] && amen[0] !== "__id") ? 
                                                        <div key={index} className="amenity">{amen[0]}</div> : null
                                                })}
                                                <br />
                                                </div>
                                            </div> : "Loading" 
                                        }}
                                    </FirestoreDocument>
              </Card.Text>
            }
            <Card.Footer>
            <small className="text-muted" onClick={() => setShowAmenities(!showAmenities)}>
              {showAmenities ? 
              <p>Hide Amenities</p>
              :<p>Show Amenities</p>
                }</small>
            </Card.Footer>
            
          </section>
          
          </Card.ImgOverlay>   
        </Card>
      
      </Col>
      )}

      export default PropertyCard