import React, {useState, useEffect} from 'react'
import Carousel from 'react-bootstrap/Carousel'
import BedBathPax from './BedBathPax'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import SubmitButton from'./SubmitButton'
import { Helmet } from 'react-helmet'
import {Link, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';

class CustomSlide extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      src: null,
    };
  }

  componentDidMount () {
    const src  = this.props.backgroundImage;

    const imageLoader = new Image();
    imageLoader.src = src;

    imageLoader.onload = () => {
      this.setState({ src });
    };
  }

    render() {
      
      return (
        <div style={{
          backgroundColor: "grey", 
          backgroundImage: `url(${this.state.src})`,
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
    const [properties, setProperties] = useState(null)
    

    const {t} = useTranslation(['translation']);
    const {language} = useI18next();
    const lang = language === "en" ? "en_US" : `${language}_${language.toUpperCase()}`

    useEffect(() => {
      setProperties(props.properties)
      return () => {
        setProperties(null)
      }
    }, [props.properties])

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };


    return (
     
      <>
        {properties &&
        <>
          <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
              {Object.keys(properties).map((prop, index)=>{
                  return (
                  <Carousel.Item key={index}>
                    <Row className="home-feature" style={{padding:"0"}}>
                    <Col xs={12} md={6} lg={9} className="home-feature-image">
                  <CustomSlide backgroundImage={properties[prop].picture} key={index}/>
                  <Carousel.Caption style={{width:"100%", left:0, background:"rgba(0,0,0,0.5)", bottom:0, background:"linear-gradient(0deg, black, rgba(0,0,0,0))"}}>
                  <Link to={`/properties/${properties[prop].uid}`}><h3>{properties[prop].name}</h3></Link>
                  <BedBathPax bedrooms={properties[prop].bedrooms} bathrooms={properties[prop].bathrooms} baseGuests={properties[prop].baseGuests} color="rgba(256,256,256)"/>
                  </Carousel.Caption>
                  </Col>
                  <Col xs={12} md={6} lg={3} className="home-feature-description">
                    <div className="home-feature-text">
                      <Row>
                        <Container>
                        <h3 className="text-muted">{t('From')} <span className="feature-text-price">{properties[prop].baseDailyRate}{properties[prop].currencySymbol} / {t('Night')}</span></h3>
                        <p>
                        {properties[prop].descriptions ? properties[prop].descriptions[lang] : properties[prop].description}
                        </p>
                        </Container>
                      </Row>
                      <Row style={{marginTop:"10px"}}>
                        <Container style={{zIndex:1, width:"auto", display:"flex", justifyContent:"center"}}>
                          <SubmitButton text={t('View Property')} link={`/properties/${properties[prop].uid}`}/>
                        </Container>
                      </Row>
                    </div>
                  </Col>
                  </Row>
              </Carousel.Item>)
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
        }
      </>
    )
}

export default FeatureCarousel 