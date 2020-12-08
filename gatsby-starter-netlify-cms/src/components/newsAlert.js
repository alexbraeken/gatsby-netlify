import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'


class NewsAlert extends React.PureComponent {

  render() {
    const { data } = this.props
    const { edges: news } = data.allMarkdownRemark

    return (
        <>
        { news[0] ? 
      <div className="newsAlert">
          <a href={`${news[0].node.frontmatter.link}`} style={{position:"absolute", width:"100%", height:"100%"}}></a>
          <div><small style={{fontWeight:"bold"}}>{news[0].node.frontmatter.title}:</small> <small className="newsAlert-news">{news[0].node.frontmatter.news}</small></div>  
      </div>: null}
      </>
    )
  }
}

NewsAlert.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default (props) => (
  <StaticQuery
    query={graphql`
      query NewsAlertQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "news-alert" } } }) {
          edges {
            node {
              frontmatter {
                title
                news
                link
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <NewsAlert data={data} count={count}/>}
  />
)
