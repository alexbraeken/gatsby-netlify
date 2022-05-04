import React,{useState, useEffect, useRef} from 'react'
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import {Row, Col, Container, Alert}from 'react-bootstrap'
import PropertyCard from '../components/PropertyCard'
import { gsap } from "gsap"
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import Loading from '../components/Loading'
import Select, {components} from 'react-select'
import BedBathPax from '../components/BedBathPax'
import DatePicker from '../components/DatePicker'
import StickyBox from "react-sticky-box"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFan, faDog, faWifi, faSwimmingPool, faTree} from '@fortawesome/free-solid-svg-icons';
import { GiBarbecue   } from "@react-icons/all-files/gi/GiBarbecue";
import { GrElevator   } from "@react-icons/all-files/gr/GrElevator";
import { FaWheelchair  } from "@react-icons/all-files/fa/FaWheelchair";
import { BsCheckCircle   } from "@react-icons/all-files/bs/BsCheckCircle";
import { IoIosArrowBack   } from "@react-icons/all-files/io/IoIosArrowBack";
import { IoIosArrowForward   } from "@react-icons/all-files/io/IoIosArrowForward";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Slider from "react-slick";

gsap.registerPlugin(gsap);
gsap.registerPlugin(ScrollTrigger);


const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      role="button"
      tabindex="0"
      className="custom-arrow"
      aria-label="previous"
      style={{left: "0%", zIndex:"5", height: "100%", width:"50px", position: "absolute", top: "50%", transform: "translateY(-50%)", display: "flex"}}
      onClick={onClick}
      onKeyDown={onClick}
    >
      <IoIosArrowBack style={{margin: "auto 5px", height: "40px", width:"40px", filter: "drop-shadow(1px 0px 2px white)"}}/>
    </div>
  );
}

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      role="button"
      tabindex="0"
      aria-label="next"
      className="custom-arrow"
      style={{right: "0%", zIndex:"5", height: "100%", width:"50px", position: "absolute", top: "50%", transform: "translateY(-50%)", display: "flex"}}
      onClick={onClick}
      onKeyDown={onClick}
    >
      <IoIosArrowForward style={{margin: "auto 5px", height: "40px", width:"40px", filter: "drop-shadow(1px 0px 2px white)"}}/>
    </div>
  );
}

const PropFeatureGrid = React.memo((data) => {

  const [propOptionsArray, setPropOptionsArray] = useState([])
  const [stickyStyle, setStickyStyle] = useState({position:"absolute"})
  const [bgImg, setBgImg] = useState(null)
  const [categories, setCategories] = useState(null)
  const [limit, setLimit] = useState(2)

  const container = useRef(null)
  const heroContainer = useRef(null)

  const {t} = useTranslation(['properties', 'translation', 'amenities', 'calendar']);

  useEffect(() => {

    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: document.body.offsetHeight + " " + document.body.offsetHeight,
      invalidateOnRefresh: true,
      onEnter: (self) => {
        console.log(self)
        ScrollTrigger.refresh();
      },
      onRefresh: () => {
        setLimit(limit+1)
        console.log(limit+1);
      }
  });

    return () => {
      setStickyStyle({position:"absolute"})
    }
  }, [])




  useEffect(()=>{

    let uniqueCategories = new Set()
    let propArray = data.propList.map(prop => {
      let details = {value: prop.uid, label: prop.name, picture: prop.picture, city: prop.city, guests: prop.baseGuests, bathrooms: prop.bathrooms, bedrooms: prop.bedrooms}
      uniqueCategories.add(prop.city)
      uniqueCategories.add(prop.type)
      return details
    })
    propArray.sort((a, b)=>(a === null)? 1 : ((b === null)? -1 : ((a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0))))
    setPropOptionsArray(propArray)

    setCategories([...uniqueCategories])

  }, [data.propList])

  useEffect(() => {

    if(data.heroBg){
      const imgLoader = new Image()
    
      imgLoader.src = data.heroBg.picture
  
      imgLoader.onload = () => {
        setBgImg(data.heroBg.picture)
      }
      gsap.utils.toArray(".parallax-hero-container").forEach((paraHero, i) => {
        paraHero.bg = paraHero.querySelector(".bg")
        let oh = paraHero.bg.offsetHeight
          gsap.to(paraHero.bg, {
            y: oh*0.2,
            ease: "none",
            scrollTrigger: {
              trigger: paraHero,
              scrub: true,
              start: "top top"
            }
          });
      })
    }
  }, [data.heroBg])

  const customStyles = {
    menu: () => ({
      width: "100%",
      overflowX: "hidden",
      position: "absolute",
      top: "40px",
      left: "0",
      zIndex: "20",
      backgroundColor: "white"
    }),
    menuList: () => ({
      width: "100%",
      maxHeight: "300px"
    })
  }

  const CustomOption = props => {
    const { data, innerRef, innerProps } = props;
    return (
      <Link to={`/properties/${data.value}`}>
      <div ref={innerRef} {...innerProps} className="nav-name-search">
        <div style={{flex:"1 1 30%"}}>
        <div>{data.label}</div>
        <div style={{
                height:"30px", 
                width:"30px", 
                borderRadius:"50%", 
                backgroundImage:`url('${data.picture}')`, 
                backgroundPosition:"center", 
                backgroundSize:"cover",
                margin: "auto 20px auto 10px"}}>
        </div>
        </div>
        <div style={{float:"right", margin: "auto"}}>
        <BedBathPax bedrooms={data.bedrooms} bathrooms={data.bathrooms} baseGuests={data.guests} color="rgba(0,0,0)"/>
          <div style={{ marginLeft: "auto auto auto 10px", color: "#ccc" }}>
            {data.city}
          </div>
        </div>
        </div> 
      </Link>   
    );
  };
  
  const onInputChange = (inputValue) => {
    if(window)window.location.href = `/properties/${inputValue}`
  }



  

  return(
    <div ref={container}>  
    <div style={{position: "absolute", top: "0", height: "100%", left: "50%", transform:"translateX(-50%)", zIndex: "10"}}>
      <StickyBox>
      <DatePicker from={data.state.searchArray.from ? data.state.searchArray.from[0] : null} to={data.state.searchArray.to ? data.state.searchArray.to[0] : null} 
        className="top-date-picker" style={stickyStyle} handleDateChange={data.handleDateChange} handleNewIds={data.handleNewIds} handleClearDates={data.handleClearDates}
        />
      </StickyBox>
    </div>
    { data.heroBg &&
    <div style={{
      width:"100%", 
      height: "80vh", 
      backgroundColor: "#333", 
      position:"relative",
      marginLeft: "-15px",
      width: "calc(100% + 30px)"}}>
      <div className="parallax-hero-container" style={{
        width:"100%", 
        height: "100%",
        position:"relative",
        overflow: "hidden"}} ref={heroContainer}>
        <div className="bg" style={{position: "absolute", left: "0", top:"0", width:"100%", height:"120%",  backgroundImage:`url(${bgImg})`, backgroundPosition:"center", backgroundSize:"cover", }}>
        </div>
      </div>
      <div style={{position: "absolute", left: "20px", top:"90%", transform:"translateY(-50%)", width:"100%"}}>
            <h3 className='home-section-title orangeText' style={{top: "-262px", opacity: "0.7", color:"#f5821e"}}>Featured</h3>
            <h2 className='home-section-title' style={{filter: "drop-shadow(2px 2px 15px black)", opacity:1}}><Link to={`/properties/${data.heroBg.uid}`}>{data.heroBg.name}</Link></h2>
        </div>
    </div>
    
    }
    <Container style={{padding:"50px 0"}}>
      <Row style={{paddingTop: "50px"}}>
      <Col xs={12} md={3} style={{margin: "auto 20px", display:"flex", padding: "5px"}}>
        {data.propList?.length > 0 ? 
          <div>
            <span className="text-muted">{data.propList.length} {t("Properties")}:</span>
            {data.amenitiesList && 
              <>
                <br />
                <div style={{display: "flex", flexWrap: "nowrap"}}>
                  {Object.keys(data.amenitiesList).map(amenity => {
                    switch(amenity){
                      case "hasPool":
                        return data.amenitiesList[amenity] ? <div className="icon-info amenity-icon"><FontAwesomeIcon icon={faSwimmingPool} style={{margin: "auto 5px"}}/><span className="tooltiptext amenity-tooltip" >Pool</span></div> : null
                      case "isWheelchairAccessible":
                        return data.amenitiesList[amenity] ? <div className="icon-info amenity-icon"><FaWheelchair style={{margin: "auto 5px"}}/><span className="tooltiptext amenity-tooltip" >Wheelchair Accessible</span></div> : null
                      case "allowsPets":
                        return data.amenitiesList[amenity] ? <div className="icon-info amenity-icon"><FontAwesomeIcon icon={faDog} style={{margin: "auto 5px"}}/><span className="tooltiptext amenity-tooltip" >Allows Pets</span></div> : null
                      case "hasAirConditioning":
                        return data.amenitiesList[amenity] ? <div className="icon-info amenity-icon"><FontAwesomeIcon icon={faFan} style={{margin: "auto 5px"}}/><span className="tooltiptext amenity-tooltip" >Air Conditioning</span></div> : null
                      case "hasBarbecue":
                        return data.amenitiesList[amenity] ? <div className="icon-info amenity-icon"><GiBarbecue style={{margin: "auto 5px"}}/><span className="tooltiptext amenity-tooltip" >Barbecue</span></div> : null
                      case "hasElevator":
                        return data.amenitiesList[amenity] ? <div className="icon-info amenity-icon"><GrElevator style={{margin: "auto 5px"}}/><span className="tooltiptext amenity-tooltip" >Elevator</span></div> : null
                      case "hasGarden":
                        return data.amenitiesList[amenity] ? <div className="icon-info amenity-icon"><FontAwesomeIcon icon={faTree} style={{margin: "auto 5px"}}/><span className="tooltiptext amenity-tooltip" >Garden</span></div> : null
                      case "hasInternetWifi":
                        return data.amenitiesList[amenity] ? <div className="icon-info amenity-icon"><FontAwesomeIcon icon={faWifi} style={{margin: "auto 5px"}}/><span className="tooltiptext amenity-tooltip" >Wifi</span></div> : null
                      default:
                    return data.amenitiesList[amenity] ? <div className="icon-info amenity-icon"><BsCheckCircle style={{margin: "auto 5px"}} /><span className="tooltiptext amenity-tooltip" >{amenity}</span></div> : null
                    }
                  })}
                </div>
              </>
            }
          </div>
        : <span className="text-muted">{t("No Properties Found")}</span>}
      </Col>
      <Col xs={12} md={6}>
        <div className="react-select__menu" style={{display:"none"}}></div>
          <Select 
          options={propOptionsArray}
          onChange={(e)=>onInputChange(e.value)}
          closeMenuOnSelect={true}
          components={{ Option: CustomOption }}
          placeholder={t("Properties")}
          styles={customStyles}
          className="react-select-container"
          classNamePrefix="react-select"/>
      </Col>
      </Row>
      {data.fetchError && 
      <Row>
        <Col>
          <div>
            <Alert variant={"warning"}>
              {t("Fetch Error")}
            </Alert>
          </div>
        </Col>
      </Row>
      }
    </Container>
    <div className="columns is-multiline" style={{margin:"auto", justifyContent:"center"}}>
      <br />
      {data.propList.map((item, index)=>{
        if(index > limit)return null
          if(item != null && (item.city=== category ||item.type=== category)){
            return(
              <PropertyCard item={item} index={index} key={`propCard-${index}`} handleGalleryClick={data.handleGalleryClick} dates={data.dates}/>
            )
          }
      })
      }
    </div>
  </div>
)})


export default PropFeatureGrid
