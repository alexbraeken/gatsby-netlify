import React from 'react'
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import { Helmet } from 'react-helmet'
import { FaHollyBerry } from "@react-icons/all-files/fa/FaHollyBerry";

class HeroBanner extends React.PureComponent {

  render() {
    const { data } = this.props
    const { edges: news } = data.allMarkdownRemark
    const language = this.props.useI18next.language

    return (
        <div style={{width:"100%"}}>
        <Helmet>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Festive&family=Playfair+Display:ital@0;1&family=Milonga&display=swap" rel="stylesheet" />
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Festive&family=Playfair+Display:ital@0;1&family=Milonga&display=swap');
                `}
            </style>
            <style>
                {`
                .festive-header h3{
                    font-family: 'Festive', cursive;
                }
                .festive-body{
                    font-family: 'Milonga', cursive;
                }
                .festive-body p{
                    font: italic 40px 'Playfair Display', serif;
                }
                `}
            </style>
        </Helmet>
        { news[0] && 
        <div style={{position: "relative"}}>   
            <div className="festive-header">
                <div className="festive-svg left" >
                    <FaHollyBerry />
                </div>
                <h3>{news[0].node.frontmatter.langTitles[language]}</h3>
                <div className="festive-svg right" >
                    <FaHollyBerry />
                </div>
            </div>
            <div className="festive-body">
                <h4>{news[0].node.frontmatter.newsHeader[language]}</h4>
                <p>{news[0].node.frontmatter.newsBody[language]}</p>
            </div>
            
        </div>
        }
      </div>
    )
  }
}

HeroBanner.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default (props) => (
  <StaticQuery
    query={graphql`
      query HeroBannerQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "hero-banner" } } }) {
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
                newsHeader{
                  en
                  pt
                  fr
                  es
                }
                newsBody{
                  en
                  pt
                  fr
                  es
                }
                link
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <HeroBanner useI18next={useI18next()} data={data} count={count}/>}
  />
)
