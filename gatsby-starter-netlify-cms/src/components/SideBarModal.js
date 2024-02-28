import React, {useState, useEffect} from 'react'
import { Col, Row } from 'react-bootstrap';
import {useTranslation} from 'gatsby-plugin-react-i18next';
import RangeSlider from '../components/RangeSlider';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';



export default function SideBarModal(props) {
    

    const [show, setShow] = useState(false)
    const [modalStyle, setModalStyle] = useState({})

    const {t} = useTranslation(['sidebar']);

    const amenitiesFilterList = [
        {
            amenity: `${t('Pool')}`,
            value: 'hasPool'
        },
        {
            amenity: `${t('Wheelchair Accessible')}`,
            value: 'isWheelchairAccessible'
        },
        {
            amenity: `${t('Allows Pets')}`,
            value: 'allowsPets'
        },
        {
            amenity: `${t('Air Conditioning')}`,
            value: 'hasAirConditioning'
        },
        {
            amenity: `${t('Barbecue')}`,
            value: 'hasBarbecue'
        },
        {
            amenity: `${t('Elevator')}`,
            value: 'hasElevator'
        },
        {
            amenity: `${t('Garden')}`,
            value: 'hasGarden'
        },
        {
            amenity: `${t('Wi-Fi')}`,
            value: 'hasInternetWifi'
        },
    ]

    useEffect(() => {
        const marginTop = document.getElementsByClassName('newsAlert')?.[0]?.getBoundingClientRect().height

        if(marginTop)setModalStyle({marginTop: `${marginTop}px`})
        return () => {
            setModalStyle({})
        }
    }, [])

    useEffect(() => {
        setShow(props.show)
        return () => {
            setShow(false)
        }
    }, [props])


    const handleAmenityCheck = (e) =>{
        props.handleAmenityChange(e.target.value)
    }

    return (
        <div className={`sidebar-modal-container ${show ? "active" : ""}`}>
        {show && <div className="sidebar-overlay" role="button" tabIndex="0" onClick={props.close} onKeyDown={(e)=>{if(e.key === 'Enter'){props.close()}}} aria-label="close"></div>}
            <Col className={`sidebar-modal ${show ? "active" : ""}`} xs={12} md={3}>
            <Container className="justify-content-md-center filter-container" style={modalStyle}>
                <div className="close-modal">
                    <FontAwesomeIcon icon={faTimes} onClick={props.close}/> 
                </div>
                <Form>
                    <Container>
                        <h3 style={{textAlign: "center",fontWeight: "700", textTransform: "lowercase", fontSize:"calc(15PX + 15 * (100vw - 320px) / 1080)", pointerEvents:"none"}}>
                            {t("Filters")}
                        </h3>
                        <br />
                    <Row>
                    <Container fluid className="filter-header">
                        <Row style={{flexWrap:"nowrap"}}>
                            <Col style={{display:"flex", flex:"1 1"}}>
                                <div className="label">
                                    <span style={{whiteSpace: "nowrap"}}>{t("Location")}: </span>
                                </div>
                            </Col>
                            <Col style={{flex:"1 1"}}>
                                <Row style={{justifyContent:"flex-end"}}>
                                    <div
                                    className="button"
                                    style={{flex:"1 1"}} 
                                    role="button" tabIndex="0"
                                    onClick={()=>props.handleSelectDeselectAll("city", false)}
                                    onKeyDown={(e)=>{if(e.key === 'Enter'){props.handleSelectDeselectAll("city", false)}}}>{t("Deselect All")}</div>
                                    <div
                                    className="button" 
                                    style={{flex:"1 1"}}
                                    role="button" tabIndex="0" 
                                    onClick={()=>props.handleSelectDeselectAll("city", true)}
                                    onKeyDown={(e)=>{if(e.key === 'Enter'){props.handleSelectDeselectAll("city", true)}}}>{t("Select All")}</div>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                    {Object.keys(props.state.city).length !== 0 &&
                    Object.keys(props.state.city).map((city, index)=>{
                        let name = city? city: "";
                        return (
                            <div className="filter-checkbox-container" key={index}>
                            <label className="filter-checkbox path">
                                <input type="checkbox"
                                    id={`city-checkbox-`+index}   
                                    value={name} 
                                    checked = {props.state.city[city]}
                                    onChange={(e)=> props.handleChange(e,"city")}
                                     />
                                    {name}
                                    <svg viewBox="0 0 21 21">
                <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
            </svg>
                            </label>
                            </div>
                    )}
                    )}
                    </Row>
                    <Row>
                    <Container fluid className="filter-header">
                        <Row style={{flexWrap:"nowrap"}}>
                            <Col style={{display:"flex", flex:"1 1"}}>
                                <div className="label">
                                    <span>{t("Property Type")}:</span>
                                </div>
                            </Col>
                            <Col style={{flex:"1 1"}}>
                                <Row>
                                    <div
                                className="button"
                                style={{flex:"1 1"}}
                                role="button" tabIndex="0"   
                                    onClick={()=>props.handleSelectDeselectAll("type", false)}
                                    onKeyDown={(e)=>{if(e.key === 'Enter'){props.handleSelectDeselectAll("type", false)}}}>{t("Deselect All")}</div>
                                    <div
                                className="button"
                                style={{flex:"1 1"}}
                                role="button" tabIndex="0" 
                                    onClick={()=>props.handleSelectDeselectAll("type", true)}
                                    onKeyDown={(e)=>{if(e.key === 'Enter'){props.handleSelectDeselectAll("type", true)}}}>{t("Select All")}</div>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                    {Object.keys(props.state.type).length !== 0 && 
                    Object.keys(props.state.type).map((type, index)=>{
                        return (
                            <div className="filter-checkbox-container" key={index}>
                            <label className="filter-checkbox path">
                                <input type="checkbox" 
                        id={`type-checkbox-`+index}
                        label={type} 
                        value={type} 
                        checked= {props.state.type[type]}
                        onChange={(e)=> props.handleChange(e,"type")}
                        />
                                    {type[0].toUpperCase() + type.slice(1).toLowerCase()}
                                    <svg viewBox="0 0 21 21">
                <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
            </svg>
                            </label>
                            </div>
                    )}
                    )}
                    </Row>
                    <RangeSlider name={t("Bedrooms")} type="bedrooms" step={1} min={0} max={10} low={props.state.bedrooms[0]} high={props.state.bedrooms[1]} handleSliderChange={props.handleSliderChange}/>  
                    <RangeSlider name={t("Bathrooms")} type="bathrooms" step={1} min={0} max={10} low={0} high={10} handleSliderChange={props.handleSliderChange}/>   
                    <RangeSlider name={t("Price Per Night")} type="prices" step={50} min={0} max={1000} low={0} high={1000} handleSliderChange={props.handleSliderChange} marks={[
                        {
                            value: 0,label: '0€',
                        },
                        {
                            value: 250,label: '250€',
                        },
                        {
                            value: 500,label: '500€',
                        },
                        {
                            value: 750,label: '750€',
                        },
                        {
                            value: 1000,label: '1000€',
                        }
                            ]}/>       
                    <Container fluid className="filter-header">
                        <Row>
                                <div className="label">
                                    <span>{t("Must Haves")}: </span>
                                </div>
                        </Row>
                    </Container>
                    <br />
                    <Row>
                        {amenitiesFilterList.map((amenity, index) => {
                            return (
                                <div className="filter-checkbox-container" key={index}>
                                <label className="filter-checkbox path">
                                    <input type="checkbox" 
                            id={`type-checkbox-${amenity.amenity}`}
                            label={amenity.amenity}
                            value={amenity.value}
                            checked= {props.amenitiesList[amenitiesFilterList.value]}
                            onChange={(e)=> handleAmenityCheck(e)}
                            />
                                        {amenity.amenity}
                                        <svg viewBox="0 0 21 21">
                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                </svg>
                                </label>
                                </div>
                            )
                        })}
                        <div className="filter-checkbox-container">
                                <label className="filter-checkbox path">
                                    <input type="checkbox" 
                                    id={`type-checkbox-winterLet`}
                                    label={t("Winter Let")}
                                    value={"WinterLets"}
                                    checked= {props.winterLets}
                                    onChange={(e)=> props.handleWinterLets(e.target.checked)}
                                    />
                                    {t("Winter Let Discount")}
                                    <svg viewBox="0 0 21 21">
                                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                    </svg>
                                </label>
                            </div>
                    </Row>
                    </Container>
                </Form>
            </Container>
            </Col>
        </div> 
    )
}
