import React from 'react'
import {Card} from 'react-bootstrap'
import { Link } from "@reach/router";

const PropFeatureGrid = (data) => (
  <div className="columns is-multiline" style={{margin:"auto", justifyContent:"center"}}>
    {data.gridItems.value.map((item, index) => (
      data.state.city.indexOf(item.city) == -1 && data.state.propType.indexOf(item.propType) == -1? 
        <Link to={`/properties/${data.gridItems.ids[index]}`} key={index}>
        <Card className="bg-dark text-white" style={{maxWidth:"1000px", minWidth:"300px", width:"100%", height:"400px", backgroundImage: `url(${item.picture})`, backgroundPosition: "center", backgroundSize:"cover", border:"none", margin:"10px auto"}}>
          <Card.ImgOverlay style={{backgroundColor:"rgba(0,0,0,0.5)"}}>
          <section className="section">
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
              {item.description}
              <br />
              {item.city}
            </Card.Text>
          </section>
          </Card.ImgOverlay>   
        </Card>
      </Link> : null
      
    ))}
  </div>
)


export default PropFeatureGrid
