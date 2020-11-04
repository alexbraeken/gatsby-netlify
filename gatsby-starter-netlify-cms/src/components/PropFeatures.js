import React,{useState, useEffect} from 'react'
import {Card} from 'react-bootstrap'
import { Link } from "@reach/router";
import Col from 'react-bootstrap/Col'
import PropertyCard from '../components/PropertyCard';
import { gsap } from "gsap";

gsap.registerPlugin(gsap);

const PropFeatureGrid = (data) => {

  const [propList, setPropList] = useState([data.gridItems.value])

  useEffect(() => {
    
    const list = data.gridItems.value.map((item, index) => {
      if((data.state.city[item.city])
      && (data.state.type[item.type])
      && (data.state.bedrooms[0] <= parseInt(item.bedrooms))
      && (parseInt(item.bedrooms) <= data.state.bedrooms[1])
      && (data.state.bathrooms[0] <= parseInt(item.bathrooms)) 
      && (parseInt(item.bathrooms) <= data.state.bathrooms[1])){  
        return item
    } else { return null}
  })

    if(data.sort === "price-min"){
      console.log(data.sort)
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
  }, [data])


  return(
  <div className="columns is-multiline" style={{margin:"auto", justifyContent:"center"}}>
    {propList && propList.map((item, index) => 
    {    
      if(item != null){
        let winterLet = false
      if(data.winterLets.indexOf(item.uid)!== -1){
        console.log(item.uid)
        winterLet = true
      }
        return(
          <PropertyCard item={item} data={data} index={index} key={index} handleGalleryClick={data.handleGalleryClick} winterLet={winterLet}/>
          )}
      })
      }
  </div>
)}


export default PropFeatureGrid
