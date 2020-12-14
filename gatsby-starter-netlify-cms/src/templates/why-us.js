import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Features from '../components/Features'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import {Container, Col, Row} from 'react-bootstrap'


export const WhyUsPageTemplate = ({
  image,
  title,
  part1,
  part1Img,
  part2,
  part2Img,
  part3,
}) => {


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
        <Row>
          <Col>
        <div className="section">
          <h3 className="has-text-weight-semibold is-size-2">{part1.header}</h3>
          <p>{part1.text}</p>
        </div>
        </Col>
        <Col>
          <PreviewCompatibleImage imageInfo={part1Img} />
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
          <Col>
            <PreviewCompatibleImage imageInfo={part2Img} />
          </Col>
          <Col style={{display:"flex"}}>
          <div style={{margin: "auto"}}>
            <h3 className="has-text-weight-semibold is-size-2">{part2.header}</h3>
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
    <section style={{
        paddingBottom: "100px",
        position: "relative"}}>
      <Container>
        <h3 className="has-text-weight-semibold is-size-2">{part3.header}</h3>
        <hr style={{width:"50%", height:"4px", backgroundColor:"#f5821e"}}/>
          <Row>
            <Col>
              <PreviewCompatibleImage imageInfo={part3.col1img} />
              <br />
              <Container style={{textAlign:"center"}}>
                <h4>{part3.col1Header}</h4>
                <hr />
                <p>
                  {part3.col1}
                </p>
              </Container>
            </Col>
            <Col>
              <PreviewCompatibleImage imageInfo={part3.col2img} />
              <br />
              <Container style={{textAlign:"center"}}>
              <h4>{part3.col2Header}</h4>
              <hr />
              <p>
                {part3.col2}
              </p>
              </Container>
            </Col>
            <Col>
              <PreviewCompatibleImage imageInfo={part3.col3img} />
              <br />
              <Container style={{textAlign:"center"}}>
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
      }
    }
  }
`
