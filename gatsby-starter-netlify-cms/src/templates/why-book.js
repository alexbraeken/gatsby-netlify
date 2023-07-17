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
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import cancellation from '../../static/img/time-reload-svgrepo-com.svg'
import cots from '../../static/img/cot-svgrepo-com.svg'
import concierge from '../../static/img/concierge-svgrepo-com.svg'
import basket from '../../static/img/basket-picnic-svgrepo-com.svg'
import catering from '../../static/img/catering-buffet.svg'


if (typeof window !== `undefined`) {
  gsap.registerPlugin(ScrollTrigger);
}
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
          height: "90vh",
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
  part4,
  part4Img,
  testimonialHeader
}) => {

  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const slideContainer = useRef(null)
  const parallaxCont = useRef(null)
  const parallaxImg = useRef(null)
  const parallaxImg2 = useRef(null)
  const parallaxBg = useRef(null)


  const {t} = useTranslation();
  const {language } = useI18next();

  const heroImage = getImage(image.childImageSharp)
  const bgImage = convertToBgImage(heroImage)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    setTimeout(()=>{
      setLoaded(true)}, 1000
      )

      let parallaxCont = gsap.utils.toArray('.parallax-tone-container')
      let parallaxImgs = gsap.utils.toArray('.img-cont')
      let parallaxBGs = gsap.utils.toArray('.parallax-bg')  
      let parallaxToneBg = gsap.utils.toArray('.parallax-tone-bg')
      let colSections = gsap.utils.toArray(".colSection")
      let perkImgs = gsap.utils.toArray(".perk-img-container")


      parallaxCont.forEach((cont, i)=>{
        gsap.to(
          parallaxToneBg[i], 
          {
            yPercent: -90,
            ease: "none",
            scrollTrigger: {
              trigger: cont,
              start: 'top bottom',
              scrub: true
            },
          }
        )
        gsap.to(
          parallaxImgs[i], 
          {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
              trigger: cont,
              start: 'top bottom',
              scrub: true
            }
          }
        )
      })

      parallaxBGs.forEach((section) => {
        gsap.from(section, { 
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
              trigger: section,
              scrub: true
          }
        });
      });

      perkImgs.forEach(perk => {
        gsap.from(perk, {
          yPercent: -100,
          opacity: 0,
          scrollTrigger: {
            trigger: perk,
            start: 'top 50%',
            once: true,
            duration:0.3,
            ease:"Power2.easeOut"
          }
        })
      })

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
          position: "relative"}}>
         <h2 className="home-section-title" style={{left: "50%", transform: "translateX(-50%)", top: "-50px", color: "rgba(245, 130, 30, 0.5)", padding: "0 3%"}}>{t("We Provide")}</h2>
        <Container>
        <Row style={{minHeight: "80vh"}}>
          <Col xs={12} md={6} style={{display:"flex", flexWrap:"wrap", padding: "50px 0", zIndex: "1"}}>
        <div className="section intro-para" style={{margin: "auto"}}>
          <h3 className="has-text-weight-semibold is-size-2">{part1.header[language]}</h3>
          <div dangerouslySetInnerHTML={{ __html: `<div class="intro-para"><p> ${part1.text[language]} </p></div>` }} />
        </div>
        </Col>
        <Col xs={12} md={6} style={{display:"flex"}}>
          <div className="parallax-tone-container" ref={parallaxCont}>
            <div ref={parallaxImg} className="img-cont" >
              <PreviewCompatibleImage imageInfo={part1Img} className="parallax-tone-img" imgStyle={{borderRadius: "5px"}} />
            </div>
            <div className="parallax-tone-bg" ref={parallaxBg}></div>
          </div>
        </Col>
        </Row> 
        </Container>
        </section>
        <section className="newLine"
      style={{
          position: "relative",
          paddingTop: "150px",
          paddingBottom: "150px"}}>
        <h2 className="home-section-title" style={{left: "50%", transform: "translateX(-50%)", top: "-100px", color: "rgba(245, 130, 30, 0.5)", padding: "0 3%"}}>{t("Perks")}</h2>
        <Container>
        <Row style={{flexDirection:"column", position:"relative"}}>
          <h3 className="has-text-weight-semibold is-size-2" style={{textAlign:"center"}}>{t("BOOKING PERKS")}</h3>
          <Col className="booking-perks-col">
              <div className="perk-container ">
                <div className="perk-img-container" >
                <div className="perk-img-shadow left">
                  <img
                    src={cancellation}
                    alt="cancellation"
                    style={{transform: "translate(-13px, -9px)"}}
                  />
                </div>
                </div>
                <div className="perk-text-container" >
                  <div className="perk-text">
                    <h3>{t("Free Cancellation")}</h3>
                    <p>
                      {t("Change your mind within 48 hours and get a full refund on your booking.")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="perk-container reverse" >
                <div className="perk-text-container" >
                  <div className="perk-text">
                    <h3>{t("Free Cots and High Chairs")}</h3>
                    <p>
                      {t("If you're travelling with an infant or small child and would like a cot or high chair, we will gladly provide one.")}
                    </p>
                  </div>
                </div>
                <div className="perk-img-container" >
                <div className="perk-img-shadow right">
                <img
                  src={cots}
                  alt="cots"
                />
                </div>
                </div>
              </div>
              <div className="perk-container" >
                <div className="perk-img-container" >
                <div className="perk-img-shadow left" >
                <img
                  src={concierge}
                  alt="concierge"
                />
                </div>
                </div>
                <div className="perk-text-container" >
                  <div className="perk-text" >
                    <h3>{t("Free Concierge Service")}</h3>
                    <p>
                      {t("Smartavillas concierge text.")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="perk-container reverse" >
                <div className="perk-text-container" >
                  <div className="perk-text">
                    <h3>{t("Welcome Packs")}</h3>
                    <p>
                      {t("Upon your arrival, receive a complimentary starter pack which includes bathroom items like handsoaps, dishwasher tablets, washing machine pods, kitchen cloth and sponge, washing up liquid, water, orange juice, milk, and a great selection of biscuits.")}
                    </p>
                  </div>
                </div>
                <div className="perk-img-container" >
                  <div className="perk-img-shadow right">
                  <img
                    src={basket}
                    alt="basket"
                  />
                  </div>
                </div>
              </div>
              <div className="perk-container" >
                <div className="perk-img-container" >
                <div className="perk-img-shadow left" >
                <img
                  src={catering}
                  alt="catering"
                />
                </div>
                </div>
                <div className="perk-text-container" >
                  <div className="perk-text" >
                    <h3>{t("Catering Services")}</h3>
                    <p>
                      {t("Smartavillas catering text.")}
                    </p>
                  </div>
                </div>
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
            <svg fill="url(#Gradient)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" style={{
              width: "100%",
              left: "0",
              bottom: "-1px",
              height: "100%",
              position: "absolute",
            }}> 
            <path d="M0 100 C 20 0 50 0 100 100 Z"></path> 
            <defs>
              <linearGradient id="Gradient">
                <stop offset="0%" stopColor="#ffa600"/>
                <stop offset="17%" stopColor="#ff8400"/>
                <stop offset="48%" stopColor="#ff7c00"/>
                <stop offset="88%" stopColor="#ff6200"/>
                <stop offset="100%" stopColor="#e92e00"/>
              </linearGradient>
            </defs>
            </svg>
            </div>
      </section>
    <section className="orange-gradient" style={{
        paddingBottom: "200px",
        paddingTop: "200px",
        width: "100vw",
        position: "relative",
        marginLeft: "-50vw",
        left: "50%",
        overflow:"hidden",
        minHeight: "100vh",
        flexWrap: "wrap",
        display: "flex"}}>
          <h2 className="home-section-title" style={{transform: "translateX(50%)", top: "-50px", color: "rgba(0, 0, 0, 0.5)"}}>{t("Different")}</h2>
          <div className="section-background">
        <div className='half-image-left grey-in mobile-full-width'>
        {slides ?
                <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
                    {slides.map((slide, index) => {
                        return<Carousel.Item key={index}>
                            <Row>
                                <CustomSlide slide={slide} key={index}/>
                            </Row>
                </Carousel.Item>
                    })}
                </Carousel>
            : 
            <>
            {part2.img ?
                <PreviewCompatibleImage imageInfo={part2.img} />
              : 
              null
              }
            </>
            }
        </div>
        </div>
      <Container style={{display:"flex"}}>
        <Row>
          <Col xs={12} md={6} style={{display:"flex", overflow:"hidden"}}>
          </Col>
          <Col style={{display:"flex"}} xs={12} md={6}>
              <div style={{margin:"auto"}} className="intro-para">
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
        paddingBottom: "100px",
        paddingTop: "50px",
        position: "relative"}}>
      <Container>
        <Row>
        <Col xs={12} md={6} style={{display:"flex"}}>
          <div className="parallax-tone-container" ref={parallaxCont} style={{maxWidth:"450px", margin:"auto"}}>
            <div ref={parallaxImg2} className="img-cont" >
              <PreviewCompatibleImage imageInfo={part3Img} className="parallax-tone-img" imgStyle={{borderRadius: "5px"}} />
            </div>
            <div className="parallax-tone-bg" ref={parallaxBg}></div>
          </div>
        </Col>
          <Col xs={12} md={6} style={{display:"flex", flexWrap:"wrap", paddingTop: "50px", paddingBottom: "50px", zIndex: "1"}}>
            <div className="intro-para">
              <h3 className="has-text-weight-semibold is-size-2">{part3.header[language]}</h3>
              <p>
                {part3.text[language]}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    }
    {part4 && 
      <section style={{
          paddingBottom: "100px",
          paddingTop: "50px",
          position: "relative"}}>
        <Container>
          <Row>
            <Col xs={12} md={6} style={{display:"flex", flexWrap:"wrap", paddingTop: "50px", paddingBottom: "50px", zIndex: "1"}}>
              <div className="intro-para">
                <h3 className="has-text-weight-semibold is-size-2">{part4.header[language]}</h3>
                <p>
                  {part4.text[language]}
                </p>
              </div>
            </Col>
            <Col xs={12} md={6} style={{display: "flex"}}>
              <div style={{width: "100%", margin: "auto 20px", textAlign:"center"}}>
                <img src= {part4Img.publicURL} style={{width: "90%", maxWidth:"350px"}}/>
              </div>
          </Col>
          </Row>
        </Container>
      </section>
      }
    <section style={{overflow: "hidden"}}>
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
    <section style={{overflow:"hidden"}}>
        <Newsletter lang={language}/>
    </section>
    <section
    className="last"></section>
  </div>
)}

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
  part4Img:PropTypes.object,
  part4: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
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
        part4Img={post.frontmatter.part4Img}
        part4={post.frontmatter.part4}
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
      part4Img {
        childImageSharp {
          gatsbyImageData(quality: 100, layout: FULL_WIDTH)
        }
        publicURL
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
