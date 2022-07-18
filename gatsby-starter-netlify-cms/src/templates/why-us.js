import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import {useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import {Container, Col, Row} from 'react-bootstrap'
import OwnerTestimonials from '../components/OwnerTestimonials'
import BackgroundImage from 'gatsby-background-image'
import convertToBgImage from "../Helpers/images"
import { getImage } from "gatsby-plugin-image"

export const WhyUsPageTemplate = ({
  image,
  title,
  langTitles,
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

  const {t} = useTranslation();
  const {language } = useI18next();

  const heroImage = getImage(image.childImageSharp)
  const bgImage = convertToBgImage(heroImage)

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
       <BackgroundImage
          className={"full-width-image-container margin-top-0 "}
          Tag="div"
          {...bgImage}
          backgroundColor={`#040e18`}
          style={{zIndex:"1"}}
          preserveStackingContext
        >
          <div className="gradient-bg"></div>
      <h2
        className={`has-text-weight-bold is-size-1 content-header ${loaded? "loaded" : ""}`}
        style={{color: "white"}}>
        {langTitles[language]}
      </h2>
      </BackgroundImage>
    <section className="newLine" style={{
        paddingBottom: "100px",
        position: "relative"}}>
      <Container>
        <Row>
          <Col xs={12} md={6} style={{display:"flex", flexWrap:"wrap", padding: "50px 0", zIndex: "1"}}>
        <div className="section intro-para" style={{margin: "auto"}}>
          <h3 className="has-text-weight-semibold is-size-2">{part1.header[language]}</h3>
          <div dangerouslySetInnerHTML={{ __html: `<div> ${part1.text[language]} </div>` }} />
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
            <PreviewCompatibleImage imageInfo={part2Img} imgStyle={{width:"100%", height:"100%", borderRadius: '5px'}}/>
          </Col>
          <Col style={{display:"flex"}} xs={12} md={6}>
          <div style={{margin: "auto"}} className="why-list">
            <h3 className="has-text-weight-semibold is-size-2" style={{color: "#fff"}}>{part2.header[language]}</h3>
              <div dangerouslySetInnerHTML={{ __html: `
              <div>
              <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"> 
                <style>
                  .why-list ol{
                    counter-reset: item;
                    list-style-type: none;
                    line-height: 2.2;
                    margin-left: -40px;
                  }
                .why-list ol li{
                  display: block;
                  position: relative;
                  padding-left: 90px;
                }
                .why-list ol li:before{
                  content: counter(item) " ";
                  counter-increment: item;
                  color: #ffffff;
                  font-family: 'Bebas Neue', cursive;
                  position: absolute;
                  top: 50%;
                  left: 0;
                  transform: translateY(-50%);
                  background: #2b2523;
                  height: 4rem;
                  width: 4rem;
                  line-height: 1.2em;
                  text-align: center;
                  border-radius: 2em;
                  font-weight: 900;
                  font-size: 3.4rem;
                  box-shadow: 0 3px 1px rgb(0 0 0 / 10%), 0 4px 8px rgb(0 0 0 / 13%), 0 0 0 1px rgb(0 0 0 / 2%);
                  transition: all 0.3s
                }
                .why-list ol li span{
                  font-style: inherit;
                  font-weight: inherit;
                  font-size: 2rem;
                  font-weight: 800;
                }

                .why-list ol li span:after {
                  content: '';
                  position: absolute;
                  bottom: 0;
                  width: 0;
                  height: 0;
                  left: 50%;
                  transform: translateX(-50%);
                  border-bottom: 1px solid black;
                  box-shadow: 0 3px 1px rgb(0 0 0 / 10%), 0 4px 8px rgb(0 0 0 / 13%), 0 0 0 1px rgb(0 0 0 / 2%);
                  transition: all 0.3s
                }

                .why-list ol li:hover span:after{
                  width: 61%;
                }

                .why-list ol li:hover:before{
                  box-shadow: 0 3px 1px rgb(0 0 0 / 10%), 0 4px 8px rgb(0 0 0 / 30%), 0 0 0 1px rgb(0 0 0 / 2%);
                }
                </style>
                ${part2.text[language]} 
              </div>
              ` }} />
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
        <h3 className="has-text-weight-semibold is-size-2">{part3.header[language]}</h3>
        <hr style={{width:"50%", height:"4px", backgroundColor:"#f5821e"}}/>
          <Row>
            <Col xs={12} md={4}>
              <PreviewCompatibleImage imageInfo={part3.col1img} />
              <br />
              <Container style={{textAlign:"center", paddingBottom: "20px"}}>
                <h4>{part3.col1Header[language]}</h4>
                <hr />
                <p>
                  {part3.col1[language]}
                </p>
              </Container>
            </Col>
            <Col xs={12} md={4}>
              <PreviewCompatibleImage imageInfo={part3.col2img} />
              <br />
              <Container style={{textAlign:"center", paddingBottom: "20px"}}>
              <h4>{part3.col2Header[language]}</h4>
              <hr />
              <p>
                {part3.col2[language]}
              </p>
              </Container>
            </Col>
            <Col xs={12} md={4}>
              <PreviewCompatibleImage imageInfo={part3.col3img} />
              <br />
              <Container style={{textAlign:"center", paddingBottom: "20px"}}>
              <h4>{part3.col3Header[language]}</h4>
              <hr />
              <p>
                {part3.col3[language]}
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
          <h3 className="has-text-weight-semibold is-size-2">{part4.header[language]}</h3>
          <div dangerouslySetInnerHTML={{ __html: `<div> ${part4.text[language]} </div>` }} />
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
          <h3 className="has-text-weight-semibold is-size-2">{testimonialHeader[language]}</h3>
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
  title: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  langTitles: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  heading: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  part1: PropTypes.object,
  part1Img: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  part2: PropTypes.object,
  part2Img: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  part3: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  part4: PropTypes.object,
  part4Img: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  testimonialHeader: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

const WhyUsPage = ({ data }) => {
  const post = data.pageData
  const {language } = useI18next();

  return (
    <Layout propTitle={post.frontmatter.langTitles[language]}>
      <WhyUsPageTemplate
        image={post.frontmatter.image}
        title={post.frontmatter.title}
        langTitles={post.frontmatter.langTitles}
        part1={post.frontmatter.part1}
        part1Img={post.frontmatter.part1Img}
        part2={post.frontmatter.part2}
        part2Img={post.frontmatter.part2Img}
        part3={post.frontmatter.part3}
        part4={post.frontmatter.part4}
        part4Img={post.frontmatter.part4Img}
        testimonialHeader = {post.frontmatter.testimonialHeader}
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

export const WhyUsPageQuery = graphql`query WhyUsPage($id: String!, $language: String!) {
  pageData: markdownRemark(id: {eq: $id}) {
    frontmatter {
      title
      langTitles {
        en
        pt
        fr
        es
      }
      image {
        childImageSharp {
          gatsbyImageData(quality: 100, layout: FULL_WIDTH)
        }
        publicURL
      }
      part1 {
        header {
          en
          pt
          fr
          es
        }
        text {
          en
          pt
          fr
          es
        }
      }
      part1Img {
        childImageSharp {
          gatsbyImageData(quality: 100, layout: FULL_WIDTH)
        }
        publicURL
      }
      part2 {
        header {
          en
          pt
          fr
          es
        }
        text {
          en
          pt
          fr
          es
        }
      }
      part2Img {
        childImageSharp {
          gatsbyImageData(quality: 100, layout: FULL_WIDTH)
        }
        publicURL
      }
      part3 {
        header {
          en
          pt
          fr
          es
        }
        col1Header {
          en
          pt
          fr
          es
        }
        col1 {
          en
          pt
          fr
          es
        }
        col1img {
          childImageSharp {
            gatsbyImageData(width: 500, quality: 100, layout: CONSTRAINED)
          }
          publicURL
        }
        col2Header {
          en
          pt
          fr
          es
        }
        col2 {
          en
          pt
          fr
          es
        }
        col2img {
          childImageSharp {
            gatsbyImageData(width: 500, quality: 100, layout: CONSTRAINED)
          }
          publicURL
        }
        col3Header {
          en
          pt
          fr
          es
        }
        col3 {
          en
          pt
          fr
          es
        }
        col3img {
          childImageSharp {
            gatsbyImageData(width: 500, quality: 100, layout: CONSTRAINED)
          }
          publicURL
        }
      }
      part4 {
        header {
          en
          pt
          fr
          es
        }
        text {
          en
          pt
          fr
          es
        }
      }
      part4Img {
        childImageSharp {
          gatsbyImageData(quality: 100, layout: FULL_WIDTH)
        }
        publicURL
      }
      testimonialHeader {
        en
        pt
        fr
        es
      }
    }
  }
  locales: allLocale(
    filter: {ns: {in: ["translation"]}, language: {eq: $language}}
  ) {
    edges {
      node {
        ns
        data
        language
      }
    }
  }
}
`
