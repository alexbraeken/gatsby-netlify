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
                <h3 className="filter-header">City: </h3>
                {this.props.state.city.length > 0 &&
                this.props.state.city.map((city, index)=>{
                    let name = city? Object.keys(city)[0]: "";
                    return (
                    <Form.Check 
                    custom
                    type="checkbox" 
                    className="filter-checkbox"
                    id={`city-checkbox-`+index} 
                    label={name}  
                    value={name} 
                    checked = {Object.values(city)[0]}
                    onChange={(e)=> this.props.handleChange(e,"city")}
                    key={index}
                    />
                )}
                )}
                </Row>
                <Row>
                <h3 className="filter-header">Lodging Type: </h3>
                {this.props.state.type.length > 0 && 
                this.props.state.type.map((type, index)=>{
                    return (
                    <Form.Check 
                    custom                    
                    type="checkbox" 
                    className="filter-checkbox"
                    id={`type-checkbox-`+index}
                    label={Object.keys(type)[0]} 
                    value={Object.keys(type)[0]} 
                    checked= {true}
                    onChange={(e)=> this.props.handleChange(e,"type")}
                    key={index}
                    />
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