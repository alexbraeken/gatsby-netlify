import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import {useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import {Container, Col, Row} from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import ActivitiesRoll from '../components/ActivitiesRoll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import BackgroundImage from 'gatsby-background-image'

class CustomSlide extends React.Component {
  render() {
    
    return (
      <BackgroundImage
      Tag="div"
      className={"slide-image-container"}
      fluid={this.props.slide.slide? this.props.slide.slide.childImageSharp.fluid: null}
      backgroundColor={`#040e18`}
      style={{minHeight: "400px",
      height: "50vh",
      width:"100vw",
      margin: "0px auto",
      overflow: "hidden",
      position: "relative",
      backgroundSize:"cover",
      backgroundPosition:"center",
      backgroundAttachment: "initial",
      padding: "40px"}}
    >
          <div className="slide__content">
              <svg className="slide__overlay small-overlay" preserveAspectRatio="xMaxYMax slice" viewBox="0 0 720 405"> 
              <path className="slide__overlay-path" d="M0,0 150,0 300,405 0,405"></path> 
              </svg>
              <div className="slide__text">
              <h2 className="slide__text-heading">{this.props.slide.title}</h2>
              </div>
              </div>
      </BackgroundImage>
    );
  }
}

export const LocationPageTemplate = ({
  image,
  title,
  langTitles,
  location,
  part1,
  part2,
  part3,
}) => {

  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [fluidSrc, setFluidSrc] = useState()

  const {t} = useTranslation();
  const {language } = useI18next();
     
  const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        setFluidSrc(slides? slides[selectedIndex].slide.childImageSharp.fluid : part2.img.childImageSharp.fluid)
      };

  
      useEffect(() => {

        setFluidSrc(slides? slides[0].slide.childImageSharp.fluid : part2.img.childImageSharp.fluid)

        setTimeout(()=>{
          setLoaded(true)}, 1000
          )
        return () => {
          setLoaded(false)
        }

      }, [])


      const collage = part1.collage.collage ? [{img: part1.collage.img1.img, title: part1.collage.img1.title[language]}, 
        {img: part1.collage.img2.img, title: part1.collage.img2.title[language]}, 
        {img: part1.collage.img3.img, title: part1.collage.img3.title[language]},
        {img: part1.collage.img4.img, title: part1.collage.img4.title[language]},
        {img: part1.collage.img5.img, title: part1.collage.img5.title[language]},] : null

    const slides = part2.slider.slider ? [{slide: part2.slider.img1.img, title: part2.slider.img1.title}, 
      {slide: part2.slider.img2.img, title: part2.slider.img2.title}, 
      {slide: part2.slider.img3.img, title: part2.slider.img3.title}] : null

  return(
  <div className="content newLine">
     <BackgroundImage
      Tag="div"
      className={"full-width-image-container margin-top-0 gradient-bg"}
      fluid={["linear-gradient(to bottom right,rgba(0, 47, 75, 0.5),rgba(255,140,0,0.5))", image.childImageSharp.fluid ]}
      backgroundColor={`#040e18`}
    >
      <h2
        className={`has-text-weight-bold is-size-1 content-header ${loaded? "loaded" : ""}`}
        style={{color: "white"}}>
        {langTitles[language]}
      </h2>
    </BackgroundImage>
    <section style={{position: "relative"}}>
      <Container>
        <div className="section">
          <Row>
          <Col xs={12} md={6} style={{display:"flex", flexWrap:"wrap", padding: "50px 0", zIndex: "1"}}>
          <div className="intro-para" style={{margin: "auto"}}>
            <div style={{display: "flex", flexWrap: "no-wrap"}}>
              <FontAwesomeIcon icon={faQuoteLeft} 
                    style={{position: "relative", 
                    marginTop: "1.5rem",
                    marginRight: "0.5rem",  
                    height: "10%",
                    width: "10%",
                    minHeight: "20px",
                    minWidth: "20px",
                    maxHeight: "40px",
                    maxWidth: "40px"}}/>
                    <h3 className="has-text-weight-semibold is-size-2">{part1.header[language]}
                    </h3>
              </div>
              <p>{part1.text[language]}</p>
              </div>
            </Col>
            {collage && 
            <Col md={12} lg={6}>
              <div style={{display:"flex", flexWrap:"wrap", width:"100%"}}>
                {collage.map((img, index)=>{
                  return (
                  <div className="mason-image" key={index}>
                    <PreviewCompatibleImage  imageInfo={img.img}  imgStyle={{borderRadius: "5px", height:"250px", flexGrow:"1"}}/>
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
            <BackgroundImage
      Tag="div"
      className={""}
      fluid={fluidSrc}
      backgroundColor={`#040e18`}
      style={{
        filter: "opacity(0.1)",
        position: "absolute",
        width: "100%",
        height: "100%",
        height: "100%",
        backgroundPosition: "50%",
        top: "0",
        left: "0",
        transition: "all .3s"
      }}
    >
      </BackgroundImage>
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
      <Container style={{textAlign: "center"}}>
      <ActivitiesRoll location={location} type="Restaurant" key="Restaurant"/>
        <br />
        <ActivitiesRoll location={location}  key="all"/>
        <br />
        <div style={{paddingBottom:"1em"}}>
          <h4>{t("Full list of activities")} <a href="/travelerTips"><span style={{color:"#f5821e"}}>{t("here")}!</span></a></h4>
        </div>
      </Container>
    </section>
    <section
    className="last"></section>
  </div>
)}

LocationPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  langTitles: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  location: PropTypes.string,
  part1:  PropTypes.shape({
    header: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    text: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    collage: PropTypes.object,
    img: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
  part2: PropTypes.shape({
    header: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    text: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    slider: PropTypes.object,
    img: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
  part3: PropTypes.shape({
    header: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    text: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    img: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  })
}

const LocationPage = ({ data }) => {
  const post = data.pageData
  const {language } = useI18next();
  return (
    <Layout propTitle={post.frontmatter.langTitles[language]}>
      <LocationPageTemplate
        image={post.frontmatter.image}
        location={post.frontmatter.location}
        title={post.frontmatter.title}
        langTitles={post.frontmatter.langTitles}
        part1={post.frontmatter.part1}
        part2={post.frontmatter.part2}
        part3={post.frontmatter.part3}
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
  query LocationPage($id: String!, $language: String!) {
    pageData: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title 
        langTitles{
          en
          pt
          fr
          es
        }
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
          collage {
            collage
            img1 {
              title{
                en
                pt
                fr
                es
              }
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
              title{
                en
                pt
                fr
                es
              }
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
              title{
                en
                pt
                fr
                es
              }
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
              title{
                en
                pt
                fr
                es
              }
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
              title{
                en
                pt
                fr
                es
              }
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
    locales: allLocale(filter: {ns: {in: ["translation"]},language: {eq: $language}}) {
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
