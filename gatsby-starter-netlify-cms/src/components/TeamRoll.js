import React, {useEffect} from 'react'
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StickyBox from "react-sticky-box"

gsap.registerPlugin(ScrollTrigger);

const TeamPhoto = React.memo((props) =>{
return(
  <div className={`headshot bottom-left ${props.first? 'first' : ''}`} >
        <figure className="stretched sized" data-stretch={props.member.node.frontmatter.featuredimage.childImageSharp.fluid.src} 
                style={{position: "relative", background: "none"}}>
                  <div className="anystretch member-img-container" id={`member-img-${props.id}`} style={{left: "0px", top: "0px", position: "absolute", overflow: "hidden", zIndex: "-999998", margin: "0px", padding: "0px", height: "100%", width: "100%", display: "flex",
    justifyVontent: "center",
    alignItems: "center",
    overflow: "hidden"}}>
                    <img className="member-image primary"   
                    src={props.member.node.frontmatter.featuredimage.childImageSharp.fluid.src} 
                    alt={props.member.node.frontmatter.name}
                    style={{position: "absolute", margin: "0px", padding: "0px", border: "none", zIndex: "-999999", left: "0px",flexShrink: "0",
                    minWidth: "100%",
                    minHeight: "100%",
                    maxWidth: "unset",
                    maxHeight:"unset"}} />
                    <img className="member-image secondary" 
                    src="https://en.freejpg.com.ar/asset/900/a1/a114/F100012077.jpg"   
                    alt={props.member.node.frontmatter.name}
                    style={{position: "absolute", margin: "0px", padding: "0px", border: "none", zIndex: "-999999", left: "0px",flexShrink: "0",
                    minWidth: "100%",
                    minHeight: "100%",
                    maxWidth: "unset",
                    maxHeight:"unset"}} />
                  </div>
        </figure>
      </div>
)
})

const TeamCard = React.memo((props) =>{

  const {language} = useI18next();


  useEffect(() => {

    let team1 = gsap.utils.toArray('#team-1 .headshot');
    let memberDescriptions = gsap.utils.toArray('.team-section article');

    memberDescriptions.forEach((section, i) => {
      if(i>0)gsap.fromTo(team1[i],{
          clipPath: `polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)`
        },{
        scrollTrigger: {
          trigger: section,
          scrub: true,
          start: "top bottom",
          end: "+=100%"
        },
        clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
        ease: "none"
      });
    })

  }, [])

  const handleImageClick = () => {
    let image = document.querySelector(`#member-img-${props.id}`)
    image.classList.toggle('active')
  }


  return(
      <article>
        <hgroup>
          <h1 onClick={()=>handleImageClick()}>{props.member.node.frontmatter.name}</h1>
          <h2 onClick={()=>handleImageClick()}>{props.member.node.frontmatter.jobTitle}</h2>
          <h3 className="member-info" onClick={()=>handleImageClick()}>{props.member.node.frontmatter.description[language]}</h3>
        </hgroup>
      </article>
  )
})


class TeamRoll extends React.PureComponent {

  render() {
    const { data } = this.props
    const { edges: members } = data.allMarkdownRemark

    return (
      <>
       <StickyBox>
            {members && members.length > 0 &&
          members.map((member, index) => {
            return member? 
              <TeamPhoto member={member} first={index === 0 ? true : false} id={index} key={index}/>
             : null
            })} 
            </StickyBox>
        {members && members.length > 0 &&
          members.map((member, index) => {
            return member? 
              <TeamCard member={member} id={index} length={members.length} key={index}/>
             : null
            })}
           
      </>
    )
  }
}

TeamRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default (props) => (
  <StaticQuery
    query={graphql`
      query TeamRollQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "team-member" } } }, sort: {fields: frontmatter___position, order: ASC}
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                description{
                  en
                  pt
                  fr
                  es
                }
                templateKey
                featuredimage {
                  childImageSharp{
                    fluid (maxWidth: 500, quality: 90){
                      src
                    }
                  }
                  publicURL
                }
                jobTitle
                name
                position
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <TeamRoll data={data} count={count}/>}
  />
)
