import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import {useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import {Container, Col, Row} from 'react-bootstrap'
import Testimonials from '../components/Testimonials'
import Carousel from 'react-bootstrap/Carousel'
import Newsletter from '../components/Newsletter'
import BackgroundImage from 'gatsby-background-image'
import convertToBgImage from "../Helpers/images"
import { getImage } from "gatsby-plugin-image"

class CustomSlide extends React.Component {
  render() {

    const slideImage = getImage(this.props.slide.slide.childImageSharp)
    const bgImage = convertToBgImage(slideImage)
    
    return (
        <BackgroundImage
          className={"slide-image-container"}
          Tag="div"
          {...bgImage}
          backgroundColor={`#040e18`}
          style={{zIndex:"1",
          minHeight: "400px",
          height: "50vh",
          width:"100vw",
          margin: "0px auto",
          overflow: "hidden",
          position: "relative",
          backgroundSize:"cover",
          backgroundPosition:"center",
          padding: "40px"}}
          preserveStackingContext
        >
          <div className="slide__content">
              <svg className="slide__overlay small-overlay" preserveAspectRatio="xMaxYMax slice" viewBox="0 0 720 405"> 
              <path className="slide__overlay-path" d="M0,0 150,0 300,405 0,405"></path> 
              </svg>
              <div className="slide__text">
              <h2 className="slide__text-heading">{this.props.slide.title}</h2>
              <h4><a href={`/properties/${this.props.slide.id}`}><span className="orangeText hover-highlight">View This Property</span></a></h4>
              </div>
              </div>
          </BackgroundImage>
    );
  }
}

export const WhyBookPageTemplate = ({
  image,
  title,
  langTitles,
  part1,
  part1Img,
  part2,
  sliderImg1,
  sliderImageTitle1,
  sliderImgPropId1,
  sliderImg2,
  sliderImageTitle2,
  sliderImgPropId2,
  sliderImg3,
  sliderImageTitle3,
  sliderImgPropId3,
  part3,
  part3Img,
  testimonialHeader
}) => {

  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const slideContainer = useRef(null)

  const {t} = useTranslation();
  const {language } = useI18next();

  const heroImage = getImage(image.childImageSharp)
  const bgImage = convertToBgImage(heroImage)


  const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        const slides = document.getElementsByClassName("slide-image-container")
        const bgImg = slides[selectedIndex].style.backgroundImage
        slideContainer.current.style.backgroundImage = bgImg
      };

  useEffect(() => {
    setTimeout(()=>{
      setLoaded(true)}, 1000
      )
    return () => {
      setLoaded(false)
    }
  }, [])

  const slides = [{slide: sliderImg1, title: sliderImageTitle1, id: sliderImgPropId1}, 
    {slide: sliderImg2, title: sliderImageTitle2, id: sliderImgPropId2}, 
    {slide: sliderImg3, title: sliderImageTitle3, id: sliderImgPropId3}]


  return (
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
      <section className="newLine"
      style={{
          paddingBottom: "100px",
          position: "relative"}}>
        <Container>
          <Row>
            <Col xs={12} md={6} style={{display:"flex", flexWrap:"wrap", padding: "50px 0", zIndex: "1"}}>
              <div className="section intro-para" style={{margin: "auto"}}>
                <h3 className="has-text-weight-semibold is-size-2">{part1.header[language]}</h3>
                <p>{part1.text[language]}</p>
              </div>
          </Col>
          <Col xs={12} md={6}>
              <PreviewCompatibleImage imageInfo={part1Img} imgStyle={{borderRadius: "5px", marginLeft: "-150px"}}/>
          </Col>
          </Row>
        </Container>
      </section>
      <section 
      style={{
          paddingBottom: "100px",
          paddingTop: "100px",
          width: "100vw",
          position: "relative",
          marginLeft: "-50vw",
          left: "50%",
          backgroundColor:"#f5821e"}}>
            <div style={{ 
            width: "100vw",
            position: "absolute",
            top: "0",
            bottom: "auto",
            right: "0",
            height: "100px",
            zIndex: "10",
            transform: "translateZ(0)"}} data-front="" data-style="curve_asym" data-position="bottom">
              <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" style={{
                width: "100%",
                left: "0",
                top: "-1px",
                height: "100%",
                position: "absolute",
              }}> 
              <path d="M0 0 L 100 0 100 100 C 100 100 50 0 0 100  Z"></path> 
              </svg>
              </div>
        <div className="slide-container" ref={slideContainer} style={{backgroundImage:`url("${slides? slides[0].slide.childImageSharp.gatsbyImageData.src : part2.img.childImageSharp.gatsbyImageData.src }")`}}></div>
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
              <h3 className="has-text-weight-semibold is-size-2" style={{textAlign: "center"}}>{part2.header[language]}</h3>
              <p style={{color: "#fff"}}>
                {part2.text[language]}
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
          <h3 className="has-text-weight-semibold is-size-2">{part3.header[language]}</h3>
            <p>
              {part3.text[language]}
            </p>
          </Row>
        </Container>
      </section>
      }
      <section>
        <Container>
          <Row>
            <Col>
            <h3 className="has-text-weight-semibold is-size-2">{testimonialHeader[language]}</h3>
            <hr style={{width:"50%", height:"4px", backgroundColor:"#f5821e"}}/>
            <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter lang={language}/>
    </div>
  );}

WhyBookPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  langTitles: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  part1: PropTypes.object,
  part1Img: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  part2: PropTypes.object,
  sliderImg1: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  sliderImageTitle1: PropTypes.string,
  sliderImgPropId1: PropTypes.string,
  sliderImg2: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  sliderImageTitle2: PropTypes.string,
  sliderImgPropId2: PropTypes.string,
  sliderImg3: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  sliderImageTitle3: PropTypes.string,
  sliderImgPropId3: PropTypes.string,
  part3Img:PropTypes.object,
  part3: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  testimonialHeader: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

const WhyBookPage = ({ data }) => {
  const post = data.pageData
  const {language } = useI18next();

  return (
    <Layout propTitle={post.frontmatter.langTitles[language]}>
      <WhyBookPageTemplate
        image={post.frontmatter.image}
        title={post.frontmatter.title}
        langTitles={post.frontmatter.langTitles}
        part1={post.frontmatter.part1}
        part1Img={post.frontmatter.part1Img}
        part2={post.frontmatter.part2}
        sliderImg1={post.frontmatter.sliderImg1}
        sliderImageTitle1={post.frontmatter.sliderImageTitle1}
        sliderImgPropId1={post.frontmatter.sliderImgPropId1}
        sliderImg2={post.frontmatter.sliderImg2}
        sliderImageTitle2={post.frontmatter.sliderImageTitle2}
        sliderImgPropId2={post.frontmatter.sliderImgPropId2}
        sliderImg3={post.frontmatter.sliderImg3}
        sliderImageTitle3={post.frontmatter.sliderImageTitle3}
        sliderImgPropId3={post.frontmatter.sliderImgPropId3}
        part3Img={post.frontmatter.part3Img}
        part3={post.frontmatter.part3}
        testimonialHeader={post.frontmatter.testimonialHeader}
      />
    </Layout>
  )
}

WhyBookPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default WhyBookPage

export const WhyBookPageQuery = graphql`query WhyBookPage($id: String!, $language: String!) {
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
      heading {
        en
        pt
        fr
        es
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
      sliderImg1 {
        childImageSharp {
          gatsbyImageData(quality: 100, layout: FULL_WIDTH)
        }
        publicURL
      }
      sliderImageTitle1
      sliderImgPropId1
      sliderImg2 {
        childImageSharp {
          gatsbyImageData(quality: 100, layout: FULL_WIDTH)
        }
        publicURL
      }
      sliderImageTitle2
      sliderImgPropId2
      sliderImg3 {
        childImageSharp {
          gatsbyImageData(quality: 100, layout: FULL_WIDTH)
        }
        publicURL
      }
      sliderImageTitle3
      sliderImgPropId3
      part3Img {
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
        text {
          en
          pt
          fr
          es
        }
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
