import React from 'react'

import Layout from '../../components/Layout'
import ActivitiesRoll from '../../components/ActivitiesRoll'
import { Container } from 'react-bootstrap';
import AlgarveCarousel from '../../components/AlgarveCarousel';
import StickyBox from "react-sticky-box";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChild, faHiking, faHorse, faGolfBall, faInfinity, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from 'react-bootstrap';

export default class TravelerTipsIndex extends React.Component {
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
            Traveller Tips
          </h1>
        </div>
        <h2 style={{textAlign:"center", fontSize: "3rem", fontWeight:"bold"}}>Activities <span style={{color:"#f5821e"}}>Nearby</span></h2>
        <Row>
          <Col xs={12} md={2}>
            <StickyBox>
              <div className="activities-filter">
                <div role="button" tabindex="0" className={`filter-button ${!this.state.activityFilter? "selected":""}`} onClick={()=>this.handleClick(null)} onKeyDown={()=>this.handleClick(null)}>
                    <span>All</span><FontAwesomeIcon icon={faInfinity}/> 
                </div>
                <div role="button" tabindex="0" className={`filter-button ${this.state.activityFilter === "Family Activity" ? "selected":""}`} onClick={()=>this.handleClick("Family Activity")} onKeyDown={()=>this.handleClick("Family Activity")}>
                    <span>Family Activity</span><FontAwesomeIcon icon={faChild} /> 
                </div>
                <div role="button" tabindex="0" className={`filter-button ${this.state.activityFilter === "Excursion" ? "selected":""}`} onClick={()=>this.handleClick("Excursion")} onKeyDown={()=>this.handleClick("Excursion")}>
                    <span>Excursion</span><FontAwesomeIcon icon={faHiking} /> 
                </div>
                <div role="button" tabindex="0" className={`filter-button ${this.state.activityFilter === "Horse Riding" ? "selected":""}`} onClick={()=>this.handleClick("Horse Riding")} onKeyDown={()=>this.handleClick("Horse Riding")}>
                    <span>Horse Riding</span><FontAwesomeIcon icon={faHorse}/> 
                </div>
                <div role="button" tabindex="0" className={`filter-button ${this.state.activityFilter === "Golf" ? "selected":""}`} onClick={()=>this.handleClick("Golf")} onKeyDown={()=>this.handleClick("Golf")}>
                    <span>Golf</span><FontAwesomeIcon icon={faGolfBall} /> 
                </div>
                <div role="button" tabindex="0" className={`filter-button ${this.state.activityFilter === "Restaurant" ? "selected":""}`} onClick={()=>this.handleClick("Restaurant")} onKeyDown={()=>this.handleClick("Restaurant")}>
                    <span>Restaurants</span><FontAwesomeIcon icon={faUtensils} /> 
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
