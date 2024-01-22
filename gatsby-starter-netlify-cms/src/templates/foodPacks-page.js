import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import { graphql } from 'gatsby'
import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'
import {Container, Col, Row} from 'react-bootstrap'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import FoodPackRoll from '../components/FoodPackRoll'
import BackgroundImage from 'gatsby-background-image'
import convertToBgImage from "../Helpers/images"
import { getImage } from "gatsby-plugin-image"

export const FoodPackPageTemplate = ({ langTitles, content, contentComponent, hero, foodpackBG, html, part1Img }) => {

    const [loaded, setLoaded] = useState(false);
  
    const {language} = useI18next();
    const {t} = useTranslation(['translation'])
    
    const bgImage = hero ? convertToBgImage(getImage(hero.childImageSharp)): null
    const foodBgImage = foodpackBG ? convertToBgImage(getImage(foodpackBG.childImageSharp)): null

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
                  <Container>
                    <Row>
                      <Col>
                        <PreviewCompatibleImage imageInfo={part1Img} imgStyle={{borderRadius: "5px"}} />
                      </Col>
                      <Col style={{display:"flex"}}>
                        <PageContent className="content" content={html[language] && html[language].length > 0 ? html[language] : content} style={{margin:"auto"}}/>
                      </Col>
                    </Row>
                  </Container>
                  <br />
                </div>
                <div className="section" style={{position:"relative", height: "-webkit-fill-available", display: "flex", flexWrap:"wrap"}}>
                  <BackgroundImage
                  className={"full-width-image-container margin-top-0 "}
                  Tag="div"
                  {...foodBgImage}
                  backgroundColor={`#040e18`}
                  style={{zIndex:"1", marginBottom: "0", position:"absolute", position: "absolute", height: "100%", height:"inherit", borderRadius:"80px", overflow:"hidden", boxShadow: "black 0px 3px 40px -5px"}}
                  preserveStackingContext
                  />  
                  
                  <FoodPackRoll language={language} t={t}/>
                </div>
              </div>
            </div>
          </div>
          <section
      className="last"></section>
      </div>
    )
  }
  
  FoodPackPageTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    langTitles: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    hero: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    foodpackBG: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    part1Img: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    content: PropTypes.string,
    contentComponent: PropTypes.func,
    prices: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    html: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string])
  }
  
  const FoodPackPage = ({ data }) => {
    const post = data.pageData
  
    return (
      <Layout propTitle={post.frontmatter.title}>
        <FoodPackPageTemplate
          contentComponent={HTMLContent}
          title={post.frontmatter.title}
          langTitles={post.frontmatter.langTitles}
          hero={post.frontmatter.hero}
          foodpackBG={post.frontmatter.foodpackBG}
          part1Img={post.frontmatter.part1Img}
          content={post.html}
          prices={post.frontmatter.prices}
          html={post.frontmatter.html}
        />
      </Layout>
    )
  }
  
  FoodPackPage.propTypes = {
    data: PropTypes.object,
  }
  
  export default FoodPackPage
  
  export const FoodPackPageQuery = graphql`
    query FoodPackPage($id: String!, $language: String!) {
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
          foodpackBG {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
            publicURL
          }
          part1Img {
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