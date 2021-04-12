import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Features from '../components/Features'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import {Container, Col, Row} from 'react-bootstrap'
import OwnerTestimonials from '../components/OwnerTestimonials'

export const WhyUsPageTemplate = ({
  image,
  title,
  part1,
  part1Img,
  part2,
  part2Img,
  part3,
  part4,
  part4Img,
  testimonialHeader
}) => {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(()=>{
      setLoaded(true)}, 1000
      )
    return () => {
      setLoaded(false)
    }
  }, [])

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
        className={`has-text-weight-bold is-size-1 content-header ${loaded? "loaded" : ""}`}
        style={{color: "white"}}>
        {title}
      </h2>
    </div>
    <section className="newLine" style={{
        paddingBottom: "100px",
        position: "relative"}}>
      <Container>
        <Row>
          <Col xs={12} md={6} style={{display:"flex", flexWrap:"wrap", padding: "50px 0", zIndex: "1"}}>
        <div className="section intro-para" style={{margin: "auto"}}>
          <h3 className="has-text-weight-semibold is-size-2">{part1.header}</h3>
          <div dangerouslySetInnerHTML={{ __html: `<div> ${part1.text} </div>` }} />
        </div>
        </Col>
        <Col xs={12} md={6}>
          <PreviewCompatibleImage imageInfo={part1Img} imgStyle={{borderRadius: "5px", marginLeft: "-150px"}}/>
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
          <Col xs={12} md={6}>
            <PreviewCompatibleImage imageInfo={part2Img} />
          </Col>
          <Col style={{display:"flex"}} xs={12} md={6}>
          <div style={{margin: "auto"}}>
            <h3 className="has-text-weight-semibold is-size-2">{part2.header}</h3>
              <div dangerouslySetInnerHTML={{ __html: `<div> ${part2.text} </div>` }} />
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
    <section style={{
        paddingBottom: "100px",
        position: "relative"}}>
      <Container>
        <h3 className="has-text-weight-semibold is-size-2">{part3.header}</h3>
        <hr style={{width:"50%", height:"4px", backgroundColor:"#f5821e"}}/>
          <Row>
            <Col xs={12} md={4}>
              <PreviewCompatibleImage imageInfo={part3.col1img} />
              <br />
              <Container style={{textAlign:"center", paddingBottom: "20px"}}>
                <h4>{part3.col1Header}</h4>
                <hr />
                <p>
                  {part3.col1}
                </p>
              </Container>
            </Col>
            <Col xs={12} md={4}>
              <PreviewCompatibleImage imageInfo={part3.col2img} />
              <br />
              <Container style={{textAlign:"center", paddingBottom: "20px"}}>
              <h4>{part3.col2Header}</h4>
              <hr />
              <p>
                {part3.col2}
              </p>
              </Container>
            </Col>
            <Col xs={12} md={4}>
              <PreviewCompatibleImage imageInfo={part3.col3img} />
              <br />
              <Container style={{textAlign:"center", paddingBottom: "20px"}}>
              <h4>{part3.col3Header}</h4>
              <hr />
              <p>
                {part3.col3}
              </p>
              </Container>
            </Col>
        </Row>
      </Container>
    </section>
    <section>
      <Container>
        <Row>
          <Col xs={12} md={6} style={{display:"flex", flexWrap:"wrap", padding: "50px 0", zIndex: "1"}}>
        <div className="section intro-para" style={{margin: "auto"}}>
          <h3 className="has-text-weight-semibold is-size-2">{part4.header}</h3>
          <div dangerouslySetInnerHTML={{ __html: `<div> ${part4.text} </div>` }} />
        </div>
        </Col>
        <Col xs={12} md={6}>
          <PreviewCompatibleImage imageInfo={part4Img} imgStyle={{borderRadius: "5px", marginLeft: "-150px"}}/>
        </Col>
        </Row> 
      </Container>    
    </section>
    <section style={{
        paddingBottom: "100px"}}>
      <Container>
        <Row>
          <Col>
          <h3 className="has-text-weight-semibold is-size-2">{testimonialHeader}</h3>
          <hr style={{width:"50%", height:"4px", backgroundColor:"#f5821e"}}/>
          <OwnerTestimonials />
          </Col>
        </Row>
      </Container>
    </section>
  </div>
)}

WhyUsPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  part1: PropTypes.object,
  part1Img: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  part2: PropTypes.object,
  part2Img: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  part3: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  part4: PropTypes.object,
  part4Img: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  testimonialHeader: PropTypes.string,
}

const WhyUsPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <WhyUsPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        part1={frontmatter.part1}
        part1Img={frontmatter.part1Img}
        part2={frontmatter.part2}
        part2Img={frontmatter.part2Img}
        part3={frontmatter.part3}
        part4={frontmatter.part4}
        part4Img={frontmatter.part4Img}
        testimonialHeader = {frontmatter.testimonialHeader}
      />
    </Layout>
  )
}

WhyUsPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default WhyUsPage

export const WhyUsPageQuery = graphql`
  query WhyUsPage($id: String!) {
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
        part1 {
          header
          text
        }
        part1Img {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
          publicURL
        }
        part2 {
          header
          text
        }
        part2Img {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
          publicURL
        }
        part3 {
          header
          col1Header
          col1
          col1img {
            childImageSharp {
              fluid(maxWidth: 500, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
            publicURL
          }
          col2Header
          col2
          col2img {
            childImageSharp {
              fluid(maxWidth: 500, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
            publicURL
          }
          col3Header
          col3
          col3img {
            childImageSharp {
              fluid(maxWidth: 500, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
            publicURL
          }
        }
        part4 {
          header
          text
        }
        part4Img {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
          publicURL
        }
        testimonialHeader
      }
    }
  }
`
