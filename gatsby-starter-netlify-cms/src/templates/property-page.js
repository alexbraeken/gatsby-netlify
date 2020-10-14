import React, {useState} from 'react';
import { FirestoreDocument } from "@react-firebase/firestore";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropCarousel from '../components/PropCarousel';
import GoogleMapComponent from '../components/GoogleMapComponent';
import { Link } from 'gatsby';
import Loading from '../components/Loading';
import BookingWidget from '../components/BookingWidget';
import CalendarWidget from '../components/CalendarWidget';
import StickyBox from "react-sticky-box";
import GalleryModal from '../components/GalleryModal';
import Amenity from '../components/Amenities';
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

export const PropertyPageTemplate = ( props ) =>
{
   const [bookDates, setBookDates] = useState({})
   const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   const onDateChange = (range) => {
    setBookDates({
        from:range.from,
        to: range.to})
   }
    return (
        <>
        <FirestoreDocument path={`/Properties/${props.id}`}>
            {data => {
                return (!data.isLoading && data.value) ? 
                        <div style={{display:"flex", flexWrap:"wrap"}}>
                            <div className="prdtitlesolo productNameTitle">
                                <Container>
                                    <h1 style={{margin:"0",fontSize:"inherit",padding:"0",fontWeight:"inherit"}}>
                                        <span className="prdname">{data.value.name}</span>
                                        <span className="titleTags">
                                            <span className="titleTag">{data.value.city}</span>
                                            <div className="header-icons">
                                                <div className="icon-info">
                                                    <img alt="smartavillas - bed" src="/img/bedroom1.png" />
                                                        <span className="tooltiptext">Bedrooms</span>
                                                        <div className="text-number">
                                                            <h3>{data.value.bedrooms}</h3>
                                                        </div>
                                                </div>
                                                <div className="icon-info">
                                                    <img alt="smartavillas - bath" src="/img/bathroom3.png" />
                                                    <span className="tooltiptext">Bathrooms</span>
                                                    <div className="text-number">
                                                        <h3>{data.value.bathrooms}</h3>
                                                    </div>
                                                </div>
                                                <div className="icon-info">
                                                    <img alt="smartavillas - sleeps" src="/img/people.png" />
                                                    <span className="tooltiptext">Sleeps</span>
                                                    <div className="text-number">
                                                        <h3>{data.value.baseGuests}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </span>
                                    </h1>
                                    <div className="winterLetsRibbon" title="Winter let">
                                        <div className="flag under">
                                            <span className="prc">{data.value.baseDailyRate} €</span>
                                            <span className="mth"> / Day</span>
                                        </div>
                                    </div>
                                </Container>
                            </div>
                            <div style={{width:"100%"}}>
                                <PropCarousel firstSlide={data.value.picture} photos={data.value.photos} handleShow={handleShow}/>
                                <br />
                                <Container>
                                    <section>
                                    <div id="prop-nav">
                                        <Link to="#about">About</Link> | <Link to="#amenities">Amenities</Link> | <Link to="#neighborhood">Neighborhood</Link> | <Link to="#location">Location</Link>
                                    </div>
                                    <br />
                                    <Row id="prop-summary">
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
                                                        {Object.entries(data.value).map((amen, index) => {
                                                            
                                                                return (amen[1] && amen[0] !== "__id") ? 
                                                                <div key={index} className="amenity">
                                                                    <Amenity amenity = {amen[0]} /></div> : null
                                                        })}
                                                        <br />
                                                        </div>
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
                                    <Row>
                                        <Col xs={12} md={9}>
                                            <hr />
                                            <FirestoreDocument path={`/Descriptions/${props.id}`}>
                                            {data => {
                                                    return (!data.isLoading && data.value) ? 
                                                    <div id="neighborhood">
                                                        <h2>Neighborhood</h2>
                                                        <br />
                                                        {data.value.en_US.neighborhood}
                                                        <br />
                                                    </div> : <Loading /> 
                                                }}
                                            </FirestoreDocument>
                                        </Col>
                                    </Row>
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
                                        <GoogleMapComponent isMarkerShown="true" lat={data.value.latitude} lng={data.value.longitude}/>
                                    </div>
                                    
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
                <Link to="#about">About</Link> | <Link to="#amenities">Amenities</Link> | <Link to="#neighborhood">Neighborhood</Link> | <Link to="#location">Location</Link>
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
        const propSumOffset = document.getElementById("prop-summary").getBoundingClientRect().top;
        const isShow = -100 > propSumOffset;
        if (isShow !== propNav) setPropNav(isShow)

        const shouldBeStyle = {
            visibility: isShow ? 'visible' : 'hidden',
            transition: `all 300ms ${isShow ? 'ease-in' : 'ease-out'}`,
            transform: isShow ? 'none' : 'translate(0, -100%)'
          }
      
        if (JSON.stringify(shouldBeStyle) !== JSON.stringify(headerStyle)) 
            return setHeaderStyle(shouldBeStyle)
      }, [propNav, headerStyle])

    return(
        <div>
            {<PropertyNav navStyles={headerStyle}/>}
            <PropertyPageTemplate id={data.id} />
        </div>
    )
}

export default PropertyPage