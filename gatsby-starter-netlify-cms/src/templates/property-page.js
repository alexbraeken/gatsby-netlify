import React, {useState, useEffect} from 'react';
import { FirestoreDocument } from "@react-firebase/firestore";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropCarousel from '../components/PropCarousel';
import GoogleMapComponent from '../components/GoogleMapComponent'
import { Link } from 'gatsby'
import Loading from '../components/Loading'
import BookingWidget from '../components/BookingWidget'
import CalendarWidget from '../components/CalendarWidget'
import StickyBox from "react-sticky-box"
import GalleryModal from '../components/GalleryModal'
import Amenity from '../components/Amenities'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import logo from '../img/logo.svg'
import { ButtonGroup } from '@material-ui/core'
import BedBathPax from '../components/BedBathPax'
import ActivitiesRoll from '../components/ActivitiesRoll'

export const PropertyPageTemplate = ( props ) =>
{
   const [bookDates, setBookDates] = useState({})
   const [propName, setPropName] = useState(null)
   const [show, setShow] = useState(false);
   const [showAllAmenities, setShowAllAemnities] = useState(false)
   const [showNotesReadMore, setShowNotesReadMore] = useState(false)
   const [amenitiesLength, setAmenitiesLength] = useState(0)
   const [smartaOpinion, setSmartaOpinion] = useState(null)

    useEffect(() => {
        
        const propId = (document.location.pathname.split('/')[2])
        console.log(propId)
        if(propId){
 
            const uri = `https://api.hostfully.com/v2/customdata?propertyUid=${propId}`
            
            console.log("fetching opinion ids: " + uri)
            fetch(uri, {
            headers:{
            "X-HOSTFULLY-APIKEY": "PEpXtOzoOAZGrYC8"
                }
            })
                    .then(response => {
                        
                        return response.text()
                    })
                    .then(data => {
                    console.log(JSON.parse(data));
                    if(JSON.parse(data).length>0 && JSON.parse(data)[0].text!== undefined){
                        setSmartaOpinion(JSON.parse(data)[0].text)
                    }
                    })
            return () => {
                setSmartaOpinion(null)
            }
        }
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
 (a[0] !== "pool" && b[0] === "pool")? 1 :
 (b[0] !== "pool" && a[0] === "pool")? -1 :
 (a[0] !== "hotTub" && b[0] === "hotTub")? 1 :
 (b[0] !== "hotTub" && a[0] === "hotTub")? -1 :
 (a[0] !== "airConditioning" && b[0] === "airConditioning")? 1 :
 (b[0] !== "airConditioning" && a[0] === "airConditioning")? -1 : 
 (a[0] !== "dishwasher" && b[0] === "dishwasher")? 1 :
 (b[0] !== "dishwasher" && a[0] === "dishwasher")? -1 :
 (a[0] !== "washer" && b[0] === "washer")? 1 :
 (b[0] !== "washer" && a[0] === "washer")? -1 :
 (a[0] !== "hairDryer" && b[0] === "hairDryer")? 1 :
 (b[0] !== "hairDryer" && a[0] === "hairDryer")? -1 :
 (a[0] !== "linens" && b[0] === "linens")? 1 :
 (b[0] !== "linens" && a[0] === "linens")? -1 :
 (a[0] !== "towels" && b[0] === "towels")? 1 :
 (b[0] !== "towels" && a[0] === "towels")? -1 :
 (a[0] !== "balconyTerrasse" && b[0] === "balconyTerrasse")? 1 :
 (b[0] !== "balconyTerrasse" && a[0] === "balconyTerrasse")? -1 : 
 (a[0] !== "deckPatio" && b[0] === "deckPatio")? 1 :
 (b[0] !== "deckPatio" && a[0] === "deckPatio")? -1 : 
 (a[0] !== "garden" && b[0] === "garden")? 1 :
 (b[0] !== "garden" && a[0] === "garden")? -1 :    
 (a[0] !== "TV" && b[0] === "TV") ? 1 :
 (b[0] !== "TV" && a[0] === "TV" )? -1 : 
 (a[0] !== "internetWifi" && b[0] === "internetWifi")? 1 :
 (b[0] !== "internetWifi" && a[0] === "internetWifi")? -1 :0)
}

    return (
        <>
        <FirestoreDocument path={`/Properties/${props.id}`}>
            {data => {
                return (!data.isLoading && data.value) ? 
                        <div style={{display:"flex", flexWrap:"wrap"}}>
                            <div className="prdtitlesolo productNameTitle">
                                <Container>
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
                                </Container>
                            </div>
                            <div style={{width:"100%"}}>
                                <PropCarousel firstSlide={data.value.picture} photos={data.value.photos} handleShow={handleShow}/>
                                <br />
                                <Container>
                                    <section id="prop-summary">
                                    <div id="prop-nav">
                                        <Link to="#about">About</Link> | <Link to="#amenities">Amenities</Link> | <Link to="#calendar">Calendar</Link> | <Link to="#space">Space</Link> | <Link to="#neighborhood">Neighborhood</Link> | <Link to="#notes">Notes</Link> | <Link to="#location">Location</Link>
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
                                                                if(amen[0])setAmenitiesLength(amen[1]);
                                                                return (amen[1] && amen[0] !== "__id" && amen[0] !== "length" && index < 10) ? 
                                                                <div key={index} className="amenity">
                                                                    <Amenity amenity = {amen[0]} /></div> : null ;
                                                            }      
                                                        })}
                                                        <br />
                                                        </div>
                                                        <br />
                                                        <button className="btn" type="" onClick={()=>setShowAllAemnities(!showAllAmenities)}>{showAllAmenities?<>Less...</>:<p>Show all {amenitiesLength-1}...</p>}</button>
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
                                                <CalendarWidget id={props.id} onChange={onDateChange}/>
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
                                                                    <h2>Neighborhood</h2>
                                                                    <br />
                                                                    {data.value.en_US.neighborhood}
                                                                    <br />
                                                                </div>
                                                        </Col>
                                                    </Row>
                                                    }
                                                    {data.value.en_US.notes && 
                                                    <Row>
                                                        <Col xs={12} md={9}>
                                                            <hr />
                                                                <div id="notes">
                                                                    <h2>Notes</h2>
                                                                    <br />
                                                                    {data.value.en_US.notes.substring(0,400)}
                                                                    {showNotesReadMore && <span id="more">{data.value.en_US.notes.substring(400)}</span>}
                                                                    <br />
                                                                    <button className="btn" type="" onClick={()=>setShowNotesReadMore(!showNotesReadMore)}>{showNotesReadMore?<>Less...</>:<p>Read More...</p>}</button>
                                                                    <br />
                                                                </div>
                                                        </Col>
                                                    </Row>}
                                                    </> 
                                                : <Loading /> 
                                                }}
                                    </FirestoreDocument>

                                    </Col>
                                        <Col xs={12} md={3} style={{display: "flex", alignItems: "flex-start"}}>
                                            <StickyBox>
                                                <h4 className="text-muted">Key Features</h4>
                                                <hr />
                                                <ul>
                                                    <li>License: <span style={{float: "right"}}>{data.value.rentalLicenseNumber}</span></li>
                                                    <li>Type: <span style={{float: "right"}}>{data.value.type}</span></li>
                                                    <li>Size: <span style={{float: "right"}}>{data.value.areaSize} m<sup>2</sup></span></li>
                                                    <li>City: <span style={{float: "right"}}>{data.value.city}</span></li>
                                                </ul>
                                                <br />
                                                <BedBathPax bedrooms={data.value.bedrooms} bathrooms={data.value.bathrooms} baseGuests={data.value.baseGuests} color="rgba(0,0,0)"/>
                                                <hr />
                                                {smartaOpinion &&
                                                <div>
                                                    <h4>Smartavillas' Opinion:</h4>
                                                    <br />
                                                <p>
                                                   {smartaOpinion} 
                                                </p>
                                                </div> 
                                                }
                                                <hr />
                                                <BookingWidget id={props.id} dateRange={bookDates}/>
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
                            </div>                 
                        </div> : <Loading />
            }}
        </FirestoreDocument>
</>
)
}

export const PropertyNav = (props) => {

    return(
        <div className="prop-nav" style={{...props.navStyles}}>
            <Container>
                <Link to="/"><img src={logo} style={{height:"30px", width:"30px", marginRight:"10px"}}/></Link><Link to="#about">About</Link> | <Link to="#amenities">Amenities</Link> | <Link to="#calendar">Calendar</Link> | <Link to="#space">Space</Link> | <Link to="#neighborhood">Neighborhood</Link> | <Link to="#notes">Notes</Link> | <Link to="#location">Location</Link>
                                    
            </Container>
        </div>
    )
} 

const PropertyPage = (data) => {

    const [propNav, setPropNav] = useState(false);
    const [headerStyle, setHeaderStyle] = useState({
        transition: 'all 300ms ease-in'
      })


    useScrollPosition(({ prevPos, currPos }) => {
        const propSum = document.getElementById("prop-summary")
        let propSumOffset;
        if(propSum)propSumOffset = propSum.getBoundingClientRect().top;
        const isShow = -100 > propSumOffset;
        if (isShow !== propNav) setPropNav(isShow)

        const shouldBeStyle = {
            visibility: isShow ? 'visible' : 'hidden',
            transition: `all 300ms ${isShow ? 'ease-in' : 'ease-out'}`,
            transform: isShow ? 'none' : 'translate(0, -100%)',
            zIndex: 2
          }
      
        if (JSON.stringify(shouldBeStyle) !== JSON.stringify(headerStyle)) 
            return setHeaderStyle(shouldBeStyle)
      }, [propNav, headerStyle])

    return(
        <div exit={{
            opacity: 0,
            y:"-100%"}}
        animate={{
            opacity: 1,
            y:0}}
        initialxit={{
            opacity: 0,
            y:"-100%"}}>
            {<PropertyNav navStyles={headerStyle}/>}
            <PropertyPageTemplate id={data.id} />
        </div>
    )
}

export default PropertyPage

