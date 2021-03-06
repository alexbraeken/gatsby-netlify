import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

const TeamCard = React.memo((props) =>{
  return(
    <div className="flex-img-col">
    <div className="col-img-bg">
        <div style={{
            backgroundImage:`url(${props.member.node.frontmatter.featuredimage.childImageSharp.fluid.src})`,
            backgroundSize: "cover",
            backgroundPosition: "50%",
            height:"-webkit-fill-available",
        }} />
    
        <div className="col-img-overlay overlay"/>
    
        <div className="team-description">{props.member.node.frontmatter.description}</div>
    </div>
    <div className="team-txt">
        <div style={{flex: "1 1 100%"}}>
        <h2 className="primary-color" >{props.member.node.frontmatter.name}</h2>
        </div>
        
        <p>{props.member.node.frontmatter.jobTitle}</p>
    </div>
    </div>
  )
})


class TeamRoll extends React.PureComponent {

  render() {
    const { data } = this.props
    const { edges: members } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline" style={{justifyContent:"center"}}>
        {members && members.length > 0 &&
          members.map((member, index) => {
            return member? <TeamCard member={member}  key={index}/> : null
            })}
      </div>
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
                description
                templateKey
                featuredimage {
                  childImageSharp{
                    fluid{
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
