import React from 'react'
import {Card} from 'react-bootstrap'

const PropFeatureGrid = ({ gridItems }) => (
  <div className="columns is-multiline" style={{margin:"auto", justifyContent:"center"}}>
    {gridItems.map((item, index) => (
      <Card key={index} className="bg-dark text-white" style={{maxWidth:"1000px", minWidth:"300px", width:"100%", height:"400px",}}>
        <Card.Img src={item.picture}/>
        <Card.ImgOverlay>
        <section className="section">
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>{item.description}</Card.Text>
        </section>
        </Card.ImgOverlay>   
      </Card>
    ))}
  </div>
)


export default PropFeatureGrid
