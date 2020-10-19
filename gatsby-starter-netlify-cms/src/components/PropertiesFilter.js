import React, { Component, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import RangeSlider from '../components/RangeSlider';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'

class PropertiesFilter extends Component {

    constructor(props){
        super(props);
        this.state={
            defaultChecked:true
        }
    }


    componentDidMount(){
        if(this.props.state.city.length > 0)
        {
            this.setState({defaultChecked:false})
        }
    }

    render(){
        
        return(
            <Container className="justify-content-md-center">
            <Form>
                <h2>City: </h2>
                {
                this.props.filterList(this.props.data.value, "city").map((city, index)=>{
                    return (
                    <Form.Check type="checkbox" 
                    id="city-checkbox" 
                    label={city} 
                    value={city} 
                    checked={(this.props.state.city.includes(city)?true:this.state.defaultChecked)}
                    onChange={(e)=> this.props.handleChange(e,"city")}
                    key={index}
                    />
                )}
                )}
                <h2>Lodging Type: </h2>
                {this.props.filterList(this.props.data.value, "type").map((propType, index)=>(
                    <Form.Check type="checkbox" 
                    id="type-checkbox" 
                    label={propType} 
                    value={propType} 
                    defaultChecked= "true"
                    onChange={(e)=> this.props.handleChange(e,"propType")}
                    key={index}
                    />
                ))} 
                <RangeSlider name="Bedrooms" type="bedrooms" step={1} min={1} max={10} handleSliderChange={this.props.handleSliderChange}/>  
                <RangeSlider name="Bathrooms" type="bathrooms" step={1} min={1} max={10} handleSliderChange={this.props.handleSliderChange}/>  
                {JSON.stringify(this.props.state)}
            </Form> 
        </Container>  
    )
    }
    
}

export default PropertiesFilter