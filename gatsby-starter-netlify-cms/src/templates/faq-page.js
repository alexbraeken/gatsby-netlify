import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import { graphql } from 'gatsby'
import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'
import FAQRoll from '../components/FAQRoll'
import BackgroundImage from 'gatsby-background-image'
import convertToBgImage from "../Helpers/images"
import { getImage } from "gatsby-plugin-image"

export const FaqPageTemplate = ({ langTitles, content, contentComponent, hero, html }) => {

    const [loaded, setLoaded] = useState(false);
  
    const {language} = useI18next();
    const {t} = useTranslation(['translation'])
    
    const bgImage = hero ? convertToBgImage(getImage(hero.childImageSharp)): null

    const PageContent = contentComponent || Content
  
        useEffect(() => {
          setTimeout(()=>{
            setLoaded(true)}, 1000
            )
          return () => {
            setLoaded(false)
          }
        }, [])
  
    return (
      <div className="content">
 {bgImage &&
        <BackgroundImage
          className={"full-width-image-container margin-top-0 "}
          Tag="div"
          {...bgImage}
          backgroundColor={`#040e18`}
          style={{zIndex:"1", marginBottom: "0"}}
          preserveStackingContext
        >
          <div className="gradient-bg"></div>
        <h2
        className={`has-text-weight-bold is-size-1 content-header ${loaded? "loaded" : ""}`}
        style={{color: "white"}}>
          {langTitles[language]}
        </h2>
        </BackgroundImage> }
          <div className="container" style={{minHeight:"100vh"}}>
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <div className="section">
                  {!hero && <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                    {langTitles[language]}
                  </h2>}
                  <PageContent className="content" content={html[language] && html[language].length > 0 ? html[language] : content} />
                  <br />
                  <FAQRoll language={language} t={t}/>
                </div>
              </div>
            </div>
          </div>
          <section
      className="last"></section>
      </div>
    )
  }
  
  FaqPageTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    langTitles: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    hero: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    content: PropTypes.string,
    contentComponent: PropTypes.func,
    html: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string])
  }
  
  const FaqPage = ({ data }) => {
    const post = data.pageData
  
    return (
      <Layout propTitle={post.frontmatter.title}>
        <FaqPageTemplate
          contentComponent={HTMLContent}
          title={post.frontmatter.title}
          langTitles={post.frontmatter.langTitles}
          hero={post.frontmatter.hero}
          content={post.html}
          html={post.frontmatter.html}
        />
      </Layout>
    )
  }
  
  FaqPage.propTypes = {
    data: PropTypes.object,
  }
  
  export default FaqPage
  
  export const FaqPageQuery = graphql`
    query FaqPage($id: String!, $language: String!) {
      pageData: markdownRemark(id: { eq: $id }) {
        html
        frontmatter {
          title 
          langTitles{
            en
            pt
            fr
            es
          }
          hero {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
            publicURL
          }
          html {
            en
            pt
            fr
            es
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