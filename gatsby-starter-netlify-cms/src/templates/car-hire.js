import React, {useState, useEffect, useRef} from 'react'
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import CarHireCalendar from '../components/CarHireCalendar'
import Select from 'react-select'
import { Col, Row } from 'react-bootstrap';

const carSelectStyle = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#f5821e" : "#fff",
      color: state.isSelected ? '#fff' : '#000',
    }),
    container: () => ({
      margin: "5px auto",
      height: "50px",
      flex: "1 1 10%",
      display: "flex",
      position: "relative",
      minWidth: "200px"
    }),
    menu: () => ({
        top: "100%",
        backgroundColor: "hsl(0,0%,100%)",
        borderRadius: "4px",
        boxShadow: "0 0 0 1px hsl(0deg 0% 0% / 10%), 0 4px 11px hsl(0deg 0% 0% / 10%)",
        marginBottom: "8px",
        marginTop: "8px",
        position: "absolute",
        width: "100%",
        zIndex: "2",
        boxSizing: "border-box"
      }),
    
    control: () => ({
      width: "100%",
      height: "50px",
      backgroundColor: "#fff",
      margin: "auto",
      display: "flex",
      borderRadius: "4px",
      boxShadow: "0 3px 1px rgb(0 0 0 / 10%), 0 4px 8px rgb(0 0 0 / 13%), 0 0 0 1px rgb(0 0 0 / 2%)"
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    },
    placeholder: (styles) => {
      return{
        ...styles,
        color: "#495057;"
      }
    }
  }

export const CarHirePageTemplate = ({ title, langTitles, content, contentComponent, hero, carPricing, heroTitle, html }) => {

  const [loaded, setLoaded] = useState(false)
  const [selectedPricing, setSelectedPricing] = useState(null)
  const [selected, setSelected] = useState(null)

  const car = useRef(null)

  const {t} = useTranslation(['translation'])
  const {language} = useI18next()
  

  const PageContent = contentComponent || Content

    useEffect(() => {
    setTimeout(()=>{
        setLoaded(true)}, 1000
        )
    return () => {
        setLoaded(false)
    }
    }, [])

    useEffect(() => {

        let priceArray = carPricing[selected]?.pricing.map(el => {
            return JSON.parse(el)
        })
        setSelectedPricing(priceArray)

    }, [selected])




  return (
    <div className="content">
      {hero &&
      <div
        className="full-width-image-container margin-top-0 gradient-bg"
        style={{
          backgroundImage: `url(${
            hero.publicURL
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <h2
        className={`has-text-weight-bold is-size-1 content-header ${loaded? "loaded" : ""}`}
        style={{color: "white"}}>
          {langTitles[language]}
        </h2>
      </div> }
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                {!hero && <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                  {langTitles[language]}
                </h2>}
                <PageContent className="content" content={html[language] && html[language].length > 0 ? html[language] : content} />
                {true && <Row>
                    <Col style={{maxWidth: "800px", margin: "auto", boxShadow: "0 3px 1px rgb(0 0 0 / 10%), 0 4px 8px rgb(0 0 0 / 13%), 0 0 0 1px rgb(0 0 0 / 2%)",
    borderRadius: "4px"}}>
                    <h4 style={{marginTop: "0.8em"}}>{t("Book a Car Now")}</h4>
                    <Select options={[
                    {value: "A", label: "Class A"}, 
                    {value: "B", label: "Class B"},
                    {value: "C", label: "Class C"},
                    {value: "E", label: "Class E"},
                    {value: "F", label: "Class F"},
                    {value: "G", label: "Class G"},
                    {value: "I", label: "Class I"},
                    {value: "J", label: "Class J"},
                    {value: "J1", label: "Class J1"},
                    {value: "K", label: "Class K"},
                    {value: "L", label: "Class L"},
                    {value: "M", label: "Class M"}]}
                    styles={carSelectStyle}
                    closeMenuOnSelect={true}
                    ref={car}
                    placeholder={t("Select Car")}
                    onChange={(e)=>setSelected(e.value)}/>
                    {selectedPricing && <p>{t("Includes")}: {selected && carPricing[selected]?.name[language]}</p>}
                    {selectedPricing && <CarHireCalendar pricingPeriods={selectedPricing} carClass={selected ? `Class ${selected}`: null}/>}
                    </Col>
                </Row>}
               
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

CarHirePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  langTitles: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  hero: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  carPricing: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  html: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string])
}

const CareHirePage = ({ data }) => {
  const post = data.pageData
  const {t} = useTranslation(['translation']);

  return (
    <Layout propTitle={post.frontmatter.title}>
      <CarHirePageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        langTitles={post.frontmatter.langTitles}
        hero={post.frontmatter.hero}
        carPricing={post.frontmatter.carPricing}
        content={post.html}
        html={post.frontmatter.html}
      />
    </Layout>
  )
}

CareHirePage.propTypes = {
  data: PropTypes.object,
}

export default CareHirePage

export const CareHirePageQuery = graphql`
  query CareHirePage($id: String!, $language: String!) {
    pageData: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title 
        langTitles{
          en
          pt
        }
        hero {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
          publicURL
        }
        carPricing {
            A {
                class
                name{
                    en
                    pt
                }  
                pricing 
            }
            B {
                class
                name{
                    en
                    pt
                }  
                pricing 
            }
            C {
                class
                name{
                    en
                    pt
                }  
                pricing 
            }
            E {
                class
                name{
                    en
                    pt
                }  
                pricing 
            }
            F {
                class
                name{
                    en
                    pt
                }  
                pricing 
            }  
            G {
                class
                name{
                    en
                    pt
                }  
                pricing 
            } 
            I {
                class
                name{
                    en
                    pt
                }  
                pricing 
            } 
            J {
                class
                name{
                    en
                    pt
                }  
                pricing 
            } 
            J1 {
                class
                name{
                    en
                    pt
                }  
                pricing 
            } 
            K {
                class
                name{
                    en
                    pt
                }  
                pricing 
            } 
            L {
                class
                name{
                    en
                    pt
                }  
                pricing 
            }  
            M {
                class
                name{
                    en
                    pt
                }  
                pricing 
            }         
        }   
        html {
          en
          pt
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
