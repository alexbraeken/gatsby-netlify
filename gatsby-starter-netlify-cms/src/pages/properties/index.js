import React, { Component } from 'react'
import 'firebase/firestore';
import { FirestoreCollection } from "@react-firebase/firestore";
import { Router } from "@reach/router"
import PropertyTemplate from "../../templates/property-page"
import Layout from '../../components/Layout'
import PropFeatures from '../../components/PropFeatures'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import queryString from 'query-string'
import Loading from '../../components/Loading'
import PropertiesFilter from '../../components/PropertiesFilter'
import StickyBox from "react-sticky-box";
import { Col } from 'react-bootstrap';
import GoogleMapComponent from '../../components/GoogleMapComponent';
import ReactBnbGallery from 'react-bnb-gallery';

class Properties extends Component {
    
    constructor(props){
        super(props);
        this.state={
            show:false,
            photos:[],
            sort:""
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleGalleryClick = this.handleGalleryClick.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }

    handleGalleryClick(photos){
        this.setState({
            show:true,
            photos:photos
        })
    }

    handleClose(){
        this.setState({show:false})
    };
    handleShow(){
        this.setState({show:true})
    };

    handleSort(sort){
        this.setState({sort:sort})
    }

    render(){
        return(
            <div>
                <FirestoreCollection path="/Properties/">
                    {data => {
                        return data.isLoading ? <Loading /> :
                        <Container style={{width:"100vw", maxWidth:"none"}}> 
                            <Row>
                                <Col xs={12} md={3} id="filter-sidebar">
                                <StickyBox>
                                <PropertiesFilter 
                                data= {data} 
                                filterList={this.props.filterList} 
                                handleChange={this.props.handleChange} 
                                state={this.props.state}
                                handleSliderChange={this.props.handleSliderChange}
                                handleSort={this.handleSort}/>
                                <GoogleMapComponent isMarkerShown="true" lat={37.150231} lng={-7.6457664} list={data.value} state={this.props.state}/>
                                </StickyBox>
                                </Col>
                                <Col xs={12} md={9}>
                                <PropFeatures gridItems={data} state={this.props.state} handleGalleryClick={this.handleGalleryClick} sort={this.state.sort}/>
                                </Col>
                            </Row>
                            <ReactBnbGallery
                                show={this.state.show}
                                photos={this.state.photos.map((photo,index)=>{ console.log(photo.url); return(photo.url)})}
                                onClose={this.handleClose}
                                /> 
                        </Container>
                    }}
                </FirestoreCollection>
            </div>
        )
    }
}



export default class PropertiesPage extends Component {
    constructor(props){
        super(props);
        this.state={
            city:[],
            propType:[],
            dateStart:"",
            dateFinish:"",
            amenities:[],
            bedrooms: [1, 10],
            bathrooms: [1, 10],
            filteredSearch: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
    }

    componentDidMount(){
       const filterValues = queryString.parse(this.props.location.search);
       const keys = Object.keys(filterValues)
       keys.forEach(key =>{
           console.log(key)
           console.log(filterValues[key])
        let searchArray = filterValues[key];
        searchArray = (Array.isArray(searchArray)?searchArray:[searchArray]);
           this.setState({
               [key]:searchArray,
               filteredSearch: true
           })
           
       })
    } 

    filterList = (props, type) => {
        let filter = []
        props.map(prop => {
            filter.push(prop[`${type}`])
        })

        return [... new Set(filter)]

    }


    handleChange (e, type){
        let array = this.state[`${type}`];
        if(array.indexOf(e.target.value) === -1 ){
            array.push(e.target.value)
            this.setState({
                [`${type}`]: array
            })
        }
        else{
            array.splice(array.indexOf(e.target.value), 1)
            this.setState({
                [`${type}`]: array
            })
        }
    }

    handleSliderChange(array, type){
        console.log(array)
        this.setState({
            [`${type}`]: array
        })
        console.log(this.state)
    }


    render() {

        return (
            <Layout>
                <Router>
                        <Properties path ="/properties" 
                        state={this.state} 
                        handleChange={this.handleChange} 
                        filterList={this.filterList} 
                        filterSearch={this.state.amenities}
                        handleSliderChange={this.handleSliderChange}/>
                        <PropertyTemplate path="/properties/:id" />
                </Router>       
            </Layout> 
          );
    }
}