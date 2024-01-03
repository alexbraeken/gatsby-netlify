import React, {useState, useEffect} from 'react';
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
import logo from '../img/logo.svg';
import BedBathPax from '../components/BedBathPax';
import ActivitiesRoll from '../components/ActivitiesRoll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUmbrellaBeach, faGolfBall, faPlaneDeparture, faShoppingCart, faCar, faExclamationCircle, faSwimmingPool, faFileContract, faExternalLinkAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import queryString from 'query-string';
import EnquiryModal from '../components/EnquiryModal';
import PropertySubscribeModal from '../components/PropertySubscribeModal'
import BedroomsModal from '../components/BedroomsModal'
import { Helmet } from 'react-helmet';
import Loading from '../components/Loading';
import Reviews from '../components/Reviews';
import { BsStarFill } from "@react-icons/all-files/bs/BsStarFill";
import { connect } from "react-redux"
import WinterLetInfoModal from '../components/WinterLetInfoModal'
import { BsSnow } from "react-icons/bs";
import { fetchAndSetAll } from "../Helpers/fetch-helpers";

const mapStateToProps = (state) => {
    let newObj = {}
    Object.keys(state.properties).forEach(prop=>{
      newObj[prop] = state.properties[prop]
    })
    
      return  {properties: newObj}
    }


export const PropertyPageTemplate = ( props ) =>
{
    const [data, setData] = useState({value: null})
   const [bookDates, setBookDates] = useState({from:new Date(),
    to: null})
   const [propName, setPropName] = useState(null)
   const [propSummary, setPropSummary] = useState(null)
   const [propId, setPropId] = useState(null)
   const [show, setShow] = useState(false);
   const [enquiryShow, setEnquiryShow] = useState(false);
   const [subscribeShow, setSubscribeShow] = useState(false);
   const [bedroomsShow, setBedroomsShow] = useState(false);
   const [showAllAmenities, setShowAllAemnities] = useState(false)
   const [showNotesReadMore, setShowNotesReadMore] = useState(false)
   const [amenities, setAmenities] = useState(null)
   const [smartaOpinion, setSmartaOpinion] = useState(null)
   const [poolDimensions, setPoolDimensions] = useState(null)
   const [damageWaiverText, setDamageWaiverText] = useState(null)
   const [damageWaiver, setDamageWaiver] = useState(null)
   const [securityDeposit, setSecurityDeposit] = useState(null)
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
   const [descriptions, setDescriptions] = useState(null)
   const [pricePeriods, setPricePeriods] = useState(null)
   const [showWinterLetInfo, setShowWinterLetInfo] = useState(false)
   const [fetchResults, setFetchResults] = useState(null)


   const {t} = useTranslation(['property', 'translation']);
   const {language} = useI18next();
   const lang = language === "en" ? "en_US" : `${language}_${language.toUpperCase()}`

   useEffect(() => {
    setSections(Array.from(document.getElementsByClassName("prop-page-section")))
       return () => {
           setSections(null)
       }
   }, [loading, reviews, data, descriptions, amenities])

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
            getSetPropData()
            getPricingPeriods(props.id)

            return () => {
                setData({value: null})
                setAmenities(null)
                setSmartaOpinion(null)
                setBookDates({from:new Date(),
                    to: null})
                setPropName(null)
                setPropSummary(null)
                setShow(false)
                setSubscribeShow(false)
                setShowAllAemnities(false)
                setShowNotesReadMore(false)
                setPoolDimensions(null)
                setDamageWaiverText(null)
                setDamageWaiver(null)
                setMatterportURL(null)
                setWaiverOpen(false)
                setTravelDistances({display: false, Town: null, Beach:null, Golf:null, Airport:null, Car:null})
                setShowInteractionReadMore(false)
                setShowNeighborhoodReadMore(false)
                setShowTransitReadMore(false)
                setSections(null)
                setLoading(true)
                setDescriptions(null)
                setPricePeriods(null)
                setShowWinterLetInfo(false)
            }
        }
    }, [props.id, props.path])

    useEffect(() => {
        return () => {
            setActivitiesCoords(null)
        }
    }, [activitiesCoords])

    useEffect(() => {
        if(fetchResults && fetchResults.length>0){
            let distances = {}
            let langOpinions = {}
            fetchResults.forEach(customData => {
                if(customData.text !== "null"){
                    switch(customData.customDataField.name){
                        case "Pool Dimensions":
                            setPoolDimensions(customData.text)
                            break;
                        case "Security_Deposit":
                            setSecurityDeposit(customData.text)
                            break;
                        case "Damage_Waiver":
                            setDamageWaiver(customData.text)
                            break;
                        case "Matterport_URL":
                            setMatterportURL(customData.text)
                            break;
                        case "Airport_distance":
                            distances.Airport_distance = customData.text
                            break;
                        case "Market_Distance":
                            distances.Market_Distance = customData.text
                            break;
                        case "Beach_distance":
                            distances.Beach_distance = customData.text
                            break;
                        case "Golf_distance":
                            distances.Golf_distance = customData.text
                            break;
                        case "Town_distance":
                            distances.Town_distance = customData.text 
                            break;  
                        case "Car_Recommendation":
                            distances.Car_Recommendation = customData.text  
                            break;
                        case "Smarta_Opinion_fr":
                            langOpinions.Smarta_Opinion_fr = customData.text 
                            break;
                        case "Smarta_Opinion_es":
                            langOpinions.Smarta_Opinion_es = customData.text 
                            break;
                        case "Smartavillas_Opinion":
                            langOpinions.Smartavillas_Opinion = customData.text 
                            break;
                        case "Smarta_Opinion_pt":
                            langOpinions.Smarta_Opinion_pt = customData.text 
                            break;
                    }
                }
                
            })

            if(Object.keys(distances).length > 0){
                setTravelDistances({
                    display: true,
                    Town: distances.Town_distance || null,
                    Beach:  distances.Beach_distance || null,
                    Golf: distances.Golf_distance || null,
                    Airport: distances.Airport_distance || null,
                    Market: distances.Market_Distance || null,
                    Car: distances.Car_Recommendation || null
                })
            }
            if(Object.keys(langOpinions).length> 0){
                switch(language){
                    case "pt":
                        setSmartaOpinion(langOpinions.Smarta_Opinion_pt || langOpinions.Smartavillas_Opinion)
                        break;
                    case "es":
                        setSmartaOpinion(langOpinions.Smarta_Opinion_es || langOpinions.Smartavillas_Opinion)
                        break;
                    case "fr":
                        setSmartaOpinion(langOpinions.Smarta_Opinion_fr || langOpinions.Smartavillas_Opinion)
                        break;
                    default:
                        setSmartaOpinion(langOpinions.Smartavillas_Opinion)
                }
            }
        }
    }, [fetchResults])


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEnquiryClose = () => setEnquiryShow(false)
    const handleEnquiryShow = () => setEnquiryShow(true)
    
    const handleWinterLetInfoShow = () => setShowWinterLetInfo(true)
    const handleWinterLetInfoClose = () => setShowWinterLetInfo(false)

    const handleSubscribeClose = () => setSubscribeShow(false)
    const handleSubscribeShow = () => setSubscribeShow(true)

    const handleBedroomsClose = () => setBedroomsShow(false)
    const handleBedroomsShow = () => setBedroomsShow(true)

    const getSetPropData = () => {
        const uri = "https://us-central1-gatsby-test-286520.cloudfunctions.net/widgets/external"
            fetchAndSetAll([
                {
                  url: uri,
                  setter: async data => {
                    let results = await data.json()
                        setFetchResults(results)
                    },
                  init: {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        source: 'hf', 
                        customData: true,
                        request: `v2/customdata?propertyUid=${props.id}`
                    })
                    }
                },
                {
                    url: uri,
                    setter: async data => {
                        let results = await data.json()
                        if(results.length>0){
                            setReviews(results)
                        }
                    },
                    init: {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            source: 'hf', 
                            reviews: true,
                            request: `v2/reviews?propertyUid=${props.id}`
                        })
                    }
                },
                {
                    url: uri,
                    setter: async data => {
                        let dataObj = await data.json()
                        setData({value: dataObj[props.id]})

                    },
                    init: {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                          {
                            source: "db",
                            col: "Properties",
                            doc: props.id
                          })
                        }
                },
                {
                    url: uri,
                    setter: data => {
                        let dataObj = data.json()
                        dataObj.then(
                            el=>{
                                setAmenities(sortAmenities(Object.entries(el[props.id])))
                        })
                    },
                    init: {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                          {
                            source: "db",
                            col: "amenities",
                            doc: props.id
                          })
                        }
                },
                {
                    url: uri,
                    setter: data => {
                        let dataObj = data.json()
                        dataObj.then(
                            el=>{
                                setDescriptions({value: el[props.id]})
                                setPropName(el[props.id][lang]?.name || el[props.id].en_US.name)
                                setPropSummary(el[props.id][lang]?.summary || el[props.id].en_US.summary)
                        })
                    },
                    init: {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                          {
                            source: "db",
                            col: "Descriptions",
                            doc: props.id
                          })
                        }
                },
              ]).catch(console.error);

    }


    const getPricingPeriods = (id) => {
        let url = `https://us-central1-gatsby-test-286520.cloudfunctions.net/widgets/pricing_period/${id}`
        try{
            fetch(url).then(response => {return response.text()}).then(data => {
            let priceObject = {}
            JSON.parse(data).forEach(pricing => {
                priceObject[pricing.from] = pricing
            })
            setPricePeriods(priceObject)
        })
    }catch(e){
        console.log("Pricing Periods API Error")
    }
    }

    const handleShowAmenities = () => {
        setShowAllAemnities(!showAllAmenities)
    }

    

    const onDateChange = (range) => {
        setBookDates({
            from:range.from,
            to: range.to
        })
    }


    const handleActivitiesCoords = (coords) => {
        setActivitiesCoords(coords)
    }

   const sortAmenities = (amenitiesList) => {

    let list= [];
    amenitiesList.forEach((amenity, index)=> {
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
        <div>
                        <div style={{display:"flex", flexWrap:"wrap"}}>
                            <div style={{width:"100%"}}>
                            {data.value &&
                                <PropCarousel name={propName? propName: ''} baseRate={data.value.baseDailyRate} city={data.value.city} bedrooms={data.value.bedrooms} bathrooms={data.value.bathrooms} baseGuests={data.value.baseGuests} propId={props.id} firstSlide={data.value.picture} photos={data.value.photos} handleShow={handleShow} dispatch={props.dispatch} inFavs={props.inFavs} handleSubscribeShow={handleSubscribeShow}/>
                            }
                                <Container style={{paddingTop:"30px"}}>
                                {data.value?.customData?.Winter_Let_Price && data.value?.customData?.Winter_Let_Price.length > 0 &&
                                            <div className="prop-ribbon" onClick={()=>handleWinterLetInfoShow()}><div><p>{t("Winter Let")}</p><BsSnow /></div></div>
                                        }
                                    <section id="prop-summary">
                                    <div id="prop-nav">
                                        {sections && sections.length > 0 && sections.map((section, index) => {
                                            return(
                                                <a href={`#${section.id}`} className="hover-primary">
                                                    <span> | </span>
                                                    <b>{section.dataset.title}</b>
                                                </a>
                                            )
                                            
                                        })
                                        }
                                    </div>
                                    <br />
                                    <Row>
                                    <Col>
                                        <Row id="about" data-title={t("About Prop")} className="prop-page-section">
                                            <Col xs={12} md={9} style={{position: "relative"}}>
                                                <h2 className="prop-section-title">{t("About Prop")}</h2>
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
                                                {amenities ? 
                                                    <div id="amenities" data-title={t("Amenities")} className="prop-page-section" >
                                                        <h2 className="prop-section-title">{t("Amenities")}</h2>
                                                        <h2>{t("Amenities")}</h2>
                                                        <br />
                                                        <div className="amenities-list">
                                                        {amenities.map((amen, index) => {
                                                            if(showAllAmenities){
                                                                return (amen[1] && amen[0] !== "__id" && amen[0] !== "length") ? 
                                                                <div key={index} className="amenity">
                                                                    <Amenity amenity = {amen[0]} /></div> : null ;
                                                            }else{ 
                                                                return (amen[1] && amen[0] !== "__id" && amen[0] !== "length" && index < 10) ? 
                                                                <div key={index} className="amenity">
                                                                    <Amenity amenity = {amen[0]} /></div> : null ;
                                                            }      
                                                        })}
                                                        <br />
                                                        </div>
                                                        <br />
                                                        <button className="btn" type="" onClick={()=>handleShowAmenities()}>{showAllAmenities?<small>{t("Less")}...</small>:<small>{t("Show all")} {amenities.length-1}...</small>}</button>
                                                    </div> : <Loading />
                                                }
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} md={9}>
                                            <hr />
                                            <div id="calendar" data-title={t("Calendar")} className="prop-page-section">
                                                <h2 className="prop-section-title">{t("Calendar")}</h2>
                                                <h2>{t("Calendar")}</h2>
                                                <br />
                                                {data.value && pricePeriods  ? 
                                                        <CalendarWidget id={props.id} onChange={onDateChange} dates={bookDates} pricingPeriods={pricePeriods} minDays={data.value.minimumStay} currSymbol={data.value.currencySymbol}/>
                                                        :
                                                        <Loading />
                                                    }
                                            </div>
                                        </Col>
                                    </Row>
                                    
                                            {descriptions ? 
                                                    <>

                                                    {(descriptions.value[lang]?.space || descriptions.value.en_US.space) &&
                                                    <Row>
                                                        <Col xs={12} md={9}>
                                                            <hr />
                                                                <div id="space" data-title={t("Space")} className="prop-page-section">
                                                                    <h2 className="prop-section-title">{t("Space")}</h2>
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
                                                    }
                                                    { ((descriptions.value[lang]?.neighbourhood || descriptions.value.en_US.neighbourhood || descriptions.value[lang]?.neighborhood || descriptions.value.en_US.neighborhood)) && 
                                                    <Row>
                                                        <Col xs={12} md={9}>
                                                            <hr />
                                                                <div id="neighborhood" data-title={t("Neighborhood")} className="prop-page-section">
                                                                <div className={(descriptions.value[lang]?.neighbourhood?.length>400 || descriptions.value.en_US.neighbourhood?.length>400 || descriptions.value[lang]?.neighborhood?.length>400 || descriptions.value.en_US.neighborhood?.length>400) ? `prop-description-box ${showNeighborhoodReadMore ? 'show' : ''}`: undefined}>
                                                                    <h2 className="prop-section-title">{t("Neighborhood")}</h2>
                                                                    <h2>{t("Neighborhood")}</h2>
                                                                    <br />
                                                                    {descriptions.value[lang]?.neighbourhood?.substring(0,400) || descriptions.value.en_US.neighbourhood?.substring(0,400) || descriptions.value[lang]?.neighborhood?.substring(0,400) || descriptions.value.en_US.neighborhood?.substring(0,400) }
                                                                    {showNeighborhoodReadMore && <span id="more">
                                                                        {descriptions.value[lang]?.neighbourhood?.substring(400) || descriptions.value.en_US.neighbourhood?.substring(400) || descriptions.value[lang]?.neighborhood?.substring(400) || descriptions.value.en_US.neighborhood?.substring(400)}
                                                                        <br />
                                                                        <br />
                                                                        <p>{t("Find out more about the Algarve")} <Link to="/location/algarve"><span className="orangeText hover-highlight">{t("here")}...</span></Link></p>
                                                                        </span>}
                                                                    </div>
                                                                    <br />
                                                                    <br />
                                                                    {(descriptions.value[lang]?.neighbourhood?.length>400 || descriptions.value.en_US.neighbourhood?.length>400 || descriptions.value[lang]?.neighborhood?.length>400 || descriptions.value.en_US.neighborhood?.length>400 ) && <button className="btn" type="" onClick={()=>setShowNeighborhoodReadMore(!showNeighborhoodReadMore)}>{showNeighborhoodReadMore?<small>{t("Less")}...</small>:<small>{t("Read more")}...</small>}</button>}
                                                                    <br />
                                                                </div>
                                                        </Col>
                                                    </Row>
                                                    }
                                                    <br />
                                                    { ((descriptions.value[lang]?.transit || descriptions.value.en_US.transit)) && 
                                                    <Row>
                                                        <hr />
                                                        <Col xs={12} md={travelDistances.display? 5 : 9}>
                                                                <div id="gettingAround" data-title={t("Getting Around")} className="prop-page-section">
                                                                <div className={(descriptions.value[lang]?.transit.length>400 || descriptions.value.en_US.transit.length>400) ? `prop-description-box ${showTransitReadMore ? 'show' : ''}`: undefined} style={{position: "relative", zIndex:"0"}}>
                                                                    <h2 className="prop-section-title">{t("Getting Around")}</h2>
                                                                    <h2>{t("Getting Around")}</h2>
                                                                    <br />
                                                                    {descriptions.value[lang]?.transit.substring(0,400) || descriptions.value.en_US.transit.substring(0,400)}
                                                                    {showTransitReadMore && <span id="more">
                                                                        {descriptions.value[lang]?.transit.substring(400) || descriptions.value.en_US.transit.substring(400)}
                                                                        </span>}
                                                                    </div>
                                                                    <br />
                                                                    <br />
                                                                    {(descriptions.value[lang]?.transit.length>400 || descriptions.value.en_US.transit.length>400) && <button className="btn" type="" onClick={()=>setShowTransitReadMore(!showTransitReadMore)}>{showTransitReadMore?<small>{t("Less")}...</small>:<small>{t("Read more")}...</small>}</button>}
                                                                    <br />
                                                                </div>
                                                        </Col>
                                                        {travelDistances.display && 
                                                        <Col xs={12} md={4}>
                                                                <div className="keyDistances" style={{position: "relative", zIndex:"0"}}>
                                                                    <h2 className="prop-section-title">{t("Key Distances")}</h2>
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
                                                    }
                                                    {reviews && reviews.length>0 && 
                                                    <Row>
                                                        <Col xs={12} md={9}>
                                                            <hr />
                                                            <div id="reviews" data-title={t("Reviews")} className="prop-page-section">
                                                                <div style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-between", position:"relative", zIndex:"0"}}>
                                                                    <h2 className="prop-section-title">{t("Reviews")}</h2>
                                                                    <h2>{t("Reviews")}</h2> 
                                                                    <div style={{display: "flex"}}><small style={{margin:"auto", display: "flex"}}>{t("Average Rating")}: {avgRating} <BsStarFill className="review-star" style={{margin: "auto"}}/></small></div></div>
                                                                <br />
                                                                <Reviews reviews={reviews}/>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    }
                                                    {((descriptions.value[lang]?.notes || descriptions.value.en_US.notes)) &&
                                                    <Row>
                                                        <Col xs={12} md={9}>
                                                            <hr />
                                                                <div id="notes" data-title={t("Notes")} className="prop-page-section">
                                                                    <div className={(descriptions.value[lang]?.notes.length>400 || descriptions.value.en_US.notes.length>400) ? `prop-description-box ${showNotesReadMore ? 'show' : ''}` : undefined} style={{position:"relative", zIndex:"0"}}>
                                                                    <h2 className="prop-section-title">{t("Notes")}</h2>
                                                                    <h2>{t("Notes")}</h2>
                                                                    <br />
                                                                    {(descriptions.value[lang]?.notes.substring(0,400) || descriptions.value.en_US.notes.substring(0,400))}
                                                                    {showNotesReadMore && <span id="more">{descriptions.value[lang]?.notes.substring(400) || descriptions.value.en_US.notes.substring(400)}</span>}
                                                                    </div>
                                                                    <br />
                                                                    <br />
                                                                    {(descriptions.value[lang]?.notes.length>400 || descriptions.value.en_US.notes.length>400 ) && <button className="btn" type="" onClick={()=>setShowNotesReadMore(!showNotesReadMore)}>{showNotesReadMore?<small>{t("Less")}...</small>:<small>{t("Read more")}...</small>}</button>}
                                                                    <br />
                                                                </div>
                                                        </Col>
                                                    </Row>
                                                    }
                                                    {((descriptions.value[lang]?.access || descriptions.value.en_US.access)) &&
                                                    <Row>
                                                        <Col xs={12} md={9}>
                                                            <hr />
                                                                <div id="access" data-title={t("Your Arrival")} className="prop-page-section">
                                                                    <div className={(descriptions.value[lang]?.access.length>400 || descriptions.value.en_US.access.length>400) ? `prop-description-box ${showAccessReadMore ? 'show' : ''}` : undefined} style={{position:"relative", zIndex:"0"}}>
                                                                    <h2 className="prop-section-title">{t("Your Arrival")}</h2>
                                                                    <h2>{t("Your Arrival")}</h2>
                                                                    <br />
                                                                    {descriptions.value[lang]?.access.substring(0,400) || descriptions.value.en_US.access.substring(0,400)}
                                                                    {showAccessReadMore && <span id="more">{descriptions.value[lang]?.access.substring(400) || descriptions.value.en_US.access.substring(400)}</span>}
                                                                    </div>
                                                                    <br />
                                                                    <br />
                                                                    {(descriptions.value[lang]?.access.length>400 || descriptions.value.en_US.access.length>400 )&& <button className="btn" type="" onClick={()=>setShowAccessReadMore(!showAccessReadMore)}>{showAccessReadMore?<small>{t("Less")}...</small>:<small>{t("Read more")}...</small>}</button>}
                                                                    <br />
                                                                </div>
                                                        </Col>
                                                    </Row>
                                                    }
                                                    {((descriptions.value[lang]?.interaction || descriptions.value.en_US.interaction )) &&
                                                    <Row>
                                                        <Col xs={12} md={9}>
                                                            <hr />
                                                                <div id="interaction">
                                                                <div className={(descriptions.value[lang]?.interaction.length>400 || descriptions.value.en_US.interaction.length>400) ? `prop-description-box ${showInteractionReadMore ? 'show' : ''}` : undefined} style={{position:"relative", zIndex:"0"}}>
                                                                    <h2 className="prop-section-title">{t("During Your Stay")}</h2>
                                                                    <h2>{t("During Your Stay")}</h2>
                                                                    <br />
                                                                    {descriptions.value[lang]?.interaction.substring(0,400) || descriptions.value.en_US.interaction.substring(0,400)}
                                                                    {showInteractionReadMore && <span id="more">{descriptions.value[lang]?.interaction.substring(400) || descriptions.value.en_US.interaction.substring(400)}</span>}
                                                                </div>
                                                                    <br />
                                                                    <br />
                                                                    {(descriptions.value[lang]?.interaction.length>400 || descriptions.value.en_US.interaction.length>400 ) && <button className="btn" type="" onClick={()=>setShowInteractionReadMore(!showInteractionReadMore)}>{showInteractionReadMore?<small>{t("Less")}...</small>:<small>{t("Read more")}...</small>}</button>}
                                                                    <br />
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
                                                }

                                    </Col>
                                        <Col xs={12} md={3} style={{display: "flex", alignItems: "flex-start", minWidth: "320px"}}>
                                            <StickyBox offsetTop={50}>
                                                <div className="tabs-container">
                                                <Tabs defaultActiveKey="propSpecs" id="keyDetails">
                                                    <Tab eventKey="propSpecs" title={t("Property Specs.")} tabClassName="orangeText">
                                                    <ul>
                                                    {data.value &&
                                                    <>
                                                        <li>{t("Licence")}: <span style={{float: "right"}}>{data.value.rentalLicenseNumber}</span></li>
                                                        <li>{t("Type")}: <span style={{float: "right"}}>{data.value.type}</span></li>
                                                        <li>{t("Size")}: <span style={{float: "right"}}>{data.value.areaSize} m<sup>2</sup></span></li>
                                                        <li>{t("Location")}: <span style={{float: "right"}}>{data.value.city}</span></li>
                                                    </>
                                                    }
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
                                                    {data.value?.customData?.Winter_Let_Price && data.value?.customData?.Winter_Let_Price.length > 0 &&
                                                    <Tab eventKey="winterLets" title={t("Winter Let Details")} tabClassName="orangeText">
                                                        <p>{t("Winter Let Discount Paragraph pre price")}<b>{data.value.customData?.Winter_Let_Price}</b>{t("Winter Let Discount Paragraph post price")}
                                                        </p>
                                                    </Tab>
                                                    }
                                                    {damageWaiver && securityDeposit &&
                                                    <Tab eventKey="securityDeposits" title={t("Deposits & Waivers")} tabClassName="orangeText">
                                                        <p>
                                                            <b>{t("Options")}</b>
                                                        </p>
                                                        <ul>
                                                            <li>
                                                                {t("Security Deposit")}: <span style={{float: "right"}}>{securityDeposit}€ *</span>
                                                            </li>
                                                            <li>
                                                                {t("Damage Waiver")}: <span style={{float: "right"}}>{damageWaiver}€</span>
                                                            </li>
                                                        </ul>

                                                        <p>
                                                            <small>*{t("Does not include 2% non-refundable fee (5€ minimum).")}</small>
                                                        </p>
                                                        <br/>
                                                        <p>
                                                        <span dangerouslySetInnerHTML={{__html: t("Important: We are committed to protecting our properties which is why we've partnered with Know Your Guest, the leading vacation rental guest-screening provider. <br /> Please note that before your booking begins, you will need to verify your details through Know Your Guest. You will also be given the choice between paying a refundable deposit or buying a non-refundable damage waiver. We suggest you buy the damage waiver as this protects you in case you cause accidental damage during a booking.")}} />
                                                        </p>
                                                    </Tab>
                                                    }
                                                    
                                                </Tabs>
                                                </div>
                                                <br />
                                                {data.value &&
                                                <BedBathPax bedrooms={data.value.bedrooms} bathrooms={data.value.bathrooms} baseGuests={data.value.baseGuests} color="rgba(0,0,0)"/>
                                                }
                                                <br />
                                                <center><button className="btn" type="" onClick={()=>handleBedroomsShow()} onKeyDown={()=> handleBedroomsShow()} tabindex="0"><small >{t("Show Sleeping Arrangement")}</small></button></center>
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
                                                    <a id="enquiry-button">
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
                                                {propId !== "590fc0c2-b40c-4cf4-b2e2-d67a8c3ae9d4" &&
                                                <div>
                                                <center><a href="/about/booking-terms-conditions" target="_blank"><FontAwesomeIcon icon={faFileContract} style={{margin:"auto"}} /> <span style={{textDecoration:"underline", cursor:"pointer"}}>{t("Booking Terms & Conditions")}</span> <FontAwesomeIcon icon={faExternalLinkAlt} style={{margin:"auto"}} /></a></center>
                                                </div>
                                                }
                                                {damageWaiver && propId !== "590fc0c2-b40c-4cf4-b2e2-d67a8c3ae9d4" &&
                                                <div style={{paddingBottom:"20px"}}> 
                                                    <br />
                                                    <center><FontAwesomeIcon icon={faExclamationCircle} style={{margin:"auto"}} /> <span role="button" tabindex="0" aria-label="Damage Waiver" style={{textDecoration:"underline", cursor:"pointer"}} onClick={()=>setWaiverOpen(!waiverOpen)} onKeyDown={(e)=>{if(e.key==="Enter"){setWaiverOpen(!waiverOpen)}}}>{t("Security Deposit/Damage Waivers")}</span> <FontAwesomeIcon className={`expand-chevron ${waiverOpen ? "visible" : ""}`} icon={faChevronDown} style={{margin:"auto"}} /></center>
                                                    <Collapse in ={waiverOpen}>
                                                        <div>
                                                            <p>
                                                            <span dangerouslySetInnerHTML={{__html: t("Important: We are committed to protecting our properties which is why we've partnered with Know Your Guest, the leading vacation rental guest-screening provider. <br /> Please note that before your booking begins, you will need to verify your details through Know Your Guest. You will also be given the choice between paying a refundable deposit or buying a non-refundable damage waiver. We suggest you buy the damage waiver as this protects you in case you cause accidental damage during a booking.")}} />
                                                            </p>
                                                            <p>
                                                                <small>*{t("Does not include 2% non-refundable fee (5€ minimum).")}</small>
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
                                        {data.value &&
                                        <GoogleMapComponent isMarkerShown="true" lat={data.value.latitude} lng={data.value.longitude} height={"500px"} activities={true} activityCoords={activitiesCoords}/>
                                        }
                                    </div>
                                    <hr />
                                    <Container style={{textAlign: "center"}}>
                                    {data.value &&
                                        <ActivitiesRoll location={data.value.city} property={true} handleActivitiesCoords={handleActivitiesCoords}/>
                                    }
                                    </Container>
                                </Container>
                            <br />
                            {data.value &&
                            <>
                            <GalleryModal show={show} handleClose={handleClose} photos={data.value.photos}/>  
                            <EnquiryModal show={enquiryShow} handleClose={handleEnquiryClose} propId={propId} propName={data.value.name} img={data.value.pictureThumbCloudURL || data.value.picture}/>
                            <PropertySubscribeModal show={subscribeShow} handleClose={handleSubscribeClose} propId={propId} propName={data.value.name} img={data.value.pictureThumbCloudURL || data.value.picture}/>
                            <BedroomsModal show={bedroomsShow} handleClose={handleBedroomsClose} propId={propId} img={data.value.pictureThumbCloudURL || data.value.picture}/>
                            </>
                            }
                            {data.value?.customData?.Winter_Let_Price && data.value?.customData?.Winter_Let_Price.length > 0 &&
                                <WinterLetInfoModal show={showWinterLetInfo} handleClose={handleWinterLetInfoClose} price={data.value.customData?.Winter_Let_Price} propName={data.value.name} img={data.value.pictureThumbCloudURL || data.value.picture}/>
                            }
                            </div>
                            <Helmet link={[{rel: "canonical", href: `https://www.smartavillas.com/properties/${propId}`}]}>
                                <title>{propName}</title>
                                {data.value &&
                                <meta name="description" content={data.value.description} />
                                }
                            </Helmet>                 
                            <section
    className="last"></section>
                        </div>
            
        </div>
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
