import React, {useEffect} from 'react'
import {useI18next} from 'gatsby-plugin-react-i18next';
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StickyBox from "react-sticky-box"
import { getImage } from "gatsby-plugin-image"


gsap.registerPlugin(ScrollTrigger);

const TeamPhoto = React.memo((props) =>{

  const featuredImage = getImage(props.member.node.frontmatter.featuredimage.childImageSharp)
  const secondaryImage = getImage(props.member.node.frontmatter.secondaryImage.childImageSharp)

return(
  <div className={`headshot bottom-left ${props.first? 'first' : ''}`} >
        <figure className="stretched sized" data-stretch={featuredImage.src} 
                style={{position: "relative", background: "none"}}>
                  <div className="anystretch member-img-container" id={`member-img-${props.id}`} style={{left: "0px", top: "0px", position: "absolute", zIndex: "-999998", margin: "0px", padding: "0px", height: "100%", width: "100%", display: "flex",
    justifyVontent: "center",
    alignItems: "center",
    overflow: "hidden"}}>
                    <img className="member-image primary"  
                    srcset={featuredImage.images.fallback.srcSet}
                    sizes={featuredImage.images.fallback.sizes}
                    src={featuredImage.images.fallback.src} 
                    alt={props.member.node.frontmatter.name}
                    style={{position: "absolute", margin: "0px", padding: "0px", border: "none", zIndex: "-999999", left: "50%", top: "50%", transform: "translate(-50%, -50%)", flexShrink: "0",
                    minWidth: "100%",
                    minHeight: "100%",
                    maxWidth: "unset",
                    maxHeight:"unset"}} />
                    <img className="member-image secondary" 
                    srcset={secondaryImage.images.fallback.srcSet}
                    sizes={secondaryImage.images.fallback.sizes}
                    src={secondaryImage.images.fallback.src} 
                    alt={props.member.node.frontmatter.name}
                    alt={props.member.node.frontmatter.name}
                    style={{position: "absolute", margin: "0px", padding: "0px", border: "none", zIndex: "-999999", left: "50%", top: "50%", transform: "translate(-50%, -50%)", flexShrink: "0",
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

    let team1 = gsap.utils.toArray(`#team-${props.team} .headshot`);
    let memberDescriptions = gsap.utils.toArray('.team-section article');
    let memberNames = gsap.utils.toArray('.member-name')
    

    memberDescriptions.forEach((section, i) => {
      if(i>0){
        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top center",
            toggleActions: "play none none reverse"
          },
        }).fromTo(
          team1[i],
          {
            clipPath: `polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)`
          },
          { 
            clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`, 
            duration: 0.5,
            ease: 'Power2.easeOut' 
          }
        )
        .fromTo(
          memberNames[i],
          {
            x: -1000,
          },
          {
            x: 0,
            duration: 0.5,
            ease: 'Power2.easeOut' 
          },
          '<'
        )
      }
    })
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    }
  }, [])

  const handleImageClick = () => {
    let image = document.querySelector(`#member-img-${props.id}`)
    let name = document.querySelector(`#member-name-${props.id}`)
    image.classList.toggle('active')
    name.classList.toggle('active')
  }


  return(
      <article>
        <hgroup>
          <h1 className="member-name" id={`member-name-${props.id}`} onClick={()=>handleImageClick()}>{props.member.node.frontmatter.name}</h1>
          <h2 onClick={()=>handleImageClick()}>{props.member.node.frontmatter.jobTitle}</h2>
          <h3 className="member-info" onClick={()=>handleImageClick()}>{props.member.node.frontmatter.description[language]}</h3>
        </hgroup>
      </article>
  )
})


class TeamRoll extends React.PureComponent {
  
  render() {
    const { data, team } = this.props
    const { edges: members } = data.allMarkdownRemark

    return (
      <>
       <StickyBox>
            {members && members.length > 0 &&
            members.map((member, index) => {
              let i = 0
              if(member.node.frontmatter.team === team){
                i++
              }
            return member.node.frontmatter.team === team ? 
              <TeamPhoto member={member} first={i === 1 ? true : false} id={index} team={team} key={index}/>
             : null
            })} 
            </StickyBox>
        {members && members.length > 0 &&
          members.map((member, index) => {
            return member.node.frontmatter.team === team? 
              <TeamCard member={member} id={index} length={members.length} team={team} key={index}/>
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
                  childImageSharp {
                    gatsbyImageData(
                      width: 500
                      quality: 90
                      placeholder: BLURRED
                      layout: CONSTRAINED
                    )
                  }
                }
                secondaryImage{
                  childImageSharp {
                    gatsbyImageData(
                      width: 500
                      quality: 90
                      placeholder: BLURRED
                      layout: CONSTRAINED
                    )
                  }
                }
                jobTitle
                name
                position
                team
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <TeamRoll data={data} count={count} team={props.team}/>}
  />
)
