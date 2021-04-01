import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Features from '../components/Features'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import {Container, Col, Row} from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import ActivitiesRoll from '../components/ActivitiesRoll'

class CustomSlide extends React.Component {
  render() {
    
    return (
      <div style={{backgroundImage: `url(${this.props.slide.slide? this.props.slide.slide.childImageSharp.fluid.src: null})`,
      minHeight: "400px",
      height: "50vh",
      width:"100vw",
      margin: "0px auto",
      overflow: "hidden",
      position: "relative",
      backgroundSize:"cover",
      backgroundPosition:"center",
      padding: "40px"}}>
          <div className="slide__content">
              <svg className="slide__overlay small-overlay" preserveAspectRatio="xMaxYMax slice" viewBox="0 0 720 405"> 
              <path className="slide__overlay-path" d="M0,0 150,0 300,405 0,405"></path> 
              </svg>
              <div className="slide__text">
              <h2 className="slide__text-heading">{this.props.slide.title}</h2>
              </div>
              </div>
        <h3></h3>
    <p></p>
      </div>
    );
  }
}

export const LocationPageTemplate = ({
  image,
  title,
  location,
  part1,
  part2,
  part3,
}) => {

  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
    

  const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };

  
      useEffect(() => {
        setTimeout(()=>{
          setLoaded(true)}, 1000
          )
        return () => {
          setLoaded(false)
        }
      }, [])


      const collage = part1.collage.collage ? [{img: part1.collage.img1.img, title: part1.collage.img1.title}, 
        {img: part1.collage.img2.img, title: part1.collage.img2.title}, 
        {img: part1.collage.img3.img, title: part1.collage.img3.title},
        {img: part1.collage.img4.img, title: part1.collage.img4.title},
        {img: part1.collage.img5.img, title: part1.collage.img5.title},] : null

    const slides = part2.slider.slider ? [{slide: part2.slider.img1.img, title: part2.slider.img1.title}, 
      {slide: part2.slider.img2.img, title: part2.slider.img2.title}, 
      {slide: part2.slider.img3.img, title: part2.slider.img3.title}] : null


    const nextIcon = <span aria-hidden="true" className="carousel-control-next-icon feature-next-icon" />
    const prevIcon = <span aria-hidden="true" className="carousel-control-prev-icon feature-prev-icon" />

  return(
  <div className="content newLine">
    <div
      className="full-width-image-container margin-top-0 gradient-bg"
      style={{
        backgroundImage: `url(${
          image.publicURL
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <h2
        className={`has-text-weight-bold is-size-1 content-header ${loaded? "loaded" : ""}`}
        style={{color: "white"}}>
        {title}
      </h2>
    </div> 
    <section style={{
        paddingBottom: "100px",
        position: "relative"}}>
      <Container>
        <div className="section">
          <Row>
          <Col xs={12} md={6} style={{display:"flex", flexWrap:"wrap", padding: "50px 0", zIndex: "1"}}>
          <div className="intro-para" style={{margin: "auto"}}>
              <h3 className="has-text-weight-semibold is-size-2">{part1.header}</h3>
              <p>{part1.text}</p>
              </div>
            </Col>
            {collage && 
            <Col md={12} lg={6}>
              <div style={{display:"flex", flexWrap:"wrap", width:"100%"}}>
                {collage.map((img, index)=>{
                  return (
                  <div className="mason-image">
                    <PreviewCompatibleImage  imageInfo={img.img} key={index} imgStyle={{borderRadius: "5px", height:"250px", flexGrow:"1"}}/>
                    <div className="mason-title">
                      <h3>{img.title}</h3>
                    </div>
                    <div style={{ 
          width: "100%",
          position: "absolute",
          top: "auto",
          bottom: "0",
          right: "0",
          height: "100px",
          zIndex: "1",
          transform: "translateZ(0)"}} data-front="" data-style="curve_asym" data-position="bottom">
            <svg className="mason-title-area" fill="#f5821e" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" style={{
              width: "100%",
              left: "0",
              bottom: "-1px",
              height: "100%",
              position: "absolute",
            }}> 
            <path></path> 
            </svg>
            </div>
                  </div>
                  )
                })
                }
              </div>
            </Col>}
            {!collage && part1.img && 
            <Col md={12} lg={6}>
                <PreviewCompatibleImage imageInfo={part1.img} imgStyle={{borderRadius: "5px", marginLeft: "-150px", marginRight: "-150px"}}/>
            </Col>}
          </Row>
        </div>
      </Container>
      <div style={{ 
          width: "100vw",
          position: "absolute",
          top: "auto",
          bottom: "0",
          right: "0",
          height: "100px",
          zIndex: "1",
          transform: "translateZ(0)"}} data-front="" data-style="curve_asym" data-position="bottom">
            <svg fill="#f5821e" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" style={{
              width: "100%",
              left: "0",
              bottom: "-1px",
              height: "100%",
              position: "absolute",
            }}> 
            <path d="M0 100 C 20 0 50 0 100 100 Z"></path> 
            </svg>
            </div>
    </section>
    <section style={{
        paddingBottom: "100px",
        width: "100vw",
        position: "relative",
        marginLeft: "-50vw",
        left: "50%",
        backgroundColor:"#f5821e"}}>
          
      <Container>
        <Row>
          {slides ?
          <Col md={12} lg={6}>
              <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
                  {slides.map((slide, index) => {
                      return<Carousel.Item key={index}>
                          <Row>
                              <CustomSlide slide={slide} key={index}/>
                          </Row>
              </Carousel.Item>
                  })}
              </Carousel>
          </Col>
          : 
          <>
          {part2.img ?
            <Col md={12} lg={6}>
              <PreviewCompatibleImage imageInfo={part2.img} />
            </Col>
            : 
            null
            }
          </>
          }
          <Col style={{display:"flex"}}>
          <div style={{margin:"auto"}} >
            <h3 className="has-text-weight-semibold is-size-2" style={{textAlign: "center"}}>{part2.header}</h3>
            <p>
              {part2.text}
            </p>
          </div>
          </Col>
        </Row>
      </Container>
      <div style={{ 
          width: "100vw",
          position: "absolute",
          top: "auto",
          bottom: "0",
          right: "0",
          height: "100px",
          zIndex: "1",
          transform: "translateZ(0)"}} data-front="" data-style="curve_asym" data-position="bottom">
            <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" style={{
              width: "100%",
              left: "0",
              bottom: "-1px",
              height: "100%",
              position: "absolute",
            }}> 
            <path d="M0 100 C 50 0 75 100 100 75 L 100 100 Z"></path> 
            </svg>
            </div>
    </section>
    {part3 && 
    <section style={{
        paddingBottom: "50px",
        position: "relative"}}>
      <Container>
        <Row>
        <h3 className="has-text-weight-semibold is-size-2">{part3.header}</h3>
          <p>
            {part3.text}
          </p>
        </Row>
      </Container>
    </section>
    }
    <section>
      <Container style={{textAlign: "center"}}>
      <ActivitiesRoll location={location} type="Restaurant"/>
        <br />
        <ActivitiesRoll location={location}/>
        <br />
        <h4>For a full list of activities nearby, checkout our activities list <a href="/travelerTips"><span style={{color:"#f5821e"}}>here!</span></a></h4>
      </Container>
    </section>
  </div>
)}

LocationPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  location: PropTypes.string,
  part1:  PropTypes.shape({
    header: PropTypes.string,
    text: PropTypes.string,
    collage: PropTypes.object,
    img: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
  part2: PropTypes.shape({
    header: PropTypes.string,
    text: PropTypes.string,
    slider: PropTypes.object,
    img: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
  part3: PropTypes.shape({
    header: PropTypes.string,
    text: PropTypes.string,
    img: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  })
}

const LocationPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <LocationPageTemplate
        image={frontmatter.image}
        location={frontmatter.location}
        title={frontmatter.title}
        part1={frontmatter.part1}
        part2={frontmatter.part2}
        part3={frontmatter.part3}
      />
    </Layout>
  )
}

LocationPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default LocationPage

export const LocationPageQuery = graphql`
  query LocationPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        location
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
          publicURL
        }
        part1 {
          header
          text
          collage {
            collage
            img1 {
              title
              img {
                childImageSharp {
                  fluid(maxWidth: 700, quality: 90) {
                    ...GatsbyImageSharpFluid
                  }
                }
                publicURL
              }
            }
            img2 {
              title
              img {
                childImageSharp {
                  fluid(maxWidth: 700, quality: 90) {
                    ...GatsbyImageSharpFluid
                  }
                }
                publicURL
              }
            }
            img3 {
              title
              img {
                childImageSharp {
                  fluid(maxWidth: 700, quality: 90) {
                    ...GatsbyImageSharpFluid
                  }
                }
                publicURL
              }
            }
            img4 {
              title
              img {
                childImageSharp {
                  fluid(maxWidth: 700, quality: 90) {
                    ...GatsbyImageSharpFluid
                  }
                }
                publicURL
              }
            }
            img5 {
              title
              img {
                childImageSharp {
                  fluid(maxWidth: 700, quality: 90) {
                    ...GatsbyImageSharpFluid
                  }
                }
                publicURL
              }
            }
          }
          img {
            childImageSharp {
              fluid(maxWidth: 1000, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
            publicURL
          }
        }
        part2 {
          header
          text
          slider {
            slider
            img1 {
              title
              img {
                childImageSharp {
                  fluid(maxWidth: 1000, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
                publicURL
              }
            }
            img2 {
              title
              img {
                childImageSharp {
                  fluid(maxWidth: 1000, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
                publicURL
              }
            }
            img3 {
              title
              img {
                childImageSharp {
                  fluid(maxWidth: 1000, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
                publicURL
              }
            }
          }
          img {
            childImageSharp {
              fluid(maxWidth: 1000, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
            publicURL
          }
        }
        part3 {
          header
          text
          img {
            childImageSharp {
              fluid(maxWidth: 1000, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
            publicURL
          }
        }
      }
    }
  }
`
