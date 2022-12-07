import React from 'react'
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import { MdContentCopy } from "react-icons/md";

class NewsAlert extends React.PureComponent {

  copyToClipboard = (el) => {
    console.log(el.target)
    let copyText = el.target.getAttribute("data-copyText")
    navigator.clipboard.writeText(copyText);
  }

  render() {
    const { data } = this.props
    const { edges: news } = data.allMarkdownRemark
    const language = this.props.useI18next.language

    return (
        <>
        { news[0] && 
      <div className="newsAlert">
          {news[0].node.frontmatter.link && 
          <a href={news[0].node.frontmatter.link} 
          style={{position:"absolute", width:"100%", height:"100%"}} role="button"
          aria-label="News Alert"></a>
          }
          {news[0].node.frontmatter.copyText &&
           <span onClick={this.copyToClipboard.bind(this)} data-copyText={news[0].node.frontmatter.copyText}
           style={{position:"absolute", width:"100%", height:"100%"}} role="button"
           aria-label="Copy Text"></span>
          }
          <div>
            <small style={{fontWeight:"bold"}}>{news[0].node.frontmatter.langTitles[language]}: </small> 
            <small className="newsAlert-news">{news[0].node.frontmatter.news[language]}</small>
            {news[0].node.frontmatter.copyText && 
            <span id="copyClipboard" style={{marginLeft: "10px"}}><MdContentCopy /></span>
            }
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
                  fr
                  es
                }
                news{
                  en
                  pt
                  fr
                  es
                }
                link
                copyText
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <NewsAlert useI18next={useI18next()} data={data} count={count}/>}
  />
)
