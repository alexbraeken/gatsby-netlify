import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faFan, faDog, faHotTub, faWifi, faSwimmingPool, faTree, faCompactDisc, faFireExtinguisher} from '@fortawesome/free-solid-svg-icons';
import { CgSmartHomeWashMachine } from "@react-icons/all-files/cg/CgSmartHomeWashMachine";
import { GiCookingPot } from "@react-icons/all-files/gi/GiCookingPot";
import { GiFireplace } from "@react-icons/all-files/gi/GiFireplace";
import { GiChickenOven } from "@react-icons/all-files/gi/GiChickenOven";
import { GiForkKnifeSpoon } from "@react-icons/all-files/gi/GiForkKnifeSpoon";
import { GiCoffeePot } from "@react-icons/all-files/gi/GiCoffeePot";
import { GiHeatHaze } from "@react-icons/all-files/gi/GiHeatHaze";
import { FaParking  } from "@react-icons/all-files/fa/FaParking";
import { MdKitchen  } from "@react-icons/all-files/md/MdKitchen";
import { CgSmartHomeBoiler  } from "@react-icons/all-files/cg/CgSmartHomeBoiler";
import { GiHanger  } from "@react-icons/all-files/gi/GiHanger";
import { FaBaby  } from "@react-icons/all-files/fa/FaBaby";
import { CgSmartHomeCooker  } from "@react-icons/all-files/cg/CgSmartHomeCooker";
import { BiCloset  } from "@react-icons/all-files/bi/BiCloset";
import { CgDarkMode  } from "@react-icons/all-files/cg/CgDarkMode";
import { RiFirstAidKitFill  } from "@react-icons/all-files/ri/RiFirstAidKitFill";
import { GiCook  } from "@react-icons/all-files/gi/GiCook";
import { FaChair  } from "@react-icons/all-files/fa/FaChair";
import { GiGate  } from "@react-icons/all-files/gi/GiGate";
import { GiWaves  } from "@react-icons/all-files/gi/GiWaves";
import { GiBigWave  } from "@react-icons/all-files/gi/GiBigWave";
import { FaWheelchair  } from "@react-icons/all-files/fa/FaWheelchair";
import { RiFridgeFill  } from "@react-icons/all-files/ri/RiFridgeFill";
import { GiBabyBottle  } from "@react-icons/all-files/gi/GiBabyBottle";
import { GiToaster  } from "@react-icons/all-files/gi/GiToaster";
import { GiBarbecue   } from "@react-icons/all-files/gi/GiBarbecue";
import { GiTeapotLeaves   } from "@react-icons/all-files/gi/GiTeapotLeaves";
import { BsCheckCircle   } from "@react-icons/all-files/bs/BsCheckCircle";
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { FirestoreCollection } from "@react-firebase/firestore";
import Loading from '../components/Loading';
import { FirestoreDocument } from "@react-firebase/firestore";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Amenities = (props) => {

    //Add icons and format amenities list
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
            case "hasWasher":
                return <div className="amenity-text"><CgSmartHomeWashMachine /><b> Washer</b></div>
            case "hasPotsPans":
                return <div className="amenity-text"><GiCookingPot /><b> Pots & Pans</b></div>
            case "hasIndoorFireplace":
                return <div className="amenity-text"><GiFireplace /><b> Indoor Fireplace</b></div>
            case "hasOven":
                return <div className="amenity-text"><GiChickenOven /><b> Oven</b></div>
            case "hasCrockeryCutlery":
                return <div className="amenity-text"><GiForkKnifeSpoon /><b> Crockery Cutlery</b></div>
            case "hasCoffeeMaker":
                return <div className="amenity-text"><GiCoffeePot /><b> Coffee Maker</b></div>
            case "hasHeating":
                return <div className="amenity-text"><GiHeatHaze /><b> Heating</b></div>
            case "hasFreeParking":
                return <div className="amenity-text"><FaParking /><b> Free Parking</b></div>
            case "hasKitchen":
                return <div className="amenity-text"><MdKitchen /><b> Kitchen</b></div>
            case "hasHotWater":
                return <div className="amenity-text"><CgSmartHomeBoiler /><b> Hot Water</b></div>
            case "hasHangers":
                return <div className="amenity-text"><BiCloset /><b> Hangers</b></div>
            case "hasBabyTravelBed":
                return <div className="amenity-text"><FaBaby /><b> Baby Travel Bed</b></div>
            case "hasStove":
                return <div className="amenity-text"><CgSmartHomeCooker /><b> Stove</b></div>
            case "hasWardrobe":
                return <div className="amenity-text"><GiHanger /><b> Wardrobe</b></div>
            case "hasRoomDarkeningShades":
                return <div className="amenity-text"><CgDarkMode /><b> Room Darkening Shades</b></div>
            case "hasFirstAidKit":
                return <div className="amenity-text"><RiFirstAidKitFill /><b> First Aid Kit</b></div>
            case "hasCookingBasics":
                return <div className="amenity-text"><GiCook /><b> Cooking Basics</b></div>  
            case "hasBabyHighChair":
                return <div className="amenity-text"><FaChair /><b> Baby High Chair</b></div> 
            case "hasGatedProperty":
                return <div className="amenity-text"><GiGate /><b> Gated Property</b></div> 
            case "hasMicrowaveOven":
                return <div className="amenity-text"><GiWaves /><b> Microwave Oven</b></div>
            case "hasSeaView":
                return <div className="amenity-text"><GiBigWave /><b> Sea View</b></div>
            case "isWheelchairAccessible":
                return <div className="amenity-text"><FaWheelchair /><b> Wheelchair Accessible</b></div>
            case "hasFridge":
                return <div className="amenity-text"><RiFridgeFill /><b> Fridge</b></div>
            case "hasBabysitterRecommendations":
                return <div className="amenity-text"><GiBabyBottle /><b> Babysitter Recommendations</b></div>
            case "hasToaster":
                return <div className="amenity-text"><GiToaster /><b> Toaster</b></div>
            case "hasBarbecue":
                return <div className="amenity-text"><GiBarbecue /><b> Barbecue</b></div>
            case "hasWaterKettle":
                return <div className="amenity-text"><GiTeapotLeaves /><b> Water Kettle</b></div>
            default:
                let text;
                let temp = amenity.replace( /([A-Z])/g, " $1" ); //Split text at capitals
                text = temp.charAt(0).toUpperCase() + temp.slice(1); //Capitalize first char
                if(text.includes('Has ')){
                    text = text.slice(4) //remove has
                }
                return <div className="amenity-text"><BsCheckCircle /><b> {text}</b></div>
        }
    }

    //popover component for list of properties with same amenity
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