import React from 'react'
import { FirestoreDocument } from "@react-firebase/firestore";
import Carousel from 'react-bootstrap/Carousel'

export const PropertyPageTemplate = (
props
) => (
        <FirestoreDocument path={`/Properties/${props.id}`}>
            {data => {
                return (!data.isLoading && data.value) ? 
                        <div style={{display:"flex", flexWrap:"wrap"}}>
                            <div className="prdtitlesolo productNameTitle">
                                <h1 style={{margin:"0",fontSize:"inherit",padding:"0",fontWeight:"inherit"}}>
                                    <span className="prdname">{data.value.name}</span>
                                    <span className="titleTags">
                                        <span className="titleTag">Tavira - Central </span>
                                        <div className="header-icons">
                                            <div className="icon-info">
                                                <img alt="smartavillas - bed" src="/img/bedroom1.png" />
                                                    <span className="tooltiptext">Bedrooms</span>
                                                    <div className="text-number">
                                                        <h3>{data.value.bedrooms}</h3>
                                                    </div>
                                            </div>
                                            <div className="icon-info">
                                                <img alt="smartavillas - bath" src="/img/bathroom3.png" />
                                                <span className="tooltiptext">Bathrooms</span>
                                                <div className="text-number">
                                                    <h3>{data.value.bathrooms}</h3>
                                                </div>
                                            </div>
                                            <div className="icon-info">
                                                <img alt="smartavillas - sleeps" src="/img/people.png" />
                                                <span className="tooltiptext">Sleeps</span>
                                                <div className="text-number">
                                                    <h3>{data.value.baseGuests}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                </h1>
                                <div className="winterLetsRibbon" title="Winter let">
                                    <div className="flag under">
                                        <span className="prc">{data.value.baseDailyRate}</span>
                                        <span className="mth">/ Day</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{width:"100%"}}>
                                <Carousel>
                                    <Carousel.Item>
                                        <img
                                        className="d-block w-100"
                                        src={data.value.picture}
                                        alt="First slide"
                                        />
                                    </Carousel.Item>
                                    {
                                        data.value.photos ? 

                                        data.value.photos.map( photo => (
                                            <Carousel.Item>
                                                <img
                                        className="d-block w-100"
                                        src={photo.url}
                                        alt="First slide"
                                        />
                                            </Carousel.Item>   
                                        )) : null
                                        
                                    }
                                </Carousel>
                                <br />
                            {data.value.description}
                            <br />
                            
                            </div>

                            
                            
                           
                        </div> : "Loading"
            }}
        </FirestoreDocument>

)

const PropertyPage = (data) => {
    return(
            <PropertyPageTemplate id={data.id}/>
    )
}

export default PropertyPage