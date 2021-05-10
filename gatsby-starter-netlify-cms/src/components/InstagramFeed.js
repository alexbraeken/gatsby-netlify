import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import Img from "gatsby-image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import Slider from "react-slick";

library.add(fab)

class SimpleSlider extends Component {
    constructor(props) {
      super(props)
      this.state = {
        slides : this.props.data
      }
    }
    render() {
      const settings = {
        infinite: true,
        dots: true,
        className: "center",
        speed: 500,
        slidesToShow: 5,
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
          <Slider {...settings}>
          {this.state.slides.allInstagramContent.edges.map((post, index)=> {
                return index < 12 ?
                <div key={index}> 
                    <a href={post.node.permalink} target="_blank" className="insta-post">
                        <div className="insta-icon">
                            <FontAwesomeIcon icon={['fab', 'instagram']} />
                        </div>
                        <Img fixed={post.node.localImage?.childImageSharp.fixed} imgStyle={{borderRadius: "5px", margin: "10px", transition:"all 0.3s"}}  draggable={false}/>
                    </a>
                </div> 
                    : null
            })}
          </Slider>
      );
    }
  }

const InstagramFeed = (props) => {
    const { data } = props
    return (
        <div className="instagram-feed">
            <SimpleSlider data={data}/>
        </div>
      )
}


InstagramFeed.propTypes = {
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.shape({
        edges: PropTypes.array,
      }),
    }),
  }

export default () => {
  return(
    <StaticQuery
      query={graphql`
      query InstagramQuery {
        allInstagramContent {
          edges {
            node {
              localImage {
                childImageSharp {
                  fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                  }
                }
             }
             permalink
          }
        }
      }
    }
    `}
      render={(data, count) => <InstagramFeed data={data} count={count} />}
    />
  )
  }