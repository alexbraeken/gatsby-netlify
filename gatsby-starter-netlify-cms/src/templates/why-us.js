import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import {useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import {Container, Col, Row} from 'react-bootstrap'
import OwnerTestimonials from '../components/OwnerTestimonials'
import PropertySubmitForm from '../components/PropertySubmitForm'
import { gsap } from "gsap";
import BackgroundImage from 'gatsby-background-image'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import convertToBgImage from "../Helpers/images"
import { getImage } from "gatsby-plugin-image"
import StickyBox from "react-sticky-box"
import { AiOutlineCheck } from "@react-icons/all-files/ai/AiOutlineCheck";
import { AiOutlineInfoCircle } from "@react-icons/all-files/ai/AiOutlineInfoCircle";



if (typeof window !== `undefined`) {
  gsap.registerPlugin(ScrollTrigger);
}

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

  const heroImage = getImage(image.childImageSharp)
  const bgImage = convertToBgImage(heroImage)

  const part2Bg = getImage(part2Img.childImageSharp)
  const part2BgImg = convertToBgImage(part2Bg)
  
  const part2ScrollImgs = Object.keys(part2.scrollImgs).map(img => { 
    return part2.scrollImgs[img] 
  })

  const Col1Bg = getImage(part3.col1img.childImageSharp)
  const Col1BgImg = convertToBgImage(Col1Bg)
  const Col2Bg = getImage(part3.col2img.childImageSharp)
  const Col2BgImg = convertToBgImage(Col2Bg)
  const Col3Bg = getImage(part3.col3img.childImageSharp)
  const Col3BgImg = convertToBgImage(Col3Bg)

  useEffect(() => {

    setTimeout(()=>{
      setLoaded(true)}, 1000
      )

      let parallaxCont = gsap.utils.toArray('.parallax-tone-container');
      let parallaxImg = gsap.utils.toArray('.img-cont');
      let parallaxBGs = gsap.utils.toArray('.parallax-bg')  
      let parallaxToneBg = gsap.utils.toArray('.parallax-tone-bg');
      let colSections = gsap.utils.toArray(".colSection")
      let stickyImgSections = gsap.utils.toArray(".stickyImgSection")


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

    const bigNums = document.querySelectorAll(".strong-num")
    const counterBg = document.querySelectorAll(".counter-bg")

      bigNums.forEach((num, i)=> {

        let tl = gsap.timeline({
          scrollTrigger:{
            trigger: num,
            once: true,
            start: "top bottom"
          }
        })

        tl.from(num, {
          x: 1000,
          duration: 1,
          ease: "power2.out"
        }).from(num, {
          textContent: 0,
          duration: 4,
          ease: "power2.out",
          snap: { textContent: 1 },
          stagger: {
            each: 1.0,
            onUpdate: function() {
              this.targets()[0].innerHTML = numberWithCommas(Math.ceil(this.targets()[0].textContent));
            },
          }
        }).to(counterBg[i],
          {
            width: "110%",
            duration: 4,
            ease: "power2.out"
          },
          "<"
          )
      })

      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      colSections.forEach((col, i) => {
        const sectionBg = document.querySelector(`#${col.dataset.bg}`);  
        gsap.timeline({
          scrollTrigger: {
            trigger: col,
            start: "top center",
            onToggle: (self)=>{
              self.isActive ? sectionBg.classList.add("active") : sectionBg.classList.remove("active")
            }
          },
        })
      })

      stickyImgSections.forEach((img, i)=>{
        const sectionImg = document.querySelector(`#${img.dataset.img}`);  
        gsap.timeline({
          scrollTrigger: {
            trigger: img,
            start: "top center",
            onToggle: (self)=>{
              self.isActive ? sectionImg.classList.add("active") : sectionImg.classList.remove("active")
            },
            toggleClass: "active"
          },
        })
      })



      
    return () => {
      setLoaded(false)
      ScrollTrigger.getAll().forEach(t => t.kill());
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
          <h2 className="home-section-title" style={{left: "50%", transform: "translateX(-50%)", top: "-50px", color: "rgba(245, 130, 30, 0.5)", padding: "0 3%"}}>{t("We Create")}</h2>
      <Container>
        <Row style={{minHeight: "80vh"}}>
          <Col xs={12} md={6} style={{display:"flex", flexWrap:"wrap", padding: "50px 0", zIndex: "1"}}>
        <div className="section intro-para" style={{margin: "auto"}}>
          <h3 className="has-text-weight-semibold is-size-2">{part1.header[language]}</h3>
          <div dangerouslySetInnerHTML={{ __html: `<div> ${part1.text[language]} </div>` }} />
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
      <section className="newLine" style={{
        paddingBottom: "100px",
        position: "relative"}}>
        <h2 className="home-section-title" style={{left: "50%", top:"-50%", transform: "translateX(-50%)", top: "-100px", color: "rgba(245, 130, 30, 0.5)", padding: "0 3%"}}>{t("Potential")}</h2>
      <Container style={{minHeight:"80vh", display:"flex", flexDirection:"column"}}>
        <Row style={{flexDirection:"column", position:"relative", margin:"auto", width:"100%"}}>
          <h3 className="has-text-weight-semibold is-size-2" style={{textAlign:"center"}}>{t("Your property earning potential")}</h3>
          <Col style={{maxWidth: "800px", margin: "auto", boxShadow: "0 3px 1px rgb(0 0 0 / 10%), 0 4px 8px rgb(0 0 0 / 13%), 0 0 0 1px rgb(0 0 0 / 2%)",
            borderRadius: "4px",
            backgroundColor:"white",
            paddingBottom:"2rem"}}>
              <div className="form-container"> 
                <PropertySubmitForm />
              </div>
          </Col>
        </Row>
      </Container>
      </section>
      <section className="newLine" style={{
        paddingBottom: "100px",
        position: "relative"}}>
          <div style={{position:"absolute", height:"100%", width:"100%", left:0, top:0, display:"flex"}}>
            <Col md={6} className="d-none d-sm-block">
            </Col>
            <Col xs={12} md={6} style={{height:"100%", padding:0}}>
              <div className="orange-gradient" style={{width:"100%", height:"100%", borderBottomLeftRadius:"40px", borderTopLeftRadius:"40px"}}></div>
            </Col>
          </div>
      <Container>
        <Row>
          <Col md={6} className="d-none d-sm-block">
            <StickyBox>
              <div style={{height:"100vh", display:"flex"}}>
                {part2ScrollImgs.map((img, i) => 
                  <div className="img-cont stickyImg" id={`services-${i}`} style={{
                    margin:"auto",
                    position: "absolute",
                    left:"50%",
                    top:"50%",
                    transform:"translate(-50%,-50%)",
                    backgroundColor:"white",
                    width:"100%",
                    maxWidth:"400px",
                    border: "0.1rem solid rgb(60 43 43 / 20%)",
                    padding: "20px",
                    borderRadius: "2rem",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 3px 1px, rgba(0, 0, 0, 0.13) 0px 4px 8px, rgba(0, 0, 0, 0.02) 0px 0px 0px 1px"
                    }}>
                    <PreviewCompatibleImage imageInfo={img} className="parallax-tone-img" />
                  </div>
                  )}
              </div>
            </StickyBox> 
          </Col>
          <Col xs={12} md={6}>
            <h2 className="home-section-title" style={{left: "50%", transform: "translateX(-50%)", top: "-100px", color: "rgba(245, 130, 30, 0.5)", padding: "0 3%"}}>{t("Why?")}</h2>
          <div className="services-featured">
            <h3 className="has-text-weight-semibold is-size-2" style={{textAlign:"center"}}>{t("Our Services")}</h3>
            <div className="services-container" >
              <div className="service-container">
                <div data-img="services-0" className="stickyImgSection intro-para">
                  <h3>{t("Marketing")}</h3>
                  <p>{t("Fully digitalized marketing, using the latest channel management technology.")}</p>
                </div>
              </div>
              <div className="service-container">
                <div data-img="services-1" className="stickyImgSection intro-para">
                  <h3>{t("Housekeeping & Laundry")}</h3>
                  <p>{t("Our cleaning teams provide the industry leading services to keep all properties as if new and allow every guest and owner to experience the property in complete comfort and safety.")}</p>
                </div>
              </div>
              <div className="service-container">
                <div data-img="services-2" className="stickyImgSection intro-para">
                  <h3>{t("Maintenance")}</h3>
                  <p>{t("General property maintenance to ensure a top quality holiday experience for guests and peace of mind for owners.")}</p>
                </div>
              </div>
              <div className="service-container">
                <div data-img="services-3" className="stickyImgSection intro-para">
                  <h3>{t("Pools & Gardens")}</h3>
                  <p>{t("Manicuring lawns, triming hedges, cleaning and checking pool chemical levels are just a few of the ways we keep all properties at their most presentable and enjoyable at all times.")}</p>
                </div>
              </div>
              <div className="service-container">
                <div data-img="services-4" className="stickyImgSection intro-para">
                  <h3>{t("Photography")}</h3>
                  <p>{t("Professional photography and drone shots, including lighting, scene and ambiance setting and editing.")}</p>
                </div>
              </div>
              <div className="service-container">
                <div data-img="services-5" className="stickyImgSection intro-para">
                  <h3>{t("Legal & Administrative Services")}</h3>
                  <p>
                  {t(" Acquiring rental licenses, rental tax regularization and accountancy guidance are all available.")}
                  </p>
                </div>
              </div>
            </div>
            
            
          </div>
          </Col>
        </Row>
        </Container>
         </section>
      <section className="newLine" style={{
        padding: "100px 0",
        position: "relative"}}>
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
        overflow:"hidden"}}>
          <h2 className="home-section-title" style={{transform: "translateX(50%)", top: "-50px", color: "rgba(0, 0, 0, 0.5)"}}>{t("Different")}</h2>
          <div className="section-background">
        <div className='half-image-left grey-in mobile-full-width'>
          <BackgroundImage
              Tag="div"
              className={"parallax-bg"}
              {...part2BgImg}
              backgroundColor={`#040e18`}
              style={{zIndex:"1"}}
              preserveStackingContext
            ></BackgroundImage>
        </div>
        </div>
      <Container>
        <Row>
          <Col xs={12} md={6} style={{display:"flex", overflow:"hidden"}}>
          </Col>
          <Col style={{display:"flex"}} xs={12} md={6}>
          <div style={{margin: "auto"}} className="why-list">
            <h3 className="has-text-weight-semibold is-size-2" style={{color: "#fff"}}>{part2.header[language]}</h3>
              <div style={{margin:"100px auto", display:"flex", flexWrap:"nowrap", justifyContent: "space-between", width:"100%", position: "relative"}}>
                <div className="counter-bg" style={{position: "absolute", left:"-5%", top:0, width:0, height: "115%", backgroundColor:"#363636", zIndex:"1", borderTopRightRadius: "25px",
    borderBottomRightRadius: "25px",
    filter: "drop-shadow(2px 4px 6px black)"}}>

                </div>
                <strong style={{fontSize: "calc(50px + 5vw)",
    lineHeight: ".7",
    fontWeight: "400", color:"#ff8c26", mixBlendMode:"difference", pointerEvents:"none", zIndex:"2"}} ><span className="strong-num" data-value={150}>150</span>+</strong>
    <p className="highlight-feature-text">{t("Properties Managed")}</p>
              </div>
              <div style={{margin:"100px auto", display:"flex", flexWrap:"nowrap", justifyContent: "space-between", width:"100%", position: "relative"}}>
              <div className="counter-bg" style={{position: "absolute", left:"-5%", top:0, width:0, height: "115%", backgroundColor:"#363636", zIndex:"1", borderTopRightRadius: "25px",
    borderBottomRightRadius: "25px",
    filter: "drop-shadow(2px 4px 6px black)"}}>

</div>
                <strong style={{fontSize: "calc(50px + 5vw)",
    lineHeight: ".7",
    fontWeight: "400", color:"#ff8c26", mixBlendMode:"difference", pointerEvents:"none", zIndex:"2"}} ><span className="strong-num" data-value={15}>15</span>+</strong>
    <p className="highlight-feature-text" >{t("Years Experience")}</p>
              </div>
              <div style={{margin:"100px auto", display:"flex", flexWrap:"nowrap", justifyContent: "space-between", width:"100%", position: "relative"}}>
              <div className="counter-bg" style={{position: "absolute", left:"-5%", top:0, width:0, height: "115%", backgroundColor:"#363636", zIndex:"1", borderTopRightRadius: "25px",
    borderBottomRightRadius: "25px",
    filter: "drop-shadow(2px 4px 6px black)"}}>

</div>
                <strong style={{fontSize: "calc(50px + 5vw)",
    lineHeight: ".7",
    fontWeight: "400", color:"#ff8c26", mixBlendMode:"difference", pointerEvents:"none", zIndex:"2"}} ><span className="strong-num" data-value={30}>30</span>+</strong>
    <p className="highlight-feature-text">{t("Dedicated Team Members")}</p>
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
          <h2 className="home-section-title" style={{left: "50%", transform: "translateX(-50%)", top: "-50px", color: "rgba(245, 130, 30, 0.5)"}}>{t("It Works")}</h2>
      <div style={{width:"100vw", position: "relative"}}>
        <div className="colSection" data-bg="part3-bg1" style={{position:"relative", backgroundColor:"transparent", height:"100vh", width: "100%", zIndex:"2"}}>
          <div  style={{width:"300px", height: "auto", position: "absolute", right:"20%", top:"50%", transform:"translateY(-50%)", backgroundColor:"#fff", padding: "50px", borderRadius: "4px", filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9))"}}>
          <span className="orangeText home-section-title" style={{top:"-150px", fontSize:"12rem"}}>1</span>
          <h3 className="orangeText">{part3.col1Header[language]}</h3>
                <hr />
                <p>
                  {part3.col1[language]}
                </p>
          </div>
        </div>
        <div className="colSection" data-bg="part3-bg2" style={{position:"relative", backgroundColor:"transparent", height:"100vh", width: "100%", zIndex:"2"}}>
          <div style={{width:"300px", height: "auto", position: "absolute", right:"20%", top:"50%", transform:"translateY(-50%)", backgroundColor:"#fff", padding: "50px", borderRadius: "4px", filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9))"}}>
          <span className="orangeText home-section-title" style={{top:"-150px", fontSize:"12rem"}}>2</span>
          <h3 className="orangeText">{part3.col2Header[language]}</h3>
                <hr />
                <p>
                  {part3.col2[language]}
                </p>
          </div>
        </div>
        <div className="colSection" data-bg="part3-bg3" style={{position:"relative", backgroundColor:"transparent", height:"100vh", width: "100%", zIndex:"2"}}>
          <div style={{width:"300px", height: "auto", position: "absolute", right:"20%", top:"50%", transform:"translateY(-50%)", backgroundColor:"#fff", padding: "50px", borderRadius: "4px", filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9))"}}>
          <span className="orangeText home-section-title" style={{top:"-150px", fontSize:"12rem"}}>3</span>
          <h3 className="orangeText">{part3.col3Header[language]}</h3>
              <hr />
              <p>
                {part3.col3[language]}
              </p>
          </div>
        </div>
        <div style={{position: "absolute", left:"0", top:"0", height:"100%"}}>
        <StickyBox>
          <div style={{position:"relative", height:"100vh"}}>
          <BackgroundImage
              Tag="div"
              id="part3-bg1"
              className={"colSectionBg"}
              {...Col1BgImg}
              backgroundColor={`#040e18`}
              style={{zIndex:"1", width:"100vw", height:"100vh", position: "absolute"}}
              preserveStackingContext
            ></BackgroundImage>
            <BackgroundImage
              Tag="div"
              id="part3-bg2"
              className={"colSectionBg"}
              {...Col2BgImg}
              backgroundColor={`#040e18`}
              style={{zIndex:"1", width:"100vw", height:"100vh", position: "absolute"}}
              preserveStackingContext
            ></BackgroundImage>
            <BackgroundImage
              Tag="div"
              id="part3-bg3"
              className={"colSectionBg"}
              {...Col3BgImg}
              backgroundColor={`#040e18`}
              style={{zIndex:"1", width:"100vw", height:"100vh", position: "absolute"}}
              preserveStackingContext
            ></BackgroundImage>
          </div>
        </StickyBox>
        </div>
      </div>
    </section>
    <section style={{padding:"100px 0"}}>
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
    <section
     style={{
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
    <section
    className="last"></section>
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
        scrollImgs {
          scrollImg1 {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
            publicURL
          }
          scrollImg2 {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
            publicURL
          }
          scrollImg3 {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
            publicURL
          }
          scrollImg4 {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
            publicURL
          }
          scrollImg5 {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
            publicURL
          }
          scrollImg6 {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
            publicURL
          }
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
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
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
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
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
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
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
