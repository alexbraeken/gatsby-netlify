import React,{useState, useEffect, useRef} from 'react'
import { Link } from 'gatsby'
import {Row, Col, Container}from 'react-bootstrap'
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

gsap.registerPlugin(gsap);

const PropFeatureGrid = React.memo((data) => {

  const [propOptionsArray, setPropOptionsArray] = useState([])
  const [displayNumber, setDisplayNumber] = useState(20)
  const [loadMoreTop, setLoadMoreTop] = useState(null)
  const [stickyStyle, setStickyStyle] = useState({position:"absolute"})

  const loadMore = useRef(null)
  const container = useRef(null)


  useEffect(() => {
    setLoadMoreTop(loadMore.current.getBoundingClientRect().top)
    return () => {
      setLoadMoreTop(null)
      setStickyStyle({position:"absolute"})
    }
  }, [])

  useEffect(()=>{
    let propArray = data.propList.map(prop => {
      let details = {value: prop.uid, label: prop.name, picture: prop.picture, city: prop.city, guests: prop.baseGuests, bathrooms: prop.bathrooms, bedrooms: prop.bedrooms}
      return details
    })
    propArray.sort((a, b)=>(a === null)? 1 : ((b === null)? -1 : ((a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0))))
    setPropOptionsArray(propArray)
  }, [data.propList])


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


  

  useScrollPosition(({ prevPos, currPos }) => {
    if(loadMoreTop){
      if(1000 > loadMore.current.getBoundingClientRect().top){
        if(displayNumber !== data.propList?.length){
          setDisplayNumber((displayNumber + 20) > data.propList?.length ? data.propList.length : displayNumber +20)
        }
      }
    }
  })

  useEffect(() => {
    data.handleDisplayNumChange(displayNumber)
  }, [displayNumber])

  

  return(
    <div ref={container}>  
    <div style={{position: "absolute", top: "0", height: "100%", left: "50%", transform:"translateX(-50%)", zIndex: "10"}}>
      <StickyBox>
      <DatePicker from={data.state.searchArray.from ? data.state.searchArray.from[0] : null} to={data.state.searchArray.to ? data.state.searchArray.to[0] : null} 
        className="top-date-picker" style={stickyStyle} handleDateChange={data.handleDateChange} handleNewIds={data.handleNewIds} handleClearDates={data.handleClearDates}
        />
      </StickyBox>
    </div>
    <Container>
      <Row style={{paddingTop: "50px"}}>
      <Col xs={12} md={3} style={{margin: "auto 20px", display:"flex", padding: "5px"}}>
        {data.propList?.length > 0 ? 
        <div>
          <span className="text-muted">{data.propList.length} Properties:</span>
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
        : <span className="text-muted">No Properties Found</span>}
      </Col>
      <Col xs={12} md={6}>
          <Select 
          options={propOptionsArray}
          onChange={(e)=>onInputChange(e.value)}
          closeMenuOnSelect={true}
          components={{ Option: CustomOption }}
          placeholder="Properties"
          styles={customStyles}/>
      </Col>
      </Row>
    </Container>
    <div className="columns is-multiline" style={{margin:"auto", justifyContent:"center"}}>
      <br />
      {data.propList && data.propList.map((item, index) => 
      {    
        if(index > displayNumber)return null
        if(item != null){
          return(
            <PropertyCard item={item} index={index} key={index} handleGalleryClick={data.handleGalleryClick} dates={data.dates}/>
            )}
        })
        }
        <div style={{flex: "1 1 100%", display: "flex", justifyContent:"center"}}>
          <div ref={loadMore} id="loadMore">{displayNumber !== data.propList?.length ? <Loading />:null}
          </div>
        </div>
    </div>
  </div>
)})


export default PropFeatureGrid
