import React, {useState} from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import ReactBnbGallery from 'react-bnb-gallery';
import { Helmet } from 'react-helmet'

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


const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, left: "2%", zIndex:"5"}}
      onClick={onClick}
    />
  );
}

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, right: "2%", zIndex:"5"}}
      onClick={onClick}
    />
  );
}

const PropCarousel = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const [nextImgIndex, setNextImgIndex] = useState(0)

  const settings = {
    afterChange: function(i) {
      setNextImgIndex(i)
    },
    dots: false,
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    fade: true,
    lazyLoad: "progressive"
  };

      return (
        <>
        <Helmet>
          <style>
            {`.gallery .gallery-control{
              border: none;
            }`}
          </style>
        </Helmet>
        <ReactBnbGallery
          show={isOpen}
          photos={props.photos.map((photo,index)=>{return(photo.url)})}
          onClose={() => setIsOpen(false)}
        />
        <Slider {...settings} style={{position:"relative"}}>
            {props.photos ? props.photos.map((photo, index)=> (
                <CustomSlide backgroundImage={photo.url} key={index} />
            )): <CustomSlide backgroundImage={props.firstSlide} />}
        </Slider>
        {props.photos ? 
          <div style={{position:"absolute",height:"100%",width:"100%"}}>
            <Container>
              <Button onClick={() => setIsOpen(true)}
              style={{
                position:"absolute", 
                bottom:"2rem", 
                right:"0", 
                backgroundColor:"#000", 
                backgroundImage:`url('${(nextImgIndex+1) === props.photos.length ? props.photos[0].url : props.photos[nextImgIndex+1].url}')`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundBlendMode: "luminosity",
                width: "5em",
                height: "2em",
                maxWidth: "400px",
                maxHeight: "200px",
                minWidth:"100px",
                minHeight: "50px",
                fontSize: "1.5em"}}>Gallery</Button>
            </Container>
          </div> : null }
        </>
      );
}

export default PropCarousel