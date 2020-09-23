import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "@reach/router";

class CustomSlide extends React.Component {
    render() {
      
      return (
        <div style={{backgroundImage: `url(${this.props.backgroundImage})`,
        height: "70vmin",
        margin: "0px auto",
        overflow: "hidden",
        position: "relative",
        backgroundSize:"cover",
        backgroundPosition:"center"}} 
        key={this.props.key? this.props.key : 0}>
          <h3></h3>
        </div>
      );
    }
  }


class PropCarousel extends React.Component {

    render() {
      var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
      return (
        <Slider {...settings} >
            <CustomSlide backgroundImage={this.props.firstSlide} />
            {this.props.photos ? this.props.photos.map((photo, index)=> (
                <CustomSlide backgroundImage={photo.url} key={index} />
            )): null}
        </Slider>
      );
    }
  }

export default PropCarousel