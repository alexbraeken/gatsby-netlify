import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faFan, faDog, faHotTub, faWifi, faSwimmingPool, faTree } from '@fortawesome/free-solid-svg-icons';
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
            case "TV":
                return <div><FontAwesomeIcon icon={faTv}/><b> TV</b></div>
            case "airConditioning":
                return <div><FontAwesomeIcon icon={faFan}/><b> Air Conditioning</b></div>
            case "allowsPets":
                return <div><FontAwesomeIcon icon={faDog}/><b> Pets Allowed</b></div>
            case "hotTub":
                return <div><FontAwesomeIcon icon={faHotTub}/><b> Hot Tub</b></div>
            case "internetWifi":
                return <div><FontAwesomeIcon icon={faWifi}/><b> Wifi</b></div>
            case "pool":
                return <div><FontAwesomeIcon icon={faSwimmingPool}/><b> Pool</b></div>
            case "garden":
                return <div><FontAwesomeIcon icon={faTree}/><b> Garden</b></div>
            default:
                let text;
                let temp = amenity.replace( /([A-Z])/g, " $1" );
                text = temp.charAt(0).toUpperCase() + temp.slice(1);
                return <b>{text}</b>
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