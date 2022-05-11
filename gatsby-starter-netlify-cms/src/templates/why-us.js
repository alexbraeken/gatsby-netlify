import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import {useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import {Container, Col, Row} from 'react-bootstrap'
import OwnerTestimonials from '../components/OwnerTestimonials'
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

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

  const parallaxCont = useRef(null)
  const parallaxImg = useRef(null)
  const parallaxBg = useRef(null)

  const {t} = useTranslation();
  const {language } = useI18next();

  useEffect(() => {

    setTimeout(()=>{
      setLoaded(true)}, 1000
      )

      let parallaxCont = gsap.utils.toArray('.parallax-tone-container');
      let parallaxImg = gsap.utils.toArray('.img-cont');
      let parallaxBg = gsap.utils.toArray('.parallax-tone-bg');

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: parallaxCont,
          start: 'top bottom',
          scrub: true
        },
      });

      parallaxCont.forEach((cont, i)=>{
        gsap.to(
          parallaxBg[i], 
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
          parallaxImg[i], 
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

    const bigNums = document.querySelectorAll(".strong-num")

      bigNums.forEach((num, i)=> {
        gsap.from(num, {
          textContent: 0,
          duration: 4,
          ease: "power1.in",
          snap: { textContent: 1 },
          scrollTrigger:{
            trigger: num,
            once: true,
            start: "top bottom"
          },
          stagger: {
            each: 1.0,
            onUpdate: function() {
              this.targets()[0].innerHTML = numberWithCommas(Math.ceil(this.targets()[0].textContent));
            },
          }
        });
      })

      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      
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
        {langTitles[language]}
      </h2>
    </div>
    <section className="newLine" style={{
        paddingBottom: "100px",
        position: "relative"}}>
          <h2 className="home-section-title" style={{left: "50%", transform: "translateX(-50%)", top: "-50px", color: "rgba(245, 130, 30, 0.5)", padding: "0 3%"}}>We Create</h2>
      <Container>
        <Row style={{minHeight: "100vh"}}>
          <Col xs={12} md={6} style={{display:"flex", flexWrap:"wrap", padding: "50px 0", zIndex: "1"}}>
        <div className="section intro-para" style={{margin: "auto"}}>
          <h3 className="has-text-weight-semibold is-size-2">{part1.header[language]}</h3>
          <div dangerouslySetInnerHTML={{ __html: `<div> ${part1.text[language]} </div>` }} />
        </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="parallax-tone-container" ref={parallaxCont}>
            <div ref={parallaxImg} className="img-cont" >
              <PreviewCompatibleImage imageInfo={part1Img} className="parallax-tone-img" imgStyle={{borderRadius: "5px"}} />
            </div>
            <div className="parallax-tone-bg" ref={parallaxBg}></div>
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
                <stop offset="0%" stop-color="#ffa600"/>
                <stop offset="17%" stop-color="#ff8400"/>
                <stop offset="48%" stop-color="#ff7c00"/>
                <stop offset="88%" stop-color="#ff6200"/>
                <stop offset="100%" stop-color="#e92e00"/>
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
        left: "50%"}}>
          <h2 className="home-section-title" style={{transform: "translateX(50%)", top: "-50px", color: "rgba(0, 0, 0, 0.5)"}}>Different</h2>
      <Container>
        <Row>
          <Col xs={12} md={6}>
          <div className="parallax-tone-container" ref={parallaxCont}>
            <div ref={parallaxImg} className="img-cont" >
            <PreviewCompatibleImage imageInfo={part2Img} className="parallax-tone-img" imgStyle={{width:"100%", height:"100%", borderRadius: '5px'}}/>
            </div>
            <div className="parallax-tone-bg light" ref={parallaxBg}></div>
          </div>
          </Col>
          <Col style={{display:"flex"}} xs={12} md={6}>
          <div style={{margin: "auto"}} className="why-list">
            <h3 className="has-text-weight-semibold is-size-2" style={{color: "#fff"}}>{part2.header[language]}</h3>
              <div style={{margin:"50px auto", display:"flex", flexWrap:"nowrap"}}>
                <strong style={{fontSize: "calc(100px + 10vw)",
    lineHeight: ".7",
    fontWeight: "400"}} ><span className="strong-num" data-value={160}>160</span>+</strong><p>Properties<br />managed</p>
              </div>
              <div style={{margin:"50px auto", display:"flex", flexWrap:"nowrap"}}>
                <strong style={{fontSize: "calc(100px + 10vw)",
    lineHeight: ".7",
    fontWeight: "400"}} ><span className="strong-num" data-value={13}>13</span></strong><p>Years<br />experience</p>
              </div>
              <div style={{margin:"50px auto", display:"flex", flexWrap:"nowrap"}}>
                <strong style={{fontSize: "calc(100px + 10vw)",
    lineHeight: ".7",
    fontWeight: "400"}} ><span className="strong-num" data-value={20}>20</span>+</strong><p>Dedicated<br />Team<br />members</p>
              </div>
              <div style={{margin:"50px auto", display:"flex", flexWrap:"nowrap"}}>
                <strong style={{fontSize: "calc(100px + 10vw)",
    lineHeight: ".7",
    fontWeight: "400"}} ><span className="strong-num" data-value={80}>80</span>%</strong><p>Occupancy<br />rate</p>
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
      paddingTop: "200px",
        paddingBottom: "100px",
        position: "relative"}}>
          <h2 className="home-section-title" style={{left: "50%", transform: "translateX(-50%)", top: "-50px", color: "rgba(245, 130, 30, 0.5)"}}>It Works</h2>
      <Container>
        <h3 className="has-text-weight-semibold is-size-2">{part3.header[language]}</h3>
        <hr style={{width:"50%", height:"4px", backgroundColor:"#f5821e"}}/>
          <Row>
            <Col xs={12} md={4}>
              <PreviewCompatibleImage imageInfo={part3.col1img} />
              <br />
              <Container className="intro-para" style={{textAlign:"center", paddingBottom: "20px"}}>
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
              <Container className="intro-para" style={{textAlign:"center", paddingBottom: "20px"}}>
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
              <Container className="intro-para" style={{textAlign:"center", paddingBottom: "20px"}}>
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
        <div className="parallax-tone-container" ref={parallaxCont}>
            <div ref={parallaxImg} className="img-cont" >
            <PreviewCompatibleImage imageInfo={part4Img} className="parallax-tone-img" imgStyle={{width:"100%", height:"100%", borderRadius: '5px'}}/>
            </div>
            <div className="parallax-tone-bg" ref={parallaxBg}></div>
          </div>
        </Col>
        </Row> 
      </Container>    
    </section>
    <section style={{
        paddingBottom: "100px",
        overflow: "hidden"}}>
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

export const WhyUsPageQuery = graphql`
  query WhyUsPage($id: String!, $language: String!) {
    pageData: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title 
        langTitles{
          en
          pt
          fr
          es
        }
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
          publicURL
        }
        part1 {
          header{
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
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
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
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
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
              fluid(maxWidth: 500, quality: 100) {
                ...GatsbyImageSharpFluid
              }
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
              fluid(maxWidth: 500, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
            publicURL
          }
          col3Header {
            en
            pt
            fr
            es
          }
          col3{
            en
            pt
            fr
            es
          }
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
          header{
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
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
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
