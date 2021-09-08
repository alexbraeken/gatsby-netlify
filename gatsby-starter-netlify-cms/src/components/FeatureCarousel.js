import React, {useState} from 'react'
import Carousel from 'react-bootstrap/Carousel'
import BedBathPax from './BedBathPax'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import SubmitButton from'./SubmitButton'
import { Helmet } from 'react-helmet'
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';

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
        </div>
      );
    }
  }

const FeatureCarousel = (props) => {

    const [index, setIndex] = useState(0);

    const {t} = useTranslation(['translation']);
    const {language} = useI18next();
    const lang = language === "en" ? "en_US" : `${language}_${language.toUpperCase()}`

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };


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
                      <h3 className="text-muted">{t('From')} <span className="feature-text-price">{prop.baseDailyRate}€ / {t('Night')}</span></h3>
                      <p>
                      {prop.descriptions ? prop.descriptions[lang] : prop.description}
                      </p>
                      </Container>
                    </Row>
                    <Row style={{marginTop:"10px"}}>
                      <Container style={{zIndex:1, width:"auto", display:"flex", justifyContent:"center"}}>
                        <SubmitButton text={t('View Property')} link={`/properties/${prop.uid}`}/>
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