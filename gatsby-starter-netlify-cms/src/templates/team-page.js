import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import {useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import TeamRoll from '../components/TeamRoll'
import { Container } from 'react-bootstrap';
import { gsap } from "gsap";
import { CSSPlugin } from 'gsap/CSSPlugin'
import BackgroundImage from 'gatsby-background-image'

gsap.registerPlugin(CSSPlugin)

export const MeetTheTeamPageTemplate = ({
  image,
  secondaryImage,
  title,
  langTitles,
  heading,
  description,
  intro,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [circleClip, setCircleClip] = useState({radius: 0, clickedRadius: 0})
  const [clicked, setClicked] = useState(false)
  const [heroEnter, setHeroEnter] = useState(false)
  const [heroHover, setHeroHover] = useState(false)
  const [mouse, setMouse] = useState({x: 0, y: 0})

  const hero = useRef(null)
  const maskImg = useRef(null)

  const {t} = useTranslation();
  const {language } = useI18next();
    
      useEffect(() => {
        setTimeout(()=>{
          setLoaded(true)}, 1000
          )

          let parallaxBGs = gsap.utils.toArray('.parallax-bg')  
          
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

          
        return () => {
          setLoaded(false)
        }
      }, [])

      const handleMouseMove = (e) => {
        setMouse({x: e.pageX, y: e.pageY})
        updateClipPath(maskImg.current)
      }

      useEffect(() => {
         let tempCircle = circleClip
        gsap.to(tempCircle, heroEnter ?  0.1 : 0.5, {radius: heroEnter ?  200 : 0, onUpdate:()=>{
          updateClipPath(maskImg.current, tempCircle)
          setCircleClip(tempCircle)
        }
        })
        if(!heroEnter)setClicked(false)
      }, [heroEnter])

      useEffect(() => {
        let tempCircle = circleClip
        if(heroEnter)gsap.to(tempCircle, 1, {radius: clicked? 2000: 200 , onUpdate:()=>{
          updateClipPath(maskImg.current)
          setCircleClip(tempCircle)
          }
        })
      }, [clicked])

      const updateClipPath = () => {
        let circle = `circle(${circleClip.radius}px at ${clicked ? `50% 50%` : `${mouse.x}px ${mouse.y}px`})`
        gsap.set(maskImg.current, { webkitClipPath: `${circle}` })
        
      }


  return(
<>
        <div
          className="full-width-image-container margin-top-0"
          ref={hero}
          style={{margin: "0 -50vw"}}
          onMouseMove={(e)=>handleMouseMove(e)}
          onMouseEnter={()=>setHeroEnter(!heroEnter)}
          onMouseLeave={()=>setHeroEnter(!heroEnter)}
          onClick={()=>setClicked(!clicked)}
          style={{
            backgroundImage: `url(${ !!image.childImageSharp ? image.childImageSharp.fluid.src : image })`, height: "100vh"
          }}
        >
        <div className="mask-container">
          <img src="https://greatpeopleinside.com/se/wp-content/uploads/2019/11/team-building-1030x579.jpg" 
          ref={maskImg}
          draggable="false"
          alt="Morraine Lake" 
          id="clipped-image" />
        </div>
          <h1
        className={`has-text-weight-bold is-size-1 content-header ${loaded? "loaded" : ""}`}
        style={{color: "white", position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  zIndex: "3"}}>
            {langTitles[language]}
          </h1>
        </div>
          <div style={{marginBottom:"50px", height: "100vh", backgroundColor: "#000"}}>
          <section className="team-intro" style={{display: "flex", flexWrap: "wrap", height: "100%", flexWrap: "wrap",
    position: "relative"}}>
                  <div style={{flex: "1 1 40%", minWidth: "350px", display: "flex", color: "orange"}}>
                  <h2 className="home-section-title" style={{left: "50%", transform: "translateX(-50%)", top: "-50px"}}>About</h2>
                    <p style={{margin: "auto 20px", lineHeight: "1.8rem",letterSpacing: "1px", fontSize: "1.3rem"}}>
                    {intro.description[language]}
                    </p>
                  </div>
                  <div style={{flex: "1 1 40%", minWidth: "350px"}}>
                    <div className={"grey-in"} style={{height: "100%", overflow: "hidden"}}>
                      <BackgroundImage
                          Tag="div"
                          className={"parallax-bg"}
                          fluid={secondaryImage.childImageSharp?.fluid || secondaryImage}
                          backgroundColor={`#040e18`}
                        ></BackgroundImage>
                    </div>
                  </div>
                </section>
          </div>
          <Container>
            <div className="content">
                <section className="team-section" id="team-1">
                    <h3>{heading[language]}</h3>
                    <p>{description[language]}</p>
                    <TeamRoll />
                </section>
            </div>
          </Container>
</>
)}

MeetTheTeamPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  secondaryImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  langTitles: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  heading: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  intro: PropTypes.shape({
    description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
}

const MeetTheTeamPage = ({ data }) => {

  const  post = data.pageData
  const {language } = useI18next();


  return (
    <Layout propTitle={post.frontmatter.langTitles[language]}>
      <MeetTheTeamPageTemplate
        image={post.frontmatter.image}
        secondaryImage={post.frontmatter.secondaryImage}
        title={post.frontmatter.title}
        langTitles={post.frontmatter.langTitles}
        heading={post.frontmatter.heading}
        description={post.frontmatter.description}
        intro={post.frontmatter.intro}
      />
    </Layout>
  )
}

MeetTheTeamPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default MeetTheTeamPage

export const MeetTheTeamPageQuery = graphql`
  query MeetTheTeamPage($id: String!, $language: String!) {
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
        }
        secondaryImage {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 100) {
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
        description {
          en
          pt
          fr
          es
        }
        intro {
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
