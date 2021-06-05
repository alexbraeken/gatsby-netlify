import React,{useState, useEffect, useRef} from 'react'
import { Link } from 'gatsby'
import {Row, Col, Container}from 'react-bootstrap'
import PropertyCard from '../components/PropertyCard'
import PropCardTest from '../components/PropCardTest'
import { gsap } from "gsap"
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import Loading from '../components/Loading'
import Select, {components} from 'react-select'
import BedBathPax from '../components/BedBathPax'
import DatePicker from '../components/DatePicker'
import StickyBox from "react-sticky-box"

gsap.registerPlugin(gsap);

const PropFeatureGrid = React.memo((data) => {

  const [propList, setPropList] = useState([data.gridItems.value])
  const [propOptionsArray, setPropOptionsArray] = useState([])
  const [advancedSearch, setAdvancedSearch] = useState(false)
  const [displayNumber, setDisplayNumber] = useState(20)
  const [loadMoreTop, setLoadMoreTop] = useState(null)
  const [infoSelectTopStyle, setInfoSelectTopStyle] = useState({})
  const [stickyStyle, setStickyStyle] = useState({position:"absolute"})

  const loadMore = useRef(null)
  const container = useRef(null)
  const datePicker = useRef(null)


  useEffect(() => {
    setLoadMoreTop(loadMore.current.getBoundingClientRect().top)
    setInfoSelectTopStyle(data.state.searchArray.from && data.state.searchArray.to ? {paddingTop: "40px"} : {})
    return () => {
      setLoadMoreTop(null)
      setInfoSelectTopStyle({})
      setStickyStyle({position:"absolute"})
    }
  }, [])

  useEffect(() => {
    setInfoSelectTopStyle(data.state.searchArray.from && data.state.searchArray.to ? {paddingTop: "40px"} : {})
  }, [data.state.searchArray])

  useEffect(() => {
    if(data.propertyIds){(data.propertyIds.length>0) ? setAdvancedSearch(true) : setAdvancedSearch(false)}
    return () => {
      setAdvancedSearch(false)
    }
  }, [data.propertyIds])

  useEffect(()=>{
    let propArray = propList.map(prop => {
      let details = {value: prop.uid, label: prop.name, picture: prop.picture, city: prop.city, guests: prop.baseGuests, bathrooms: prop.bathrooms, bedrooms: prop.bedrooms}
      return details
    })
    propArray.sort((a, b)=>(a === null)? 1 : ((b === null)? -1 : ((a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0))))
    setPropOptionsArray(propArray)
  }, [propList])


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


  useEffect(() => {

    const amenities = []
    Object.keys(data.amenitiesList).forEach(amenity => {
      return data.amenitiesList[amenity] ? amenities.push(amenity) : null
    })


    const list = []
    data.gridItems.value.forEach((item, index) => {
      let amenityBool = []
      
      if(amenities.length > 0 && item.amenities){
        amenities.forEach(amenity => {
          amenityBool.push(item.amenities[`${amenity}`])
        })
      }else{
        amenityBool.push(true)
      }
      if((data.state.city[item.city])
      && (data.state.type[item.type])
      && (data.state.bedrooms[0] <= parseInt(item.bedrooms))
      && (parseInt(item.bedrooms) <= data.state.bedrooms[1])
      && (data.state.bathrooms[0] <= parseInt(item.bathrooms)) 
      && (parseInt(item.bathrooms) <= data.state.bathrooms[1])
      && (advancedSearch === (data.propertyIds.indexOf(item.uid) !== -1))
      && !amenityBool.includes(false)){  
        list.push(item)
    } 
  })
  

    if(data.sort === "price-min"){
      list.sort((a, b)=>(a === null)? 1 : ((b === null)? -1 : ((a.baseDailyRate > b.baseDailyRate) ? 1 : ((b.baseDailyRate > a.baseDailyRate) ? -1 : 0))));
    }
    if(data.sort === "price-max"){
      list.sort((a, b)=>(a === null)? 1 : ((b === null)? -1 : ((a.baseDailyRate < b.baseDailyRate) ? 1 : ((b.baseDailyRate < a.baseDailyRate) ? -1 : 0))));
    }
    if(data.sort === "bedrooms-min"){
      list.sort((a, b)=>(a === null)? 1 : ((b === null)? -1 : ((a.bedrooms > b.bedrooms) ? 1 : ((b.bedrooms > a.bedrooms) ? -1 : 0))));
    }
    if(data.sort === "bedrooms-max"){
      list.sort((a, b)=>(a === null)? 1 : ((b === null)? -1 : ((a.bedrooms < b.bedrooms) ? 1 : ((b.bedrooms < a.bedrooms) ? -1 : 0))));
    }
    if(data.sort === "a-z"){
      list.sort((a, b)=>(a === null)? 1 : ((b === null)? -1 : ((a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))));
    }
    if(data.sort === "z-a"){
      list.sort((a, b)=>(a === null)? 1 : ((b === null)? -1 : ((a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0))));
    }

    setPropList(list)
    return () => {
      setPropList([])
    }
  }, [data, advancedSearch])

  useScrollPosition(({ prevPos, currPos }) => {
    if(loadMoreTop){
      if(1000 > loadMore.current.getBoundingClientRect().top){
        if(displayNumber !== propList?.length)setDisplayNumber((displayNumber + 20) > propList?.length ? propList.length : displayNumber +20)
      }
    }
  })

  

  return(
    <div ref={container}>
      {data.state.searchArray.from && data.state.searchArray.to &&
    <div style={{position: "absolute", top: "0", height: "100%", left: "50%", transform:"translateX(-50%)", zIndex: "10"}}>
      <StickyBox>
      <DatePicker from={data.state.searchArray.from[0]} to={data.state.searchArray.to[0]} 
        className="top-date-picker" style={stickyStyle} handleDateChange={data.handleDateChange} handleNewIds={data.handleNewIds} handleTotalDays={data.handleTotalDays} handleClearDates={data.handleClearDates}
        />
      </StickyBox>
    </div>
         }
    <Container>
      <Row style={infoSelectTopStyle}>
      <Col xs={12} md={3} style={{margin: "auto 20px", display:"flex", padding: "5px"}}>
        {propList?.length > 0 ? <span className="text-muted">{propList.length} Properties:</span>: <span className="text-muted">No Properties Found</span>}
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
      {propList && propList.map((item, index) => 
      {    
        if(index > displayNumber)return null
        if(item != null){
          return(
            <PropertyCard item={item} index={index} key={index} handleGalleryClick={data.handleGalleryClick} dates={data.dates}/>
            )}
        })
        }
        <div style={{flex: "1 1 100%", display: "flex", justifyContent:"center"}}>
          <div ref={loadMore}>{displayNumber !== propList?.length ? <Loading />:null}
          </div>
        </div>
    </div>
  </div>
)})


export default PropFeatureGrid
