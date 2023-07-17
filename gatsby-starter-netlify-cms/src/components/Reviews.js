import React, {useState, useEffect} from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { BsStarFill } from "@react-icons/all-files/bs/BsStarFill";
import { BsStar } from "@react-icons/all-files/bs/BsStar";
import Masonry from 'react-masonry-component';
import Form from 'react-bootstrap/Form'

export default function Reviews(props) {

    const [slides, setSlides] = useState(null)
    const [showQuantity, setShowQuantity] = useState(3)
    const [sortMethod, setSortMethod] = useState(null)

    const {t} = useTranslation(['property', 'translation']);

    useEffect(() => {
        setSlides(props.reviews.slice(0, showQuantity))

        return () => {
            setSlides(null)
            setShowQuantity(5)
        }
    }, [])

    useEffect(() => {
        setSlides(props.reviews.slice(0, showQuantity))
    }, [showQuantity])

    useEffect(() => {
        let list = slides

        switch(sortMethod){
            case "rating-high": list.sort((a, b)=>(a === null)? 1 : ((b === null)? -1 : ((a.rating > b.rating) ? 1 : ((b.rating > a.rating) ? -1 : 0))));
            break;
            case "rating-low": list.sort((a, b)=>(a === null)? 1 : ((b === null)? -1 : ((a.rating < b.rating) ? 1 : ((b.rating < a.rating) ? -1 : 0))));
            break;
            default: list = props.reviews.slice(0, showQuantity)
        }
        setSlides(list)
    }, [sortMethod])


    const settings = {
        infinite: true,
        dots: true,
        className: "center",
        centerPadding: "30px",
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: false,
        autoplaySpeed: 4000,
      };

    return (
        <div className="reviews-container" id="reviews-container">
            <div style={{display:"flex", flexWrap:"nowrap", margin: "auto 0", justifyContent: "flex-end"}}>
                                        <Form.Group style={{margin:"0"}}>
                                            <Form.Control as="select" onChange={(e)=>setSortMethod(e.target.value)} size="sm">
                                                <option value="">{t("Sort By")}</option>
                                                <option value="rating-high">{t("Highest Rating")}</option>
                                                <option value="rating-low">{t("Lowest Rating")}</option>
                                            </Form.Control>
                                        </Form.Group>
                                        </div>
            <Masonry
                className={''} // default ''
                elementType={'div'} // default 'div'
                
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                
            >
            {slides?.map((review, index) => (
                    <div key={index} className="review-card-container">
                        <div className="review-card" >
                            <div className="star-rating">
                                {[...Array(5)].map((x, i) =>
                                    i+1 > review.rating ? <BsStar key={i} className="review-star"/> : <BsStarFill key={i} className="review-star"/>
                                )}
                            </div>
                            <div className="review-header">
                                <h3>{review.title}</h3> 
                                <small>{review.date}</small>
                                <p>{review.author}</p>
                            </div>
                            <hr />
                            <p>{review.content}</p>  
                        </div>
                    </div>
            ))
            }
            </Masonry>
            {props.reviews.length > showQuantity &&
            <button className="btn" type="" onClick={()=>setShowQuantity(showQuantity+3)}><small>{t("Show more")}...</small></button>
            }
        </div>
    )
}
