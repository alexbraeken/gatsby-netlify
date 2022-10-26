import React from 'react'
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
          <Col xs={12} md={2}>
            <StickyBox>
              <div className="activities-filter">
                <div role="button" tabindex="0" className={`filter-button ${!this.state.activityFilter? "selected":""}`} onClick={()=>this.handleClick(null)} onKeyDown={()=>this.handleClick(null)}>
                    <span>{t("All")}</span><FontAwesomeIcon icon={faInfinity}/> 
                </div>
                <div role="button" tabindex="0" className={`filter-button ${this.state.activityFilter === "Family Activity" ? "selected":""}`} onClick={()=>this.handleClick("Family Activity")} onKeyDown={()=>this.handleClick("Family Activity")}>
                    <span>{t("Family Activity")}</span><FontAwesomeIcon icon={faChild} /> 
                </div>
                <div role="button" tabindex="0" className={`filter-button ${this.state.activityFilter === "Excursion" ? "selected":""}`} onClick={()=>this.handleClick("Excursion")} onKeyDown={()=>this.handleClick("Excursion")}>
                    <span>{t("Excursion")}</span><FontAwesomeIcon icon={faHiking} /> 
                </div>
                <div role="button" tabindex="0" className={`filter-button ${this.state.activityFilter === "Horse Riding" ? "selected":""}`} onClick={()=>this.handleClick("Horse Riding")} onKeyDown={()=>this.handleClick("Horse Riding")}>
                    <span>{t("Horse Riding")}</span><FontAwesomeIcon icon={faHorse}/> 
                </div>
                <div role="button" tabindex="0" className={`filter-button ${this.state.activityFilter === "Golf" ? "selected":""}`} onClick={()=>this.handleClick("Golf")} onKeyDown={()=>this.handleClick("Golf")}>
                    <span>{t("Golf")}</span><FontAwesomeIcon icon={faGolfBall} /> 
                </div>
                <div role="button" tabindex="0" className={`filter-button ${this.state.activityFilter === "Restaurant" ? "selected":""}`} onClick={()=>this.handleClick("Restaurant")} onKeyDown={()=>this.handleClick("Restaurant")}>
                    <span>{t("Restaurants")}</span><FontAwesomeIcon icon={faUtensils} /> 
                </div>
                <div role="button" tabindex="0" className={`filter-button ${this.state.activityFilter === "Bar" ? "selected":""}`} onClick={()=>this.handleClick("Bar")} onKeyDown={()=>this.handleClick("Bar")}>
                    <span>{t("Bars")}</span><FontAwesomeIcon icon={faCocktail} /> 
                </div>
                 <div role="button" tabindex="0" className={`filter-button ${this.state.activityFilter === "Shopping" ? "selected":""}`} onClick={()=>this.handleClick("Shopping")} onKeyDown={()=>this.handleClick("Shopping")}>
                    <span>{t("Shopping")}</span><FontAwesomeIcon icon={faShoppingBag} /> 
                </div>
              </div>
            </StickyBox>
          </Col>
          <Col xs={12} md={10}>
            <section className="section">
              <Container>
                <div className="content">
                  <ActivitiesRoll filter={this.state.activityFilter}/>
                </div>
                </Container>
            </section>
          </Col>
        </Row>
        <section className="section">
          <Container>
            <div className="content full-width algarve-carousel">
              <AlgarveCarousel />
            </div>
          </Container>
        </section>
      </Layout>
    )
  }
}



const TravelerTips = (props) => {

  return <TravelerTipsIndex useTranslation={useTranslation()} useI18next={useI18next()}/>
}

export default TravelerTips

export const pageQuery = graphql`
query($language: String!) {
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
