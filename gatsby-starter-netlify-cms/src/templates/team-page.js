import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import {useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import TeamRoll from '../components/TeamRoll'
import { Container } from 'react-bootstrap';
import { gsap } from "gsap";
import { CSSPlugin } from 'gsap/CSSPlugin'

gsap.registerPlugin(CSSPlugin)

export const MeetTheTeamPageTemplate = ({
  image,
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
          
          
        return () => {
          setLoaded(false)
        }
      }, [])

      const posSet = gsap.quickSetter(maskImg.current, "css")

      const handleMouseMove = (e) => {
        //setmouse({x: e.pageX, y: e.pageY})
        let circle = `circle(${circleClip.radius}px at ${e.pageX}px ${e.pageY}px)`
        setMouse({x: e.pageX, y: e.pageY})
        posSet({ webkitClipPath: `${circle}` })
      }

      useEffect(() => {
         let tempCircle = circleClip
         console.log(heroEnter)
        heroEnter ?  gsap.to(tempCircle, 1.5, {radius:200}) : gsap.to(tempCircle, 0.5, {radius:0})
        setCircleClip(tempCircle)
        if(!heroEnter)setClicked(false)
      }, [heroEnter])

      
      useEffect(() => {
        console.log(circleClip)
      }, [circleClip])

      

      const handleHeroClick = (e) => {
        const clipPath = () => {
          gsap.set(maskImg.current, {webkitClipPath:`circle(${circleClip.radius}px) at ${clicked? '50% 50%' : `${mouse.x}px ${mouse.y}px`}`})
        }
        if(clicked){
          let tempCircle = circleClip
          gsap.to(tempCircle, 0.5, {radius:200, onUpdate:clipPath})
          setCircleClip(tempCircle)
        }else{
          let tempCircle = circleClip
          gsap.to(tempCircle, 0.8, {radius:2000, onUpdate:clipPath})
          setCircleClip(tempCircle)
        }
        setClicked(!clicked)
      }

  return(
<>
        <div
          className="full-width-image-container margin-top-0"
          ref={hero}
          onMouseMove={(e)=>handleMouseMove(e)}
          onMouseEnter={()=>setHeroEnter(!heroEnter)}
          onMouseLeave={()=>setHeroEnter(!heroEnter)}
          onClick={(e)=>handleHeroClick(e)}
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
        <section className="section">
          <Container>
            <div className="content">
                <section style={{marginBottom:"50px"}}>
                    {intro.description[language]}
                    <br />
                    <h3>{heading[language]}</h3>
                    <p>{description[language]}</p>
                </section>
                <section>
                    <TeamRoll />
                </section>
            </div>
          </Container>
        </section>
</>
)}

MeetTheTeamPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
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
