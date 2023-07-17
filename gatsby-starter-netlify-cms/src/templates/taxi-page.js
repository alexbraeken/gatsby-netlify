import React, {useState, useEffect} from 'react'
import {useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import TaxiCalendar from '../components/TaxiCalendar'
import Select from 'react-select'
import BackgroundImage from 'gatsby-background-image'
import convertToBgImage from "../Helpers/images"
import { getImage } from "gatsby-plugin-image"

const personsSelectStyle = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#f5821e" : "#fff",
    color: state.isSelected ? '#fff' : '#000',
  }),
  container: () => ({
    margin: "auto 10px auto 0",
    height: "50px",
    flex: "1 1 10%",
    display: "flex",
    position: "relative",
    minWidth: "150px",
    maxWidth: "300px"
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

export const ContentPageTemplate = ({ title, langTitles, content, contentComponent, hero, heroTitle, destinations, prices, html }) => {

  const [loaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState(null)
  const [destination, setDestination] = useState(null)
  const [pickUp, setPickUp] = useState(null)


  const {language} = useI18next();
  const {t} = useTranslation(['translation'])
  

  const heroImage = getImage(hero.childImageSharp)
  const bgImage = convertToBgImage(heroImage)


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
      {hero &&
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
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                {!hero && <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                  {langTitles[language]}
                </h2>}
                <PageContent className="content" content={html[language] && html[language].length > 0 ? html[language] : content} />
                <div style={{maxWidth:"700px", margin: "auto"}}>
                  <h3>
                    {t("Book Now")}
                  </h3>
                <div style={{display: "flex", flexWrap: "wrap", justifyContent: "flex-start"}}>
                <Select options={[
                  {value: "oneToFourPrices", label: t("1 to 4 Persons")}, 
                  {value: "fiveToEightPrices", label: t("5 to 8 Persons")} 
                ]}
                    styles={personsSelectStyle}
                    closeMenuOnSelect={true}
                    placeholder={t("Select persons")}
                    onChange={(e)=>setSelected(e.value)}/>
                <Select options={[...destinations.airport.map(el=>{
                  return {value: el, label: el}
                  }), {value: "airport", label: `${t("Faro Airport")}`}]}
                  styles={personsSelectStyle}
                  closeMenuOnSelect={true}
                  placeholder={t("Select Pick up")}
                  onChange={(e)=>{
                    setDestination(null)
                    setPickUp(e.value)}
                    }/>
                  {pickUp &&
                  <Select options={pickUp === "airport" ? destinations.airport.map(el=>{
                        return {value: el, label: el}
                      })
                      :
                      [{value: "airport", label: `${t("Faro Airport")}`}, 
                      pickUp === "Tavira" || pickUp === "Cabanas" || pickUp === "Manta Rota" ? {value: "aquashow", label: `${t("Aqua Show")}`} : {value: "", label: ""}]
                    }
                    styles={personsSelectStyle}
                    closeMenuOnSelect={true}
                    placeholder={t("Select destination")}
                    onChange={(e)=>setDestination(e.value)}/>
                  }
                </div>
                {selected && pickUp && destination && <TaxiCalendar price={prices[selected][destination === "aquashow" ? "aquashow" : "airport"][destinations[destination === "aquashow" ? "aquashow" : "airport"].indexOf(pickUp === "airport" ? destination : pickUp)]} destination={destination} pickUp={pickUp}/>}
                </div>

              </div>
            </div>
          </div>
        </div>
        <section
    className="last"></section>
    </div>
  )
}

ContentPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  langTitles: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  hero: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  destinations: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  prices: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  html: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string])
}

const ContentPage = ({ data }) => {
  const post = data.pageData

  return (
    <Layout propTitle={post.frontmatter.title}>
      <ContentPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        langTitles={post.frontmatter.langTitles}
        hero={post.frontmatter.hero}
        content={post.html}
        destinations={post.frontmatter.destinations}
        prices={post.frontmatter.prices}
        html={post.frontmatter.html}
      />
    </Layout>
  )
}

ContentPage.propTypes = {
  data: PropTypes.object,
}

export default ContentPage

export const ContentPageQuery = graphql`
  query TaxiHirePage($id: String!, $language: String!) {
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
        destinations {
          airport
          aquashow
        }
        prices {
          oneToFourPrices {
            airport
            aquashow
          }
          fiveToEightPrices {
            airport
            aquashow
          }
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
