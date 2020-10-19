import React, { useState } from 'react'
import {Card} from 'react-bootstrap'
import { Link } from "@reach/router";
import Col from 'react-bootstrap/Col'
import PropertyCard from '../components/PropertyCard';

const PropFeatureGrid = (data) => {
  
  const filteredSearch = data.state.filteredSearch;

  return(
  <div className="columns is-multiline" style={{margin:"auto", justifyContent:"center"}}>
    {data.gridItems.value.map((item, index) => (
      data.state.city.includes(item.city) === filteredSearch 
      && data.state.propType.indexOf(item.type) === -1
      && data.state.bedrooms[0] <= parseInt(item.bedrooms) 
      && parseInt(item.bedrooms) <= data.state.bedrooms[1]
      && data.state.bathrooms[0] <= parseInt(item.bathrooms) 
      && parseInt(item.bathrooms) <= data.state.bathrooms[1]  ?
      <PropertyCard item={item} data={data} index={index} key={index}/>: null ))}
  </div>
)}


export default PropFeatureGrid
