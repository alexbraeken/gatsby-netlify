import React,{useState, useEffect} from 'react'
import {Card} from 'react-bootstrap'
import { Link } from "@reach/router";
import Col from 'react-bootstrap/Col'
import PropertyCard from '../components/PropertyCard';

const PropFeatureGrid = (data) => {

  const [propList, setPropList] = useState([])
  /*const [filteredSearch, setFilteredSearch] = useState()*/


  useEffect(() => {
    console.log(data.state.city);
    
    const list = data.gridItems.value.map((item, index) => {
      console.log("new prop: " +index)
      console.log(data.state.city.includes(item.city) === data.state.filteredSearch)
      console.log("end prop")
      if((data.state.city.includes(item.city) === data.state.filteredSearch)
      && (data.state.propType.indexOf(item.type) === -1)
      && (data.state.bedrooms[0] <= parseInt(item.bedrooms))
      && (parseInt(item.bedrooms) <= data.state.bedrooms[1])
      && (data.state.bathrooms[0] <= parseInt(item.bathrooms)) 
      && (parseInt(item.bathrooms) <= data.state.bathrooms[1])){
        console.log("found " + index)
        return item
    }
  })

  setPropList(list)

    return () => {
      setPropList([])
    }
  }, [data.state.city, data.state.propType, data.state.bathrooms, data.state.bedrooms, data.state.filteredSearch])



  useEffect(() => {

    const list = propList;

    if(data.sort === "price-min"){
      list.sort((a, b)=>(a.item.baseDailyRate > b.item.baseDailyRate) ? 1 : ((b.item.baseDailyRate > a.item.baseDailyRate) ? -1 : 0));
    }
    if(data.sort === "price-max"){
      list.sort((a, b)=>(a.item.baseDailyRate < b.item.baseDailyRate) ? 1 : ((b.item.baseDailyRate < a.item.baseDailyRate) ? -1 : 0));
    }
    if(data.sort === "bedrooms-min"){
      list.sort((a, b)=>(a.item.bedrooms > b.item.bedrooms) ? 1 : ((b.item.bedrooms > a.item.bedrooms) ? -1 : 0));
    }
    if(data.sort === "bedrooms-max"){
      list.sort((a, b)=>(a.item.bedrooms < b.item.bedrooms) ? 1 : ((b.item.bedrooms < a.item.bedrooms) ? -1 : 0));
    }

    setPropList(list)

    return () => {
      setPropList([])
    }
  }, [data.sort, data.state.filteredSearch])


  return(
  <div className="columns is-multiline" style={{margin:"auto", justifyContent:"center"}}>
    {propList.map((item, index) => 
    {
      return(
      <PropertyCard item={item} data={data} index={index} key={index} handleGalleryClick={data.handleGalleryClick}/>)}
      )}
  </div>
)}


export default PropFeatureGrid
