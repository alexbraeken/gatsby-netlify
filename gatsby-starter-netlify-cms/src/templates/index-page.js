import React, {useEffect, useState, useRef} from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Features from '../components/Features'
import SearchWidget from '../components/SearchWidget'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { gsap } from "gsap";
import {Container, Col, Row, Card} from 'react-bootstrap'
import { FirestoreCollection } from "@react-firebase/firestore"
import Loading from '../components/Loading'
import FeatureCarousel from '../components/FeatureCarousel'
import SearchFilter from '../components/SearchFilter'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import SubmitButton from '../components/SubmitButton'
import { Helmet } from 'react-helmet'

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
  const diamond = useRef(null)


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

const handleSectionHover = (side) => {
  console.log(diamond.current.style.borderRadius)
  diamond.current.style.borderRadius = side === "left" ? "0 50% 0 0" : "0 0 0 50%"
  diamond.current.style.width = "50px"
  diamond.current.style.height = "50px"
}

const handleSectionLeave = () => {
  diamond.current.style.borderRadius = "50%"
  diamond.current.style.width = "25px"
  diamond.current.style.height = "25px"
}



  return(
  <div>

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
