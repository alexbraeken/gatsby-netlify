import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import Slider from "react-slick"
import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt"
import {useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import BackgroundImage from 'gatsby-background-image'
import convertToBgImage from "../Helpers/images"
import { getImage } from "gatsby-plugin-image"

//Individual Activity Cards
const ActivityCard = React.memo((props) =>{

  const {language } = useI18next();

  const heroImage = props.activity.frontmatter.featuredimage ? getImage(props.activity.frontmatter.featuredimage.childImageSharp) : null
  const bgImage = convertToBgImage(heroImage)


  return (
    <article className="activity-card">
                { props.activity.frontmatter.featuredimage ? 
                (
                  <BackgroundImage
                  className={"card__img"}
                  Tag="div"
                  {...bgImage}
                  backgroundColor={`#040e18`}
                  style={{zIndex:"1"}}
                  preserveStackingContext
                  >&nbsp;</BackgroundImage>) : null }
            { props.activity.frontmatter.featuredimage ? (
            <BackgroundImage
            className={"card__img--hover"}
            Tag="div"
            {...bgImage}
            backgroundColor={`#040e18`}
            style={{zIndex:"1", position: "absolute"}}
            preserveStackingContext
            >&nbsp;</BackgroundImage>) : null }
            {props.activity.frontmatter.gps.lat && props.activity.frontmatter.gps.lng && <div className="activity-marker" ><a href={`https://www.google.com/maps/dir/?api=1&destination=${props.activity.frontmatter.gps.lat},${props.activity.frontmatter.gps.lng}`} target="_blank"><FaMapMarkerAlt className="card-marker"/></a></div>}
            <div className="card__info"><span className="card__category">{props.activity.frontmatter.category}</span>
            
              <div style={{display:"flex", justifyContent: "space-between"}}><h3 className="card__title" style={{display:"flex", flexDirection: "row", justifyContent: "space-between"}}>{props.activity.frontmatter.langTitles[language]}</h3> <span className="card__title" style={{textWrap: "nowrap"}}>{props.activity.frontmatter.value}</span></div>
            <span className="card__details">{props.activity.frontmatter.description[language]}<br />
              <a className="card__link" href={props.activity.frontmatter.link}>{props.activity.frontmatter.visibleLink}</a></span></div>
            </article>
  );
})

//Slider Component
class SimpleSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slides : this.props.slides
    }
  }
  render() {
    const settings = {
      infinite: true,
      dots: true,
      className: "center",
      centerPadding: "30px",
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      swipeToSlide: true,
      autoplay: true,
      autoplaySpeed: 4000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
            dots: false
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false
          }
        }
      ]
    };
    return (
      <div style={{height: "450px"}}>
        <Slider {...settings}>
          {this.state.slides.map((slide, index) => {
            return slide? <ActivityCard activity={slide}  key={index}/> : null 
          })}
        </Slider>
      </div>
    );
  }
}

//Activities Component
class ActivitiesRoll extends React.PureComponent {
  constructor(props){
    super(props);
        this.state={
          t : this.props.useTranslation.t,
          language : this.props.useI18next.language,
          activities : this.props.data.allMarkdownRemark.edges,
          actList : []
        }
    
  }

  componentDidMount(){

    let coords = []
    let list = []

    //If !activities guard clause
    if(!this.state.activities) return null

    if(this.props.handleActivitiesCoords){
      this.state.activities.forEach(({ node: activity }) =>{ 
        coords.push({...activity.frontmatter.gps, name: activity.frontmatter.langTitles[this.state.language], link: activity.frontmatter.link, type: activity.frontmatter.category, img: activity.frontmatter.featuredimage?.publicURL})
      })
      this.props.handleActivitiesCoords(coords)
    }

    //if both location and type specified
    if(this.props.location && this.props.type){
      let BreakException;
      try{
        this.state.activities.forEach(({ node: activity }) =>{
          if(activity.frontmatter.tags.indexOf(this.props.location) !== -1 && activity.frontmatter.tags.indexOf(this.props.type) !== -1){ 
            list.push(activity)
            if (list.length > 10) throw BreakException 
          } else return null
        })
        this.setState({actList:list})
      } catch (e) {
        if (e !== BreakException) throw e;
      }
    } //if only locationspecified
    else if(this.props.location){
      let BreakException;
      try{
        this.state.activities.forEach(({ node: activity }) =>{
          if(activity.frontmatter.tags.indexOf(this.props.location) !== -1){ 
            list.push(activity)
            if (list.length > 10) throw BreakException 
          } else return null
        })
        this.setState({actList:list})
      } catch (e) {
        if (e !== BreakException) throw e;
      }
      
    } //only filter applied
    else if (this.props.filter){
      this.state.activities.forEach(({ node: activity }) =>{
        if(activity.frontmatter.tags.indexOf(this.props.filter) !== -1){ 
          list.push(activity) 
        } else return null
      })
      this.setState({actList:list})
    } //all activities
    else{
      this.state.activities.forEach(({ node: activity }) =>{ 
        list.push(activity)
      })
      this.setState({actList:list})
    }
    
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      let list = []
      if(!this.state.activities) return null

      if (this.props.filter){
        this.state.activities.forEach(({ node: activity }) =>{
          if(activity.frontmatter.tags.indexOf(this.props.filter) !== -1){ 
            list.push(activity) 
          } else return null
        })
        this.setState({actList:list})
      } //all activities
      else{
        this.state.activities.forEach(({ node: activity }) =>{ 
          list.push(activity)
        })
        this.setState({actList:list})
      }
    }
  }

  render() {

    return (
      <>
      {this.props.type && this.state.actList.length > 0 &&
        <>
          <h2>{this.state.t("Restaurants Nearby")}</h2>
          <br />
        </>
      }
      {this.props.location && this.state.actList.length > 0 && Object.keys(this.props.location).length>0 && !this.props.type &&
        <>
          <h2>{this.state.t("Activities Nearby")}</h2>
          <br />
        </>
        }
      {(this.props.type || this.props.location) && this.state.actList.length > 0 ? 
      <>
        {this.state.actList.length > 4 ?
          <SimpleSlider slides={this.state.actList} /> 
          :
          <div className="columns is-multiline" style={{justifyContent:"center"}}>
          {this.state.actList.map((activity, index) => {
            return activity? <ActivityCard activity={activity}  key={index}/> : null
          })}
        </div>
        } 
      </>: null
      }
      {!(this.props.type || this.props.location) ? 
      <div className="columns is-multiline" style={{justifyContent:"center"}}>
        {this.state.actList && this.state.actList.length > 0 &&
          this.state.actList.map((activity, index) => {
            return activity? <ActivityCard activity={activity}  key={index}/> : null
            })}
      </div> : null
      }
      </>
    )
  }
}

ActivitiesRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default (props) => {
  const filter = props.filter || null
  const location = props.location || null
  const type = props.type || null
return (
  <StaticQuery
    query={graphql`query ActivitiesRollQuery {
  allMarkdownRemark(
    sort: {order: DESC, fields: [frontmatter___title]}
    filter: {frontmatter: {templateKey: {eq: "activity-post"}}}
  ) {
    edges {
      node {
        id
        fields {
          slug
        }
        frontmatter {
          title
          langTitles {
            en
            pt
            fr
            es
          }
          description {
            en
            pt
            fr
            es
          }
          tags
          category
          link
          visibleLink
          gps {
            lat
            lng
          }
          value
          templateKey
          featuredpost
          featuredimage {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
            }
            publicURL
          }
        }
      }
    }
  }
}
`}
    render={(data, count) => <ActivitiesRoll useTranslation={useTranslation()} useI18next={useI18next()} data={data} count={count} location={location} filter={filter} type={type} handleActivitiesCoords={props.handleActivitiesCoords}/>}
  />
);
}