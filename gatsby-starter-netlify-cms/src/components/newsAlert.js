import React from 'react'
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'


class NewsAlert extends React.PureComponent {

  render() {
    const { data } = this.props
    const { edges: news } = data.allMarkdownRemark
    const language = this.props.useI18next.language

    return (
        <>
        { news[0] && 
      <div className="newsAlert">
          <a href={`${news[0].node.frontmatter.link}`} style={{position:"absolute", width:"100%", height:"100%"}} role="button"
   aria-label="News Alert"></a>
          <div>
            <small style={{fontWeight:"bold"}}>{news[0].node.frontmatter.langTitles[language]}: </small> 
            <small className="newsAlert-news">{news[0].node.frontmatter.news[language]}</small>
          </div>  
      </div>}
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
                langTitles{
                  en
                  pt
                }
                news{
                  en
                  pt
                }
                link
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <NewsAlert useI18next={useI18next()} data={data} count={count}/>}
  />
)
