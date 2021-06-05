import React, { useState, useEffect } from 'react'
import {Card} from 'react-bootstrap'
import { Link } from "@reach/router";
import Col from 'react-bootstrap/Col'
import { FirestoreDocument } from "@react-firebase/firestore";
import Loading from '../components/Loading'
import Amenity from '../components/Amenities';
import CardCalendar from '../components/CardCalendar'
import BedBathPax from '../components/BedBathPax'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

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
        
        <div className="news-card">
            <a href="#" className="news-card__card-link"></a>
            <img src={props.item.picture} className="news-card__image"/>
            <div className="news-card__text-wrapper">
            <h2 className="news-card__title">{props.item.name}</h2>
            <div className="news-card__post-date"><BedBathPax bedrooms={props.item.bedrooms} bathrooms={props.item.bathrooms} baseGuests={props.item.baseGuests} color="rgba(256,256,256)"/></div>
            <div className="news-card__details-wrapper">
                <p className="news-card__excerpt">{props.item.shortDescription}</p>
                <a href="#" className="news-card__read-more">Book Now <i class="fas fa-long-arrow-alt-right"></i></a>
            </div>
            </div>
        </div>
            
      </Col>
      )}

      export default PropertyCard