import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class ActivitiesRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: activities } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        {activities &&
          activities.map(({ node: activity }, index) => (
            <article className="activity-card card--6" key={index}>
                { activity.frontmatter.featuredimage ? 
                (
            <div className="card__img" style={{
                background:`url('${activity.frontmatter.featuredimage.childImageSharp.fluid.src}')`, 
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"}}>&nbsp;</div>) : null }
            { activity.frontmatter.featuredimage ? (
            <div className="card__img--hover" style={{
                background:`url('${activity.frontmatter.featuredimage.childImageSharp.fluid.src}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"}}>&nbsp;</div>) : null }
            
            <div className="card__info"><span className="card__category">{activity.frontmatter.category}</span>
            
              <h3 className="card__title">{activity.frontmatter.title}</h3>
            <span className="card__details">{activity.frontmatter.description}<br />
              <a className="card__link" href={activity.frontmatter.link}>{activity.frontmatter.visibleLink}</a></span></div>
            </article>
          ))}
      </div>
    )
  }
}

ActivitiesRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query ActivitiesRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "activity-post" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                description
                tags
                category
                link
                visibleLink  
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 300) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <ActivitiesRoll data={data} count={count} />}
  />
)
