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
    console.log(data.state.propType);
    console.log(data.state.bathrooms);
    console.log(data.state.bedrooms);
    console.log(data.state.filteredSearch);
    
    const list = data.gridItems.value.map((item, index) => {
      //if(data.state.city.includes(item.city) === data.state.filteredSearch)

      /*if((data.state.city.includes(item.city) === data.state.filteredSearch)
      && (data.state.propType.indexOf(item.type) === -1)
      && (data.state.bedrooms[0] <= parseInt(item.bedrooms))
      && (parseInt(item.bedrooms) <= data.state.bedrooms[1])
      && (data.state.bathrooms[0] <= parseInt(item.bathrooms)) 
      && (parseInt(item.bathrooms) <= data.state.bathrooms[1])){*/
        return item
    //}
  })

    if(data.sort === "price-min"){
      list.sort((a, b)=>(a.baseDailyRate > b.baseDailyRate) ? 1 : ((b.baseDailyRate > a.baseDailyRate) ? -1 : 0));
    }
    if(data.sort === "price-max"){
      list.sort((a, b)=>(a.baseDailyRate < b.baseDailyRate) ? 1 : ((b.baseDailyRate < a.baseDailyRate) ? -1 : 0));
    }
    if(data.sort === "bedrooms-min"){
      list.sort((a, b)=>(a.bedrooms > b.bedrooms) ? 1 : ((b.bedrooms > a.bedrooms) ? -1 : 0));
    }
    if(data.sort === "bedrooms-max"){
      list.sort((a, b)=>(a.bedrooms < b.bedrooms) ? 1 : ((b.bedrooms < a.bedrooms) ? -1 : 0));
    }

    setPropList(list)

    console.log(propList.length)
    return () => {
      //setPropList([])
    }
  }, [data])


  return(
  <div className="columns is-multiline" style={{margin:"auto", justifyContent:"center"}}>
    {propList.length> 0 && propList.map((item, index) => 
    {
      return(
      <PropertyCard item={item} data={data} index={index} key={index} handleGalleryClick={data.handleGalleryClick}/>)}
      )}
  </div>
)}


export default PropFeatureGrid
