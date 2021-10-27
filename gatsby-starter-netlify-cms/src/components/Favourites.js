import React, { useState} from 'react'
import { connect } from "react-redux"
import {Container, Col, Row, Card} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp} from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types"
import BedBathPax from '../components/BedBathPax'
import { AiFillHeart } from "@react-icons/all-files/ai/AiFillHeart";

const mapStateToProps = (state) => {
    return  state 
  }
  
const mapDispatchToProps = dispatch => {
return { increment: (name, id, img) => dispatch({ type: `ADD_PROPERTY`, propName: name, propId: id, propImg: img}) }
}



const Favourites = ({properties, increment}) => {

    const [show, setShow] = useState(false)

    return(
    <div className="favs-container">
      <Col>
        <Row className="show-favs" >
          {properties.length > 0 && 
            <div className={`fav-toggle ${show ? "active": null}`} onClick = {()=>setShow(!show)}>
                <AiFillHeart className="favs-heart" />
                <FontAwesomeIcon className="chevron" icon={faChevronUp} />
            </div>
          }
        </Row>
        <Row className={`favs-list ${show ? "active": null}`}>
          {properties.map(property=>{
            return  <Card className="favs-card">
                        <Card.ImgOverlay style={{position:"relative", padding:"1rem"}}>
                        <div className="favs-img" style={{backgroundImage: `url(${property.img || 'https://res.cloudinary.com/smartavillas-com/image/upload/v1615366925/Ambience_Mood/Hero_Family_efmsd3.jpg'})`}}></div>
                        <Card.Title style={{textAlign:"center"}}><span className="prop-card-title">{property.name}</span></Card.Title>
                        <BedBathPax bedrooms={property.bedrooms} bathrooms={property.bathrooms} baseGuests={property.baseGuests} color="rgba(0,0,0)"/>
                        </Card.ImgOverlay>
                    </Card>
          })
          }
        </Row>
      </Col>
    </div>
  )}
  
Favourites.propTypes = {
properties: PropTypes.number.isRequired,
increment: PropTypes.func.isRequired,
}


  const ConnectedFavourites = connect(mapStateToProps, mapDispatchToProps)(Favourites)

export default ConnectedFavourites