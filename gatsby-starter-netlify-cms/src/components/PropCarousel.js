import React, {useState} from 'react'
import {useTranslation, Link} from 'gatsby-plugin-react-i18next';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import ReactBnbGallery from 'react-bnb-gallery';
import { Helmet } from 'react-helmet'
import BedBathPax from '../components/BedBathPax';
import { AiOutlineHeart } from "@react-icons/all-files/ai/AiOutlineHeart";
import { AiFillHeart } from "@react-icons/all-files/ai/AiFillHeart";
import Share from '../components/Share'

class CustomSlide extends React.Component {
    render() {
      
      return (
        <div style={{backgroundImage: `url(${this.props.backgroundImage})`,
        height: "70vmin",
        margin: "0px auto",
        overflow: "hidden",
        position: "relative",
        backgroundSize:"contain",
        backgroundPosition:"center",
        backgroundRepeat: "no-repeat"}} 
        key={this.props.key? this.props.key : 0}>
        </div>
      );
    }
  }


const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      role="button"
      tabindex="0"
      aria-label="previous"
      className={className}
      style={{ ...style, left: "2%", zIndex:"5"}}
      onClick={onClick}
      onKeyDown={onClick}
    />
  );
}

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      role="button"
      tabindex="0"
      aria-label="next"
      className={className}
      style={{ ...style, right: "2%", zIndex:"5"}}
      onClick={onClick}
      onKeyDown={onClick}
    />
  );
}

const PropCarousel = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const [nextImgIndex, setNextImgIndex] = useState(0)

  const {t} = useTranslation(['translation']);

  const settings = {
    beforeChange: function(oldIndex, newIndex) {
      setNextImgIndex(newIndex)
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
    lazyLoad: "progressive",
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
          photos={props.photos.map((photo,index)=>{return({photo: photo.url, caption: photo.description})})}
          onClose={() => setIsOpen(false)}
        />
        <div style={{display:"flex", position:"relative"}}>
          <div style={{
            position: "absolute", 
            width: "100%", 
            height: "100%", 
            left: 0, 
            top: 0, 
            backgroundImage:`url('${props.photos[nextImgIndex].url}'`,
            filter: "blur(21px)",
            backgroundSize: "cover",
            backgroundPosition: "center center"}}>

          </div>
          <div style={{
            position: "absolute", 
            width: "30%", 
            height: "100%", 
            left: 0, 
            top: 0,
            background: "rgb(23,11,1)",
            background: "linear-gradient(90deg, rgba(23,11,1,1) 0%, rgba(0,0,0,0.7819502801120448) 73%, rgba(0,0,0,0) 100%)"}}>
          </div>
          <div style={{position:"relative", width:"30%", display: "flex", justifyContent:"center", flexDirection:"column"}}>
            <div style={{
              padding: "0 calc(25px + 15%)",
              lineHeight: "1.2"}}>
              <h2 style={{color:"#f5821e", fontSize: "calc(5px + 23 * (100vw - 320px) / 1080)", fontweight: "800",filter: "drop-shadow(2px 4px 6px black)"}}>{props.name}</h2>
              <br />
              <div style={{color:"#fff", fontSize: "calc(3px + 23 * (100vw - 320px) / 1080)", display: "flex", flexDirection: "column"}}>
                <div>
                  <span className="prc">{t("From")} {props.baseRate} €</span>
                  <span className="mth"> / {t("Night")}</span>
                </div>
                <br />
                <BedBathPax bedrooms={props.bedrooms} bathrooms={props.bathrooms} baseGuests={props.baseGuests} color="rgba(256,256,256)"/>
                <br />
                <small><Link to={`/properties?city=${props.city}`} className="prop-city-link">{props.city}</Link></small>
                <br />
                <div className='socials-container'>
                  <div className="add-favs">
                      {props.inFavs ? 
                      <AiFillHeart onClick={()=>{
                        props.dispatch({type: 'REMOVE_PROPERTY', propId: props.propId})
                      }}/> 
                      :
                      <AiOutlineHeart onClick={()=>{
                          props.dispatch({ type: 'ADD_PROPERTY', propName: props.name, propId: props.propId, propImg: props.firstSlide, bedrooms: props.bedrooms, bathrooms:props.bathrooms, baseGuests: props.baseGuests, city: props.city, rate: props.baseRate })
                          }}/>
                      }
                  </div>
                  <br />
                  <Share propImg={props.firstSlide} propName={props.name}/>
                </div>
                
              </div>
            </div>
          </div>
          <Slider {...settings} style={{position:"relative", width: "70%", marginLeft: "auto"}}>
              {props.photos ? props.photos.map((photo, index)=>(
                  <CustomSlide backgroundImage={photo.url} key={index}/>
              )): <CustomSlide backgroundImage={props.firstSlide} />}
          </Slider>
          {props.photos ?
          <div className="gallery-btn-container">
            <div className="gallery-btn" onClick={() => setIsOpen(true)}
              style={{
                backgroundImage:`url('${(nextImgIndex+1) === props.photos.length ? props.photos[0].url : props.photos[nextImgIndex+1].url}')`,
                }}>
                  <span>{t("Gallery")}</span>
              </div>
          </div>
            : null }
        </div>
        </>
      )
}

export default PropCarousel