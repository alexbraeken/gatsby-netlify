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


class Properties extends Component {

    render(){
        return(
            <div>
                <FirestoreCollection path="/Properties/">
                    {data => {
                        return data.isLoading ? "Loading" : 
                        <div>
                            <Container className="justify-content-md-center">
                                <Form>
                                    {this.props.filterList(data.value, "city").map((city, index)=>(
                                        <Form.Check type="checkbox" 
                                        id="city-checkbox" 
                                        label={city} 
                                        value={city} 
                                        defaultChecked= "true"
                                        onChange={(e)=> this.props.handleChange(e,"city")}
                                        key={index}
                                        />
                                    ))}
                                    
                                    
                                </Form> 
                            </Container>  
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
            dateFinish:""
        }
        this.handleChange = this.handleChange.bind(this);
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
        console.log(this.state)
    }


    render() {
        return (
            <Layout>  
                    <Router>
                        <Properties path ="/properties" state={this.state} handleChange={this.handleChange} filterList={this.filterList}/>
                        <PropertyTemplate path="/properties/:id" />
                    </Router>
            </Layout> 
          );
    }
}