import React, { useState, useEffect, useRef } from 'react'
import {Card} from 'react-bootstrap'
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import Col from 'react-bootstrap/Col'
import { FirestoreDocument } from "@react-firebase/firestore"
import Loading from '../components/Loading'
import Amenity from '../components/Amenities'
import Share from '../components/Share'
import CardCalendar from '../components/CardCalendar'
import BedBathPax from '../components/BedBathPax'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faImages, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { gsap } from "gsap"
import Slider from "react-slick"
import { AiOutlineHeart } from "@react-icons/all-files/ai/AiOutlineHeart";
import { AiFillHeart } from "@react-icons/all-files/ai/AiFillHeart";
import { connect } from "react-redux"


const mapStateToProps = (state) => {
  let newObj = {}
  Object.keys(state.properties).forEach(prop=>{
    newObj[prop] = state.properties[prop]
  })
  
    return  {properties: newObj}
  }

const mapDispatchToProps = dispatch => {
return { increment: (name) => dispatch({ type: `ADD_PROPERTY`, propName: name }) }
}

const PropertyCardComp = (props) => {

    const [showAmenities, setShowAmenities] = useState()
    const [showCalendar, setShowCalendar] = useState()
    const [displayPrice, setDisplayPrice] = useState(null)
    const [dateURI, setDateURI] = useState('')
    const [showSlider, setShowSlider] = useState(false)
    const [inFavs, setInFavs] = useState(false)
    const [bgImg, setBgImg] = useState('')
    const [bgGlowIndex, setBgGlowIndex] = useState(0)
    const [hover, setHover] = useState(false)
    const [displayed, setDisplayed] = useState(false)
    const [timerId, setTimerId] = useState(null)

    const {t} = useTranslation(['properties', 'translation', 'amenities']);
    const {language} = useI18next();
    const lang = language === "en" ? "en_US" : `${language}_${language.toUpperCase()}`


    const calendar = useRef(null)
    const hovered = useRef(null)
    const footer = useRef(null)
    const description = useRef(null)

    useEffect(() => {

      if(props.dates){
        setDateURI(`?from=${props.dates.from}&to=${props.dates.to}`)
      }
      setDisplayPrice(props.item.baseDailyRate)

      return () => {
        setDisplayPrice(null)
      }
    }, [props])

    useEffect(() => {
      let exists = false;
      if(Object.keys(props.properties).indexOf(props.item.uid) !== -1)exists = true;
      setInFavs(exists)
      return () => {
        setInFavs(false)
      }
  }, [props.properties])

    useEffect(() => {
      if(showCalendar)gsap.fromTo(calendar.current, {yPercent: -50}, {yPercent: 0, ease: "Elastic.easeOut",  duration: 0.5});
    }, [showCalendar])

    useEffect(() => {
      const imgLoader = new Image()
      
      imgLoader.src = props.item.picture

      imgLoader.onload = () => {
        setBgImg(props.item.picture)
      }

      return () => {
        setBgImg('')
      }
    }, [props.item])

    useEffect(() => {
      const handleTimer = () =>{
        setTimerId(
        setTimeout(()=>{
          setDisplayed(true)
        }, 500)
        )
      }

      if(hover){
        handleTimer()
      }else{
        if(timerId){
          clearTimeout(timerId)
          setTimerId(null)
        }
        if(displayed){
          let tl = gsap.timeline()
          tl.to(
            hovered.current,
            {
              scale: 1,
              duration: 0.3,
              ease:"Power2.easeOut",
              onComplete:()=>setDisplayed(false)
            }
          ).to(
            footer.current,
            {
              opacity: 0,
              y: "0%",
              duration: 0.3
            },
            "<"
          ).to(
            description.current,
            {
              height: 0,
              padding: 0,
              duration: 0.3
            },
            "<"
          )
        }
      }
    }, [hover])


    useEffect(() => {
      if(displayed){
        let tl = gsap.timeline()
        tl.to(
          hovered.current,
          {
            scale: 1.3,
            duration: 0.3
          }
        ).to(
          footer.current,
          {
            opacity: 1,
            y: "100%",
            duration: 0.3
          },
          "<"
        ).from(
          description.current,
          {
            height: 0,
            padding: 0,
            duration: 0.3
          },
          "<"
        )
      }
    
    }, [displayed])
    

    

    const settings = {
      infinite: true,
      dots: false,
      initialSlide: 1,
      lazyLoad: true,
      className: "center prop-slider-card",
      centerPadding: "30px",
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      autoplay: true,
      lazyLoad: "progressive",
      autoplaySpeed: 5000,
      pauseOnHover: false
    };



    return (
    <div className="prop-card-container" key={props.index} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={{position: "relative", margin:"auto 10px"}}>
        
        <Card className="bg-dark text-white prop-card" style={{flexWrap:"wrap", flexDirection: "row"}}>
          {props.item.customData?.Winter_Let_Price && props.item.customData?.Winter_Let_Price.length > 0 &&
          <div className="ribbon"><span>{t("Also Winter Let")}</span></div>
          }

            <Link  to={`/properties/${props.item.uid}`+dateURI}style={{position:"absolute", top:0, left:0, width:"100%", height:"100%", background:"transparent"}}></Link>
            <div className="card-slider-container" style={{backgroundColor: "grey", backgroundImage:`url(${bgImg})`}}>
            <div className="card-slider-glow" style={{backgroundImage: `url(${props.item.photos[`${bgGlowIndex}`].url})`}}>

            </div>
              <Card.Text>
                <small className="feature-text-type">{props.item.type}</small>
              </Card.Text>
            </div>
            <Card.ImgOverlay style={{position:"absolute", padding:"1rem", width: "100%", height:"unset", backgroundColor:"transparent", left:"0", bottom:"0", top:"auto", padding:0}}>
              <section className="section prop-card-text" style={{background:"linear-gradient(0deg, black 0%, rgba(0, 0, 0, 0) 100%)", color: "#fff", marginTop:0, height:"unset", paddingBottom: "3px"}}>
              <Link to={`/properties/${props.item.uid}`+dateURI}  style={{position:"relative", zIndex:"2", width: "100%", display:"block", height:"100%"}}>
                <Card.Title style={{textAlign:"center"}}><span className="prop-card-title" style={{fontSize:"1.8rem"}}>{props.item.name}</span></Card.Title>
                <BedBathPax bedrooms={props.item.bedrooms} bathrooms={props.item.bathrooms} baseGuests={props.item.baseGuests} color="rgba(256,256,256)"/>
                <div className="prop-card-description-ps">
                  <small style={{float:"left"}}>{props.item.city}</small>
                  <small style={{float:"right"}}>{t("From")} <span className="feature-text-price">{displayPrice}{props.item.currencySymbol} </span>/ {t("Night")}</small>
                </div>
                </Link>
              </section>
            </Card.ImgOverlay>   
        </Card>
      {displayed && 
        <Card className="bg-dark text-white prop-card hovered" ref={hovered} style={{flexWrap:"wrap", flexDirection: "row", position:"absolute", left:0, top:0}} id={props.item.name}>
        <div className="card-buttons-right">
        {!inFavs ? 
        <div className="favs-heart-container">
          <AiOutlineHeart className="add-favs-heart" onClick={()=>{
          props.dispatch({ type: 'ADD_PROPERTY', propName: props.item.name, propId: props.item.uid, propImg: props.item.picture, bedrooms: props.item.bedrooms, bathrooms: props.item.bathrooms, baseGuests: props.item.baseGuests, city: props.item.city, rate: displayPrice, currSymbol: props.item.currencySymbol})
          }}/><span className="favs tooltiptext">{t("add favs")}</span>
        </div>
        :
        <div className="favs-heart-container">
          <AiFillHeart className="add-favs-heart" onClick={()=>props.dispatch({type: 'REMOVE_PROPERTY', propId: props.item.uid})}/>
          <span className="favs tooltiptext">{t("remove favs")}</span>
        </div>
        }
        <div className="share-btn-container">
          <Share propImg={props.item.picture} propName={props.item.name} target={`${window.location.href}/${props.item.uid}`}/>
        </div>
        </div>
      
        {props.item.customData?.Winter_Let_Price && props.item.customData?.Winter_Let_Price.length > 0 &&
        <div className="ribbon"><span>{t("Also Winter Let")}</span></div>
        }
      {showAmenities && 
            <div className="card-img-overlay card-amenities" >
              <FirestoreDocument path={`/amenities/${props.item.uid}`}>
                {data => {
                    return (!data.isLoading && data.value) ? 
                    <div id="amenities">
                        <h3 style={{textAlign:"center"}}>{t("Amenities")}</h3>
                        <br />
                        <div className="amenities-list">
                        {Object.entries(data.value).map((amen, index) => {
                            
                                return (amen[1] && amen[0] !== "__id") ? 
                                <div key={index} className="amenity">
                                  <Amenity amenity = {amen[0]} />
                                </div> : null
                        })}
                        <br />
                        </div>
                    </div> : <Loading />
                }}
            </FirestoreDocument>
          </div>
          }
          {showCalendar && 
          <div ref={calendar} className="card-img-overlay calendar-container" style={{height: "fit-content"}}>
            <FirestoreDocument path={`PricingPeriods/${props.item.uid}`}>
              {data => {
              return (!data.isLoading && data.value) ? 
                <CardCalendar id={props.item.uid} pricingPeriods={data.value}/>
                :<Loading />
              }}
            </FirestoreDocument>
          </div>

          }
          <Link  to={`/properties/${props.item.uid}`+dateURI}style={{position:"absolute", top:0, left:0, width:"100%", height:"100%", background:"transparent"}}></Link>
          <div className="card-slider-container" style={{backgroundColor: "grey", backgroundImage:`url(${bgImg})`}}>
  {!showSlider && <button type="button" data-role="none" className="slick-arrow slick-prev card-arrow"
 aria-label="Show Slider" style={{display: "block"}} onClick={() => setShowSlider(!showSlider)} onKeyDown={(e)=>{if(e.key === 'Enter'){setShowSlider(!showSlider)}}} ></button> }
  {!showSlider && <button type="button" data-role="none" className="slick-arrow slick-next card-arrow"
 aria-label="Show Slider" style={{display: "block"}} onClick={() => setShowSlider(!showSlider)} onKeyDown={(e)=>{if(e.key === 'Enter'){ setShowSlider(!showSlider)}}} ></button> }
          <div style={{position: "absolute", top: "0", left:"0", width:"100%", height:"100%"}}>
          {showSlider && <Slider {...settings}>
              {props.item.photos.map((photo, index) => {
                return (
                  <div key={index}>
                    <div className="prop-card-slider"  style={{backgroundImage:`url(${photo.url})`}}>
                    </div>
                  </div>
                
                )
              })
              }
            </Slider>
            }
          </div>
            <Card.Text>
              <small className="feature-text-type">{props.item.type}</small>
            </Card.Text>
          </div>
          <Card.ImgOverlay style={{position:"absolute", padding:"1rem", width: "100%", height:"unset", backgroundColor:"transparent", left:"0", bottom:"0", top:"auto", padding:0}}>
            <section className="section prop-card-text" style={{background:"linear-gradient(0deg, black 0%, rgba(0, 0, 0, 0) 100%)", color: "#fff", marginTop:0, height:"unset", paddingBottom: "3px"}}>
            <Link to={`/properties/${props.item.uid}`+dateURI}  style={{position:"relative", zIndex:"2", width: "100%", display:"block", height:"100%"}}>
              <Card.Title style={{textAlign:"center"}}><span className="prop-card-title" style={{fontSize:"1.8rem"}}>{props.item.name}</span></Card.Title>
              <div ref={description} style={{overflow:"hidden"}}>
              <Card.Text style={{fontSize: "0.8rem", padding:"0 0 15px 0"}}>
                  <span style={{textAlign: "center", display:"block"}}>{props.item.shortDescriptions ? props.item.shortDescriptions[lang] : props.item.shortDescription}</span>
                </Card.Text>
              </div>
              <BedBathPax bedrooms={props.item.bedrooms} bathrooms={props.item.bathrooms} baseGuests={props.item.baseGuests} color="rgba(256,256,256)"/>
              <div className="prop-card-description-ps">
                <small style={{float:"left"}}>{props.item.city}</small>
                <small style={{float:"right"}}>{t("From")} <span className="feature-text-price">{displayPrice}{props.item.currencySymbol} </span>/ {t("Night")}</small>
              </div>
              </Link>
              <Card.Footer className="prop-card-footer-container" style={{position: "absolute", bottom:0, left:0, color:"#000"}} ref={footer}>
                  <div className="footer-btn-container">
                    <div className="footer-btn" role="button" tabIndex="0" aria-label="Amenities" onClick={() => setShowAmenities(!showAmenities)} onKeyDown={(e)=>{if(e.key === 'Enter'){ setShowAmenities(!showAmenities)}}} style={showAmenities ? {backgroundColor: "#ffad77"}: {}}>
                      <FontAwesomeIcon icon={faList} style={{margin: "auto 20px", transform: "translateX(-50%)"}}/><small className="card-footer-btn-txt">{t("Amenities")}</small>
                    </div>
                  </div>
                  <div className="footer-btn-container">
                    <div className="footer-btn" role="button" tabIndex="0" aria-label="Gallery" onClick={()=> props.handleGalleryClick(props.item.photos)} onKeyDown={(e)=>{if(e.key === 'Enter'){ props.handleGalleryClick(props.item.photos)}}}>
                    <FontAwesomeIcon icon={faImages} style={{margin: "auto 20px", transform: "translateX(-50%)"}}/><small className="card-footer-btn-txt">{t("Gallery")}</small>
                    </div>
                  </div>
                  <div className="footer-btn-container">
                    <div className="footer-btn" role="button" tabIndex="0" aria-label="Calendar" onClick={()=>setShowCalendar(!showCalendar)} onKeyDown={(e)=>{if(e.key === 'Enter'){setShowCalendar(!showCalendar)}}} style={showCalendar ? {backgroundColor: "#ffad77"}: {}}>
                    <FontAwesomeIcon icon={faCalendarAlt} style={{margin: "auto 20px", transform: "translateX(-50%)"}}/><small className="card-footer-btn-txt">{t("Calendar")}</small>
                    </div>
                  </div>
                </Card.Footer> 
            </section>
          </Card.ImgOverlay>   
      </Card>
      }
      </div>
      )}

      const PropertyCard = connect(mapStateToProps)(PropertyCardComp)

      export default PropertyCard