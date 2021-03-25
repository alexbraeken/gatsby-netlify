import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faFan, faDog, faHotTub, faWifi, faSwimmingPool, faTree, faCompactDisc, faFireExtinguisher} from '@fortawesome/free-solid-svg-icons';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { FirestoreCollection } from "@react-firebase/firestore";
import Loading from '../components/Loading';
import { FirestoreDocument } from "@react-firebase/firestore";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Amenities = (props) => {

    const determineAmenity = (amenity) =>{
        switch(amenity){
            case "hasTV":
                return <div className="amenity-text"><FontAwesomeIcon icon={faTv}/><b> TV</b></div>
            case "hasAirConditioning":
                return <div className="amenity-text"><FontAwesomeIcon icon={faFan}/><b> Air Conditioning</b></div>
            case "allowsPets":
                return <div className="amenity-text"><FontAwesomeIcon icon={faDog}/><b> Pets Allowed</b></div>
            case "hasHotTub":
                return <div className="amenity-text"><FontAwesomeIcon icon={faHotTub}/><b> Hot Tub</b></div>
            case "hasInternetWifi":
                return <div className="amenity-text"><FontAwesomeIcon icon={faWifi}/><b> Wifi</b></div>
            case "hasPool":
                return <div className="amenity-text"><FontAwesomeIcon icon={faSwimmingPool}/><b> Pool</b></div>
            case "hasGarden":
                return <div className="amenity-text"><FontAwesomeIcon icon={faTree}/><b> Garden</b></div>
            case "hasCDDVDPlayer":
                return <div className="amenity-text"><FontAwesomeIcon icon={faCompactDisc}/><b> CD/DVD Player</b></div>
            case "hasFireExtinguisher":
                return <div className="amenity-text"><FontAwesomeIcon icon={faFireExtinguisher}/><b> Fire Extinguisher</b></div>
            default:
                let text;
                let temp = amenity.replace( /([A-Z])/g, " $1" );
                text = temp.charAt(0).toUpperCase() + temp.slice(1);
                if(text.includes('Has ')){
                    text = text.slice(4)
                }
                return <div className="amenity-text"><b>{text}</b></div>
        }
    }

    const popover = (amenity) => (
        <Popover id="popover-basic">
            <FirestoreCollection path="/amenities/" where={{field:`${amenity}` , operator:"==", value:true}} limit={5}>
            {data => {
                return (!data.isLoading && data.value) ? 
                <>
                    <Popover.Title as="h3">Properties with {amenity}</Popover.Title>
                    <Popover.Content>
                        {data.ids.map((id, index)=> {
                            return (
                            <FirestoreDocument path={`/Properties/${id}`}>
                                {data => {
                                    return (!data.isLoading && data.value) ? 
                                    <Container>
                                        <Row>
                                            <Col xs={6} md={3}>
                                            <a href={`/properties/${id}`} className="d-block h-100">
                                                <img className="img-fluid img-thumbnail" src={data.value.picture} alt="" />
                                            </a>
                                            </Col>
                                            <Col xs={6} md={9}>
                                                <p style={{margin:"auto"}}>{data.value.name}</p>
                                            </Col>
                                        </Row>
                                    </Container> : null
                                }}
                            </FirestoreDocument>
                            )
                        })}
                    </Popover.Content> 
                </>: <Loading />
            }}
            </FirestoreCollection>
        </Popover>
      );

    return (
        <OverlayTrigger trigger="click" placement="right" overlay={popover(props.amenity)}>
            {determineAmenity(props.amenity)}
        </OverlayTrigger>
    )
}

export default Amenities