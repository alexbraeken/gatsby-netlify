import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Features from '../components/Features'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import {Container, Col, Row} from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'

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


export const AlgarvePageTemplate = ({
  image,
  title,
  heading,
  description,
  sliderText,
  sliderImage1,
  sliderImageTitle1,
  sliderImage2,
  sliderImageTitle2,
  sliderImage3,
  sliderImageTitle3,
  sliderImage4,
  sliderImageTitle4,
  conclusion
}) => {

  const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };

    const slides = [{slide: sliderImage1, title: sliderImageTitle1}, 
      {slide: sliderImage2, title: sliderImageTitle2}, 
      {slide: sliderImage3, title: sliderImageTitle3}, 
      {slide: sliderImage4, title: sliderImageTitle4}]

    const nextIcon = <span aria-hidden="true" className="carousel-control-next-icon feature-next-icon" />
    const prevIcon = <span aria-hidden="true" className="carousel-control-prev-icon feature-prev-icon" />

  return(
  <div className="content">
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
        className="has-text-weight-bold is-size-1"
        style={{
          boxShadow: '0.5rem 0 0 #f40, -0.5rem 0 0 #f40',
          backgroundColor: '#f40',
          color: 'white',
          padding: '1rem',
          zIndex: "2"
        }}
      >
        {title}
      </h2>
    </div>
    <section style={{
        paddingBottom: "100px",
        position: "relative"}}>
      <Container>
        <div className="section">
          <h3 className="has-text-weight-semibold is-size-2">{heading}</h3>
          <p>{description}</p>
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
          <Col md={12} lg={6} style={{display:"flex"}}>
            <p style={{margin: "auto"}}>
            {sliderText}
            </p>
            
          </Col>
          <Col md={12} lg={6}>
            <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
              {slides &&
            slides.map((slide, index) => {
                  return<Carousel.Item key={index}>
                      <Row>
                          <CustomSlide slide={slide} key={index}/>
                      </Row>
          </Carousel.Item>
              })}
          </Carousel>
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
    <section style={{
        paddingBottom: "100px",
        position: "relative"}}>
      <Container>
        <p>
          {conclusion}
        </p>
      </Container>
    </section>
  </div>
)}

AlgarvePageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  sliderText: PropTypes.string,
  sliderImage1: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  sliderImage2: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  sliderImage3: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  sliderImage4: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  sliderImageTitle1 : PropTypes.string,
  sliderImageTitle2 : PropTypes.string,
  sliderImageTitle3 : PropTypes.string,
  sliderImageTitle4 : PropTypes.string,
  conclusion: PropTypes.string,
}

const AlgarvePage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <AlgarvePageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        description={frontmatter.description}
        sliderText={frontmatter.sliderText}
        sliderImage1={frontmatter.sliderImage1}
        sliderImage2={frontmatter.sliderImage2}
        sliderImage3={frontmatter.sliderImage3}
        sliderImage4={frontmatter.sliderImage4}
        sliderImageTitle1={frontmatter.sliderImageTitle1}
        sliderImageTitle2={frontmatter.sliderImageTitle2}
        sliderImageTitle3={frontmatter.sliderImageTitle3}
        sliderImageTitle4={frontmatter.sliderImageTitle4}
        conclusion={frontmatter.conclusion}
      />
    </Layout>
  )
}

AlgarvePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default AlgarvePage

export const algarvePageQuery = graphql`
  query AlgarvePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
          publicURL
        }
        heading
        description
        sliderText
        sliderImage1 {
          childImageSharp {
            fluid(maxWidth: 800, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        sliderImageTitle1
        sliderImage2 {
          childImageSharp {
            fluid(maxWidth: 800, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        sliderImageTitle2
        sliderImage3 {
          childImageSharp {
            fluid(maxWidth: 800, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        sliderImageTitle3
        sliderImage4 {
          childImageSharp {
            fluid(maxWidth: 800, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        sliderImageTitle4
        conclusion
      }
    }
  }
`
