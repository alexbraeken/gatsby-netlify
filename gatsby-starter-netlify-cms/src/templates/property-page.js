import React, {useState, useEffect} from 'react';
import { FirestoreDocument } from "@react-firebase/firestore";
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import  Tabs  from 'react-bootstrap/Tabs';
import  Tab  from 'react-bootstrap/Tab';
import PropCarousel from '../components/PropCarousel';
import GoogleMapComponent from '../components/GoogleMapComponent';
import BookingWidget from '../components/BookingWidget';
import CalendarWidget from '../components/CalendarWidget';
import StickyBox from "react-sticky-box";
import GalleryModal from '../components/GalleryModal';
import Amenity from '../components/Amenities';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import logo from '../img/logo.svg';
import BedBathPax from '../components/BedBathPax';
import ActivitiesRoll from '../components/ActivitiesRoll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUmbrellaBeach, faGolfBall, faPlaneDeparture, faShoppingCart, faCar, faExclamationCircle, faSwimmingPool, faFileContract, faExternalLinkAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import queryString from 'query-string';
import EnquiryModal from '../components/EnquiryModal';
import { Helmet } from 'react-helmet';
import Loading from '../components/Loading';
import Reviews from '../components/Reviews';
import { BsStarFill } from "@react-icons/all-files/bs/BsStarFill";
import { connect } from "react-redux"
import { AiOutlineHeart } from "@react-icons/all-files/ai/AiOutlineHeart";
import { AiFillHeart } from "@react-icons/all-files/ai/AiFillHeart";
import Share from '../components/Share'

const mapStateToProps = (state) => {
    let newObj = {}
    Object.keys(state.properties).forEach(prop=>{
      newObj[prop] = state.properties[prop]
    })
    
      return  {properties: newObj}
    }


export const PropertyPageTemplate = ( props ) =>
{
   const [bookDates, setBookDates] = useState({from:new Date(),
    to: null})
   const [propName, setPropName] = useState(null)
   const [propSummary, setPropSummary] = useState(null)
   const [propId, setPropId] = useState(null)
   const [show, setShow] = useState(false);
   const [enquiryShow, setEnquiryShow] = useState(false);
   const [showAllAmenities, setShowAllAemnities] = useState(false)
   const [showNotesReadMore, setShowNotesReadMore] = useState(false)
   const [amenitiesLength, setAmenitiesLength] = useState(0)
   const [smartaOpinion, setSmartaOpinion] = useState(null)
   const [poolDimensions, setPoolDimensions] = useState(null)
   const [damageWaiver, setDamageWaiver] = useState(null)
   const [matterportURL, setMatterportURL] = useState(null)
   const [waiverOpen, setWaiverOpen] = useState(false)
   const [travelDistances, setTravelDistances] = useState({display: false, Town: null, Beach:null, Golf:null, Airport:null, Car:null})
   const [showInteractionReadMore, setShowInteractionReadMore] = useState(false)
   const [showAccessReadMore, setShowAccessReadMore] = useState(false)
   const [showNeighborhoodReadMore, setShowNeighborhoodReadMore] = useState(false)
   const [showTransitReadMore, setShowTransitReadMore] = useState(false)
   const [activitiesCoords, setActivitiesCoords] = useState(null)
   const [reviews, setReviews] = useState(null)
   const [avgRating, setAvgRating] = useState(null)
   const [sections, setSections] = useState(null)
   const [loading, setLoading] = useState(true)
   const [descriptionsLoading, setDescriptionsLoading] = useState(true)


   const {t} = useTranslation(['property', 'translation']);
   const {language} = useI18next();
   const lang = language === "en" ? "en_US" : `${language}_${language.toUpperCase()}`

   useEffect(() => {
    setSections(Array.from(document.getElementsByClassName("prop-page-section")))
       return () => {
           setSections(null)
       }
   }, [loading, descriptionsLoading, reviews])

   useEffect(() => {
       if(reviews && reviews.length > 0){
            let sum = 0;
            reviews.forEach(review=> {
                sum+=review.rating
            })
            setAvgRating((sum/reviews.length).toFixed(2))
        }
   }, [reviews])

    useEffect(() => {
        const path = window.location
        props.handlePathChange(path.href)

        const searchDates = path.search? queryString.parse(path.search) : null;
        setBookDates({from: searchDates?.from || null, to: searchDates?.to || null});

        setPropId(props.id)
        if(props.id){
            const customDataUri = `https://api.hostfully.com/v2/customdata?propertyUid=${props.id}`
            const reviewsUri = `https://api.hostfully.com/v2/reviews?propertyUid=${props.id}`

            fetch(customDataUri, {
            headers:{
            "X-HOSTFULLY-APIKEY": process.env.GATSBY_HOSTFULLY_API_KEY
                }
            })
                    .then(response => {
                        
                        return response.text()
                    })
                    .then(data => {
                    if(JSON.parse(data).length>0){
                        if(JSON.parse(data)[1].text!== undefined){
                            setPoolDimensions(JSON.parse(data)[1].text)
                        }
                        if(JSON.parse(data)[8].text!== undefined){
                            setDamageWaiver(JSON.parse(data)[8].text)
                        }
                        if(JSON.parse(data)[11]?.text!== undefined){
                            setMatterportURL(JSON.parse(data)[11].text)
                        }
                        if(JSON.parse(data)[2] ||JSON.parse(data)[3] || JSON.parse(data)[4] || JSON.parse(data)[5] || JSON.parse(data)[6] || JSON.parse(data)[9]){
                            setTravelDistances({
                                display: true,
                                Town: (JSON.parse(data)[2] && JSON.parse(data)[2].text!== undefined) ? JSON.parse(data)[2].text : null,
                                Beach:  (JSON.parse(data)[3] && JSON.parse(data)[3].text!== undefined) ? JSON.parse(data)[3].text : null,
                                Golf: (JSON.parse(data)[4] && JSON.parse(data)[4].text!== undefined) ? JSON.parse(data)[4].text : null,
                                Airport: (JSON.parse(data)[5] && JSON.parse(data)[5].text!== undefined) ? JSON.parse(data)[5].text : null,
                                Market: (JSON.parse(data)[6] && JSON.parse(data)[6].text!== undefined) ? JSON.parse(data)[6].text : null,
                                Car: (JSON.parse(data)[9] && JSON.parse(data)[9].text!== undefined) ? JSON.parse(data)[9].text : null,
                            })
                        }

                        switch(language){
                            case "pt":
                                if(JSON.parse(data)[12] && JSON.parse(data)[12].text!== undefined){
                                    setSmartaOpinion(JSON.parse(data)[12].text)
                                }
                                else if(JSON.parse(data)[0].text!== undefined){
                                    setSmartaOpinion(JSON.parse(data)[0].text)
                                }
                                break;
                            default:
                                if(JSON.parse(data)[0].text!== undefined){
                                    setSmartaOpinion(JSON.parse(data)[0].text)
                                }
                        }
                    }  
                    })

                    fetch(reviewsUri, {
                        headers:{
                        "X-HOSTFULLY-APIKEY": process.env.GATSBY_HOSTFULLY_API_KEY
                            }
                        })
                        .then(response => {
                            return response.text()
                        })
                        .then(data => {
                            setReviews(JSON.parse(data))
                        })

            return () => {
                setSmartaOpinion(null)
                setBookDates({from:new Date(),
                    to: null})
                setPropName(null)
                setPropSummary(null)
                setShow(false)
                setShowAllAemnities(false)
                setShowNotesReadMore(false)
                setAmenitiesLength(0)
                setPoolDimensions(null)
                setDamageWaiver(null)
                setMatterportURL(null)
                setWaiverOpen(false)
                setTravelDistances({display: false, Town: null, Beach:null, Golf:null, Airport:null, Car:null})
                setShowInteractionReadMore(false)
                setShowNeighborhoodReadMore(false)
                setShowTransitReadMore(false)
                setSections(null)
                setLoading(true)
                setDescriptionsLoading(true)
            }
        }
    }, [props.id, props.path])


    useEffect(() => {
        return () => {
            setActivitiesCoords(null)
        }
    }, [activitiesCoords])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEnquiryClose = () => setEnquiryShow(false)
    const handleEnquiryShow = () => setEnquiryShow(true)


    const handleShowAmenities = () => {
        setShowAllAemnities(!showAllAmenities)
    }

    const handleAmenitiesLength = (length) => {
        setAmenitiesLength(length)
    }

    const onDateChange = (range) => {
        setBookDates({
            from:range.from,
            to: range.to
        })
    }

    const handleName = (name) =>{
        setPropName(name)
    }

    const handleSummary = (summary) => {
        setPropSummary(summary)
    }

    const handleActivitiesCoords = (coords) => {
        setActivitiesCoords(coords)
    }

   const sortAmenities = (amenities) => {

    let list= [];
    amenities.forEach((amenity, index)=> {
        if(amenity[1]){
            list.push(amenity)
        }
    })


    list.push(["length", list.length]);
    


 return list.sort((a, b)=>
 (a[0] !== "hasPool" && b[0] === "hasPool")? 1 :
 (b[0] !== "hasPool" && a[0] === "hasPool")? -1 :
 (a[0] !== "hasHotTub" && b[0] === "hasHotTub")? 1 :
 (b[0] !== "hasHotTub" && a[0] === "hasHotTub")? -1 :
 (a[0] !== "hasAirConditioning" && b[0] === "hasAirConditioning")? 1 :
 (b[0] !== "hasAirConditioning" && a[0] === "hasAirConditioning")? -1 : 
 (a[0] !== "hasDishwasher" && b[0] === "hasDishwasher")? 1 :
 (b[0] !== "hasDishwasher" && a[0] === "hasDishwasher")? -1 :
 (a[0] !== "hasWasher" && b[0] === "hasWasher")? 1 :
 (b[0] !== "hasWasher" && a[0] === "hasWasher")? -1 :
 (a[0] !== "hasHairDryer" && b[0] === "hasHairDryer")? 1 :
 (b[0] !== "hasHairDryer" && a[0] === "hasHairDryer")? -1 :
 (a[0] !== "hasLinens" && b[0] === "hasLinens")? 1 :
 (b[0] !== "hasLinens" && a[0] === "hasLinens")? -1 :
 (a[0] !== "hasTowels" && b[0] === "hasTowels")? 1 :
 (b[0] !== "hasTowels" && a[0] === "hasTowels")? -1 :
 (a[0] !== "hasBalconyTerrasse" && b[0] === "hasBalconyTerrasse")? 1 :
 (b[0] !== "hasBalconyTerrasse" && a[0] === "hasBalconyTerrasse")? -1 : 
 (a[0] !== "hasDeckPatio" && b[0] === "hasDeckPatio")? 1 :
 (b[0] !== "hasDeckPatio" && a[0] === "hasDeckPatio")? -1 : 
 (a[0] !== "hasGarden" && b[0] === "hasGarden")? 1 :
 (b[0] !== "hasGarden" && a[0] === "hasGarden")? -1 :    
 (a[0] !== "hasTV" && b[0] === "hasTV") ? 1 :
 (b[0] !== "hasTV" && a[0] === "hasTV" )? -1 : 
 (a[0] !== "hasInternetWifi" && b[0] === "hasInternetWifi")? 1 :
 (b[0] !== "hasInternetWifi" && a[0] === "hasInternetWifi")? -1 :0)
}

    return (
        <>
        <FirestoreDocument path={`/Properties/${props.id}`}>
            {data => {
                return (!data.isLoading && data.value) ? 
                        <div style={{display:"flex", flexWrap:"wrap"}}>
                            {setLoading(false)}
                            <div style={{width:"100%"}}>
                                <PropCarousel firstSlide={data.value.picture} photos={data.value.photos} handleShow={handleShow}/>
                                <div className="prdtitlesolo productNameTitle">
                                {data.value.customData?.Winter_Let_Price && data.value.customData?.Winter_Let_Price.length > 0 &&
                                    <div className="ribbon"><span>{t("Also Winter Let")}</span></div>
                                }
                                <Container>
                                    <Row>
                                    <Col xs={12} md={11}>
                                        <Row>     
                                        <h1 style={{margin:"0",fontSize:"inherit",padding:"0",fontWeight:"inherit", width:"100%"}}>
                                            <Col>
                                                <Row>
                                                    {propName?
                                                    <span className="prdname">{propName}</span>
                                                    :
                                                    <Col xs={12} md={9}>
                                                        <div className="placeholder-box blink" style={{height:"40px"}}></div>
                                                    </Col> 
                                                    }
                                                </Row>
                                                <hr style={{width:"100px", margin:"5px 0 5px -15px"}}/>
                                                <Row>
                                                    <div className="flag under" style={{marginRight:"10px"}}>
                                                        <span className="prc">{t("From")} {data.value.baseDailyRate} €</span>
                                                        <span className="mth"> / {t("Night")}</span>
                                                    </div>
                                                
                                                <span className="titleTags">
                                                    <span className="titleTag"><Link to={`/properties?city=${data.value.city}`}>{data.value.city}</Link></span >
                                                    <BedBathPax bedrooms={data.value.bedrooms} bathrooms={data.value.bathrooms} baseGuests={data.value.baseGuests} color="rgba(0,0,0)"/>
                                                </span>
                                                </Row>
                                            </Col>
                                        </h1>
                                        <div className="winterLetsRibbon" title="Winter let">
                                            
                                        </div>
                                        </Row>
                                    </Col>
                                    <Col xs={12} md={1} style={{display: "flex", maxWidth: "90px", margin: "auto 0 auto auto"}}>
                                        <div className="add-favs">
                                            {props.inFavs ? <AiFillHeart onClick={()=>props.dispatch({type: 'REMOVE_PROPERTY', propId: props.id})} /> 
                                            :
                                            <AiOutlineHeart onClick={()=>{
                                                props.dispatch({ type: 'ADD_PROPERTY', propName: data.value.name, propId: props.id, propImg: data.value.picture, bedrooms: data.value.bedrooms, bathrooms: data.value.bathrooms, baseGuests: data.value.baseGuests, city: data.value.city, rate: data.value.baseDailyRate })
                                                }}/>
                                            }
                                        </div>
                                        <Share propImg={data.value.picture} propName={data.value.name}/>
                                    </Col>
                                    </Row>
                                </Container>
                            </div>
                                <Container style={{paddingTop:"30px"}}>
                                    <section id="prop-summary">
                                    <div id="prop-nav">
                                        {sections && sections.length > 0 && sections.map((section, index) => {
                                            return(
                                            <>
                                                <a href={`#${section.id}`}><b>{section.dataset.title}</b></a>
                                                {index !== sections.length-1 ? <> | </> : null }
                                            </>
                                            )
                                            
                                        })
                                        }
                                    </div>
                                    <br />
                                    <Row>
                                    <Col>
                                        <Row id="about" data-title={t("About Prop")} className="prop-page-section">
                                            <Col xs={12} md={9}>
                                                <h2>{t("About Prop")}</h2>
                                                <br />
                                                {propSummary ?
                                                <p>
                                                    {propSummary}
                                                </p>
                                                :
                                                <div className="placeholder-box blink" style={{height:"200px"}}>
                                                </div>
                                                }
                                            </Col>
                                        </Row>
                                    <Row>
                                        <Col >
                                            <br/>
                                            <hr />
                                            <FirestoreDocument path={`/amenities/${props.id}`}>
                                                {amens => {
                                                    return (!amens.isLoading && amens.value) ? 
                                                    <div id="amenities" data-title={t("Amenities")} className="prop-page-section">
                                                        <h2>{t("Amenities")}</h2>
                                                        <br />
                                                        <div className="amenities-list">
                                                        {sortAmenities(Object.entries(amens.value)).map((amen, index) => {
                                                            if(showAllAmenities){
                                                                return (amen[1] && amen[0] !== "__id" && amen[0] !== "length") ? 
                                                                <div key={index} className="amenity">
                                                                    <Amenity amenity = {amen[0]} /></div> : null ;
                                                            }else{
                                                                if(amen[0])handleAmenitiesLength(amen[1]);
                                                                return (amen[1] && amen[0] !== "__id" && amen[0] !== "length" && index < 10) ? 
                                                                <div key={index} className="amenity">
                                                                    <Amenity amenity = {amen[0]} /></div> : null ;
                                                            }      
                                                        })}
                                                        <br />
                                                        </div>
                                                        <br />
                                                        <button className="btn" type="" onClick={()=>handleShowAmenities()}>{showAllAmenities?<>{t("Less")}...</>:<p>{t("Show all")} {amenitiesLength-1}...</p>}</button>
                                                    </div> : <Loading />
                                                }}
                                            </FirestoreDocument>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} md={9}>
                                            <hr />
                                            <div id="calendar" data-title={t("Calendar")} className="prop-page-section">
                                                <h2>{t("Calendar")}</h2>
                                                <br />
                                                <FirestoreDocument path={`PricingPeriods/${props.id}`}>
                                                    {pricePeriods => {
                                                    return (!pricePeriods.isLoading && pricePeriods.value) ? 
                                                        <CalendarWidget id={props.id} onChange={onDateChange} dates={bookDates} pricingPeriods={pricePeriods.value} minDays={data.value.minimumStay}/>
                                                        :
                                                        <Loading />
                                                    }}
                                                </FirestoreDocument>
                                            </div>
                                        </Col>
                                    </Row>
                                    
                                    <FirestoreDocument path={`/Descriptions/${props.id}`}>
                                            {descriptions => {
                                                    return (!descriptions.isLoading && descriptions.value) ? 
                                                    <>
                                                    {setDescriptionsLoading(false)}
                                                    {handleName(descriptions.value[lang]?.name || descriptions.value.en_US.name)}
                                                    {handleSummary(descriptions.value[lang]?.summary || descriptions.value.en_US.summary)}
                                                    {(descriptions.value[lang]?.space || descriptions.value.en_US.space) ?
                                                    <Row>
                                                        <Col xs={12} md={9}>
                                                            <hr />
                                                                <div id="space" data-title={t("Space")} className="prop-page-section">
                                                                    <h2>{t("Space")}</h2>
                                                                    <br />
                                                                    {descriptions.value[lang]?.space || descriptions.value.en_US.space}
                                                                    <br />
                                                                    {matterportURL && 
                                                                    <iframe width="100%" title="Matterport" height="480" src={matterportURL} frameborder="0" allowfullscreen allow="xr-spatial-tracking">
                                                                    </iframe>
                                                                    }
                                                                </div>
                                                        </Col>
                                                    </Row>
                                                    :
                                                    <Row>
                                                        <Col>       
                                                            <div className="placeholder-box blink" style={{height:"400px"}}>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    }
                                                    { (descriptions.value[lang]?.neighborhood || descriptions.value.en_US.neighborhood) ? 
                                                    <Row>
                                                        <Col xs={12} md={9}>
                                                            <hr />
                                                                <div id="neighborhood" data-title={t("Neighborhood")} className="prop-page-section">
                                                                <div className={(descriptions.value[lang]?.neighborhood.length>400 || descriptions.value.en_US.neighborhood.length>400) ? `prop-description-box ${showNeighborhoodReadMore ? 'show' : ''}`: undefined}>
                                                                    <h2>{t("Neighborhood")}</h2>
                                                                    <br />
                                                                    {descriptions.value[lang]?.neighborhood.substring(0,400) || descriptions.value.en_US.neighborhood.substring(0,400)}
                                                                    {showNeighborhoodReadMore && <span id="more">
                                                                        {descriptions.value[lang]?.neighborhood.substring(400) || descriptions.value.en_US.neighborhood.substring(400)}
                                                                        <br />
                                                                        <br />
                                                                        <p>{t("Find out more about the Algarve")} <Link to="/location/algarve"><span className="orangeText hover-highlight">{t("here")}...</span></Link></p>
                                                                        </span>}
                                                                    </div>
                                                                    <br />
                                                                    <br />
                                                                    {(descriptions.value[lang]?.neighborhood.length>400 || descriptions.value.en_US.neighborhood.length>400) && <button className="btn" type="" onClick={()=>setShowNeighborhoodReadMore(!showNeighborhoodReadMore)}>{showNeighborhoodReadMore?<>Less...</>:<p>{t("Read more")}...</p>}</button>}
                                                                    <br />
                                                                </div>
                                                        </Col>
                                                    </Row>
                                                    :
                                                    <Row>
                                                        <Col>       
                                                            <div className="placeholder-box blink" style={{height:"400px"}}>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    }
                                                    <br />
                                                    { (descriptions.value[lang]?.transit || descriptions.value.en_US.transit) ? 
                                                    <Row>
                                                        <hr />
                                                        <Col xs={12} md={travelDistances.display? 5 : 9}>
                                                                <div id="gettingAround" data-title={t("Getting Around")} className="prop-page-section">
                                                                <div className={(descriptions.value[lang]?.transit.length>400 || descriptions.value.en_US.transit.length>400) ? `prop-description-box ${showTransitReadMore ? 'show' : ''}`: undefined}>
                                                                    <h2>{t("Getting Around")}</h2>
                                                                    <br />
                                                                    {descriptions.value[lang]?.transit.substring(0,400) || descriptions.value.en_US.transit.substring(0,400)}
                                                                    {showTransitReadMore && <span id="more">
                                                                        {descriptions.value[lang]?.transit.substring(400) || descriptions.value.en_US.transit.substring(400)}
                                                                        </span>}
                                                                    </div>
                                                                    <br />
                                                                    <br />
                                                                    {(descriptions.value[lang]?.transit.length>400 || descriptions.value.en_US.transit.length>400) && <button className="btn" type="" onClick={()=>setShowTransitReadMore(!showTransitReadMore)}>{showTransitReadMore?<>Less...</>:<p>{t("Read more")}...</p>}</button>}
                                                                    <br />
                                                                </div>
                                                        </Col>
                                                        {travelDistances.display && 
                                                        <Col xs={12} md={4}>
                                                                <div className="keyDistances">
                                                                    <h3>{t("Key Distances")}</h3>
                                                                    <hr />
                                                                    <div>
                                                                        <ul>
                                                                            {travelDistances.Town && <li>
                                                                            <FontAwesomeIcon icon={faBuilding} style={{margin:"auto"}}/> {t("Town")}:  {travelDistances.Town}
                                                                            </li>}
                                                                            {travelDistances.Beach && <li>
                                                                            <FontAwesomeIcon icon={faUmbrellaBeach} style={{margin:"auto"}}/> {t("Beach")}:  {travelDistances.Beach}
                                                                            </li>}
                                                                            {travelDistances.Golf && <li>
                                                                            <FontAwesomeIcon icon={faGolfBall} style={{margin:"auto"}}/> {t("Golf")}:  {travelDistances.Golf}
                                                                            </li>}
                                                                            {travelDistances.Airport && <li>
                                                                            <FontAwesomeIcon icon={faPlaneDeparture} style={{margin:"auto"}}/> {t("Airport")}:  {travelDistances.Airport}
                                                                            </li>}
                                                                            {travelDistances.Market && <li>
                                                                <FontAwesomeIcon icon={faShoppingCart} style={{margin:"auto"}}/> {t("Supermarket")}:  {travelDistances.Market}
                                                                </li>}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                        </Col>
                                                        }
                                                        
                                                    </Row>
                                                    :
                                                    <Row>
                                                        <Col>       
                                                            <div className="placeholder-box blink" style={{height:"400px"}}>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    }
                                                    {reviews && reviews.length>0 && 
                                                    <Row>
                                                        <Col xs={12} md={9}>
                                                            <hr />
                                                            <div id="reviews" data-title={t("Reviews")} className="prop-page-section">
                                                                <div style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between"}}><h2>{t("Reviews")}</h2> <div style={{display: "flex"}}><small style={{margin:"auto", display: "flex"}}>{t("Average Rating")}: {avgRating} <BsStarFill className="review-star" style={{margin: "auto"}}/></small></div></div>
                                                                <br />
                                                                <Reviews reviews={reviews}/>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    }
                                                    {(descriptions.value[lang]?.notes || descriptions.value.en_US.notes) ? 
                                                    <Row>
                                                        <Col xs={12} md={9}>
                                                            <hr />
                                                                <div id="notes" data-title={t("Notes")} className="prop-page-section">
                                                                    <div className={(descriptions.value[lang]?.notes.length>400 || descriptions.value.en_US.notes.length>400) ? `prop-description-box ${showNotesReadMore ? 'show' : ''}` : undefined}>
                                                                    <h2>{t("Notes")}</h2>
                                                                    <br />
                                                                    {(descriptions.value[lang]?.notes.substring(0,400) || descriptions.value.en_US.notes.substring(0,400))}
                                                                    {showNotesReadMore && <span id="more">{descriptions.value[lang]?.notes.substring(400) || descriptions.value.en_US.notes.substring(400)}</span>}
                                                                    </div>
                                                                    <br />
                                                                    <br />
                                                                    {(descriptions.value[lang]?.notes.length>400 || descriptions.value.en_US.notes.length>400 ) && <button className="btn" type="" onClick={()=>setShowNotesReadMore(!showNotesReadMore)}>{showNotesReadMore?<>Less...</>:<p>{t("Read more")}...</p>}</button>}
                                                                    <br />
                                                                </div>
                                                        </Col>
                                                    </Row>
                                                    :
                                                    <Row>
                                                        <Col>       
                                                            <div className="placeholder-box blink" style={{height:"400px"}}>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    }
                                                    {(descriptions.value[lang]?.access || descriptions.value.en_US.access) ? 
                                                    <Row>
                                                        <Col xs={12} md={9}>
                                                            <hr />
                                                                <div id="access" data-title={t("Your Arrival")} className="prop-page-section">
                                                                    <div className={(descriptions.value[lang]?.access.length>400 || descriptions.value.en_US.access.length>400) ? `prop-description-box ${showAccessReadMore ? 'show' : ''}` : undefined}>
                                                                    <h2>{t("Your Arrival")}</h2>
                                                                    <br />
                                                                    {descriptions.value[lang]?.access.substring(0,400) || descriptions.value.en_US.access.substring(0,400)}
                                                                    {showAccessReadMore && <span id="more">{descriptions.value[lang]?.access.substring(400) || descriptions.value.en_US.access.substring(400)}</span>}
                                                                    </div>
                                                                    <br />
                                                                    <br />
                                                                    {(descriptions.value[lang]?.access.length>400 || descriptions.value.en_US.access.length>400 )&& <button className="btn" type="" onClick={()=>setShowAccessReadMore(!showAccessReadMore)}>{showAccessReadMore?<>Less...</>:<p>{t("Read more")}...</p>}</button>}
                                                                    <br />
                                                                </div>
                                                        </Col>
                                                    </Row>
                                                    :
                                                    <Row>
                                                        <Col>       
                                                            <div className="placeholder-box blink" style={{height:"400px"}}>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    }
                                                    {(descriptions.value[lang]?.interaction || descriptions.value.en_US.interaction ) ? 
                                                    <Row>
                                                        <Col xs={12} md={9}>
                                                            <hr />
                                                                <div id="interaction">
                                                                <div className={(descriptions.value[lang]?.interaction.length>400 || descriptions.value.en_US.interaction.length>400) ? `prop-description-box ${showInteractionReadMore ? 'show' : ''}` : undefined}>
                                                                    <h2>{t("During Your Stay")}</h2>
                                                                    <br />
                                                                    {descriptions.value[lang]?.interaction.substring(0,400) || descriptions.value.en_US.interaction.substring(0,400)}
                                                                    {showInteractionReadMore && <span id="more">{descriptions.value[lang]?.interaction.substring(400) || descriptions.value.en_US.interaction.substring(400)}</span>}
                                                                </div>
                                                                    <br />
                                                                    <br />
                                                                    {(descriptions.value[lang]?.interaction.length>400 || descriptions.value.en_US.interaction.length>400 ) && <button className="btn" type="" onClick={()=>setShowInteractionReadMore(!showInteractionReadMore)}>{showInteractionReadMore?<>Less...</>:<p>{t("Read more")}...</p>}</button>}
                                                                    <br />
                                                                </div>
                                                        </Col>
                                                    </Row>
                                                    :
                                                    <Row>
                                                        <Col>       
                                                            <div className="placeholder-box blink" style={{height:"400px"}}>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    }
                                                    </> 
                                                : <Row>
                                                        <Col>       
                                                            <div className="placeholder-box blink" style={{height:"800px"}}>
                                                            </div>
                                                        </Col>
                                                    </Row> 
                                                }}
                                    </FirestoreDocument>

                                    </Col>
                                        <Col xs={12} md={3} style={{display: "flex", alignItems: "flex-start", minWidth: "320px"}}>
                                            <StickyBox offsetTop={50}>
                                                <div className="tabs-container">
                                                <Tabs defaultActiveKey="propSpecs" id="keyDetails">
                                                    <Tab eventKey="propSpecs" title={t("Property Specs.")} tabClassName="orangeText">
                                                    <ul>
                                                        <li>{t("Licence")}: <span style={{float: "right"}}>{data.value.rentalLicenseNumber}</span></li>
                                                        <li>{t("Type")}: <span style={{float: "right"}}>{data.value.type}</span></li>
                                                        <li>{t("Size")}: <span style={{float: "right"}}>{data.value.areaSize} m<sup>2</sup></span></li>
                                                        <li>{t("Location")}: <span style={{float: "right"}}>{data.value.city}</span></li>
                                                        {poolDimensions && 
                                                        <li><FontAwesomeIcon icon={faSwimmingPool} style={{margin:"auto"}}/> {t("Pool Size")}: <span style={{float: "right"}}>{poolDimensions}</span></li>}
                                                    </ul>
                                                    </Tab>
                                                    <Tab eventKey="keyDistances" title={t("Key Distances")} className="keyDistances" tabClassName="orangeText keyDistances">
                                                        <div>
                                                            <ul>
                                                                {travelDistances.Town && <li >
                                                                <FontAwesomeIcon icon={faBuilding} style={{margin:"auto"}}/> {t("Town")}:  {travelDistances.Town}
                                                                </li>}
                                                                {travelDistances.Beach && <li >
                                                                <FontAwesomeIcon icon={faUmbrellaBeach} style={{margin:"auto"}}/> {t("Beach")}:  {travelDistances.Beach}
                                                                </li>}
                                                                {travelDistances.Golf && <li >
                                                                <FontAwesomeIcon icon={faGolfBall} style={{margin:"auto"}}/> {t("Golf")}:  {travelDistances.Golf}
                                                                </li>}
                                                                {travelDistances.Airport && <li >
                                                                <FontAwesomeIcon icon={faPlaneDeparture} style={{margin:"auto"}}/> {t("Airport")}:  {travelDistances.Airport}
                                                                </li>}
                                                                {travelDistances.Market && <li >
                                                                <FontAwesomeIcon icon={faShoppingCart} style={{margin:"auto"}}/> {t("Supermarket")}:  {travelDistances.Market}
                                                                </li>}
                                                                {travelDistances.Car && <li className="car-essential-list">
                                                                <FontAwesomeIcon icon={faCar} style={{margin:"auto"}}/>   {travelDistances.Car}
                                                                </li>}
                                                            </ul>
                                                        </div>
                                                    </Tab>
                                                    {data.value.customData?.Winter_Let_Price && data.value.customData?.Winter_Let_Price.length > 0 &&
                                                    <Tab eventKey="winterLets" title="Winter Let Details" tabClassName="orangeText">
                                                        <p>{t("Winter Let Discount Paragraph pre price")}<b>{data.value.customData?.Winter_Let_Price}</b>{t("Winter Let Discount Paragraph post price")}
                                                            <br />
                                                            <small>
                                                            {t("Winter Let Discount Paragraph asterisk")}</small>
                                                        </p>
                                                    </Tab>
                                                    }
                                                </Tabs>
                                                </div>
                                                <br />
                                                <BedBathPax bedrooms={data.value.bedrooms} bathrooms={data.value.bathrooms} baseGuests={data.value.baseGuests} color="rgba(0,0,0)"/>
                                                <hr />
                                                {smartaOpinion &&
                                                <div>
                                                    <div className="thought bubble">
                                                        <h4>{t("Smartavillas' Opinion")}:</h4>
                                                        <br />
                                                        <p>
                                                           {smartaOpinion} 
                                                        </p>
                                                    </div>
                                                </div> 
                                                }
                                                <hr />
                                                {propId !== "590fc0c2-b40c-4cf4-b2e2-d67a8c3ae9d4" &&
                                                <BookingWidget id={props.id} dateRange={bookDates}/>
                                                }
                                                <br />
                                                <div role="button" className="submit-search-btn" onClick={()=> handleEnquiryShow()} onKeyDown={()=> handleEnquiryShow()} tabindex="0">
                                                    <a href="">
                                                        <svg className="icon-arrow before">
                                                            <use xlinkHref="#arrow" />
                                                        </svg>
                                                        <span className="label">{t("Enquire about this property")}</span>
                                                        <svg className="icon-arrow after">
                                                            <use xlinkHref="#arrow"/>
                                                        </svg>
                                                    </a>
                                                    <svg style={{display: "none"}}>
                                                    <defs>
                                                        <symbol id="arrow" viewBox="0 0 35 15">
                                                            <title>Arrow</title>
                                                            <path d="M27.172 5L25 2.828 27.828 0 34.9 7.071l-7.07 7.071L25 11.314 27.314 9H0V5h27.172z "/>
                                                        </symbol>
                                                    </defs>
                                                    </svg>
                                                </div>
                                                <br />
                                                <div>
                                                <center><a href="/about/booking-terms-conditions" target="_blank"><FontAwesomeIcon icon={faFileContract} style={{margin:"auto"}} /> <span style={{textDecoration:"underline", cursor:"pointer"}}>{t("Booking Terms & Conditions")}</span> <FontAwesomeIcon icon={faExternalLinkAlt} style={{margin:"auto"}} /></a></center>
                                                </div>
                                                {damageWaiver &&
                                                <div style={{paddingBottom:"20px"}}> 
                                                    <br />
                                                    <center><FontAwesomeIcon icon={faExclamationCircle} style={{margin:"auto"}} /> <span role="button" tabindex="0" aria-label="Damage Waiver" style={{textDecoration:"underline", cursor:"pointer"}} onClick={()=>setWaiverOpen(!waiverOpen)} onKeyDown={(e)=>{if(e.key==="Enter"){setWaiverOpen(!waiverOpen)}}}>{t("Security Deposit/Damage Waivers")}</span> <FontAwesomeIcon className={`expand-chevron ${waiverOpen ? "visible" : ""}`} icon={faChevronDown} style={{margin:"auto"}} /></center>
                                                    <Collapse in ={waiverOpen}>
                                                        <div>
                                                            <p>
                                                                {damageWaiver}
                                                            </p>
                                                        </div>
                                                    </Collapse>
                                                </div>
                                                }
                                            </StickyBox>
                                        </Col>
                                    </Row>
                                    </section>
                                    </Container>
                                    <Container fluid style={{paddingLeft:"0", paddingRight:"0"}}>
                                    <hr />
                                    <div id="location" data-title={t("Location")} className="prop-page-section">
                                        <Container>
                                        <h2>{t("Location")}</h2>
                                        <br />
                                        </Container>
                                        <GoogleMapComponent isMarkerShown="true" lat={data.value.latitude} lng={data.value.longitude} height={"500px"} activities={true} activityCoords={activitiesCoords}/>
                                    </div>
                                    <hr />
                                    <Container style={{textAlign: "center"}}>
                                        <ActivitiesRoll location={data.value.city} property={true} handleActivitiesCoords={handleActivitiesCoords}/>
                                    </Container>
                                </Container>
                            <br />
                            <GalleryModal show={show} handleClose={handleClose} photos={data.value.photos}/>  
                            <EnquiryModal show={enquiryShow} handleClose={handleEnquiryClose} propId={propId} propName={data.value.name} img={data.value.picture}/>
                            </div>
                            <Helmet link={[{rel: "canonical", href: `https://www.smartavillas.com/properties/${propId}`}]}>
                                <title>{propName}</title>
                                <meta name="description" content={data.value.description} />
                            </Helmet>                 
                        </div> : <></>
            }}
        </FirestoreDocument>
</>
)
}

export const PropertyNav = (props) => {

    return(
        <div className="prop-nav" style={{...props.navStyles}}>
            <Container>
                <Link to="/"><img src={logo} alt="Smartavillas logo" style={{height:"30px", width:"30px", marginRight:"10px"}}/></Link><Link to="#about">About</Link> | <Link to="#amenities">Amenities</Link> | <Link to="#calendar">Calendar</Link> | <Link to="#space">Space</Link> | <Link to="#neighborhood">Neighborhood</Link> | <Link to="#gettingAround">Getting Around</Link> | <Link to="#notes">Notes</Link> | <Link to="#location">Location</Link>
                                    
            </Container>
        </div>
    )
} 

const ConnectedPropertyPage = (data) => {

      const [inFavs, setInFavs] = useState(false)

    useEffect(() => {
        let exists = false;
        if(Object.keys(data.properties).indexOf(data.id) !== -1)exists = true;
        setInFavs(exists)
        return () => {
          setInFavs(false)
        }
    }, [data.properties])


    return(
            <PropertyPageTemplate id={data.id} dispatch={data.dispatch} path={data.path} inFavs={inFavs} handlePathChange={() => data.handlePathChange()}/>
    )
}

const PropertyPage = connect(mapStateToProps)(ConnectedPropertyPage)

export default PropertyPage
