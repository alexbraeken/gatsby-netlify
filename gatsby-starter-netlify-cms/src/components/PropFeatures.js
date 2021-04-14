import React,{useState, useEffect, useRef} from 'react'
import {Card} from 'react-bootstrap'
import { Link } from "@reach/router";
import {Col, Row, Container}from 'react-bootstrap'
import PropertyCard from '../components/PropertyCard';
import { gsap } from "gsap";
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import Loading from '../components/Loading'

gsap.registerPlugin(gsap);

const PropFeatureGrid = React.memo((data) => {

  const [propList, setPropList] = useState([data.gridItems.value])
  const [advancedSearch, setAdvancedSearch] = useState(false)
  const [displayNumber, setDisplayNumber] = useState(20)
  const [loadMoreTop, setLoadMoreTop] = useState(null)

  const loadMore = useRef(null)


  useEffect(() => {
    setLoadMoreTop(loadMore.current.getBoundingClientRect().top)
    return () => {
      setLoadMoreTop(null)
    }
  }, [])

  useEffect(() => {
    if(data.propertyIds){(data.propertyIds.length>0) ? setAdvancedSearch(true) : setAdvancedSearch(false)}
    return () => {
      setAdvancedSearch(false)
    }
  }, [data.propertyIds])

  

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
      console.log(loadMore.current.getBoundingClientRect().top)
      if(1000 > loadMore.current.getBoundingClientRect().top){
        if(displayNumber !== propList?.length)setDisplayNumber((displayNumber + 20) > propList?.length ? propList.length : displayNumber +20)
        console.log(displayNumber)
      }
    }
  })
  


  return(
    <>
    <Container>
      <Row>{propList?.length > 0 ? <h4>{propList.length} Properties:</h4>: <h4>No Properties Found</h4>}</Row>
    </Container>
    <div className="columns is-multiline" style={{margin:"auto", justifyContent:"center"}}>
      <br />
      {propList && propList.map((item, index) => 
      {    
        if(index > displayNumber)return null
        if(item != null){
          let winterLet = false
        if(data.winterLets.indexOf(item.uid)!== -1){
          winterLet = true
        }
          return(
            <PropertyCard item={item} index={index} key={index} handleGalleryClick={data.handleGalleryClick} winterLet={winterLet} dates={data.dates}/>
            )}
        })
        }
        <div style={{flex: "1 1 100%", display: "flex", justifyContent:"center"}}>
          <div ref={loadMore}>{displayNumber !== propList?.length ? <Loading />:null}
          </div>
        </div>
    </div>
  </>
)})


export default PropFeatureGrid
