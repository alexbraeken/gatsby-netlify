import React, {useEffect, useState, useRef} from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'
import SearchWidget from '../components/SearchWidget'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { gsap } from "gsap";
import {Container, Col, Row, Card} from 'react-bootstrap'
import { FirestoreCollection } from "@react-firebase/firestore"
import Loading from '../components/Loading'
import FeatureCarousel from '../components/FeatureCarousel'
import SearchFilter from '../components/SearchFilter'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const IndexPageTemplate = ({
  image,
  pitchImage,
  title,
  heading,
  subheading,
  mainpitch,
  news,
  intro,
}) =>{

  const [animationPlaying, setAnimationPlaying] = useState(false)
  const [delta, setDelta] = useState({prev: 0, curr: 0})
  const [atTop, setAtTop] = useState(true)
  const [featuredIds, setFeaturedIds] = useState([])


  const logo = useRef(null);
  const shadow =useRef(null)
  const com = useRef(null)
  const suitcase = useRef(null)
  const home = useRef(null)
  const swim = useRef(null)
  const heroOverlay = useRef(null)


useEffect(() => {
  setAnimationPlaying(true)
  let width = logo.current.scrollWidth;
  gsap.fromTo(logo.current, 1, {y:-1000}, {y:0, ease: "Bounce.easeOut", delay:1 / 2})
  gsap.fromTo(shadow.current, 1, {width:"10px"}, {width: width, ease: "Bounce.easeOut", delay:1 / 2})
  gsap.fromTo(suitcase.current, 1, {opacity:0, y:50}, {opacity:1, y:0, ease: "power4.out", delay: 1})
  gsap.to(suitcase.current, 0.5, {y:-50, opacity: 0, ease: "power4.out",  delay: 2})
  gsap.fromTo(swim.current, 1, {opacity:0, y:50}, {opacity:1, y: 0, ease: "power4.out", delay: 2})
  gsap.to(swim.current, 0.5, {y:-50, opacity: 0, ease: "power4.out",  delay: 3})
  gsap.fromTo(home.current, 1, {opacity:0, y:50}, {opacity:1, y:0, ease: "power4.out", delay: 3})
  gsap.to(home.current, 0.5, {y:-50, opacity: 0, ease: "power4.out",  delay: 4})
  gsap.fromTo(com.current, 1, {opacity:0}, {opacity:1, ease: "power4.out", delay: 4, onComplete: ()=>{setAnimationPlaying(false)}})
  return () => {
    
  }
}, [logo, shadow, com, suitcase, home, swim])

useEffect(() => {
  let width = logo.current.scrollWidth;
  if(delta.curr> 0 && (delta.prev - delta.curr) > 3 && !animationPlaying){
    setAnimationPlaying(true);
    gsap.to(logo.current, 1 / 4, {y:-(delta.prev-delta.curr)*5, ease:"Power2.easeOut"})
    gsap.to(logo.current, 0.75 , {y:0, ease:"Bounce.easeOut", delay:1 / 4, onComplete:()=>{setAnimationPlaying(false)}})
    gsap.to(shadow.current,  1 / 4, {width: width/2, ease:"Power2.easeOut"})
    gsap.to(shadow.current, 0.75, {width: width, ease:"Bounce.easeOut", delay: 1/4})
  }
  return () => {
   
  }
}, [delta, logo, shadow])

const uri = "https://api.hostfully.com/v2/properties?tags=featured&agencyUid=ab8e3660-1095-4951-bad9-c50e0dc23b6f"

useEffect(() => {
  console.log("fetching")
  fetch(uri, {
    headers:{
      "X-HOSTFULLY-APIKEY": "PEpXtOzoOAZGrYC8"
    }
  })
        .then(response => {
            
            return response.text()
        })
        .then(data => {
          console.log(JSON.parse(data));
          setFeaturedIds(JSON.parse(data).propertiesUids)
        })
  return () => {
    setFeaturedIds([])
  }
}, [])


const handleLogoHover = () => {
  console.log("hovering") 
  let width = logo.current.scrollWidth;
  if(!animationPlaying){
    setAnimationPlaying(true);
    gsap.to(logo.current, 1 / 4, {y:-70, ease:"Power2.easeOut"})
    gsap.to(logo.current, 0.75 , {y:0, ease:"Bounce.easeOut", delay:1 / 4, onComplete: ()=>{setAnimationPlaying(false)}})
    gsap.to(shadow.current,  1 / 4, {width: width/2, ease:"Power2.easeOut"})
    gsap.to(shadow.current, 0.75, {width: width, ease:"Bounce.easeOut", delay: 1/4})
  }
} 

useScrollPosition(({ prevPos, currPos }) => {
  let prevDelta = delta.curr;
  setDelta({prev: prevDelta, curr: (currPos.y - prevPos.y)})
  if(currPos.y<0 && atTop){
    gsap.to(shadow.current, 0.5, {opacity:0, ease:"Power2.easeOut"})
    gsap.to(heroOverlay.current, 1, {height:0, ease:"Power2.easeOut"})
  }
})




  return(
  <div>
    <div className="main-hero" id = "main-hero" style={{
                  backgroundImage: `url(${
                    image.childImageSharp
                      ? image.childImageSharp.fluid.src
                      : image
                  })`,
                }}>
      <div id="hero-overlay" ref={heroOverlay}></div>
  <div className="logo-container">
  <div className="hero-left">
    <img className="hero-logo" id="hero-logo" ref={logo} onMouseEnter={handleLogoHover} src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDU2IiBoZWlnaHQ9IjQ1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiA8IS0tIENyZWF0ZWQgd2l0aCBNZXRob2QgRHJhdyAtIGh0dHA6Ly9naXRodWIuY29tL2R1b3BpeGVsL01ldGhvZC1EcmF3LyAtLT4NCiA8Zz4NCiAgPHRpdGxlPmJhY2tncm91bmQ8L3RpdGxlPg0KICA8cmVjdCBmaWxsPSJub25lIiBpZD0iY2FudmFzX2JhY2tncm91bmQiIGhlaWdodD0iNDU4IiB3aWR0aD0iNDU4IiB5PSItMSIgeD0iLTEiLz4NCiAgPGcgZGlzcGxheT0ibm9uZSIgb3ZlcmZsb3c9InZpc2libGUiIHk9IjAiIHg9IjAiIGhlaWdodD0iMTAwJSIgd2lkdGg9IjEwMCUiIGlkPSJjYW52YXNHcmlkIj4NCiAgIDxyZWN0IGZpbGw9InVybCgjZ3JpZHBhdHRlcm4pIiBzdHJva2Utd2lkdGg9IjAiIHk9IjAiIHg9IjAiIGhlaWdodD0iMTAwJSIgd2lkdGg9IjEwMCUiLz4NCiAgPC9nPg0KIDwvZz4NCiA8Zz4NCiAgPHRpdGxlPkxheWVyIDE8L3RpdGxlPg0KICA8ZWxsaXBzZSByeT0iMjA3LjUiIHJ4PSIyMDcuNSIgaWQ9InN2Z182IiBjeT0iMjI4IiBjeD0iMjI4IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjMDAwMDAwIi8+DQogIDxlbGxpcHNlIHJ5PSIyMDMuNSIgcng9IjIwMy41IiBpZD0ic3ZnXzgiIGN5PSIyMjgiIGN4PSIyMjgiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2U9IiNmZmZmZmYiIGZpbGw9IiNmZmZmZmYiLz4NCiAgPGVsbGlwc2Ugc3Ryb2tlPSIjZmY2NjAwIiByeT0iMTg1LjUwMDAxIiByeD0iMTg1LjUwMDAxIiBpZD0ic3ZnXzQiIGN5PSIyMjciIGN4PSIyMjkiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSIjZmY2NjAwIi8+DQogIDxyZWN0IHN0cm9rZT0iIzAwMDAwMCIgaWQ9InN2Z18xMCIgaGVpZ2h0PSIxNDQuMDAwMDEiIHdpZHRoPSIxODYiIHk9IjIwNi40NTMxNCIgeD0iMTM1IiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0iIzAwMDAwMCIvPg0KICA8cGF0aCB0cmFuc2Zvcm09InJvdGF0ZSgxMzUgMjMwLjA1NzQzNDA4MjAzMTMsMjIyLjA4MDg3MTU4MjAzMTIyKSAiIGlkPSJzdmdfMTEiIGQ9Im0xMzguMDU3NDksMzE0LjA4MDg4bDAsLTE4My45OTk5OWwxODMuOTk5OTIsMTgzLjk5OTk5bC0xODMuOTk5OTIsMHoiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiMwMDAwMDAiLz4NCiA8L2c+DQo8L3N2Zz4=" alt="Smarta" />
    <div className="shadow-container">
      <div id="logo-shadow" ref={shadow}></div>
    </div>
  </div>
  <div className="hero-right">
    <img className="text-logo" id="smartavillas" src="https://res.cloudinary.com/ddipteh80/image/upload/v1603324001/Smartavillas/method-draw-image_2.svg"/>
    <div id="logo-spinner">
      <img className="text-logo" ref={com} id="com" src="https://res.cloudinary.com/ddipteh80/image/upload/v1603324001/Smartavillas/method-draw-image_3.svg"/>
    <svg id="home" ref={home} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="home" className="svg-inline--fa fa-home fa-w-18" role="img" viewBox="0 0 576 512"><path fill="#000" d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"/></svg>
      <svg  id="suitcase" ref={suitcase} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="suitcase-rolling" className="svg-inline--fa fa-suitcase-rolling fa-w-12 fa-9x" role="img" viewBox="0 0 384 512"><path fill="#000" d="M336 160H48c-26.51 0-48 21.49-48 48v224c0 26.51 21.49 48 48 48h16v16c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-16h128v16c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-16h16c26.51 0 48-21.49 48-48V208c0-26.51-21.49-48-48-48zm-16 216c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h240c4.42 0 8 3.58 8 8v16zm0-96c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h240c4.42 0 8 3.58 8 8v16zM144 48h96v80h48V48c0-26.51-21.49-48-48-48h-96c-26.51 0-48 21.49-48 48v80h48V48z"/></svg>
      <svg id="swim" ref={swim} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="swimmer" className="svg-inline--fa fa-swimmer fa-w-20" role="img" viewBox="0 0 640 512"><path fill="#000" d="M189.61 310.58c3.54 3.26 15.27 9.42 34.39 9.42s30.86-6.16 34.39-9.42c16.02-14.77 34.5-22.58 53.46-22.58h16.3c18.96 0 37.45 7.81 53.46 22.58 3.54 3.26 15.27 9.42 34.39 9.42s30.86-6.16 34.39-9.42c14.86-13.71 31.88-21.12 49.39-22.16l-112.84-80.6 18-12.86c3.64-2.58 8.28-3.52 12.62-2.61l100.35 21.53c25.91 5.53 51.44-10.97 57-36.88 5.55-25.92-10.95-51.44-36.88-57L437.68 98.47c-30.73-6.58-63.02.12-88.56 18.38l-80.02 57.17c-10.38 7.39-19.36 16.44-26.72 26.94L173.75 299c5.47 3.23 10.82 6.93 15.86 11.58zM624 352h-16c-26.04 0-45.8-8.42-56.09-17.9-8.9-8.21-19.66-14.1-31.77-14.1h-16.3c-12.11 0-22.87 5.89-31.77 14.1C461.8 343.58 442.04 352 416 352s-45.8-8.42-56.09-17.9c-8.9-8.21-19.66-14.1-31.77-14.1h-16.3c-12.11 0-22.87 5.89-31.77 14.1C269.8 343.58 250.04 352 224 352s-45.8-8.42-56.09-17.9c-8.9-8.21-19.66-14.1-31.77-14.1h-16.3c-12.11 0-22.87 5.89-31.77 14.1C77.8 343.58 58.04 352 32 352H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h16c38.62 0 72.72-12.19 96-31.84 23.28 19.66 57.38 31.84 96 31.84s72.72-12.19 96-31.84c23.28 19.66 57.38 31.84 96 31.84s72.72-12.19 96-31.84c23.28 19.66 57.38 31.84 96 31.84h16c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zm-512-96c44.18 0 80-35.82 80-80s-35.82-80-80-80-80 35.82-80 80 35.82 80 80 80z"/></svg>
    </div>
  </div>
    </div>
    <SearchFilter className="search-filter" />  
</div>
    
    <section className="section section--gradient">
      <section style={{
        paddingBottom: "100px",
        width: "100vw",
        position: "relative",
        marginLeft: "-50vw",
        left: "50%"}}>
      <Container style={{zIndex:"2"}}>
        <Row>
          <Col xs={12} md={8} style={{display:"flex", flexWrap:"wrap"}}>
          <h1 style={{fontSize:"2.5rem"}}><span style={{color:"#f5821e"}}>Smartavillas</span>.com Property Rentals & Management</h1>
          <hr style={{width:"50%", height:"4px", backgroundColor:"#f5821e"}}/>
          <h2>{mainpitch.description}</h2>
          </Col>
          <Col xs={12} md={4}>
            <PreviewCompatibleImage imageInfo={pitchImage} />
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
      <Container style={{zIndex:"2"}}>
        <Row style={{justifyContent:"center"}}>
          <Col className="home-card-container" xs={12} md={3} >
            <Card className="home-card">
      <a href="/team" aria-label="team"></a><div className="home-card-bg" style={{
                  backgroundImage: "url('https://wallpaperaccess.com/full/1126753.jpg')"}}></div>  
                  
              <Card.Body className="home-card-body">
              <div className="home-card-title">
                  <h2>Trusted since 2009</h2>
                  <a href="/team" className="home-card-button-link"><button className="btn">Read More...</button></a>
                </div>         
              </Card.Body>
              
            </Card>
            <div className="home-card-para">
                  <p>We are a small and friendly company that really puts you - the customer - first.</p>
            </div>
          </Col>
          <Col xs={12} md={3} className="home-card-container" >
            <Card className="home-card">
      <a href="/whyBookSmartavillas" aria-label="service"> </a> 
        <div className="home-card-bg"
      style={{backgroundImage: "url('https://insidecolumbia.net/wp-content/uploads/2019/11/Exterior-Photos-3-copy_featuredImage-750x430.jpg')"}}></div>
       
              <Card.Body className="home-card-body">
              <div className="home-card-title">
                <h2 >Great Service</h2>
                <a href="/whyBookSmartavillas" className="home-card-button-link"><button className="btn">Read More...</button></a>
              </div>
             
              </Card.Body>
            </Card>
            <div className="home-card-para">
                <p style={{textAlign:"center"}}>We pride ourselves on tailoring our services to meet your needs.</p>
                </div>
          </Col>
          <Col className="home-card-container" xs={12} md={3} >
            <Card className="home-card">
      <a href="/location/algarve" aria-label="locations"></a><div className="home-card-bg"
      style={{backgroundImage: "url('https://da28rauy2a860.cloudfront.net/completehome/wp-content/uploads/2019/10/08145046/sc-2036-1.jpg')"}}></div>  
              <Card.Body className="home-card-body">
              <div className="home-card-title">
                <h2>Amazing Location</h2>
                <a href="/location/algarve" className="home-card-button-link"><button className="btn">Read More...</button></a>
              </div>
              
              </Card.Body>
            </Card>
            <div className="home-card-para">
                <p style={{textAlign:"center"}}>Spectacular scenery, sandy beaches, good food, friendly people and great golf</p>
                </div>
          </Col>
          <Col className="home-card-container" xs={12} md={3} >
            <Card className="home-card">
      <a href="/properties" aria-label="properties"></a><div className="home-card-bg"
      style={{backgroundImage: "url('https://q-xx.bstatic.com/xdata/images/hotel/840x460/216998982.jpg?k=05cc23092019a463ec92f35bc1bd6a1f3ace27f962db9c4aef249f341e27222e&o=')"}}></div>  
              <Card.Body className="home-card-body">
              <div className="home-card-title">
                <h2>100 + Quality Accommodations</h2>
                <a href="/properties" className="home-card-button-link"><button className="btn">Read More...</button></a>
              </div>
              
              </Card.Body>
              
            </Card>
            <div className="home-card-para">
                <p style={{textAlign:"center"}}>At affordable prices - in the Eastern Algarve, with Tavira being the focal point.</p>
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
      <Container style={{paddingLeft:"0", paddingRight:"0"}}>
                  <FirestoreCollection path="/Properties/">
                    {data => {
                        return (!data.isLoading && data.value) ?
                        <>
                        {featuredIds.length > 0 && 
                          <div>
                            <h2>Featured Properties</h2>
                            <FeatureCarousel ids={featuredIds} properties={data.value}/>
                          </div>
                        }
                          </>
                        : <Loading />
                      }
                    }
                  </FirestoreCollection>
      </Container>
      <section style={{paddingTop:"40px"}}>
        <Container>
          <h2>News & Tidbits</h2>
          <hr style={{width:"50%", height:"4px", backgroundColor:"#f5821e"}}/>
          <div dangerouslySetInnerHTML={{ __html: `<div> ${news} </div>` }} />
        </Container>
      </section>
      <section>
        <Container>
         
        </Container>
      </section>
    </section>
  </div>
)} 

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  pitchImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  news: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        pitchImage={frontmatter.pitchImage}
        news={frontmatter.news}
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        pitchImage {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        news
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`
