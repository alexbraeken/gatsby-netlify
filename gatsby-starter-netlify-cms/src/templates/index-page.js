import React, {useEffect, useState, useRef} from 'react'
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import Layout from '../components/Layout'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { gsap } from "gsap";
import {Container, Col, Row, Card} from 'react-bootstrap'
import { FirestoreCollection } from "@react-firebase/firestore"
import Loading from '../components/Loading'
import FeatureCarousel from '../components/FeatureCarousel'
import SearchFilter from '../components/SearchFilter'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import SubmitButton from '../components/SubmitButton'
import Newsletter from '../components/Newsletter'
import Content, { HTMLContent } from '../components/Content'
import InstagramFeed from '../components/InstagramFeed';
import BackgroundImage from 'gatsby-background-image'
import PortugalWireSVG from '../components/PortugalWireSVG'
import AlgarveWireSVG from '../components/AlgarveWireSVG'
import VacationWireSVG from '../components/VacationWireSVG'
import smartaLogo from '../img/logo.svg'

const mapStateToProps = (state) => {
  return  {featuredProps: state.featuredProps}
}

const ConnectedFeatured = (props) => {
  const [featuredIds, setFeaturedIds] = useState([])

  const {t} = useTranslation();

  useEffect(() => {
    setFeaturedIds(props.featuredProps)
    return () => {
      setFeaturedIds([])
    }
  }, [props.featuredProps])

  return (
    <FirestoreCollection path="/Properties/">
      {data => {
          return (!data.isLoading && data.value) ?
          <>
          {featuredIds && featuredIds.length > 0 && 
            <div>
              <h2 style={{textAlign:"center", fontSize: "3rem", fontWeight:"bold"}}><div dangerouslySetInnerHTML={{__html: t('featured')}} /></h2>
              <FeatureCarousel ids={featuredIds} properties={data.value}/>
            </div>
          }
            </>
          : <Loading />
        }
      }
    </FirestoreCollection>
  )
}

const FeaturedProperties = connect(mapStateToProps)(ConnectedFeatured)

export const IndexPageTemplate = ({
  image,
  pitchImage,
  clipPathImage,
  tripImage,
  listImage,
  trustedImage,
  locationImage,
  accommodationsImage,
  title,
  langTitles,
  heading,
  subheading,
  mainpitch,
  news,
  contentComponent,
  content
}) =>{

  const PageContent = contentComponent || Content

  const {t} = useTranslation();
  const {language} = useI18next();

  const [animationPlaying, setAnimationPlaying] = useState(false)
  const [delta, setDelta] = useState({prev: 0, curr: 0})

  const logo = useRef(null);
  const shadow =useRef(null)
  const com = useRef(null)
  const suitcase = useRef(null)
  const home = useRef(null)
  const swim = useRef(null)
  const heroOverlay = useRef(null)
  const diamond = useRef(null)
  const bgImage = useRef(null)
  const borderSection = useRef(null)
  const clipCircle = useRef(null)


  useEffect(() => {
    let sectionsLeft = gsap.utils.toArray('.grey-in-left');
    let sectionsRight = gsap.utils.toArray('.grey-in');
    let textFadeLeft = gsap.utils.toArray('.fade-left')
    let textFadeRight = gsap.utils.toArray('.fade-right')
    let homeCards = gsap.utils.toArray('.home-card')
    let parallaxScrolls = gsap.utils.toArray('.parallax-scroll')
    let parallaxBGs = gsap.utils.toArray('.parallax-bg')

    sectionsLeft.forEach((section) => {
      gsap.from(section, { 
        filter: "grayscale(0.1)",
        xPercent: -100,
        z: 0.1,
        rotationZ: 0.01,
        autoAlpha: 0,
        force3D:true,
        scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            once: true,
            duration:0.3,
            ease:"Power2.easeOut",
        }
    });
    });

    sectionsRight.forEach((section, index) => {
      gsap.from(section, { 
        filter: "grayscale(0.1)",
        xPercent: 100,
        autoAlpha: 0,
        z: 0.1,
        rotationZ: 0.01,
        force3D:true,
        scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            once: true,
            duration:0.5,
            ease:"Power2.easeOut",
            onLeave: index === sectionsRight.length - 1 ? ()=>{
              if(borderSection && borderSection.current)borderSection.current.classList.add('trigger')
            } : null,
            onEnterBack: index === sectionsRight.length - 1 ? ()=>{
              if(borderSection && borderSection.current)borderSection.current.classList.remove('trigger')
            } : null,
        }
    });
    });

    textFadeLeft.forEach((section) => {
      gsap.from(section, { 
        filter: "grayscale(0.1)",
        xPercent: -100,
        autoAlpha: 0,
        scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            once: true,
            duration:0.5,
            ease:"Power2.easeOut",
        }
    });
    });

    textFadeRight.forEach((section) => {
      gsap.from(section, { 
        filter: "grayscale(0.1)",
        xPercent: 100,
        autoAlpha: 0,
        scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            once: true,
            duration:0.5,
            ease:"Power2.easeOut",
        }
      });
    });

    

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: clipCircle.current,
        start: 'top 90%',
        once: true,
        ease:"Power2.easeOut"
      },
    });

    tl.fromTo(
      clipCircle.current, 
      0.5,
      {
        attr: {
          r: 0,
        },
        strokeWidth: 0
      },
      {
        attr: {
          r: 150,
        },
        strokeWidth: 450,
        once: true,
      }
    )

    tl.to(
      clipCircle.current, 
      0.5,
      {
        attr: {
          r: 380,
        },
        strokeWidth: 50,
        opacity: 0.6,
        once: true,
        delay: 0.5
      }
    )

    homeCards.forEach((section) => {
      tl.from(section, 
        0.5,
        { 
          scale: 0
        }
      );
    });
    

    parallaxScrolls.forEach((section) => {

      gsap.from(section, { 
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
            trigger: section,
            scrub: true
        }
      });
    });

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

  }, []);
  


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
  gsap.to(shadow.current, 0.5, {opacity:0, ease:"Power2.easeOut",  delay: 4.5})
  gsap.to(heroOverlay.current, 1, {height:0, ease:"Power2.easeOut",  delay: 4.5})
  gsap.from(bgImage.current, 1.5, {filter: "grayscale(0.8)", ease:"Power2.easeOut",  delay: 4.7})
  return () => {
    
  }
}, [logo, shadow, com, suitcase, home, swim])

useEffect(() => {
  let width = logo.current.scrollWidth;
  if(delta.curr> 0 && (delta.prev - delta.curr) > 3 && !animationPlaying){
    setAnimationPlaying(true);
    gsap.to(logo.current, 1 / 4, {y:-(delta.prev-delta.curr)*5, ease:"Power2.easeOut"})
    gsap.to(logo.current, 0.75 , {y:0, ease:"Bounce.easeOut", delay:1 / 4, onComplete:()=>{setAnimationPlaying(false); setDelta({prev: 0, curr: 0})}})
    gsap.to(shadow.current,  1 / 4, {width: width/2, ease:"Power2.easeOut"})
    gsap.to(shadow.current, 0.75, {width: width, ease:"Bounce.easeOut", delay: 1/4})
  }
  return () => {
   
  }
}, [delta, logo, shadow])


const handleLogoHover = () => {
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
  if(currPos.y<0){
   
  }
})

  return(
  <div>
    <div className="hero-container">
      <div className="hero-bg-container" ref={bgImage}>
      <BackgroundImage
        Tag="div"
        className={"main-hero"}
        fluid={image.childImageSharp?.fluid || image}
        backgroundColor={`#040e18`}
      >
      </BackgroundImage>
      </div>
      <div id="hero-overlay" ref={heroOverlay}></div>
        <div className="logo-container">
        <div className="hero-left">
          <img role="button" tabindex="0" className="hero-logo" id="hero-logo" ref={logo} onMouseEnter={handleLogoHover} onFocus={handleLogoHover} src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDU2IiBoZWlnaHQ9IjQ1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiA8IS0tIENyZWF0ZWQgd2l0aCBNZXRob2QgRHJhdyAtIGh0dHA6Ly9naXRodWIuY29tL2R1b3BpeGVsL01ldGhvZC1EcmF3LyAtLT4NCiA8Zz4NCiAgPHRpdGxlPmJhY2tncm91bmQ8L3RpdGxlPg0KICA8cmVjdCBmaWxsPSJub25lIiBpZD0iY2FudmFzX2JhY2tncm91bmQiIGhlaWdodD0iNDU4IiB3aWR0aD0iNDU4IiB5PSItMSIgeD0iLTEiLz4NCiAgPGcgZGlzcGxheT0ibm9uZSIgb3ZlcmZsb3c9InZpc2libGUiIHk9IjAiIHg9IjAiIGhlaWdodD0iMTAwJSIgd2lkdGg9IjEwMCUiIGlkPSJjYW52YXNHcmlkIj4NCiAgIDxyZWN0IGZpbGw9InVybCgjZ3JpZHBhdHRlcm4pIiBzdHJva2Utd2lkdGg9IjAiIHk9IjAiIHg9IjAiIGhlaWdodD0iMTAwJSIgd2lkdGg9IjEwMCUiLz4NCiAgPC9nPg0KIDwvZz4NCiA8Zz4NCiAgPHRpdGxlPkxheWVyIDE8L3RpdGxlPg0KICA8ZWxsaXBzZSByeT0iMjA3LjUiIHJ4PSIyMDcuNSIgaWQ9InN2Z182IiBjeT0iMjI4IiBjeD0iMjI4IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjMDAwMDAwIi8+DQogIDxlbGxpcHNlIHJ5PSIyMDMuNSIgcng9IjIwMy41IiBpZD0ic3ZnXzgiIGN5PSIyMjgiIGN4PSIyMjgiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2U9IiNmZmZmZmYiIGZpbGw9IiNmZmZmZmYiLz4NCiAgPGVsbGlwc2Ugc3Ryb2tlPSIjZmY2NjAwIiByeT0iMTg1LjUwMDAxIiByeD0iMTg1LjUwMDAxIiBpZD0ic3ZnXzQiIGN5PSIyMjciIGN4PSIyMjkiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSIjZmY2NjAwIi8+DQogIDxyZWN0IHN0cm9rZT0iIzAwMDAwMCIgaWQ9InN2Z18xMCIgaGVpZ2h0PSIxNDQuMDAwMDEiIHdpZHRoPSIxODYiIHk9IjIwNi40NTMxNCIgeD0iMTM1IiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0iIzAwMDAwMCIvPg0KICA8cGF0aCB0cmFuc2Zvcm09InJvdGF0ZSgxMzUgMjMwLjA1NzQzNDA4MjAzMTMsMjIyLjA4MDg3MTU4MjAzMTIyKSAiIGlkPSJzdmdfMTEiIGQ9Im0xMzguMDU3NDksMzE0LjA4MDg4bDAsLTE4My45OTk5OWwxODMuOTk5OTIsMTgzLjk5OTk5bC0xODMuOTk5OTIsMHoiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiMwMDAwMDAiLz4NCiA8L2c+DQo8L3N2Zz4=" alt="Smarta" />
          <div className="shadow-container">
            <div id="logo-shadow" ref={shadow}></div>
          </div>
        </div>
        <div className="hero-right">
          <img className="text-logo" alt="Smartavillas text" id="smartavillas" src="https://res.cloudinary.com/ddipteh80/image/upload/v1603324001/Smartavillas/method-draw-image_2.svg"/>
          <div id="logo-spinner">
            <img className="text-logo" alt=".com text" ref={com} id="com" src="https://res.cloudinary.com/ddipteh80/image/upload/v1603324001/Smartavillas/method-draw-image_3.svg"/>
          <svg id="home" ref={home} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="home" className="svg-inline--fa fa-home fa-w-18" role="img" viewBox="0 0 576 512"><path fill="#000" d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"/></svg>
            <svg  id="suitcase" ref={suitcase} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="suitcase-rolling" className="svg-inline--fa fa-suitcase-rolling fa-w-12 fa-9x" role="img" viewBox="0 0 384 512"><path fill="#000" d="M336 160H48c-26.51 0-48 21.49-48 48v224c0 26.51 21.49 48 48 48h16v16c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-16h128v16c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-16h16c26.51 0 48-21.49 48-48V208c0-26.51-21.49-48-48-48zm-16 216c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h240c4.42 0 8 3.58 8 8v16zm0-96c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h240c4.42 0 8 3.58 8 8v16zM144 48h96v80h48V48c0-26.51-21.49-48-48-48h-96c-26.51 0-48 21.49-48 48v80h48V48z"/></svg>
            <svg id="swim" ref={swim} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="swimmer" className="svg-inline--fa fa-swimmer fa-w-20" role="img" viewBox="0 0 640 512"><path fill="#000" d="M189.61 310.58c3.54 3.26 15.27 9.42 34.39 9.42s30.86-6.16 34.39-9.42c16.02-14.77 34.5-22.58 53.46-22.58h16.3c18.96 0 37.45 7.81 53.46 22.58 3.54 3.26 15.27 9.42 34.39 9.42s30.86-6.16 34.39-9.42c14.86-13.71 31.88-21.12 49.39-22.16l-112.84-80.6 18-12.86c3.64-2.58 8.28-3.52 12.62-2.61l100.35 21.53c25.91 5.53 51.44-10.97 57-36.88 5.55-25.92-10.95-51.44-36.88-57L437.68 98.47c-30.73-6.58-63.02.12-88.56 18.38l-80.02 57.17c-10.38 7.39-19.36 16.44-26.72 26.94L173.75 299c5.47 3.23 10.82 6.93 15.86 11.58zM624 352h-16c-26.04 0-45.8-8.42-56.09-17.9-8.9-8.21-19.66-14.1-31.77-14.1h-16.3c-12.11 0-22.87 5.89-31.77 14.1C461.8 343.58 442.04 352 416 352s-45.8-8.42-56.09-17.9c-8.9-8.21-19.66-14.1-31.77-14.1h-16.3c-12.11 0-22.87 5.89-31.77 14.1C269.8 343.58 250.04 352 224 352s-45.8-8.42-56.09-17.9c-8.9-8.21-19.66-14.1-31.77-14.1h-16.3c-12.11 0-22.87 5.89-31.77 14.1C77.8 343.58 58.04 352 32 352H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h16c38.62 0 72.72-12.19 96-31.84 23.28 19.66 57.38 31.84 96 31.84s72.72-12.19 96-31.84c23.28 19.66 57.38 31.84 96 31.84s72.72-12.19 96-31.84c23.28 19.66 57.38 31.84 96 31.84h16c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zm-512-96c44.18 0 80-35.82 80-80s-35.82-80-80-80-80 35.82-80 80 35.82 80 80 80z"/></svg>
          </div>
        </div>
        </div>
        <SearchFilter className="search-filter" />
    </div>
     
    
    <section>
      <section className='main-section'>   
      <Container style={{zIndex:"1", margin:"auto"}}>
        <Row style={{height: "100%"}}>
          <Col xs={12} lg={6} className='main-col left'>
            <div className="intro-para">
              <h1 style={{fontSize:"2.5rem", fontWeight:"bold"}} className='fade-left'><span style={{color:"#f5821e"}}>Smartavillas</span>.com <Trans>Property Rentals & Management</Trans></h1>
              <hr style={{width:"50%", height:"4px", backgroundColor:"#f5821e"}} className='fade-left'/>
              <h2 className='fade-left'>{t('description')}</h2>
            </div>
          </Col>
          <Col xs={12} lg={6}>
          </Col>
        </Row>
      </Container>
      <div className="section-background">
        <div className='half-image grey-in'>
          <BackgroundImage
              Tag="div"
              className={"parallax-bg"}
              fluid={pitchImage.childImageSharp?.fluid || pitchImage}
              backgroundColor={`#040e18`}
            ></BackgroundImage>
        </div>
        <PortugalWireSVG />
        </div>
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
            <defs>
              <linearGradient id="Gradient">
                <stop offset="0%" stop-color="#ffa600"/>
                <stop offset="17%" stop-color="#ff8400"/>
                <stop offset="48%" stop-color="#ff7c00"/>
                <stop offset="88%" stop-color="#ff6200"/>
                <stop offset="100%" stop-color="#e92e00"/>
              </linearGradient>
            </defs>
            <path d="M0 100 C 20 0 50 0 100 100 Z"></path> 
            </svg>
            </div>
      </section>
      <section className='main-section mobile-reverse orange-gradient'>
          <div className="section-background">
            <div className={"half-image-left grey-in-left"}>
            <BackgroundImage
                Tag="div"
                className={"parallax-bg"}
                fluid={tripImage.childImageSharp?.fluid || tripImage}
                backgroundColor={`#040e18`}
              ></BackgroundImage>
            </div>
            <VacationWireSVG />
          </div>
          <Container style={{zIndex:"1", margin:"auto"}}>
            <Row style={{height: "100%"}}>
              <Col xs={12} lg={6}></Col>
              <Col xs={12} lg={6} className='main-col right'>
              <center style={{margin: "auto"}}><h2 className='fade-right' style={{textAlign:"center" , fontSize: "3rem", fontWeight:"bold"}}><Trans>What We</Trans> <span style={{color:"#fff"}}><Trans>Offer!</Trans></span></h2></center>
                <div className="intro-para">
                  <h3 className='fade-right' style={{fontSize:"2.5rem", color: "#fff", fontWeight:"bold"}}><Trans>Plan the trip of your dreams with us!</Trans></h3>
                  <hr className='fade-right' style={{width:"50%", height:"4px", backgroundColor:"#333333"}}/>
                  <p className='fade-right'>
                    <Trans>Book your trip with us and enjoy the best the Algarve has to offer with our spectacular selection of properties and best in class customer service.</Trans>
                    <Trans>We have dedicated classic customer care with modern technology to provide a worry free vacation.</Trans> <Link to="/whyBookSmartavillas" style={{fontWeight:"bold", textDecoration:"underline"}}><Trans>Read more</Trans>...</Link>
                  </p>
                  <br />
                  <SubmitButton className='fade-right' text={t('See Our Properties')} link="/properties"/>
                </div>
              </Col>
            </Row>
          </Container>
      </section>
      <section className='main-section orange-gradient'>
        <div class="parallax-scroll bg-logo">
          <img
              src={smartaLogo}
              alt="Smartavillas logo"
              style={{width:"500px"}}
            />
        </div>
          <Container style={{zIndex:"1", margin:"auto"}}>
            <Row style={{height: "100%"}}>    
              <Col xs={12} lg={6} className='main-col left'>
                <div className="intro-para" >
                  <h3 className='fade-left' style={{fontSize:"2.5rem", color: "#fff", fontWeight:"bold"}}><Trans>Property Management Like no other in the Algarve</Trans></h3>
                  <hr className='fade-left' style={{width:"50%", height:"4px", backgroundColor:"#333333"}}/>
                  <p className='fade-left'>
                    <Trans>We pride ourselves on tailoring our services to meet your needs. Join hundreds of property owners and enjoy the benefits our best in the region service provide.</Trans>
                  </p>
                  <br />
                  <SubmitButton text={t('Read more')} link="/ListWithUs"/>
                </div>
              </Col>
              <Col xs={12} lg={6}>
              </Col>
            </Row>
          </Container>
          <div className="section-background">
          <div className={"half-image grey-in"}>
          <BackgroundImage
                Tag="div"
                className={"parallax-bg"}
                fluid={listImage.childImageSharp?.fluid || listImage}
                backgroundColor={`#040e18`}
              ></BackgroundImage>
          </div>
          <AlgarveWireSVG />
          </div>
      </section>
      <section className='main-section section-top-border orange-gradient' ref={borderSection} >
          <svg className="clipped-image-container">
            <defs>
            <pattern id="img1" patternUnits="userSpaceOnUse" width="1500" height="1500">
              <image href={clipPathImage.childImageSharp?.fluid.src} x="100" y="-250" width="1500" height="1500" />
            </pattern>
          </defs>
            <circle ref={clipCircle} xmlns="http://www.w3.org/2000/svg" cx="600" cy="450" r="380" stroke="url(#img1)" stroke-width="50" fill="none"/>
          </svg>
          <Container style={{zIndex:"2", paddingTop: "30px", display: "flex", flexDirection: "column", justifyContent: "center"}}>
          <h2 style={{textAlign:"center", fontSize: "3rem", fontWeight:"bold"}}><Trans>At Home in the</Trans> <span style={{color:"#fff"}}>Algarve</span></h2>
          <br />
          <Row style={{justifyContent:"center", position: "relative"}}>
            <Col className="home-card-container" xs={12} md={4} >
              <Card className="home-card">
                <a href="/team" aria-label="team"></a>
                <BackgroundImage
                Tag="div"
                className={"home-card-bg"}
                fluid={trustedImage.childImageSharp?.fluid || trustedImage}
                backgroundColor={`#040e18`}
                style={{position: "absolute"}}
                ></BackgroundImage>              
                <Card.Body className="home-card-body">
                  <div className="home-card-title">
                    <h2><Trans>Trusted since 2009</Trans></h2>
                    <a href="/team" className="home-card-button-link"><button className="btn"><Trans>Read more</Trans>...</button></a>
                  </div>         
                </Card.Body>
              </Card>
              <div className="home-card-para">
                <p><Trans>We are a dynamic and friendly company that really puts you - the customer - first.</Trans></p>
              </div>
            </Col>
            <Col className="home-card-container" xs={12} md={4} >
              <Card className="home-card">
                <a href="/location/algarve" aria-label="locations"></a>
                <BackgroundImage
                Tag="div"
                className={"home-card-bg"}
                fluid={locationImage.childImageSharp?.fluid || locationImage}
                backgroundColor={`#040e18`}
                style={{position: "absolute"}}
              ></BackgroundImage>
                <Card.Body className="home-card-body">
                  <div className="home-card-title">
                    <h2><Trans>Amazing Location</Trans></h2>
                    <a href="/location/algarve" className="home-card-button-link"><button className="btn"><Trans>Read more</Trans>...</button></a>
                  </div>
                </Card.Body>
              </Card>
              <div className="home-card-para">
                <p style={{textAlign:"center"}}><Trans>Spectacular scenery, sandy beaches, good food, friendly people and great golf.</Trans></p>
              </div>
            </Col>
            <Col className="home-card-container" xs={12} md={4} >
              <Card className="home-card">
                <a href="/properties" aria-label="properties"></a>
                <BackgroundImage
                Tag="div"
                className={"home-card-bg"}
                fluid={accommodationsImage.childImageSharp?.fluid || accommodationsImage}
                backgroundColor={`#040e18`}
                style={{position: "absolute"}}
                ></BackgroundImage>
                <Card.Body className="home-card-body">
                  <div className="home-card-title">
                    <h2><Trans>100 + Quality Accommodations</Trans></h2>
                    <a href="/properties" className="home-card-button-link"><button className="btn"><Trans>Book Now</Trans>...</button></a>
                  </div>
                </Card.Body>
              </Card>
              <div className="home-card-para">
                <p style={{textAlign:"center"}}><Trans>At affordable prices - in the Eastern Algarve, with Tavira being the focal point.</Trans></p>
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
          <svg fill="#333333" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" style={{
            width: "100%",
            left: "0",
            bottom: "-1px",
            height: "100%",
            position: "absolute",
          }}> 
            <path d="M0 20 C 30 80 70 0 100 75 L 100 100 0 100 Z"></path> 
          </svg>
        </div>
      </section>
      <section style={{
        paddingBottom: "100px",
        width: "100vw",
        position: "relative",
        marginLeft: "-50vw",
        left: "50%",
        backgroundColor:"#333333"}}>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <div style={{display: "flex", height: "100%"}}>
              <div style={{margin: "auto", textAlign:"center"}}>
              <h2 style={{textAlign:"center", fontSize: "3rem", fontWeight:"bold", color: "#f5821e"}}><span dangerouslySetInnerHTML={{__html: t('clean & safe')}} /></h2>
          <br />
          <p style={{color:"#fff"}}>
          <span dangerouslySetInnerHTML={{__html: t('clean & safe description')}} />
          </p>
              </div>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div style={{display: "flex"}}>
              <img alt="Clean &amp; Safe Seal" src="https://portugalcleanandsafe.com/assets/badge.png" style={{margin: "auto", maxHeight:"300px", minHeight:"250px"}} />
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
      <Newsletter lang={language}/>
      <Container style={{paddingLeft:"0", paddingRight:"0"}}>
        <FeaturedProperties />
      </Container>
      <section style={{paddingTop:"40px"}}>
        <Container>
        <h2 style={{textAlign:"center", fontSize: "3rem", fontWeight:"bold"}}><div dangerouslySetInnerHTML={{__html: t('news & notes')}} /></h2>
          <hr style={{width:"50%", height:"4px", backgroundColor:"#f5821e"}}/>
          <div dangerouslySetInnerHTML={{ __html: `<div> ${news[language]} </div>` }} />
        </Container>
      </section>
      <section style={{paddingTop:"40px", paddingBottom:"40px"}}>
      <Container>
      <h2 style={{textAlign:"center", fontSize: "3rem", fontWeight:"bold"}}><div dangerouslySetInnerHTML={{__html: t('our feed')}} /></h2>
      <hr style={{width:"50%", height:"4px", backgroundColor:"#f5821e"}}/>
      <InstagramFeed />
      </Container>
      </section>
      <section>
        <Container>
        <PageContent className="content" content={content} />
        </Container>
      </section>
    </section>
  </div>
)} 

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  langTitles: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  heading: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  subheading: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  mainpitch: PropTypes.object,
  pitchImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  clipPathImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  tripImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  listImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  trustedImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  locationImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  accommodationsImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  news: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  contentComponent: PropTypes.func,
  content: PropTypes.string,
}

const IndexPage = ({ data }) => {

  const post = data.pageData

  return (
    <Layout>
      <IndexPageTemplate
        image={post.frontmatter.image}
        title={post.frontmatter.title}
        langTitles={post.frontmatter.langTitles}
        heading={post.frontmatter.heading}
        subheading={post.frontmatter.subheading}
        mainpitch={post.frontmatter.mainpitch}
        pitchImage={post.frontmatter.pitchImage}
        clipPathImage={post.frontmatter.clipPathImage}
        tripImage={post.frontmatter.tripImage}
        listImage={post.frontmatter.listImage}
        trustedImage={post.frontmatter.trustedImage}
        locationImage={post.frontmatter.locationImage}
        accommodationsImage={post.frontmatter.accommodationsImage}
        news={post.frontmatter.news}
        contentComponent={HTMLContent}
        content={post.html}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.object
}

export default IndexPage

export const pageQuery = graphql`
query IndexPageTemplate ($language: String!) {
  pageData: markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
    html
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
          fluid(maxWidth: 2000, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      heading {
          en
          pt
          fr
          es
        }
      subheading {
          en
          pt
          fr
          es
        }
      mainpitch {
        title {
          en
          pt
          fr
          es
        }
        description {
          en
          pt
          fr
          es
        }
      }
      pitchImage {
        childImageSharp {
          fluid(maxWidth: 926, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      clipPathImage {
        childImageSharp {
          fluid(maxWidth: 926, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      tripImage {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      listImage {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      trustedImage {
        childImageSharp {
          fluid(maxWidth: 500, quality: 92) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      locationImage {
        childImageSharp {
          fluid(maxWidth: 500, quality: 92) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      accommodationsImage {
        childImageSharp {
          fluid(maxWidth: 500, quality: 92) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      news {
          en
          pt
          fr
          es
        }
    }
  }
  locales: allLocale(filter: {ns: {in: ["translation", "index"]},language: {eq: $language}}) {
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
