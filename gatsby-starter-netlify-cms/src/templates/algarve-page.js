import React, {useState, useEffect, useRef} from 'react'
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import {Container, Col, Row} from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StickyBox from "react-sticky-box";
import { Helmet } from 'react-helmet'
import BackgroundImage from 'gatsby-background-image'
import convertToBgImage from "../Helpers/images"
import { getImage } from "gatsby-plugin-image"

class CustomSlide extends React.Component {

  
  render() {

    const heroImage = getImage(this.props.slide.slide? this.props.slide.slide.childImageSharp: null)
    const bgImage = heroImage ? convertToBgImage(heroImage) : null
    if (typeof window !== `undefined`) {
      gsap.registerPlugin(ScrollTrigger); 
    }
    return (
      <BackgroundImage
      Tag="div"
      className={""}
      {...bgImage}
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
      padding: "40px",
    zIndex: 1}}
      preserveStackingContext
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


export const AlgarvePageTemplate = ({
  image,
  title,
  langTitles,
  heading,
  description,
  staticBg,
  featureSection,
  gallery,
  sliderText,
  sliderImage1,
  sliderImageTitle1,
  sliderImage2,
  sliderImageTitle2,
  sliderImage3,
  sliderImageTitle3,
  sliderImage4,
  sliderImageTitle4,
  conclusion, 
  contentComponent,
  content
}) => {

  const PageContent = contentComponent || Content

  const [index, setIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [galleryImgs, setGalleryImgs] = useState([])
  const [featureImgs, setFeatureImgs] = useState([])
  const [postcards, setPostcards] = useState([])

  const galleryContainer = useRef(null)
  const stickyContainer = useRef(null)
  const stickyFeature = useRef(null)
  const botSVG= useRef(null)

  const {language} = useI18next();


  const heroImage = image.childImageSharp !== null ? convertToBgImage(getImage(image.childImageSharp)) : image.publicURL

  const galleryImage = gallery.staticImg.img.childImageSharp ? convertToBgImage(getImage(gallery.staticImg.img.childImageSharp)) : gallery.staticImg.img.publicUrl 


    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };

      useEffect(() => {
        setGalleryImgs(document.getElementsByClassName('scroll-parallax-img'))
        setFeatureImgs(document.getElementsByClassName('feature-circle-image'))
        setPostcards(document.getElementsByClassName('postcard-container'))
        setTimeout(()=>{
          setLoaded(true)}, 1000
          )
        
        gsap.to(botSVG.current, {
          ease: "Power2.easeIn",
          attr: {d: 'M469.539032,263.986786H-0.000001L0,229.890961c310.649475,58.156982,255.61113-98.5,469.539032-65.062302V263.986786z' },
          scrollTrigger: {
            trigger: ".grid-container",  
            start: "top 50%",
            end: "25% 50%", 
            scrub: 1, 
          }
        })
        gsap.fromTo(botSVG.current, 
          {
            attr: {d: 'M469.539032,263.986786H-0.000001L0,229.890961c310.649475,58.156982,255.61113-98.5,469.539032-65.062302V263.986786z' }
          },
          {
          ease: "Power2.easeOut",
          attr: {d: 'M469.539032,263.986786H-0.000001L0,0c226.11113,0,182.887283-0.414484,469.539032,0V263.986786zz' },
          scrollTrigger: {
            trigger: ".grid-container",  
            start: "50% 50%",
            end: "75% bottom", 
            scrub: 1, 
          }
        })
        return () => {
          setGalleryImgs([])
          setFeatureImgs([])
          setPostcards([])
          setLoaded(false)
        }
      }, [])

      useEffect(() => {
        if(featureImgs.length > 0){
          Object.keys(featureImgs).forEach((img, index)=>{
            gsap.to(featureImgs[index], {
              scrollTrigger: {
                trigger: stickyFeature.current,
                start: `${index*25}% 75%`,
                end: "bottom top",
                scrub: 1,
                toggleClass: {targets: featureImgs[index],  className: "visible"}
              }
            })
          })
        }

      }, [featureImgs])

      useEffect(() => {
        if(postcards.length > 0){
          Object.keys(postcards).forEach((img, index)=>{
            gsap.to(postcards[index], {
              scrollTrigger: {
                trigger: stickyFeature.current,
                start: `${index*25}% 100%`,
                end: `${(index*25)+25}% 100%`,
                scrub: 1,
                toggleClass: {targets: postcards[index],  className: "visible"},
                onToggle: ()=>{
                  if(stickyFeature && stickyFeature.current)stickyFeature.current.classList.toggle(`background-${index}`)
                }
              }
            })
          })
        }
      }, [postcards])

      useEffect(() => {
        if(galleryImgs.length > 0){
          Object.keys(galleryImgs).forEach((img, index)=>{
            gsap.to(galleryImgs[index], {
              scrollTrigger: {
                trigger: galleryImgs[index],
                start: `top 80%`,
                end: "bottom top",
                scrub: 1,
                toggleClass: {targets: galleryImgs[index],  className: "visible"}
              }
            })
          })
        }
      }, [galleryImgs])
      

      

    const slides = [{slide: sliderImage1, title: sliderImageTitle1}, 
      {slide: sliderImage2, title: sliderImageTitle2}, 
      {slide: sliderImage3, title: sliderImageTitle3}, 
      {slide: sliderImage4, title: sliderImageTitle4}]


  return (
    <div className="content newLine">
      {!image.childImageSharp && image.extension === 'svg' ? 
      <div
      className={"full-width-image-container margin-top-0 "}
      style={{
        backgroundImage: `url("${heroImage}")`,
        zIndex:"1", 
        marginBottom: "0" }}
    >
      <div className="gradient-bg"></div>
      <h2
    className={`has-text-weight-bold is-size-1 content-header ${loaded? "loaded" : ""}`}
    style={{color: "white"}}>
    {langTitles[language]}
  </h2>
  </div>
      :
      <BackgroundImage
          className={"full-width-image-container margin-top-0 "}
          Tag="div"
          {...heroImage}
          backgroundColor={`#040e18`}
          style={{zIndex:"1", marginBottom: "0"}}
          preserveStackingContext
        >
          <div className="gradient-bg"></div>
          <h2
        className={`has-text-weight-bold is-size-1 content-header ${loaded? "loaded" : ""}`}
        style={{color: "white"}}>
        {langTitles[language]}
      </h2>
    </BackgroundImage>
          }
      <section style={{
          position: "relative"
          }}>
        <Container>
          <style>

          </style>
          <div className="full-width sticky-feature" style={{height:"400vh", position:"relative"}} ref={stickyFeature}>
            <div style={{display: "none"}} className="background-0 background-1 background-2 background-3"></div>
            <StickyBox style={{height: "100vh"}} className="feature-postcards">
              {Object.keys(featureSection.text).map((feature, index) => 
                
                <section className={`postcard-container ${index > 0 ? "" : "visible"}`}>
                <div style={{paddingTop: "2rem", paddingLeft: "2rem", gridArea: "stamp", position: "relative"}}>
                  <img src="/img/airmail.png" alt="Airmail" style={{position: "absolute", top: "20px", left:"10%", filter: "none"}} width="150px"/>
                  <img src="/img/mailwaves.png" alt="Mail waves" style={{position: "absolute", top: "10%", left:"11%", filter: "none", transform: "rotate(210deg)"}} width="150px"/>
                </div>
                <h1>{featureSection.title[`title${index+1}`][language]}</h1>
                <div className="content">
                  <p>
                    {featureSection.text[feature][language]}
                  </p>
                </div>
                <div className="img">
                  <h2 style={{fontFamily: "'Mrs Sheppards', cursive"}}>{featureSection.title[`title${index+1}`][language]}</h2>
                  <PreviewCompatibleImage imageInfo={featureSection.imgs[`img${index+1}`]} alt={featureSection.imgs[`img${index+1}`].alt || "Feature Image"}/>
                </div>
              </section>
              )}
              
            </StickyBox>
          </div>
          <Helmet>
              <link rel="preconnect" href="https://fonts.gstatic.com" />
              <link href="https://fonts.googleapis.com/css2?family=Mrs+Sheppards&display=swap" rel="stylesheet"></link>
          </Helmet>
          <div className="full-width" ref={stickyContainer}>
            <div className="grid-container" style={{}}>
            {Object.keys(gallery.imgs1)?.map((img, index) => {
                return <PreviewCompatibleImage 
                          imageInfo={gallery.imgs1[img]} 
                          key={index} 
                          imgStyle={{
                            width: "100%",
                            position: "relative",
                            gridColumn: `${(index+1) % 2 === 0 ? '1 / 2' : '3 / 4'}`,
                            boxShadow: `${(index+1) % 2 === 0 ? '4px 0px 20px -4px' : '-4px 0px 20px -4px'}`}}
                            className= {`scroll-parallax-img img-${index}`} 
                            />
              })}
              <div style={{gridColumn:"2 / 3", gridRow: "1 / 6"}}>
              <StickyBox style={{
              height: "100vh",
              overflow:"hidden"}}>
            <div className="gallery-container" ref={galleryContainer}>
              <div className="text-container">
                <h3>{gallery.text1.header[language]}</h3>
                <p>{gallery.text1.text[language]}</p>
              </div>
              <div style={{
            width: "100%",
            position: "absolute",
            top: "auto",
            bottom: "0",
            right: "0",
            height: "100%",
            zIndex: "1",
            transform: "translateZ(0)"}} data-front="" data-style="curve_asym" data-position="bottom">
              <svg  fill="#FF8C00" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 469.539032 263.986786" preserveAspectRatio="none" style={{width: "100%", left: "0", bottom: "-1px", height: "100%", position: "absolute"}}> 
              <path ref={botSVG} d="M469.539032,263.986786H-0.000001L0,263.557617c66.11113,0.429169,351.088104,0.429169,469.539032,0.208344V263.986786z"></path> 
              </svg>
              </div>
            </div>
            </StickyBox>
              </div>
            </div> 
          </div>
          <div className="full-width">
            <div className="grid-container" style={{gridAutoRows:"unset"}}>
            {Object.keys(gallery.imgs2)?.map((img, index) => {
                return <PreviewCompatibleImage 
                          imageInfo={gallery.imgs2[img]} 
                          key={index} 
                          imgStyle={{
                            width: "100%",
                            position: "relative"}}
                            className={`scroll-parallax-img img-${index + Object.keys(gallery.imgs1).length} feature-img`}/>
              })}
               <div className="gallery-text" style={{gridRow: "1 / 3", backgroundColor:"rgb(51, 51, 51)"}}>
              <StickyBox style={{
              height: "100vh",
              overflow:"hidden"}}>
            <div className="gallery-container">
              <div className="text-container feature-text">
                <h3>{gallery.text2.header[language]}</h3>
                <p>{gallery.text2.text[language]}</p>
              </div>
            </div>
            
            </StickyBox>
              </div>
            </div>
          </div>
        <BackgroundImage
          className={"full-width full-img"}
          Tag="div"
          {...galleryImage}
          backgroundColor={`#040e18`}
          style={{zIndex:"1"}}
          preserveStackingContext
        >
            <div className="gallery-container">
              <div className="text-container static-text">
              <h3>
                {gallery.staticImg.text.header[language]}
              </h3>
              <p>
              {gallery.staticImg.text.text[language]}
              </p>
              </div>
            </div>              

          </BackgroundImage>
          </Container>
          </section>
          <section style={{
          paddingBottom: "100px",
          position: "relative"}}>
            <Container>
            <h3 className="has-text-weight-semibold is-size-2">{heading[language]}</h3>
              <PageContent className="content" content={content} />
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
            <Col md={12} lg={6} style={{display:"flex"}}>
              <p style={{margin: "auto"}}>
              {sliderText[language]}
              </p>
              
            </Col>
            <Col md={12} lg={6}>
              <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
                {slides &&
              slides.map((slide, index) => {
                    return<Carousel.Item key={index}>
                        <Row>
                            <CustomSlide slide={slide} key={index}/>
                        </Row>
            </Carousel.Item>
                })}
            </Carousel>
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
          <p>
            {conclusion[language]}
          </p>
        </Container>
      </section>
    </div>
  );}

AlgarvePageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  langTitles: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  heading: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  staticBg: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  featureSection: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  gallery: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  sliderText: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  sliderImage1: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  sliderImage2: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  sliderImage3: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  sliderImage4: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  sliderImageTitle1 : PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  sliderImageTitle2 : PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  sliderImageTitle3 : PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  sliderImageTitle4 : PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  conclusion: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  contentComponent: PropTypes.func,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

const AlgarvePage = ({ data }) => {
  const post = data.pageData
  return (
    <Layout propTitle={post.frontmatter.title}>
      <AlgarvePageTemplate
        contentComponent={HTMLContent}
        content={post.html}
        image={post.frontmatter.image}
        title={post.frontmatter.title}
        langTitles={post.frontmatter.langTitles}
        heading={post.frontmatter.heading}
        description={post.frontmatter.description}
        staticBg={post.frontmatter.staticBg}
        featureSection={post.frontmatter.featureSection}
        gallery={post.frontmatter.gallery}
        sliderText={post.frontmatter.sliderText}
        sliderImage1={post.frontmatter.sliderImage1}
        sliderImage2={post.frontmatter.sliderImage2}
        sliderImage3={post.frontmatter.sliderImage3}
        sliderImage4={post.frontmatter.sliderImage4}
        sliderImageTitle1={post.frontmatter.sliderImageTitle1}
        sliderImageTitle2={post.frontmatter.sliderImageTitle2}
        sliderImageTitle3={post.frontmatter.sliderImageTitle3}
        sliderImageTitle4={post.frontmatter.sliderImageTitle4}
        conclusion={post.frontmatter.conclusion}
      />
    </Layout>
  )
}

AlgarvePage.propTypes = {
  data: PropTypes.object
}

export default AlgarvePage

export const algarvePageQuery = graphql`query AlgarvePage($id: String!, $language: String!) {
  pageData: markdownRemark(id: {eq: $id}) {
    html
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
          fluid(quality: 92) {
            ...GatsbyImageSharpFluid
          }
        }
        extension
        publicURL
      }
      heading {
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
      staticBg {
        childImageSharp {
          gatsbyImageData(quality: 100, layout: FULL_WIDTH)
        }
      }
      featureSection {
        imgs {
          img1 {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
          }
          img2 {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
          }
          img3 {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
          }
          img4 {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
          }
        }
        title {
          title1 {
            en
            pt
            fr
            es
          }
          title2 {
            en
            pt
            fr
            es
          }
          title3 {
            en
            pt
            fr
            es
          }
          title4 {
            en
            pt
            fr
            es
          }
        }
        text {
          text1 {
            en
            pt
            fr
            es
          }
          text2 {
            en
            pt
            fr
            es
          }
          text3 {
            en
            pt
            fr
            es
          }
          text4 {
            en
            pt
            fr
            es
          }
        }
      }
      gallery {
        imgs1 {
          img1 {
            childImageSharp {
              gatsbyImageData(width: 600, quality: 100, layout: CONSTRAINED)
            }
          }
          img2 {
            childImageSharp {
              gatsbyImageData(width: 600, quality: 100, layout: CONSTRAINED)
            }
          }
          img3 {
            childImageSharp {
              gatsbyImageData(width: 600, quality: 100, layout: CONSTRAINED)
            }
          }
          img4 {
            childImageSharp {
              gatsbyImageData(width: 600, quality: 100, layout: CONSTRAINED)
            }
          }
          img5 {
            childImageSharp {
              gatsbyImageData(width: 600, quality: 100, layout: CONSTRAINED)
            }
          }
          img6 {
            childImageSharp {
              gatsbyImageData(width: 600, quality: 100, layout: CONSTRAINED)
            }
          }
          img7 {
            childImageSharp {
              gatsbyImageData(width: 600, quality: 100, layout: CONSTRAINED)
            }
          }
          img8 {
            childImageSharp {
              gatsbyImageData(width: 600, quality: 100, layout: CONSTRAINED)
            }
          }
          img9 {
            childImageSharp {
              gatsbyImageData(width: 600, quality: 100, layout: CONSTRAINED)
            }
          }
          img10 {
            childImageSharp {
              gatsbyImageData(width: 600, quality: 100, layout: CONSTRAINED)
            }
          }
        }
        text1 {
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
        imgs2 {
          img1 {
            childImageSharp {
              gatsbyImageData(width: 900, quality: 100, layout: CONSTRAINED)
            }
          }
          img2 {
            childImageSharp {
              gatsbyImageData(width: 900, quality: 100, layout: CONSTRAINED)
            }
          }
        }
        text2 {
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
        staticImg {
          text {
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
          img {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
          }
        }
      }
      sliderText {
        en
        pt
        fr
        es
      }
      sliderImage1 {
        childImageSharp {
          gatsbyImageData(width: 800, quality: 100, layout: CONSTRAINED)
        }
      }
      sliderImageTitle1
      sliderImage2 {
        childImageSharp {
          gatsbyImageData(width: 800, quality: 100, layout: CONSTRAINED)
        }
      }
      sliderImageTitle2
      sliderImage3 {
        childImageSharp {
          gatsbyImageData(width: 800, quality: 100, layout: CONSTRAINED)
        }
      }
      sliderImageTitle3
      sliderImage4 {
        childImageSharp {
          gatsbyImageData(width: 800, quality: 100, layout: CONSTRAINED)
        }
      }
      sliderImageTitle4
      conclusion {
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
