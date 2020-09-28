import React, { useState } from 'react'
import {Card} from 'react-bootstrap'
import { Link } from "@reach/router";
import Col from 'react-bootstrap/Col'
import PropertyCard from '../components/PropertyCard';

const PropFeatureGrid = (data) => {
  
  return(
  <div className="columns is-multiline" style={{margin:"auto", justifyContent:"center"}}>
    {data.gridItems.value.map((item, index) => (
      data.state.city.indexOf(item.city) == -1 && data.state.propType.indexOf(item.propType) == -1 ?
      <PropertyCard item={item} data={data} index={index} key={index}/> : null ))}
  </div>
)}


export default PropFeatureGrid
