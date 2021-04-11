import React, {useState} from 'react'
import Carousel from 'react-bootstrap/Carousel'
import BedBathPax from './BedBathPax'
import { Link } from 'gatsby'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import SubmitButton from'./SubmitButton'
import { Helmet } from 'react-helmet'

class CustomSlide extends React.Component {
    render() {
      
      return (
        <div style={{backgroundImage: `url(${this.props.backgroundImage})`,
        minHeight: "70vmin",
        height: "100%",
        margin: "0px auto",
        overflow: "hidden",
        position: "relative",
        backgroundSize:"cover",
        backgroundPosition:"center"}}>
          <h3></h3>
        </div>
      );
    }
  }

const FeatureCarousel = (props) => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };

    const nextIcon = <span aria-hidden="true" className="carousel-control-next-icon feature-next-icon" />
    const prevIcon = <span aria-hidden="true" className="carousel-control-prev-icon feature-prev-icon" />

    return (
      <>
        <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
            {props.properties?.map((prop, index)=>{
                return (props.ids.indexOf(prop.uid)!== -1)?
                <Carousel.Item key={index}>
                  <Row className="home-feature">
                  <Col xs={12} md={6} lg={9} className="home-feature-image">
                <CustomSlide backgroundImage={prop.picture} key={index}/>
                <Carousel.Caption style={{width:"100%", left:0, background:"rgba(0,0,0,0.5)", bottom:0}}>
                <Link to={`/properties/${prop.uid}`}><h3>{prop.name}</h3></Link>
                <BedBathPax bedrooms={prop.bedrooms} bathrooms={prop.bathrooms} baseGuests={prop.baseGuests} color="rgba(256,256,256)"/>
                </Carousel.Caption>
                </Col>
                <Col xs={12} md={6} lg={3} className="home-feature-description">
                  <div className="home-feature-text">
                    <Row>
                      <Container>
                      <h3 className="text-muted">From <span className="feature-text-price">{prop.baseDailyRate}€ / Day</span></h3>
                      <p>
                      {prop.description}
                      </p>
                      </Container>
                    </Row>
                    <Row style={{marginTop:"10px"}}>
                      <Container style={{zIndex:1, width:"auto", display:"flex", justifyContent:"center"}}>
                        <SubmitButton text="View Property" link={`/properties/${prop.uid}`}/>
                      </Container>
                    </Row>
                  </div>
                </Col>
                </Row>
            </Carousel.Item> : null
            })}
        </Carousel>
        <Helmet>
          <style>
            {`.carousel .carousel-control-next, .carousel .carousel-control-prev{
            width: 9%
            }`}
          </style>
        </Helmet>
        </>
    )
}

export default FeatureCarousel 