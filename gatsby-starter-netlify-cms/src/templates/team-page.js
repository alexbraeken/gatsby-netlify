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
import SubmitButton from '../components/SubmitButton'
import backArea from '../img/mobile-back-area.svg'
import StickyBox from "react-sticky-box"
import convertToBgImage from "../Helpers/images"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

if (typeof window !== `undefined`) {
  gsap.registerPlugin(CSSPlugin)
}

/*
  <div onClick={()=>showTeam(team)} style={{flex: "1 1 100%"}}>
    <SubmitButton text={t('Who We Are')} />
  </div>
*/
export const MeetTheTeamPageTemplate = ({
  image,
  secondaryImage,
  title,
  langTitles,
  heading,
  description,
  intro,
  teams
}) => {
  const [loaded, setLoaded] = useState(false);
  const [circleClip, setCircleClip] = useState({radius: 0, clickedRadius: 0})
  const [clicked, setClicked] = useState(false)
  const [heroEnter, setHeroEnter] = useState(false)
  const [heroHover, setHeroHover] = useState(false)
  const [mouse, setMouse] = useState({x: 0, y: 0})
  const [displayTeam, setDisplayTeam] = useState(null)

  const maskImg = useRef(null)
  const ref = useRef()

  const [src, setSrc] = useState('')

  const {t} = useTranslation();
  const {language } = useI18next();

  const heroImage = getImage(image.childImageSharp)
  const secondaryImg = getImage(secondaryImage.childImageSharp)


  const bgImage = convertToBgImage(heroImage)
  const secondaryBgImage = convertToBgImage(secondaryImg)

  const teamImgs = Object.keys(teams).map(team => {
    let tempImg = getImage(teams[team].image.childImageSharp)
    return convertToBgImage(tempImg)
  })
    
      useEffect(() => {
        setTimeout(()=>{
          setLoaded(true)}, 1000
          )

          let parallaxBGs = gsap.utils.toArray('.parallax-bg')  
          let homeSectionTitles = gsap.utils.toArray('.home-section-title')
          
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

          homeSectionTitles.forEach((title) => {
            gsap.from(title, { 
              x: -2000,
              ease: "none",
              scrollTrigger: {
                  trigger: title,
                  start: "top center",
              },
              duration: 0.5,
              ease: 'Power2.easeOut' 
            });
          })

          
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

      useEffect(() => {

        if(displayTeam){
          gsap.to(`#roll-${displayTeam}`,
          {
              x: 0,
              ease: "none",
              duration: 0.5,
              ease: 'Power2.easeOut' 
          })
        }else{
          gsap.to(`#full-team-${ref.current}`,
            {
                x: 0,
                ease: "none",
                duration: 0.5,
                ease: 'Power2.easeOut' 
            }
          )
        }

        ref.current = displayTeam

      }, [displayTeam])

      const updateClipPath = () => {
        let circle = `circle(${circleClip.radius}px at ${clicked ? `50% 50%` : `${mouse.x}px ${mouse.y}px`})`
        gsap.set(maskImg.current, { webkitClipPath: `${circle}` })
        
      }

      const showTeam = (team) => {
        if(displayTeam){
          gsap.to(`#roll-${displayTeam}`,
          {
            x: -2000,
            ease: "none",
            duration: 0.5,
            ease: 'Power2.easeOut',
            onComplete: ()=>{setDisplayTeam(null)}
          }
          )
        }else{
          let tl = gsap.timeline()
          tl.to(`#full-team-${team}`,
            {
                x: -2000,
                ease: "none",
                duration: 0.5,
                onComplete: ()=>{setDisplayTeam(team)},
                ease: 'Power2.easeOut' 
            }
          )
        }
        
      }


  return(
          <>
            <BackgroundImage
            className="full-width-image-container margin-top-0" 
            onMouseMove={(e)=>handleMouseMove(e)}
          onMouseEnter={()=>setHeroEnter(true)}
          onMouseLeave={()=>setHeroEnter(false)}
          onClick={()=>setClicked(!clicked)}
            {...bgImage}
            style={{
              height: "100vh", margin: "0px -50vw", marginBottom: "0px", zIndex:"1"
            }}
            preserveStackingContext
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
          </BackgroundImage>
          <div style={{marginBottom:"50px", minHeight: "100vh", backgroundColor: "#000"}}>
          <section className="team-intro" style={{display: "flex", flexWrap: "wrap", height: "100%", minHeight: "100vh", flexWrap: "wrap",
    position: "relative"}}>
                  <div style={{flex: "1 1 40%", minWidth: "350px", display: "flex", justifyContent:"center"}}>
                  <h2 className="home-section-title" style={{left: "50%", transform: "translateX(-50%)", top: "-50px"}}>{t("about")}</h2>
                    <p className="about-section orangeText" >
                    {intro.description[language]}
                    </p>
                  </div>
                  <div style={{flex: "1 1 40%", minWidth: "350px", minHeight: "500px"}}>
                    <div className={"grey-in"} style={{height: "100%", overflow: "hidden"}}>
                      <BackgroundImage
                          Tag="div"
                          className={"parallax-bg"}
                          {...secondaryBgImage}
                          backgroundColor={`#040e18`}
                          style={{zIndex:"1"}}
                          preserveStackingContext
                        ></BackgroundImage>
                    </div>
                  </div>
                </section>
          </div>
          <Container style={{marginTop: "200px"}}>
            <h2 className="home-section-title" style={{left: "50%", transform: "translateX(-50%)", top: "-250px", color:"#333"}}>{heading[language]}</h2>
            <div className="content" style={{margin: "30px auto"}}>
              <p>{description[language]}</p>
            </div>
          </Container>
          <div className="team-section-container" style={{marginBottom:"50px", minHeight: "100vh"}}>
            {
              Object.keys(teams).map((team, i) => {
                return(
                  <div className="team-section" id={`team-${team}`}>
                              {
                                displayTeam === team ?
                                <div className="team-roll-container" id={`roll-${team}`}>
                                <StickyBox style={{height:"100vh", marginBottom: "-100vh", zIndex: 1}}>
                                  <a className='back-btn-container' href={`#team-${team}`} onClick={()=>showTeam(null)}>
                                    <img src={backArea} />
                                    <div className='back-btn'>
                                      <span></span>
                                      <span></span>
                                      <span></span>
                                    </div>
                                  </a>
                                </StickyBox>
                                  <Container>
                                    <div className="content">
                                      <TeamRoll team={team}/>
                                    </div>
                                  </Container>
                                </div>
                              :
                              <div className="full-team" id={`full-team-${team}`}>
                                <div className="team-image-container">
                                  <div className={"grey-in"} style={{height: "100%", overflow: "hidden"}}>
                                    <BackgroundImage
                                        Tag="div"
                                        className={"parallax-bg"}
                                        {...teamImgs[i]}
                                        backgroundColor={`#040e18`}
                                        style={{zIndex:"1"}}
                                        preserveStackingContext
                                      ></BackgroundImage>
                                  </div>
                                </div>
                                <div className="team-content-container" >
                                  <h2 className="home-section-title" style={{}}>{teams[team].heading}</h2>
                                  <p className="about-section" >
                                    {teams[team].description[language]}
                                  </p>
                                </div>
                              </div>
                              }
                            </div>
                )
              })
            }

<section
    className="last"></section>
          </div>
          
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
  teams: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
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
        teams={post.frontmatter.teams}
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

export const MeetTheTeamPageQuery = graphql`query MeetTheTeamPage($id: String!, $language: String!) {
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
      }
      secondaryImage {
        childImageSharp {
          gatsbyImageData(quality: 100, layout: FULL_WIDTH)
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
      teams {
        office {
          heading
          image{
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
          }
          description{
            en
            pt
            fr
            es
          }
        }
        maintenance {
          heading
          image{
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
          }
          description{
            en
            pt
            fr
            es
          }
        }  
        housekeeping {
          heading
          image{
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
          }
          description{
            en
            pt
            fr
            es
          }
        }    
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
