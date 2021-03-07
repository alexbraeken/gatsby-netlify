import React, {useState, useEffect} from 'react'
import { Col, Row } from 'react-bootstrap';
import RangeSlider from '../components/RangeSlider';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import logo from '../img/smartavillas logo.png'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function SideBarModal(props) {

    const [show, setShow]=useState(false)

    useEffect(() => {
        setShow(props.show)
        return () => {
            setShow(false)
        }
    }, [props])


    const handleAmenityCheck = (e) =>{
        let target = e.target.value
    }

    return (
        <div className={`sidebar-modal-container ${show ? "active" : ""}`}>
        {show && <div className="sidebar-overlay" onClick={props.close}></div>}
            <Col className={`sidebar-modal ${show ? "active" : ""}`} xs={12} md={3}>
            <Container className="justify-content-md-center filter-container">
                <div className="close-modal">
                    <FontAwesomeIcon icon={faTimes} onClick={props.close}/> 
                </div>
                <Form>
                    <Container>
                        <h2 style={{textAlign: "center"}}>
                            Filter Search
                        </h2>
                        <br />
                    <Row>
                    <Container fluid className="filter-header">
                        <Row>
                            <Col xs={12} lg={4} style={{display:"flex"}}>
                                <div className="label">
                                    <span>City: </span>
                                </div>
                            </Col>
                            <Col xs={12} lg={8}>
                                <Row style={{flexWrap:"nowrap"}}>
                                    <div
                                    className="button" 
                                    onClick={()=>props.handleSelectDeselectAll("city", false)}>Deselect All</div>
                                    <div
                                    className="button"  
                                    onClick={()=>props.handleSelectDeselectAll("city", true)}>Select All</div>
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
                        <Row>
                            <Col xs={12} lg={4} style={{display:"flex"}}>
                                <div className="label">
                                    <span>Lodging Type:</span>
                                </div>
                            </Col>
                            <Col xs={12} lg={8}>
                                <Row style={{flexWrap:"nowrap"}}>
                                    <div
                                className="button"  
                                    onClick={()=>props.handleSelectDeselectAll("type", false)}>Deselect All</div>
                                    <div
                                className="button"
                                    onClick={()=>props.handleSelectDeselectAll("type", true)}>Select All</div>
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
                    <RangeSlider name="Bedrooms" type="bedrooms" step={1} min={1} max={10} low={props.state.bedrooms[0]} high={props.state.bedrooms[1]} handleSliderChange={props.handleSliderChange}/>  
                    <RangeSlider name="Bathrooms" type="bathrooms" step={1} min={1} max={10} low={1} high={10} handleSliderChange={props.handleSliderChange}/>       
                    </Container>
                </Form>
                <div style={{position:"absolute", bottom:"10%",left:"0", width:"100%", display:"flex"}}>
                    <div style={{margin:"auto", textAlign:"center"}}>
                        <Link to="/" title="Logo" >
                            <img src={logo} alt="Smarta" style={{width:"70%"}}/>
                        </Link>
                    </div>
                </div> 
            </Container>
            </Col>
        </div> 
    )
}
