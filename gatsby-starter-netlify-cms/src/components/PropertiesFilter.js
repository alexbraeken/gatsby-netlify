import React, { Component } from 'react'
import RangeSlider from '../components/RangeSlider';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'




class PropertiesFilter extends Component {

    constructor(props){
        super(props);
        this.state={
            defaultChecked:true,
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
                        <Col xs={12} lg={4} style={{display:"flex"}}>
                            <div className="label">
                                <span>Location: </span>
                            </div>
                        </Col>
                        <Col xs={12} lg={8}>
                            <Row style={{justifyContent:"flex-end"}}>
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
                        <Col xs={12} lg={4} style={{display:"flex"}}>
                            <div className="label">
                                <span>Property Type:</span>
                            </div>
                        </Col>
                        <Col xs={12} lg={8}>
                            <Row style={{justifyContent:"flex-end"}}>
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
                                {type[0].toUpperCase() + type.slice(1).toLowerCase()}
                                <svg viewBox="0 0 21 21">
            <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
        </svg>
                        </label>
                        </div>
                )}
                )}
                </Row>
                <RangeSlider name="Bedrooms" type="bedrooms" step={1} min={0} max={10} low={this.props.state.bedrooms[0]} high={this.props.state.bedrooms[1]} handleSliderChange={this.props.handleSliderChange}/>  
                <RangeSlider name="Bathrooms" type="bathrooms" step={1} min={0} max={10} low={1} high={10} handleSliderChange={this.props.handleSliderChange}/>  
                </Container>
            </Form> 
        </Container>  
    )
    }
    
}

export default PropertiesFilter