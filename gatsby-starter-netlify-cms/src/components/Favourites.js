import React, { useState, useEffect } from 'react'
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import { connect } from "react-redux"
import {Container, Col, Row, Card} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp} from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types"
import BedBathPax from '../components/BedBathPax'
import { AiFillHeart } from "@react-icons/all-files/ai/AiFillHeart";
import { MdClose } from "@react-icons/all-files/md/MdClose";
import Slider from "react-slick"

const mapStateToProps = (state) => {
  let newObj = {}
  Object.keys(state.properties).forEach(prop=>{
    newObj[prop] = state.properties[prop]
  })
  
    return  {properties: newObj}
  }
  
const Favourites = (props) => {

    const [show, setShow] = useState(false)
    const [favProps, setFavProps] = useState({})

    const {t} = useTranslation(['properties', 'translation', 'amenities']);

    useEffect(() => {

      setFavProps(props.properties)
      return () => {
        setFavProps([])
      }
    }, [props])

    const settings = {
      infinite: true,
      dots: true,
      className: "fav-slider center",
      centerPadding: "30px",
      slidesToShow: Object.keys(favProps).length > 4 ? 4 : Object.keys(favProps).length,
      slidesToScroll: 1,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: Object.keys(favProps).length > 3 ? 3 : Object.keys(favProps).length,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: Object.keys(favProps).length > 2 ? 2 : Object.keys(favProps).length,
            slidesToScroll: 2,
            initialSlide: 2,
            dots: false
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false
          }
        }
      ]
    };

    return(
    <div className="favs-container">
      <Col>
        <Row className="show-favs" >
          {Object.keys(favProps).length > 0 && 
            <div className={`fav-toggle ${show ? "active": null}`} onClick = {()=>setShow(!show)}>
                <AiFillHeart className="favs-heart" />
                <FontAwesomeIcon className="chevron" icon={faChevronUp} />
            </div>
          }
        </Row>
        <Row className={`favs-list ${show ? "active": null}`}>
          <div style={{height: "auto", width: "100%"}}>
            <Slider {...settings}>
              {Object.keys(favProps).map(property=>{
                return  <Card className="favs-card" key={favProps[property].id}>
                            <Card.ImgOverlay style={{position:"relative", padding:"0"}}>
                              <div className="favs-img" style={{backgroundImage: `url(${favProps[property].img || 'https://res.cloudinary.com/smartavillas-com/image/upload/v1615366925/Ambience_Mood/Hero_Family_efmsd3.jpg'})`}}></div>
                              <Card.Title style={{textAlign:"center"}}><Link to={`/properties/${favProps[property].id}`}><span className="prop-card-title">{favProps[property].name}</span></Link></Card.Title>
                              <MdClose className="fav-close" onClick={()=>props.dispatch({type: 'REMOVE_PROPERTY', propId: favProps[property].id})}/>
                              <BedBathPax bedrooms={favProps[property].bedrooms} bathrooms={favProps[property].bathrooms} baseGuests={favProps[property].baseGuests} color="rgba(0,0,0)"/>
                              <div className="favs-ps">
                                <small style={{float:"left"}}>{favProps[property].city}</small>
                                <small style={{float:"right"}}>{t("From")} <span className="feature-text-price">{favProps[property].rate}€ </span>/ {t("Night")}</small>
                              </div>
                            </Card.ImgOverlay>
                        </Card>
              })
              }
            </Slider>
          </div>
        </Row>
      </Col>
    </div>
  )}
  
Favourites.propTypes = {
properties: PropTypes.object.isRequired,
}


const ConnectedFavourites = connect(mapStateToProps)(Favourites)

export default ConnectedFavourites