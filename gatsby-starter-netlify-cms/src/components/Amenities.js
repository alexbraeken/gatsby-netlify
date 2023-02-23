import React from 'react';
import {useTranslation} from 'gatsby-plugin-react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faFan, faDog, faHotTub, faWifi, faSwimmingPool, faTree, faCompactDisc, faFireExtinguisher, faConciergeBell} from '@fortawesome/free-solid-svg-icons';
import { CgSmartHomeWashMachine } from "@react-icons/all-files/cg/CgSmartHomeWashMachine";
import { GiCookingPot } from "@react-icons/all-files/gi/GiCookingPot";
import { GiFireplace } from "@react-icons/all-files/gi/GiFireplace";
import { GiChickenOven } from "@react-icons/all-files/gi/GiChickenOven";
import { GiForkKnifeSpoon } from "@react-icons/all-files/gi/GiForkKnifeSpoon";
import { GiCoffeePot } from "@react-icons/all-files/gi/GiCoffeePot";
import { GiHeatHaze } from "@react-icons/all-files/gi/GiHeatHaze";
import { FaParking  } from "@react-icons/all-files/fa/FaParking";
import { MdKitchen } from "@react-icons/all-files/md/MdKitchen";
import { CgSmartHomeBoiler } from "@react-icons/all-files/cg/CgSmartHomeBoiler";
import { GiHanger } from "@react-icons/all-files/gi/GiHanger";
import { FaBaby } from "@react-icons/all-files/fa/FaBaby";
import { CgSmartHomeCooker } from "@react-icons/all-files/cg/CgSmartHomeCooker";
import { BiCloset } from "@react-icons/all-files/bi/BiCloset";
import { CgDarkMode } from "@react-icons/all-files/cg/CgDarkMode";
import { RiFirstAidKitFill } from "@react-icons/all-files/ri/RiFirstAidKitFill";
import { GiCook } from "@react-icons/all-files/gi/GiCook";
import { FaChair } from "@react-icons/all-files/fa/FaChair";
import { GiGate } from "@react-icons/all-files/gi/GiGate";
import { GiWaves } from "@react-icons/all-files/gi/GiWaves";
import { GiBigWave } from "@react-icons/all-files/gi/GiBigWave";
import { FaWheelchair } from "@react-icons/all-files/fa/FaWheelchair";
import { RiFridgeFill } from "@react-icons/all-files/ri/RiFridgeFill";
import { GiBabyBottle } from "@react-icons/all-files/gi/GiBabyBottle";
import { GiToaster } from "@react-icons/all-files/gi/GiToaster";
import { GiBarbecue } from "@react-icons/all-files/gi/GiBarbecue";
import { GiTeapotLeaves } from "@react-icons/all-files/gi/GiTeapotLeaves";
import { BsCheckCircle } from "@react-icons/all-files/bs/BsCheckCircle";
import { FaChild } from "@react-icons/all-files/fa/FaChild";
import { MdSmartScreen } from "react-icons/md";
import { MdCable } from "react-icons/md";
import { MdOutlineFilterDrama } from "react-icons/md";
import { MdOutlineLocalLaundryService } from "react-icons/md";
import { MdOutlineSensors } from "react-icons/md";
import { BsCardChecklist } from "@react-icons/all-files/bs/BsCardChecklist";
import { FaChessBoard } from "@react-icons/all-files/fa/FaChessBoard";
import { GiTowel } from "react-icons/gi";
import { WiHumidity } from "@react-icons/all-files/wi/WiHumidity";
import { CgBox } from "@react-icons/all-files/cg/CgBox";
import { RiAlarmWarningFill } from "@react-icons/all-files/ri/RiAlarmWarningFill";
import { BiPodcast } from "react-icons/bi";
import { GiSteam } from "@react-icons/all-files/gi/GiSteam";
import { BsFillSafeFill } from "react-icons/bs";
import { SiKasasmart } from "react-icons/si";
import { MdIron } from "react-icons/md";
import { FaPumpSoap } from "react-icons/fa";
import { GiSwipeCard } from "react-icons/gi";
import { MdDoorbell } from "react-icons/md";
import { FaDog } from "@react-icons/all-files/fa/FaDog";
import { FaCat } from "@react-icons/all-files/fa/FaCat";
import { FaBreadSlice } from "@react-icons/all-files/fa/FaBreadSlice";
import { MdPets } from "@react-icons/all-files/md/MdPets";
import { BsFillCameraVideoFill } from "@react-icons/all-files/bs/BsFillCameraVideoFill";
import { GiVacuumCleaner } from "@react-icons/all-files/gi/GiVacuumCleaner";
import { GiSoap } from "@react-icons/all-files/gi/GiSoap";
import { IoIosBed } from "@react-icons/all-files/io/IoIosBed";
import { MdOutlineBalcony } from "react-icons/md";
import { FaHelicopter } from "@react-icons/all-files/fa/FaHelicopter";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { MdDeck } from "react-icons/md";
import { CgGym } from "@react-icons/all-files/cg/CgGym";
import { CgEthernet } from "@react-icons/all-files/cg/CgEthernet";
import { GiBasketballBasket } from "@react-icons/all-files/gi/GiBasketballBasket";
import { BiCameraMovie } from "@react-icons/all-files/bi/BiCameraMovie";
import { GiElevator } from "@react-icons/all-files/gi/GiElevator";
import { MdOutlineRoomPreferences } from "react-icons/md";
import { IoLibraryOutline } from "react-icons/io";
import { GiOfficeChair } from "@react-icons/all-files/gi/GiOfficeChair";
import { GiPoolTableCorner } from "react-icons/gi";
import { GiGrandPiano } from "react-icons/gi";
import { GiSoccerField } from "@react-icons/all-files/gi/GiSoccerField";
import { GiTennisCourt } from "@react-icons/all-files/gi/GiTennisCourt";
import { GiToothbrush } from "react-icons/gi";
import { FaWineBottle } from "@react-icons/all-files/fa/FaWineBottle";
import { MdFreeBreakfast } from "@react-icons/all-files/md/MdFreeBreakfast";
import { GiLockedDoor } from "@react-icons/all-files/gi/GiLockedDoor";
import { MdFamilyRestroom } from "react-icons/md";
import { Ri24HoursFill } from "@react-icons/all-files/ri/Ri24HoursFill";
import { GrUserWorker } from "@react-icons/all-files/gr/GrUserWorker";
import { GrBike } from "@react-icons/all-files/gr/GrBike";
import { FaUmbrellaBeach } from "@react-icons/all-files/fa/FaUmbrellaBeach";
import { FaSkiing } from "@react-icons/all-files/fa/FaSkiing";
import { GiBeachBall } from "@react-icons/all-files/gi/GiBeachBall";
import { GiFarmer } from "@react-icons/all-files/gi/GiFarmer";
import { MdLocationCity } from "@react-icons/all-files/md/MdLocationCity";
import { GiGolfFlag } from "@react-icons/all-files/gi/GiGolfFlag";
import { FaWater } from "@react-icons/all-files/fa/FaWater";
import { FaMountain } from "@react-icons/all-files/fa/FaMountain";
import { GiRiver } from "@react-icons/all-files/gi/GiRiver";
import { GiVillage } from "@react-icons/all-files/gi/GiVillage";
import { MdConnectWithoutContact } from "react-icons/md";
import { MdOutlineBabyChangingStation } from "react-icons/md";
import { RiRadio2Fill } from "@react-icons/all-files/ri/RiRadio2Fill";
import { GiWindowBars } from "@react-icons/all-files/gi/GiWindowBars";
import { FaBath } from "@react-icons/all-files/fa/FaBath";
import { MdOutlineToys } from "react-icons/md";
import { GiConsoleController } from "@react-icons/all-files/gi/GiConsoleController";
import { MdOutlineOutlet } from "react-icons/md";
import { MdOutlineCrib } from "react-icons/md";
import { MdOutlineStairs } from "react-icons/md";
import { MdOutlinePivotTableChart } from "react-icons/md";
import { MdDoNotTouch } from "react-icons/md";
import { MdBakeryDining } from "react-icons/md";
import { MdNaturePeople } from "react-icons/md";
import { GiPartyPopper } from "@react-icons/all-files/gi/GiPartyPopper";
import { AiOutlineLaptop } from "@react-icons/all-files/ai/AiOutlineLaptop";
import { GiCigarette } from "@react-icons/all-files/gi/GiCigarette";
import { GrChatOption } from "@react-icons/all-files/gr/GrChatOption";
import { AiFillLock } from "@react-icons/all-files/ai/AiFillLock";
import { FiMonitor } from "@react-icons/all-files/fi/FiMonitor";
import { GiDesk } from "@react-icons/all-files/gi/GiDesk";
import { GiRoundTable } from "@react-icons/all-files/gi/GiRoundTable";
import { GiExitDoor } from "@react-icons/all-files/gi/GiExitDoor";
import { GiPingPongBat } from "@react-icons/all-files/gi/GiPingPongBat";
import { MdOutlineElectricCar } from "react-icons/md";
import { GiWoodenFence } from "@react-icons/all-files/gi/GiWoodenFence";
import { GiFireZone } from "@react-icons/all-files/gi/GiFireZone";
import { GiThermometerCold } from "@react-icons/all-files/gi/GiThermometerCold";
import { MdDeliveryDining } from "react-icons/md";
import { MdOutlineLight } from "react-icons/md";
import { AiFillPrinter } from "@react-icons/all-files/ai/AiFillPrinter";
import { GiFlatPlatform } from "@react-icons/all-files/gi/GiFlatPlatform";
import Loading from '../components/Loading';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Amenities = (props) => {

    const {t} = useTranslation(['translations','amenities']);


    //Add icons and format amenities list
    const determineAmenity = (amenity) =>{
        switch(amenity){
            case "hasTV":
        return <div className="amenity-text"><FontAwesomeIcon icon={faTv}/><b> {t("hasTV")}</b></div>
            case "hasAirConditioning":
                return <div className="amenity-text"><FontAwesomeIcon icon={faFan}/><b> {t(amenity)}</b></div>
            case "allowsPets":
                return <div className="amenity-text"><FontAwesomeIcon icon={faDog}/><b> {t(amenity)}</b></div>
            case "hasHotTub":
                return <div className="amenity-text"><FontAwesomeIcon icon={faHotTub}/><b> {t(amenity)}</b></div>
            case "hasInternetWifi":
                return <div className="amenity-text"><FontAwesomeIcon icon={faWifi}/><b> {t(amenity)}</b></div>
            case "hasPool":
                return <div className="amenity-text"><FontAwesomeIcon icon={faSwimmingPool}/><b> {t(amenity)}</b></div>
            case "hasGarden":
                return <div className="amenity-text"><FontAwesomeIcon icon={faTree}/><b> {t(amenity)}</b></div>
            case "hasCDDVDPlayer":
                return <div className="amenity-text"><FontAwesomeIcon icon={faCompactDisc}/><b> {t(amenity)}</b></div>
            case "hasFireExtinguisher":
                return <div className="amenity-text"><FontAwesomeIcon icon={faFireExtinguisher}/><b> {t(amenity)}</b></div>
            case "hasWasher":
                return <div className="amenity-text"><CgSmartHomeWashMachine /><b> {t(amenity)}</b></div>
            case "hasPotsPans":
                return <div className="amenity-text"><GiCookingPot /><b> {t(amenity)}</b></div>
            case "hasIndoorFireplace":
                return <div className="amenity-text"><GiFireplace /><b> {t(amenity)}</b></div>
            case "hasOven":
                return <div className="amenity-text"><GiChickenOven /><b> {t(amenity)}</b></div>
            case "hasCrockeryCutlery":
                return <div className="amenity-text"><GiForkKnifeSpoon /><b> {t(amenity)}</b></div>
            case "hasCoffeeMaker":
                return <div className="amenity-text"><GiCoffeePot /><b> {t(amenity)}</b></div>
            case "hasHeating":
                return <div className="amenity-text"><GiHeatHaze /><b> {t(amenity)}</b></div>
            case "hasFreeParking":
                return <div className="amenity-text"><FaParking /><b> {t(amenity)}</b></div>
            case "hasKitchen":
                return <div className="amenity-text"><MdKitchen /><b> {t(amenity)}</b></div>
            case "hasHotWater":
                return <div className="amenity-text"><CgSmartHomeBoiler /><b> {t(amenity)}</b></div>
            case "hasHangers":
                return <div className="amenity-text"><BiCloset /><b> {t(amenity)}</b></div>
            case "hasBabyTravelBed":
                return <div className="amenity-text"><FaBaby /><b> {t(amenity)}</b></div>
            case "hasStove":
                return <div className="amenity-text"><CgSmartHomeCooker /><b> {t(amenity)}</b></div>
            case "hasWardrobe":
                return <div className="amenity-text"><GiHanger /><b> {t(amenity)}</b></div>
            case "hasRoomDarkeningShades":
                return <div className="amenity-text"><CgDarkMode /><b> {t(amenity)}</b></div>
            case "hasFirstAidKit":
                return <div className="amenity-text"><RiFirstAidKitFill /><b> {t(amenity)}</b></div>
            case "hasCookingBasics":
                return <div className="amenity-text"><GiCook /><b> {t(amenity)}</b></div>  
            case "hasBabyHighChair":
                return <div className="amenity-text"><FaChair /><b> {t(amenity)}</b></div> 
            case "hasGatedProperty":
                return <div className="amenity-text"><GiGate /><b> {t(amenity)}</b></div> 
            case "hasMicrowaveOven":
                return <div className="amenity-text"><GiWaves /><b> {t(amenity)}</b></div>
            case "hasSeaView":
                return <div className="amenity-text"><GiBigWave /><b> {t(amenity)}</b></div>
            case "isWheelchairAccessible":
                return <div className="amenity-text"><FaWheelchair /><b> {t(amenity)}</b></div>
            case "hasFridge":
                return <div className="amenity-text"><RiFridgeFill /><b> {t(amenity)}</b></div>
            case "hasBabysitterRecommendations":
                return <div className="amenity-text"><GiBabyBottle /><b> {t(amenity)}</b></div>
            case "hasToaster":
                return <div className="amenity-text"><GiToaster /><b> {t(amenity)}</b></div>
            case "hasBarbecue":
                return <div className="amenity-text"><GiBarbecue /><b> {t(amenity)}</b></div>
            case "hasWaterKettle":
                return <div className="amenity-text"><GiTeapotLeaves /><b> {t(amenity)}</b></div>
            case "allowsChildren":
                return <div className="amenity-text"><FaChild /><b> {t(amenity)}</b></div>
            case "hasSmartTv":
                return <div className="amenity-text"><MdSmartScreen /><b> {t(amenity)}</b></div>
            case "hasCableTV":
                return <div className="amenity-text"><MdCable /><b> {t(amenity)}</b></div>
            case "hasAirFilter":
                return <div className="amenity-text"><MdOutlineFilterDrama /><b> {t(amenity)}</b></div>
            case "hasDryer":
                return <div className="amenity-text"><MdOutlineLocalLaundryService /><b> {t(amenity)}</b></div>
            case "hasSmokeDetector":
                return <div className="amenity-text"><MdOutlineSensors /><b> {t(amenity)}</b></div>
            case "hasEssentials":
                return <div className="amenity-text"><BsCardChecklist /><b> {t(amenity)}</b></div>
            case "hasBoardGames":
                return <div className="amenity-text"><FaChessBoard /><b> {t(amenity)}</b></div>
            case "hasTowels":
                return <div className="amenity-text"><GiTowel /><b> {t(amenity)}</b></div>
            case "hasDehumidifier":
                return <div className="amenity-text"><WiHumidity /><b> {t(amenity)}</b></div>
            case "hasCeilingFan":
                return <div className="amenity-text"><FontAwesomeIcon icon={faFan}/><b> {t(amenity)}</b></div>
            case "hasHairDryer":
                return <div className="amenity-text"><GiHeatHaze/><b> {t(amenity)}</b></div>
            case "hasDishwasher":
                return <div className="amenity-text"><CgBox/><b> {t(amenity)}</b></div>
            case "hasAlarmSystem":
                return <div className="amenity-text"><RiAlarmWarningFill/><b> {t(amenity)}</b></div>
            case "hasIpodStation":
                return <div className="amenity-text"><BiPodcast/><b> {t(amenity)}</b></div>
            case "hasSteamRoom":
                return <div className="amenity-text"><GiSteam/><b> {t(amenity)}</b></div>
            case "hasSafeBox":
                return <div className="amenity-text"><BsFillSafeFill/><b> {t(amenity)}</b></div>
            case "hasSmartHome":
                return <div className="amenity-text"><SiKasasmart/><b> {t(amenity)}</b></div>
            case "hasIron":
                return <div className="amenity-text"><MdIron/><b> {t(amenity)}</b></div>
            case "hasIroningFacilities":
                return <div className="amenity-text"><MdIron/><b> {t(amenity)}</b></div>
            case "hasShampoo":
                return <div className="amenity-text"><FaPumpSoap/><b> {t(amenity)}</b></div>
            case "hasSafetyCard":
                return <div className="amenity-text"><GiSwipeCard/><b> {t(amenity)}</b></div>
            case "hasBuzzer":
                return <div className="amenity-text"><MdDoorbell/><b> {t(amenity)}</b></div>
            case "hasDog":
                return <div className="amenity-text"><FaDog/><b> {t(amenity)}</b></div>
            case "hasCat":
                return <div className="amenity-text"><FaCat/><b> {t(amenity)}</b></div>
            case "hasOtherPet":
                return <div className="amenity-text"><MdPets/><b> {t(amenity)}</b></div>
            case "hasSurveillance":
                return <div className="amenity-text"><BsFillCameraVideoFill/><b> {t(amenity)}</b></div>
            case "hasEnhancedCleaning":
                return <div className="amenity-text"><GiVacuumCleaner/><b> {t(amenity)}</b></div>
            case "hasUsesDisinfectants":
                return <div className="amenity-text"><GiSoap/><b> {t(amenity)}</b></div>
            case "hasLinens":
                return <div className="amenity-text"><IoIosBed/><b> {t(amenity)}</b></div>
            case "hasBalconyTerrasse":
                return <div className="amenity-text"><MdOutlineBalcony/><b> {t(amenity)}</b></div>
            case "hasHelipad":
                return <div className="amenity-text"><FaHelicopter/><b> {t(amenity)}</b></div>
            case "hasPrivateEntrance":
                return <div className="amenity-text"><BsFillDoorOpenFill/><b> {t(amenity)}</b></div>
            case "hasDeckPatio":
                return <div className="amenity-text"><MdDeck/><b> {t(amenity)}</b></div>
            case "hasGym":
                return <div className="amenity-text"><CgGym/><b> {t(amenity)}</b></div>
            case "hasBasketballCourt":
                return <div className="amenity-text"><GiBasketballBasket/><b> {t(amenity)}</b></div>
            case "hasCinemaRoom":
                return <div className="amenity-text"><BiCameraMovie/><b> {t(amenity)}</b></div>
            case "hasElevator":
                return <div className="amenity-text"><GiElevator/><b> {t(amenity)}</b></div>
            case "hasMassageRoom":
                return <div className="amenity-text"><MdOutlineRoomPreferences/><b> {t(amenity)}</b></div>
            case "hasOffice":
                return <div className="amenity-text"><GiOfficeChair/><b> {t(amenity)}</b></div>
            case "hasPoolTable":
                return <div className="amenity-text"><GiPoolTableCorner/><b> {t(amenity)}</b></div>
            case "hasPiano":
                return <div className="amenity-text"><GiGrandPiano/><b> {t(amenity)}</b></div>
            case "hasSoccerField":
                return <div className="amenity-text"><GiSoccerField/><b> {t(amenity)}</b></div>
            case "hasTennis":
                return <div className="amenity-text"><GiTennisCourt/><b> {t(amenity)}</b></div>
            case "hasToiletries":
                return <div className="amenity-text"><GiToothbrush/><b> {t(amenity)}</b></div>
            case "hasWineCellar":
                return <div className="amenity-text"><FaWineBottle/><b> {t(amenity)}</b></div>
            case "hasBreakfast":
                return <div className="amenity-text"><MdFreeBreakfast/><b> {t(amenity)}</b></div>
            case "hasLockOnBedroom":
                return <div className="amenity-text"><GiLockedDoor/><b> {t(amenity)}</b></div>
            case "isFamilyFriendly":
                return <div className="amenity-text"><MdFamilyRestroom/><b> {t(amenity)}</b></div>
            case "has24Checkin":
                return <div className="amenity-text"><Ri24HoursFill/><b> {t(amenity)}</b></div>
            case "hasWaterFront":
                return <div className="amenity-text"><GiBigWave/><b> {t(amenity)}</b></div>
            case "hasDoorman":
                return <div className="amenity-text"><GrUserWorker/><b> {t(amenity)}</b></div>
            case "hasBeach":
                return <div className="amenity-text"><FaUmbrellaBeach/><b> {t(amenity)}</b></div>
            case "hasBeachFront":
                return <div className="amenity-text"><FaUmbrellaBeach/><b> {t(amenity)}</b></div>
            case "hasBeachView":
                return <div className="amenity-text"><GiBigWave/><b> {t(amenity)}</b></div>
            case "hasSkiInSkiOut":
                return <div className="amenity-text"><FaSkiing/><b> {t(amenity)}</b></div>
            case "isOceanfront":
                return <div className="amenity-text"><GiBigWave/><b> {t(amenity)}</b></div>
            case "isResort":
                return <div className="amenity-text"><GiBeachBall/><b> {t(amenity)}</b></div>
            case "isRural":
                return <div className="amenity-text"><GiFarmer/><b> {t(amenity)}</b></div>
            case "isTown":
                return <div className="amenity-text"><MdLocationCity/><b> {t(amenity)}</b></div>
            case "hasWaterView":
                return <div className="amenity-text"><GiBigWave/><b> {t(amenity)}</b></div>
            case "isDowntown":
                return <div className="amenity-text"><MdLocationCity/><b> {t(amenity)}</b></div>
            case "hasGolfCourseFront":
                return <div className="amenity-text"><GiGolfFlag/><b> {t(amenity)}</b></div>
            case "hasGolfCourseView":
                return <div className="amenity-text"><GiGolfFlag/><b> {t(amenity)}</b></div>
            case "hasLakeAccess":
                return <div className="amenity-text"><FaWater/><b> {t(amenity)}</b></div>
            case "hasLakeFront":
                return <div className="amenity-text"><FaWater/><b> {t(amenity)}</b></div>
            case "hasLakeView":
                return <div className="amenity-text"><FaWater/><b> {t(amenity)}</b></div>
            case "hasMountain":
                return <div className="amenity-text"><FaMountain/><b> {t(amenity)}</b></div>
            case "hasMountainView":
                return <div className="amenity-text"><FaMountain/><b> {t(amenity)}</b></div>
            case "isNearOcean":
                return <div className="amenity-text"><GiBigWave/><b> {t(amenity)}</b></div>
            case "hasRiver":
                return <div className="amenity-text"><GiRiver/><b> {t(amenity)}</b></div>
            case "isVillage":
                return <div className="amenity-text"><GiVillage/><b> {t(amenity)}</b></div>
            case "hasContactlessCheckin":
                return <div className="amenity-text"><MdConnectWithoutContact/><b> {t(amenity)}</b></div>
            case "hasCarbonMonoxideDetector":
                return <div className="amenity-text"><MdOutlineSensors /><b> {t(amenity)}</b></div>
            case "hasBabyBath":
                return <div className="amenity-text"><MdOutlineBabyChangingStation /><b> {t(amenity)}</b></div>
            case "hasBabyMonitor":
                return <div className="amenity-text"><RiRadio2Fill /><b> {t(amenity)}</b></div>
            case "hasWindowGuards":
                return <div className="amenity-text"><GiWindowBars /><b> {t(amenity)}</b></div>
            case "hasBathtub":
                return <div className="amenity-text"><FaBath /><b> {t(amenity)}</b></div>
            case "hasChangingTable":
                return <div className="amenity-text"><MdOutlineBabyChangingStation /><b> {t(amenity)}</b></div>
            case "hasChildrensBooksAndToys":
                return <div className="amenity-text"><MdOutlineToys /><b> {t(amenity)}</b></div>
            case "hasChildrensDinnerware":
                return <div className="amenity-text"><GiForkKnifeSpoon /><b> {t(amenity)}</b></div>
            case "hasFireplaceGuards":
                return <div className="amenity-text"><GiFireplace /><b> {t(amenity)}</b></div>
            case "hasGameConsole":
                return <div className="amenity-text"><GiConsoleController /><b> {t(amenity)}</b></div>
            case "hasOutletCovers":
                return <div className="amenity-text"><MdOutlineOutlet /><b> {t(amenity)}</b></div>
            case "hasPackNPlayTravelCrib":
                return <div className="amenity-text"><MdOutlineCrib /><b> {t(amenity)}</b></div>
            case "hasStairGates":
                return <div className="amenity-text"><MdOutlineStairs /><b> {t(amenity)}</b></div>
            case "hasTableCornerGuards":
                return <div className="amenity-text"><MdOutlinePivotTableChart /><b> {t(amenity)}</b></div>
            case "childrenNotAllowed":
                return <div className="amenity-text"><MdDoNotTouch /><b> {t(amenity)}</b></div>
            case "infantNotAllowed":
                return <div className="amenity-text"><MdDoNotTouch /><b> {t(amenity)}</b></div>
            case "isEventFriendly":
                return <div className="amenity-text"><GiPartyPopper /><b> {t(amenity)}</b></div>
            case "isLaptopFriendly":
                return <div className="amenity-text"><AiOutlineLaptop /><b> {t(amenity)}</b></div>
            case "allowsSmoking":
                return <div className="amenity-text"><GiCigarette /><b> {t(amenity)}</b></div>
            case "hasJacuzzi":
                return <div className="amenity-text"><FontAwesomeIcon icon={faHotTub}/><b> {t(amenity)}</b></div>
            case "checkInOptionInstruction":
                return <div className="amenity-text"><GrChatOption /><b> {t(amenity)}</b></div>
            case "hasCabinetLocks":
                return <div className="amenity-text"><AiFillLock /><b> {t(amenity)}</b></div>
            case "hasChildcare":
                return <div className="amenity-text"><FaChild /><b> {t(amenity)}</b></div>
            case "hasCleaningWithDisinfectants":
                return <div className="amenity-text"><GiSoap/><b> {t(amenity)}</b></div>
            case "hasCommunalPool":
                return <div className="amenity-text"><FontAwesomeIcon icon={faSwimmingPool}/><b> {t(amenity)}</b></div>
            case "hasComputerMonitor":
                return <div className="amenity-text"><FiMonitor/><b> {t(amenity)}</b></div>
            case "hasDeadboltLock":
                return <div className="amenity-text"><GiLockedDoor/><b> {t(amenity)}</b></div>
            case "hasDesk":
                return <div className="amenity-text"><GiDesk/><b> {t(amenity)}</b></div>
            case "hasDeskChair":
                return <div className="amenity-text"><GiOfficeChair/><b> {t(amenity)}</b></div>
            case "hasDiningTable":
                return <div className="amenity-text"><GiRoundTable/><b> {t(amenity)}</b></div>
            case "hasEmergencyExit":
                return <div className="amenity-text"><GiExitDoor/><b> {t(amenity)}</b></div>
            case "hasEvCarCharger":
                return <div className="amenity-text"><MdOutlineElectricCar/><b> {t(amenity)}</b></div>
            case "hasFencedPool":
                return <div className="amenity-text"><GiWoodenFence/><b> {t(amenity)}</b></div>
            case "hasFencedYard":
                return <div className="amenity-text"><GiWoodenFence/><b> {t(amenity)}</b></div>
            case "hasHeatedPool":
                return <div className="amenity-text"><GiHeatHaze/><b> {t(amenity)}</b></div>
            case "hasPool":
                return <div className="amenity-text"><FontAwesomeIcon icon={faSwimmingPool}/><b> {t(amenity)}</b></div>
            case "hasLake":
                return <div className="amenity-text"><FaWater/><b> {t(amenity)}</b></div>
            case "hasMealDelivery":
                return <div className="amenity-text"><MdDeliveryDining/><b> {t(amenity)}</b></div>
            case "hasOceanFront":
                return <div className="amenity-text"><GiBigWave/><b> {t(amenity)}</b></div>
            case "hasOutdoorLighting":
                return <div className="amenity-text"><MdOutlineLight/><b> {t(amenity)}</b></div>
            case "hasOutdoorPlayArea":
                return <div className="amenity-text"><MdOutlineToys /><b> {t(amenity)}</b></div>
            case "hasPaidWifi":
                return <div className="amenity-text"><FontAwesomeIcon icon={faWifi}/><b> {t(amenity)}</b></div>
            case "hasPrinter":
                return <div className="amenity-text"><AiFillPrinter /><b> {t(amenity)}</b></div>
            case "hasTown":
                return <div className="amenity-text"><MdLocationCity/><b> {t(amenity)}</b></div>
            case "hasVentilationFan":
                return <div className="amenity-text"><FontAwesomeIcon icon={faFan}/><b> {t(amenity)}</b></div>
            case "hasVillage":
                return <div className="amenity-text"><GiVillage/><b> {t(amenity)}</b></div>
            case "isGolfCourseFront":
                return <div className="amenity-text"><GiGolfFlag/><b> {t(amenity)}</b></div>
            case "isLakeFront":
                return <div className="amenity-text"><FaWater/><b> {t(amenity)}</b></div>
            case "hasFreeStreetParking":
                return <div className="amenity-text"><FaParking/><b> {t(amenity)}</b></div>
            case "hasHighTouchSurfacesCleaningWithDisinfectants":
                return <div className="amenity-text"><GiSoap/><b> {t(amenity)}</b></div>
            case "hasIndoorPoolAllYear":
                return <div className="amenity-text"><FontAwesomeIcon icon={faSwimmingPool}/><b> {t(amenity)}</b></div>
            case "hasIndoorPoolSeasonal":
                return <div className="amenity-text"><FontAwesomeIcon icon={faSwimmingPool}/><b> {t(amenity)}</b></div>
            case "hasKitchenIsland":
                return <div className="amenity-text"><MdKitchen/><b> {t(amenity)}</b></div>
            case "hasPaidOffPremisesParking":
                return <div className="amenity-text"><FaParking/><b> {t(amenity)}</b></div>
            case "hasPaidOnPremisesParking":
                return <div className="amenity-text"><FaParking/><b> {t(amenity)}</b></div>
            case "hasPoolAllYear":
                return <div className="amenity-text"><FontAwesomeIcon icon={faSwimmingPool}/><b> {t(amenity)}</b></div>
            case "hasPoolSeasonal":
                return <div className="amenity-text"><FontAwesomeIcon icon={faSwimmingPool}/><b> {t(amenity)}</b></div>
            case "hasSingleLevel":
                return <div className="amenity-text"><GiFlatPlatform/><b> {t(amenity)}</b></div>
            case "hasWifiSpeed500":
                return <div className="amenity-text"><FontAwesomeIcon icon={faWifi}/><b> {t(amenity)}</b></div>
            case "hasWifiSpeed500":
                return <div className="amenity-text"><FontAwesomeIcon icon={faWifi}/><b> {t(amenity)}</b></div>
            case "hasWifiSpeed500":
                return <div className="amenity-text"><FontAwesomeIcon icon={faWifi}/><b> {t(amenity)}</b></div>
            case "hasWifiSpeed500":
                return <div className="amenity-text"><FontAwesomeIcon icon={faWifi}/><b> {t(amenity)}</b></div>
            case "hasWifiSpeed500":
                return <div className="amenity-text"><FontAwesomeIcon icon={faWifi}/><b> {t(amenity)}</b></div>
            case "hasConcierge":
                return <div className="amenity-text"><FontAwesomeIcon icon={faConciergeBell}/><b> {t(amenity)}</b></div>
            case "hasSharedWasher":
                return <div className="amenity-text"><CgBox/><b> {t(amenity)}</b></div>
            case "hasShardedDryer":
                return <div className="amenity-text"><GiHeatHaze/><b> {t(amenity)}</b></div>
            case "hasBakingSheet":
                return <div className="amenity-text"><MdBakeryDining/><b> {t(amenity)}</b></div>
            case "hasBarbequeUtensils":
                return <div className="amenity-text"><GiBarbecue/><b> {t(amenity)}</b></div>
            case "hasBeachEssentials":
                return <div className="amenity-text"><FaUmbrellaBeach/><b> {t(amenity)}</b></div>
            case "hasBikesForRent":
                return <div className="amenity-text"><GrBike/><b> {t(amenity)}</b></div>
            case "hasBreadMaker":
                return <div className="amenity-text"><FaBreadSlice/><b> {t(amenity)}</b></div>
            case "hasCleaningProducts":
                return <div className="amenity-text"><GiSoap/><b> {t(amenity)}</b></div>
            case "hasEthernetConnection":
                return <div className="amenity-text"><CgEthernet/><b> {t(amenity)}</b></div>
            case "hasExerciseEquipment":
                return <div className="amenity-text"><CgGym/><b> {t(amenity)}</b></div>
            case "hasFirePit":
                return <div className="amenity-text"><GiFireZone/><b> {t(amenity)}</b></div>
            case "hasFreezer":
                return <div className="amenity-text"><GiThermometerCold/><b> {t(amenity)}</b></div>
            case "hasLaundromatNearby":
                return <div className="amenity-text"><MdOutlineLocalLaundryService/><b> {t(amenity)}</b></div>
            case "hasMiniFridge":
                return <div className="amenity-text"><RiFridgeFill/><b> {t(amenity)}</b></div>
            case "hasOutdoorKitchen":
                return <div className="amenity-text"><MdKitchen/><b> {t(amenity)}</b></div>
            case "hasOutdoorSeating":
                return <div className="amenity-text"><MdNaturePeople/><b> {t(amenity)}</b></div>
            case "hasPingPongTable":
                return <div className="amenity-text"><GiPingPongBat/><b> {t(amenity)}</b></div>
            case "hasSafe":
                return <div className="amenity-text"><BsFillSafeFill/><b> {t(amenity)}</b></div>                                                                                                                                                                                                           
            default:
                return <div className="amenity-text"><BsCheckCircle /><b> {t(amenity) || amenity.replace('has', '').replace(/[A-Z]/g, ' $&').trim()}</b></div>
        }
    }


    return (
        <div>
            {determineAmenity(props.amenity)}
        </div>
    )
}

export default Amenities