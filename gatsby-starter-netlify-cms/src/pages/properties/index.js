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

class Properties extends Component {

    render(){
        return(
            <div className="container">
                <FirestoreCollection path="/Properties/">
                    {data => {
                        return data.isLoading ? <Loading /> : 
                        <div>
                            <PropertiesFilter 
                            data= {data} 
                            filterList={this.props.filterList} 
                            handleChange={this.props.handleChange} 
                            state={this.props.state}
                            handleSliderChange={this.props.handleSliderChange}/>
                            <PropFeatures gridItems={data} state={this.props.state}/>
                        </div>
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
            bathrooms: [1, 10]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
    }

    componentDidMount(){
       const filterValues = queryString.parse(this.props.location.search);
       const amenities = Object.keys(filterValues);
       console.log(amenities);
       this.setState({
           amenities: amenities
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