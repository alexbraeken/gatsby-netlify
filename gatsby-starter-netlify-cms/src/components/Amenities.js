import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faFan, faDog, faHotTub, faWifi, faSwimmingPool } from '@fortawesome/free-solid-svg-icons';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { FirestoreCollection } from "@react-firebase/firestore";
import Loading from '../components/Loading';
import { FirestoreDocument } from "@react-firebase/firestore";

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
            default:
                let text;
                let temp = amenity.replace( /([A-Z])/g, " $1" );
                text = temp.charAt(0).toUpperCase() + temp.slice(1);
                return <b>{text}</b>
        }
    }

    const popover = (amenity) => (
        <Popover id="popover-basic">
            <FirestoreCollection path="/amenities/" where={{field:`${amenity}` , operator:"==", value:true}}>
            {data => {
                return (!data.isLoading && data.value) ? 
                <>
                    <Popover.Title as="h3">Properties with {amenity}</Popover.Title>
                    <Popover.Content>
                    {console.log(data.value)}
                    {data.value}
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