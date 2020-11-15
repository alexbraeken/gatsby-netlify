import React, { Component, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import RangeSlider from '../components/RangeSlider';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Dropdown from 'react-bootstrap/Dropdown'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button'


class PropertiesFilter extends Component {

    constructor(props){
        super(props);
        this.state={
            defaultChecked:true
        }
    }


    componentDidMount(){
       /* if(this.props.state.city.length > 0 )
        {
            this.setState({defaultChecked:false})
        }*/
    }

    render(){
        
        return(
            <Container className="justify-content-md-center filter-container">
            <Form>
                <Container>
                <Row>
                <Container fluid className="filter-header">
                    <Row>
                        <Col xs={12} lg={4}>
                            <span style={{fontSize:"1.3rem"}}>City: </span>
                        </Col>
                        <Col xs={12} lg={8}>
                            <Row style={{flexWrap:"nowrap"}}>
                                <div
                                className="button" 
                                onClick={()=>this.props.handleSelectDeselectAll("city", false)}>Deselect All</div>
                                <div
                                className="button"  
                                onClick={()=>this.props.handleSelectDeselectAll("city", true)}>Select All</div>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                {Object.keys(this.props.state.city).length !== 0 &&
                Object.keys(this.props.state.city).map((city, index)=>{
                    let name = city? city: "";
                    return (
                        <div className="filter-checkbox-container" key={index}>
                        <label className="filter-checkbox path">
                            <input type="checkbox"
                                id={`city-checkbox-`+index}   
                                value={name} 
                                checked = {this.props.state.city[city]}
                                onChange={(e)=> this.props.handleChange(e,"city")}
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
                        <Col xs={12} lg={4}>
                        <span style={{fontSize:"1.3rem"}}>Lodging Type:</span>
                        </Col>
                        <Col xs={12} lg={8}>
                            <Row style={{flexWrap:"nowrap"}}>
                                <div
                            className="button"  
                                onClick={()=>this.props.handleSelectDeselectAll("type", false)}>Deselect All</div>
                                <div
                            className="button"
                                onClick={()=>this.props.handleSelectDeselectAll("type", true)}>Select All</div>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                {Object.keys(this.props.state.type).length !== 0 && 
                Object.keys(this.props.state.type).map((type, index)=>{
                    return (
                        <div className="filter-checkbox-container" key={index}>
                        <label className="filter-checkbox path">
                            <input type="checkbox" 
                    id={`type-checkbox-`+index}
                    label={type} 
                    value={type} 
                    checked= {this.props.state.type[type]}
                    onChange={(e)=> this.props.handleChange(e,"type")}
                    />
                                {type}
                                <svg viewBox="0 0 21 21">
            <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
        </svg>
                        </label>
                        </div>
                )}
                )}
                </Row>
                <RangeSlider name="Bedrooms" type="bedrooms" step={1} min={1} max={10} handleSliderChange={this.props.handleSliderChange}/>  
                <RangeSlider name="Bathrooms" type="bathrooms" step={1} min={1} max={10} handleSliderChange={this.props.handleSliderChange}/>  
                <Row>
                    <Form.Group>
                        <Form.Control as="select" onChange={(e)=>this.props.handleSort(e.target.value)}>
                            <option value="">Sort By</option>
                            <option value="price-min">Daily Rate $ &#8594; $$$</option>
                            <option value="price-max">Daily Rate $$$ &#8594; $</option>
                            <option value="bedrooms-min">Bedrooms Increasing</option>
                            <option value="bedrooms-max">Bedrooms Decreasing</option>
                            <option value="a-z">A &#8594; Z</option>
                            <option value="z-a">Z &#8594; A</option>
                        </Form.Control>
                    </Form.Group>
                </Row>
                </Container>
            </Form> 
        </Container>  
    )
    }
    
}

export default PropertiesFilter