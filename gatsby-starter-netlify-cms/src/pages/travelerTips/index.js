import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../../components/PreviewCompatibleImage'
import {useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import ActivitiesRoll from '../../components/ActivitiesRoll'
import { Container } from 'react-bootstrap';
import AlgarveCarousel from '../../components/AlgarveCarousel';
import StickyBox from "react-sticky-box";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChild, faHiking, faHorse, faGolfBall, faInfinity, faUtensils, faCocktail, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from 'react-bootstrap';

class TravelerTipsIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activityFilter: null,
      loaded: false
    }
  }

  handleClick = (filter) => {
    this.setState({activityFilter: filter})
  }

  componentDidMount(){
    setTimeout(()=>{
      this.setState({loaded: true})}, 1000
      )
  }

  render() {

    const t = this.props.useTranslation.t
    const { language } = this.props.useI18next

    return (
      <Layout propTitle="Smartavillas - Traveler Tips" propDescription="Smartavillas.com specialise in helping Property Owners to provide their guests with good quality accommodation - at affordable prices - in the Eastern Algarve, with Tavira being the focal point. We love recommending some of the best sights and experiences to our guests and ensuring they experience the Algarve to the fullest.">
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/Board Walk to the Beach.jpg')`,
          }}
        >
          <h1
        className={`has-text-weight-bold is-size-1 content-header ${this.state.loaded? "loaded" : ""}`}
        style={{color: "white"}}>
            {t("Traveller Tips")}
          </h1>
        </div>
        <h2 style={{textAlign:"center", fontSize: "3rem", fontWeight:"bold"}}>{t("Activities")} <span style={{color:"#f5821e"}}>{t("Nearby")}</span></h2>
        <Row>
          <Col xs={3} md={2} style={{zIndex: 2}}>
            <StickyBox style={{padding: "3rem 0"}}>
              <div className="activities-filter">
                <div role="button" tabIndex="0" className={`filter-button ${!this.state.activityFilter? "selected":""}`} onClick={()=>this.handleClick(null)} onKeyDown={()=>this.handleClick(null)}>
                  <div className="filter-button-content">
                    <span>{t("All")}</span><FontAwesomeIcon icon={faInfinity}/> 
                  </div>
                </div>
                <div role="button" tabIndex="0" className={`filter-button ${this.state.activityFilter === "Family Activity" ? "selected":""}`} onClick={()=>this.handleClick("Family Activity")} onKeyDown={()=>this.handleClick("Family Activity")}>
                    <div className="filter-button-content">
                      <span>{t("Family Activity")}</span><FontAwesomeIcon icon={faChild} /> 
                    </div>
                </div>
                <div role="button" tabIndex="0" className={`filter-button ${this.state.activityFilter === "Excursion" ? "selected":""}`} onClick={()=>this.handleClick("Excursion")} onKeyDown={()=>this.handleClick("Excursion")}>
                    <div className="filter-button-content"><span>{t("Excursion")}</span><FontAwesomeIcon icon={faHiking} /> </div>
                </div>
                <div role="button" tabIndex="0" className={`filter-button ${this.state.activityFilter === "Horse Riding" ? "selected":""}`} onClick={()=>this.handleClick("Horse Riding")} onKeyDown={()=>this.handleClick("Horse Riding")}>
                    <div className="filter-button-content"><span>{t("Horse Riding")}</span><FontAwesomeIcon icon={faHorse}/> </div>
                </div>
                <div role="button" tabIndex="0" className={`filter-button ${this.state.activityFilter === "Golf" ? "selected":""}`} onClick={()=>this.handleClick("Golf")} onKeyDown={()=>this.handleClick("Golf")}>
                    <div className="filter-button-content"><span>{t("Golf")}</span><FontAwesomeIcon icon={faGolfBall} /> </div>
                </div>
                <div role="button" tabIndex="0" className={`filter-button ${this.state.activityFilter === "Restaurant" ? "selected":""}`} onClick={()=>this.handleClick("Restaurant")} onKeyDown={()=>this.handleClick("Restaurant")}>
                    <div className="filter-button-content"><span>{t("Restaurants")}</span><FontAwesomeIcon icon={faUtensils} /> </div>
                </div>
                <div role="button" tabIndex="0" className={`filter-button ${this.state.activityFilter === "Bar" ? "selected":""}`} onClick={()=>this.handleClick("Bar")} onKeyDown={()=>this.handleClick("Bar")}>
                    <div className="filter-button-content"><span>{t("Bars")}</span><FontAwesomeIcon icon={faCocktail} /> </div>
                </div>
                 <div role="button" tabIndex="0" className={`filter-button ${this.state.activityFilter === "Shopping" ? "selected":""}`} onClick={()=>this.handleClick("Shopping")} onKeyDown={()=>this.handleClick("Shopping")}>
                    <div className="filter-button-content"><span>{t("Shopping")}</span><FontAwesomeIcon icon={faShoppingBag} /> </div>
                </div>
              </div>
            </StickyBox>
          </Col>
          <Col xs={9} md={10} style={{zIndex: 1}}>
            <section className="section">
              <Container>
                <div className="content">
                  <ActivitiesRoll filter={this.state.activityFilter}/>
                </div>
                </Container>
            </section>
          </Col>
        </Row>
        <section className="section" style={{position:"relative"}}>
          <h2 className="home-section-title" style={{left: "50%", transform: "translate(-50%, -50%)", top:0, color: "rgba(245, 130, 30, 0.5)", padding: "0 3%"}}>{t("Karina Walking Tours")}</h2>
          <Container>
            <Col>
              <h3 className="has-text-weight-semibold is-size-2">{t("Karina Walking Tours")}</h3>
              <br />
                <p>{this.props.walkingTour[language]}</p>
            </Col>
          {this.props.collage && 
              <Col>
                <div style={{display:"flex", flexWrap:"wrap", width:"100%"}}>
                  {this.props.collage && Object.keys(this.props.collage).map((img, index)=>{
                    return (
                    <div className="mason-image" key={index}>
                      <PreviewCompatibleImage  imageInfo={this.props.collage[img]}  imgStyle={{borderRadius: "5px", height:"250px", flexGrow:"1"}}/>
                    </div>
                    )
                  })
                  }
                </div>
              </Col>}
              <Col>
                <br />
                <h3>{t("Get in touch to find out more")}.</h3>
                <br />
                <p>
                  <ul>
                    <li>
                      Email: <a mailto={this.props.walkingTourContact.email}>{this.props.walkingTourContact.email}</a>
                    </li>
                    <li>
                      Tel: {this.props.walkingTourContact.phone}
                    </li>
                    <li>
                      <a href={this.props.walkingTourContact.site}>Facebook</a>
                    </li>
                  </ul>
                  </p>
              </Col>
          </Container>
        </section>
        <section className="section" style={{position: "relative"}}>
        <h2 className="home-section-title" style={{left: "50%", transform: "translate(-50%, -50%)", top:0, color: "rgba(245, 130, 30, 0.5)", padding: "0 3%"}}>{t("Algarve Highlights")}</h2>
          <Container>
            <Col>
              <h3 className="has-text-weight-semibold is-size-2">{t("Algarve Highlights")}</h3>
              <br />
            </Col>
            <div className="content full-width algarve-carousel">
              <AlgarveCarousel />
            </div>
          </Container>
        </section>
      </Layout>
    )
  }
}

TravelerTipsIndex.propTypes = {
  walkingTour: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  walkingTourContact: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  collage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}


const TravelerTips = ({data}) => {

  const  props = data.pageData

  return <TravelerTipsIndex 
    useTranslation={useTranslation()} 
    useI18next={useI18next()} 
    collage={props.frontmatter.collage} 
    title={props.frontmatter.title} 
    walkingTour={props.frontmatter.walkingTour}
    walkingTourContact={props.frontmatter.walkingTourContact}/>
}

TravelerTips.propTypes = {
  data: PropTypes.object.isRequired,
}

export default TravelerTips

export const pageQuery = graphql`
query($language: String!) {
  pageData: markdownRemark(frontmatter: {templateKey: {eq: "travelerTips-page"}}) {
    frontmatter {
      title
      walkingTour {
        en
        pt
        fr
        es
      }
      walkingTourContact{
        email
        phone
        site
      }
      collage {
        img {
            childImageSharp {
              gatsbyImageData(width: 700, quality: 90, layout: CONSTRAINED)
            }
        }
        img2 {
          childImageSharp {
            gatsbyImageData(width: 700, quality: 90, layout: CONSTRAINED)
          }
        }
        img3 {
          childImageSharp {
            gatsbyImageData(width: 700, quality: 90, layout: CONSTRAINED)
          }
        }
        img4 {
          childImageSharp {
            gatsbyImageData(width: 700, quality: 90, layout: CONSTRAINED)
          }
        }
        img5 {
          childImageSharp {
            gatsbyImageData(width: 700, quality: 90, layout: CONSTRAINED)
          }
        }
        img6 {
          childImageSharp {
            gatsbyImageData(width: 700, quality: 90, layout: CONSTRAINED)
          }
        }
        img7 {
          childImageSharp {
            gatsbyImageData(width: 700, quality: 90, layout: CONSTRAINED)
          }
        }
        img8 {
          childImageSharp {
            gatsbyImageData(width: 700, quality: 90, layout: CONSTRAINED)
          }
        }
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
