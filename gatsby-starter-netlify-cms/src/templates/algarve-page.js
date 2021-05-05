import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import {Container, Col, Row} from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { gsap } from "gsap";
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import StickyBox from "react-sticky-box";

class CustomSlide extends React.Component {
  render() {
    
    return (
      <div style={{backgroundImage: `url(${this.props.slide.slide? this.props.slide.slide.childImageSharp.fluid.src: null})`,
      minHeight: "400px",
      height: "50vh",
      width:"100vw",
      margin: "0px auto",
      overflow: "hidden",
      position: "relative",
      backgroundSize:"cover",
      backgroundPosition:"center",
      padding: "40px"}}>
          <div className="slide__content">
              <svg className="slide__overlay small-overlay" preserveAspectRatio="xMaxYMax slice" viewBox="0 0 720 405"> 
              <path className="slide__overlay-path" d="M0,0 150,0 300,405 0,405"></path> 
              </svg>
              <div className="slide__text">
              <h2 className="slide__text-heading">{this.props.slide.title}</h2>
              </div>
              </div>
        <h3></h3>
    <p></p>
      </div>
    );
  }
}


export const AlgarvePageTemplate = ({
  image,
  title,
  heading,
  description,
  staticBg,
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
  const [galleryScrollRange, setGalleryScrollRange] = useState([]) 

  const galleryContainer = useRef(null)
  const hero = useRef(null)
  const stickyContainer = useRef(null)

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };

      useEffect(() => {
        setGalleryImgs(document.getElementsByClassName('scroll-parallax-img'))
        setGalleryScrollRange({ 
          trigger: hero.current.getBoundingClientRect().height - Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0), 
          viewHeight: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
          height: stickyContainer.current.getBoundingClientRect().height
        })
        setTimeout(()=>{
          setLoaded(true)}, 1000
          )

        return () => {
          setLoaded(false)
        }
      }, [])

      

      useScrollPosition(({ prevPos, currPos }) => {
        if(currPos.y <= (galleryScrollRange.trigger)){
          const currHeight = (currPos.y - galleryScrollRange.trigger)/galleryScrollRange.height
          if(galleryImgs){
            Object.keys(galleryImgs).forEach((img, index)=>{
              const opacity = 0.8 - index/10 - currHeight
              galleryImgs[img].style.opacity = opacity
              /*const transformX = ((index-5)/10)*100*currHeight
              const transformY = ((index-5)/10)*500*currHeight
              galleryImgs[img].style.transform = `translate(${-50 + transformX}%, ${-50 + transformY}%)`*/
            })
          }
        }
      })

    const slides = [{slide: sliderImage1, title: sliderImageTitle1}, 
      {slide: sliderImage2, title: sliderImageTitle2}, 
      {slide: sliderImage3, title: sliderImageTitle3}, 
      {slide: sliderImage4, title: sliderImageTitle4}]

    const nextIcon = <span aria-hidden="true" className="carousel-control-next-icon feature-next-icon" />
    const prevIcon = <span aria-hidden="true" className="carousel-control-prev-icon feature-prev-icon" />

  return(
  <div className="content newLine">
    <div
      className="full-width-image-container margin-top-0 gradient-bg"
      ref={hero}
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
        {title}
      </h2>
    </div>
    <section style={{
        position: "relative",
        backgroundImage: `url(${staticBg.childImageSharp.fluid.src})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        }}>
      <Container>
        <div className="full-width" style={{height:"200vh"}} ref={stickyContainer}>
          <div style={{display:"grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows:"400px", gridAutoFlow:"dense"}}>
          {Object.keys(gallery.imgs)?.map((img, index) => {
              return <PreviewCompatibleImage 
                        imageInfo={gallery.imgs[img]} 
                        key={index} 
                        imgStyle={{
                          width: "100%",
                          borderRadius: "5px",
                          position: "relative",
                          gridColumn: `${5 % (index+1) === 5 ? '1 / 2' : '3 / 4'}`,
                          opacity: "0"}}
                          className="scroll-parallax-img"/>
            })}
            <div style={{gridColumn:"2 / 3", gridRow: "1 / 6"}}>
            <StickyBox style={{
            height: "80vh",
            overflow:"hidden"}}>
          <div className="gallery-container" ref={galleryContainer} style={{display: "flex", margin:"auto", flexDirection:"column"}}>
            <h3 style={{
              position:"absolute", 
              left: "50%", 
              top: "50%", 
              transform: "translate(-50%, -50%)", 
              textAlign:"center",
              width: "100%",
              maxWidth: "100%",
              zIndex: "2",
              backgroundColor: "rgba(256, 256 ,256, 0.7)",
              borderRadius: "5px",
              padding: "20px"}}>{gallery.text}</h3>
            
          </div>
          </StickyBox>
            </div>
          </div>
          
        </div>
        </Container>
        </section>
        <section style={{
        paddingBottom: "100px",
        position: "relative"}}>
          <Container>
          <h3 className="has-text-weight-semibold is-size-2">{heading}</h3>
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
            {sliderText}
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
          {conclusion}
        </p>
      </Container>
    </section>
  </div>
)}

AlgarvePageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  staticBg: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  gallery: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  sliderText: PropTypes.string,
  sliderImage1: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  sliderImage2: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  sliderImage3: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  sliderImage4: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  sliderImageTitle1 : PropTypes.string,
  sliderImageTitle2 : PropTypes.string,
  sliderImageTitle3 : PropTypes.string,
  sliderImageTitle4 : PropTypes.string,
  conclusion: PropTypes.string,
  contentComponent: PropTypes.func,
  content: PropTypes.string,
}

const AlgarvePage = ({ data }) => {
  const { markdownRemark:post } = data
  return (
    <Layout propTitle={post.frontmatter.title}>
      <AlgarvePageTemplate
        contentComponent={HTMLContent}
        content={post.html}
        image={post.frontmatter.image}
        title={post.frontmatter.title}
        heading={post.frontmatter.heading}
        description={post.frontmatter.description}
        staticBg={post.frontmatter.staticBg}
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

export const algarvePageQuery = graphql`
  query AlgarvePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
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
        heading
        description
        staticBg {
          childImageSharp {
            fluid(maxWidth: 1500, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        gallery {
          imgs {
            img1 {
              childImageSharp {
                fluid(maxWidth: 600, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            img2 {
              childImageSharp {
                fluid(maxWidth: 600, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            img3 {
              childImageSharp {
                fluid(maxWidth: 600, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            img4 {
              childImageSharp {
                fluid(maxWidth: 600, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            img5 {
              childImageSharp {
                fluid(maxWidth: 600, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            img6 {
              childImageSharp {
                fluid(maxWidth: 600, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            img7 {
              childImageSharp {
                fluid(maxWidth: 600, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            img8 {
              childImageSharp {
                fluid(maxWidth: 600, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            img9 {
              childImageSharp {
                fluid(maxWidth: 600, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            img10 {
              childImageSharp {
                fluid(maxWidth: 600, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        text
        }
        sliderText
        sliderImage1 {
          childImageSharp {
            fluid(maxWidth: 800, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        sliderImageTitle1
        sliderImage2 {
          childImageSharp {
            fluid(maxWidth: 800, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        sliderImageTitle2
        sliderImage3 {
          childImageSharp {
            fluid(maxWidth: 800, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        sliderImageTitle3
        sliderImage4 {
          childImageSharp {
            fluid(maxWidth: 800, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        sliderImageTitle4
        conclusion
      }
    }
  }
`
