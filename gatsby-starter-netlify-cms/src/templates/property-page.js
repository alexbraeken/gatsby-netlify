import React, {useState, useEffect} from 'react';
import { FirestoreDocument } from "@react-firebase/firestore";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import  Tabs  from 'react-bootstrap/Tabs';
import  Tab  from 'react-bootstrap/Tab';
import PropCarousel from '../components/PropCarousel';
import GoogleMapComponent from '../components/GoogleMapComponent';
import { Link } from 'gatsby';
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
import { faBuilding, faUmbrellaBeach, faGolfBall, faPlaneDeparture, faShoppingCart, faCar, faExclamationCircle, faSwimmingPool, faFileContract } from '@fortawesome/free-solid-svg-icons';
import queryString from 'query-string';
import EnquiryModal from '../components/EnquiryModal';
import { Helmet } from 'react-helmet'



export const PropertyPageTemplate = ( props ) =>
{
   const [bookDates, setBookDates] = useState({from:new Date(),
    to: null})
   const [propName, setPropName] = useState(null)
   const [propId, setPropId] = useState(null)
   const [show, setShow] = useState(false);
   const [enquiryShow, setEnquiryShow] = useState(false);
   const [showAllAmenities, setShowAllAemnities] = useState(false)
   const [showNotesReadMore, setShowNotesReadMore] = useState(false)
   const [amenitiesLength, setAmenitiesLength] = useState(0)
   const [smartaOpinion, setSmartaOpinion] = useState(null)
   const [poolDimensions, setPoolDimensions] = useState(null)
   const [damageWaiver, setDamageWaiver] = useState(null)
   const [waiverOpen, setWaiverOpen] = useState(false)
   const [travelDistances, setTravelDistances] = useState({display: false, Town: null, Beach:null, Golf:null, Airport:null, Car:null})
   const [showInteractionReadMore, setShowInteractionReadMore] = useState(false)
   const [showNeighborhoodReadMore, setShowNeighborhoodReadMore] = useState(false)
   const [showTransitReadMore, setShowTransitReadMore] = useState(false)
   const [dates, setDates] = useState(null)


    useEffect(() => {
        const path = window.location
        props.handlePathChange(path.href)

        const searchDates = path.search? queryString.parse(path.search) : null;
        console.log(searchDates)
        setBookDates({from: searchDates?.from || null, to: searchDates?.to || null});

        setPropId(props.id)
        if(props.id){
            const uri = `https://api.hostfully.com/v2/customdata?propertyUid=${props.id}`
            fetch(uri, {
            headers:{
            "X-HOSTFULLY-APIKEY": process.env.GATSBY_HOSTFULLY_API_KEY
                }
            })
                    .then(response => {
                        
                        return response.text()
                    })
                    .then(data => {
                    if(JSON.parse(data).length>0){
                        if(JSON.parse(data)[0].text!== undefined){
                            setSmartaOpinion(JSON.parse(data)[0].text)
                        }
                        if(JSON.parse(data)[1].text!== undefined){
                            setPoolDimensions(JSON.parse(data)[1].text)
                        }
                        if(JSON.parse(data)[8].text!== undefined){
                            setDamageWaiver(JSON.parse(data)[8].text)
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
                    }  
                    })
            return () => {
                setSmartaOpinion(null)
                setBookDates({from:new Date(),
                    to: null})
                   setPropName(null)
                   setShow(false);
                   setShowAllAemnities(false)
                   setShowNotesReadMore(false)
                   setAmenitiesLength(0)
                   setPoolDimensions(null)
                   setDamageWaiver(null)
                   setWaiverOpen(false)
                   setTravelDistances({display: false, Town: null, Beach:null, Golf:null, Airport:null, Car:null})
                   setShowInteractionReadMore(false)
                   setShowNeighborhoodReadMore(false)
                   setShowTransitReadMore(false)
            }
        }
    }, [])

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
        to: range.to})
   }

   const handleName = (name) =>{
    setPropName(name)
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
                            <div style={{width:"100%"}}>
                                <PropCarousel firstSlide={data.value.picture} photos={data.value.photos} handleShow={handleShow}/>
                                <div className="prdtitlesolo productNameTitle">
                                <Container>
                                    <Col>
                                        <Row>     
                                        <h1 style={{margin:"0",fontSize:"inherit",padding:"0",fontWeight:"inherit", width:"100%"}}>
                                            <Col>
                                                <Row>
                                                    <span className="prdname">{propName}</span>
                                                </Row>
                                                <hr style={{width:"100px", margin:"5px 0 5px -15px"}}/>
                                                <Row>
                                                    <div className="flag under">
                                                        <span className="prc">From {data.value.baseDailyRate} €</span>
                                                        <span className="mth"> / Day</span>
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
                                </Container>
                            </div>
                                <Container style={{paddingTop:"30px"}}>
                                    <section id="prop-summary">
                                    <div id="prop-nav">
                                        <Link to="#about">About</Link> | <Link to="#amenities">Amenities</Link> | <Link to="#calendar">Calendar</Link> | <Link to="#space">Space</Link> | <Link to="#neighborhood">Neighborhood</Link> | <Link to="#gettingAround">Getting Around</Link> | <Link to="#notes">Notes</Link> | <Link to="#location">Location</Link>
                                    </div>
                                    <br />
                                    <Row>
                                    <Col>
                                        <Row id="about">
                                            <Col xs={12} md={9}>
                                                <h2>About</h2>
                                                <br />
                                                <p>
                                                {data.value.description}
                                                </p>
                                            </Col>
                                        </Row>
                                    <Row>
                                        <Col >
                                            <br/>
                                            <hr />
                                            <FirestoreDocument path={`/amenities/${props.id}`}>
                                                {data => {
                                                    return (!data.isLoading && data.value) ? 
                                                    <div id="amenities">
                                                        <h2>Amenities</h2>
                                                        <br />
                                                        <div className="amenities-list">
                                                        {sortAmenities(Object.entries(data.value)).map((amen, index) => {
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
                                                        <button className="btn" type="" onClick={()=>handleShowAmenities()}>{showAllAmenities?<>Less...</>:<p>Show all {amenitiesLength-1}...</p>}</button>
                                                    </div> : "Loading" 
                                                }}
                                            </FirestoreDocument>
                                        </Col>
                                    </Row>
                                    
                                    
                                    <Row>
                                        <Col xs={12} md={9}>
                                            <hr />
                                            <div id="calendar">
                                                <h2>Calendar</h2>
                                                <br />
                                                <CalendarWidget id={props.id} onChange={onDateChange} dates={bookDates}/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <FirestoreDocument path={`/Descriptions/${props.id}`}>
                                            {data => {
                                                    return (!data.isLoading && data.value) ? 
                                                    <>
                                                    {handleName(data.value.en_US.name)}
                                                    {data.value.en_US.space &&
                                                    <Row>
                                                        <Col xs={12} md={9}>
                                                            <hr />
                                                                <div id="space">
                                                                    <h2>Space</h2>
                                                                    <br />
                                                                    {data.value.en_US.space}
                                                                    <br />
                                                                </div>
                                                        </Col>
                                                    </Row>
                                                    }
                                                    { data.value.en_US.neighborhood && 
                                                    <Row>
                                                        <Col xs={12} md={9}>
                                                            <hr />
                                                                <div id="neighborhood">
                                                                <div className={data.value.en_US.neighborhood.length>400 ? `prop-description-box ${showNeighborhoodReadMore ? 'show' : ''}`: undefined}>
                                                                    <h2>Neighborhood</h2>
                                                                    <br />
                                                                    {data.value.en_US.neighborhood.substring(0,400)}
                                                                    {showNeighborhoodReadMore && <span id="more">
                                                                        {data.value.en_US.neighborhood.substring(400)}
                                                                        <br />
                                                                        <br />
                                                                        <p>Find out more about the Algarve <Link to="/location/algarve"><span className="orangeText hover-highlight">here...</span></Link></p>
                                                                        </span>}
                                                                    </div>
                                                                    <br />
                                                                    <br />
                                                                    {data.value.en_US.neighborhood.length>400 && <button className="btn" type="" onClick={()=>setShowNeighborhoodReadMore(!showNeighborhoodReadMore)}>{showNeighborhoodReadMore?<>Less...</>:<p>Read More...</p>}</button>}
                                                                    <br />
                                                                </div>
                                                        </Col>
                                                    </Row>
                                                    }
                                                    <br />
                                                    { data.value.en_US.transit && 
                                                    <Row>
                                                        <hr />
                                                        <Col xs={12} md={travelDistances.display? 5 : 9}>
                                                                <div id="gettingAround">
                                                                <div className={data.value.en_US.transit.length>400 ? `prop-description-box ${showTransitReadMore ? 'show' : ''}`: undefined}>
                                                                    <h2>Getting Around</h2>
                                                                    <br />
                                                                    {data.value.en_US.transit.substring(0,400)}
                                                                    {showTransitReadMore && <span id="more">
                                                                        {data.value.en_US.transit.substring(400)}
                                                                        </span>}
                                                                    </div>
                                                                    <br />
                                                                    <br />
                                                                    {data.value.en_US.transit.length>400 && <button className="btn" type="" onClick={()=>setShowTransitReadMore(!showTransitReadMore)}>{showTransitReadMore?<>Less...</>:<p>Read More...</p>}</button>}
                                                                    <br />
                                                                </div>
                                                        </Col>
                                                        {travelDistances.display && 
                                                        <Col xs={12} md={4}>
                                                                <div className="keyDistances">
                                                                    <h3>Key Distances</h3>
                                                                    <hr />
                                                                    <div>
                                                                        <ul>
                                                                            {travelDistances.Town && <li>
                                                                            <FontAwesomeIcon icon={faBuilding} style={{margin:"auto"}}/> Town:  {travelDistances.Town}
                                                                            </li>}
                                                                            {travelDistances.Beach && <li>
                                                                            <FontAwesomeIcon icon={faUmbrellaBeach} style={{margin:"auto"}}/> Beach:  {travelDistances.Beach}
                                                                            </li>}
                                                                            {travelDistances.Golf && <li>
                                                                            <FontAwesomeIcon icon={faGolfBall} style={{margin:"auto"}}/> Golf:  {travelDistances.Golf}
                                                                            </li>}
                                                                            {travelDistances.Airport && <li>
                                                                            <FontAwesomeIcon icon={faPlaneDeparture} style={{margin:"auto"}}/> Airport:  {travelDistances.Airport}
                                                                            </li>}
                                                                            {travelDistances.Market && <li>
                                                                <FontAwesomeIcon icon={faShoppingCart} style={{margin:"auto"}}/> Supermarket:  {travelDistances.Market}
                                                                </li>}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                        </Col>
                                                        }
                                                        
                                                    </Row>
                                                    }
                                                    {data.value.en_US.notes && 
                                                    <Row>
                                                        <Col xs={12} md={9}>
                                                            <hr />
                                                                <div id="notes">
                                                                    <div className={data.value.en_US.notes.length>400 ? `prop-description-box ${showNotesReadMore ? 'show' : ''}` : undefined}>
                                                                    <h2>Notes</h2>
                                                                    <br />
                                                                    {data.value.en_US.notes.substring(0,400)}
                                                                    {showNotesReadMore && <span id="more">{data.value.en_US.notes.substring(400)}</span>}
                                                                    </div>
                                                                    <br />
                                                                    <br />
                                                                    {data.value.en_US.notes.length>400 && <button className="btn" type="" onClick={()=>setShowNotesReadMore(!showNotesReadMore)}>{showNotesReadMore?<>Less...</>:<p>Read More...</p>}</button>}
                                                                    <br />
                                                                </div>
                                                        </Col>
                                                    </Row>}
                                                    {data.value.en_US.interaction && 
                                                    <Row>
                                                        <Col xs={12} md={9}>
                                                            <hr />
                                                                <div id="interaction">
                                                                <div className={data.value.en_US.interaction.length>400 ? `prop-description-box ${showInteractionReadMore ? 'show' : ''}` : undefined}>
                                                                    <h2>Interaction</h2>
                                                                    <br />
                                                                    {data.value.en_US.interaction.substring(0,400)}
                                                                    {showInteractionReadMore && <span id="more">{data.value.en_US.interaction.substring(400)}</span>}
                                                                </div>
                                                                    <br />
                                                                    <br />
                                                                    {data.value.en_US.interaction.length>400 && <button className="btn" type="" onClick={()=>setShowInteractionReadMore(!showInteractionReadMore)}>{showInteractionReadMore?<>Less...</>:<p>Read More...</p>}</button>}
                                                                    <br />
                                                                </div>
                                                        </Col>
                                                    </Row>}
                                                    </> 
                                                : <></> 
                                                }}
                                    </FirestoreDocument>

                                    </Col>
                                        <Col xs={12} md={3} style={{display: "flex", alignItems: "flex-start"}}>
                                            <StickyBox offsetTop={50}>
                                                <div className="tabs-container">
                                                <Tabs defaultActiveKey="propSpecs" id="keyDetails">
                                                    <Tab eventKey="propSpecs" title="Property Specs." tabClassName="orangeText">
                                                    <ul>
                                                        <li>License: <span style={{float: "right"}}>{data.value.rentalLicenseNumber}</span></li>
                                                        <li>Type: <span style={{float: "right"}}>{data.value.type}</span></li>
                                                        <li>Size: <span style={{float: "right"}}>{data.value.areaSize} m<sup>2</sup></span></li>
                                                        <li>Location: <span style={{float: "right"}}>{data.value.city}</span></li>
                                                        {poolDimensions && 
                                                        <li><FontAwesomeIcon icon={faSwimmingPool} style={{margin:"auto"}}/> Pool Size: <span style={{float: "right"}}>{poolDimensions}</span></li>}
                                                    </ul>
                                                    </Tab>
                                                    <Tab eventKey="keyDistances" title="Key Distances" className="keyDistances" tabClassName="orangeText keyDistances">
                                                        <div>
                                                            <ul>
                                                                {travelDistances.Town && <li >
                                                                <FontAwesomeIcon icon={faBuilding} style={{margin:"auto"}}/> Town:  {travelDistances.Town}
                                                                </li>}
                                                                {travelDistances.Beach && <li >
                                                                <FontAwesomeIcon icon={faUmbrellaBeach} style={{margin:"auto"}}/> Beach:  {travelDistances.Beach}
                                                                </li>}
                                                                {travelDistances.Golf && <li >
                                                                <FontAwesomeIcon icon={faGolfBall} style={{margin:"auto"}}/> Golf:  {travelDistances.Golf}
                                                                </li>}
                                                                {travelDistances.Airport && <li >
                                                                <FontAwesomeIcon icon={faPlaneDeparture} style={{margin:"auto"}}/> Airport:  {travelDistances.Airport}
                                                                </li>}
                                                                {travelDistances.Market && <li >
                                                                <FontAwesomeIcon icon={faShoppingCart} style={{margin:"auto"}}/> Supermarket:  {travelDistances.Market}
                                                                </li>}
                                                                {travelDistances.Car && <li className="car-essential-list">
                                                                <FontAwesomeIcon icon={faCar} style={{margin:"auto"}}/>   {travelDistances.Car}
                                                                </li>}
                                                            </ul>
                                                        </div>
                                                    </Tab>
                                                </Tabs>
                                                </div>
                                                <br />
                                                <BedBathPax bedrooms={data.value.bedrooms} bathrooms={data.value.bathrooms} baseGuests={data.value.baseGuests} color="rgba(0,0,0)"/>
                                                <hr />
                                                {smartaOpinion &&
                                                <div>
                                                    <div className="thought bubble">
                                                        <h4>Smartavillas' Opinion:</h4>
                                                        <br />
                                                        <p>
                                                           {smartaOpinion} 
                                                        </p>
                                                    </div>
                                                </div> 
                                                }
                                                <hr />
                                                <BookingWidget id={props.id} dateRange={bookDates}/>
                                                <br />
                                                <div className="submit-search-btn" onClick={()=> handleEnquiryShow()}>
                                                    <a>
                                                        <svg className="icon-arrow before">
                                                            <use xlinkHref="#arrow" />
                                                        </svg>
                                                        <span className="label">Enquire about this property</span>
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
                                                <center><a href="/about/booking-terms-conditions"><FontAwesomeIcon icon={faFileContract} style={{margin:"auto"}} /> <span style={{textDecoration:"underline", cursor:"pointer"}}>Terms & Conditions</span></a></center>
                                                </div>
                                                {damageWaiver &&
                                                <div style={{paddingBottom:"20px"}}> 
                                                    <br />
                                                    <center><FontAwesomeIcon icon={faExclamationCircle} style={{margin:"auto"}} /> <span style={{textDecoration:"underline", cursor:"pointer"}} onClick={()=>setWaiverOpen(!waiverOpen)}>Security Deposit/Damage Waivers</span></center>
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
                                    <div id="location">
                                        <Container>
                                        <h2>Location</h2>
                                        <br />
                                        </Container>
                                        <GoogleMapComponent isMarkerShown="true" lat={data.value.latitude} lng={data.value.longitude} height={"500px"}/>
                                    </div>
                                    <hr />
                                    <Container style={{textAlign: "center"}}>
                                        <ActivitiesRoll location={data.value.city}/>
                                    </Container>
                                </Container>
                            <br />
                            <GalleryModal show={show} handleClose={handleClose} photos={data.value.photos}/>  
                            <EnquiryModal show={enquiryShow} handleClose={handleEnquiryClose} propId={propId} propName={data.value.name} img={data.value.picture}/>
                            </div>
                            <Helmet>
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
                <Link to="/"><img src={logo} style={{height:"30px", width:"30px", marginRight:"10px"}}/></Link><Link to="#about">About</Link> | <Link to="#amenities">Amenities</Link> | <Link to="#calendar">Calendar</Link> | <Link to="#space">Space</Link> | <Link to="#neighborhood">Neighborhood</Link> | <Link to="#gettingAround">Getting Around</Link> | <Link to="#notes">Notes</Link> | <Link to="#location">Location</Link>
                                    
            </Container>
        </div>
    )
} 

const PropertyPage = (data) => {

    const [propNav, setPropNav] = useState(false);
    const [headerStyle, setHeaderStyle] = useState({
        transition: 'all 300ms ease-in',
        transform: 'translate(0, -200%)'
      })

    useEffect(() => {
        return () => {
            setPropNav(false)
            setHeaderStyle({
                transition: 'all 300ms ease-in',
                transform: 'translate(0, -200%)'
              })
        }
    }, [])

    useScrollPosition(({ prevPos, currPos }) => {
        const propSum = document.getElementById("prop-summary")
        let propSumOffset;
        if(propSum)propSumOffset = propSum.getBoundingClientRect().top;
        const isShow = -100 > propSumOffset;
        if (isShow !== propNav) setPropNav(isShow)

        const shouldBeStyle = {
            visibility: isShow ? 'visible' : 'hidden',
            transition: `all 300ms ${isShow ? 'ease-in' : 'ease-out'}`,
            transform: isShow ? 'none' : 'translate(0, -200%)',
            zIndex: 2
          }
      
        if (JSON.stringify(shouldBeStyle) !== JSON.stringify(headerStyle)) 
            return setHeaderStyle(shouldBeStyle)
      }, [propNav, headerStyle])

      useEffect(() => {
        setHeaderStyle({
            transition: 'all 300ms ease-in',
            transform: 'translate(0, -200%)'
          })
          
      }, [propNav])

    return(
            <PropertyPageTemplate id={data.id} handlePathChange={() => data.handlePathChange()}/>
    )
}

export default PropertyPage

