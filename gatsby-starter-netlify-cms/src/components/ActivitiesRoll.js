import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

const ActivityCard = React.memo((props) =>{
  return(
    <article className="activity-card">
                { props.activity.frontmatter.featuredimage ? 
                (
            <div className="card__img" style={{
                backgroundImage:`url('${props.activity.frontmatter.featuredimage.childImageSharp.fluid.src}')`, 
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"}}>&nbsp;</div>) : null }
            { props.activity.frontmatter.featuredimage ? (
            <div className="card__img--hover" style={{
              backgroundImage:`url('${props.activity.frontmatter.featuredimage.childImageSharp.fluid.src}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"}}>&nbsp;</div>) : null }
            
            <div className="card__info"><span className="card__category">{props.activity.frontmatter.category}</span>
            
              <h3 className="card__title">{props.activity.frontmatter.title}</h3>
            <span className="card__details">{props.activity.frontmatter.description}<br />
              <a className="card__link" href={props.activity.frontmatter.link}>{props.activity.frontmatter.visibleLink}</a></span></div>
            </article>
  )
})


class ActivitiesRoll extends React.PureComponent {

  render() {
    const { data } = this.props
    const { edges: activities } = data.allMarkdownRemark
    const list = [];
    if(activities && this.props.location && this.props.type){
      let BreakException;
      try{
        activities.forEach(({ node: activity }) =>{
          if(activity.frontmatter.tags.indexOf(this.props.location) !== -1 && activity.frontmatter.tags.indexOf(this.props.type) !== -1){ 
            list.push(activity)
            if (list.length > 3) throw BreakException 
          } else return null
        })
      } catch (e) {
        if (e !== BreakException) throw e;
      }
    }
    else if(activities && this.props.location){
      let BreakException;
      try{
        activities.forEach(({ node: activity }) =>{
          if(activity.frontmatter.tags.indexOf(this.props.location) !== -1){ 
            list.push(activity)
            if (list.length > 3) throw BreakException 
          } else return null
        })
      } catch (e) {
        if (e !== BreakException) throw e;
      }
      
    }
    else if (activities && this.props.filter){
      activities.forEach(({ node: activity }) =>{
        if(activity.frontmatter.tags.indexOf(this.props.filter) !== -1){ 
          list.push(activity) 
        } else return null
      })
    } 
    else{
      if(activities){activities.forEach(({ node: activity }) =>{ 
        list.push(activity)
      })
      } 
      else return null
    }

    return (
      <>
      {this.props.type && list.length > 0 &&
        <>
          <h2>Restaurants Nearby</h2>
          <br />
        </>
      }
      {this.props.location && list.length > 0 && Object.keys(this.props.location).length>0 && list.length > 0 && !this.props.type &&
        <>
          <h2>Activities Nearby</h2>
          <br />
        </>
        }
      <div className="columns is-multiline" style={{justifyContent:"center"}}>
        {list && list.length > 0 &&
          list.map((activity, index) => {
            return activity? <ActivityCard activity={activity}  key={index}/> : null
            })}
      </div>
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
return(
  <StaticQuery
    query={graphql`
      query ActivitiesRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___title] }
          filter: { frontmatter: { templateKey: { eq: "activity-post" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                description
                tags
                category
                link
                visibleLink  
                templateKey
                featuredpost
                featuredimage {
                  childImageSharp{
                    fluid{
                      src
                    }
                  }
                  publicURL
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <ActivitiesRoll data={data} count={count} location={location} filter={filter} type={type}/>}
  />
)
}