import React, { Component } from 'react'
import 'firebase/firestore';
import { FirestoreCollection } from "@react-firebase/firestore";
import { Router } from "@reach/router"
import PropertyTemplate from "../../templates/property-page"
import Layout from '../../components/Layout'
import PropFeatures from '../../components/PropFeatures'
import Form from 'react-bootstrap/Form'


const Properties = () => (
    <div>
        <FirestoreCollection path="/Properties/">
            {data => {
                return data.isLoading ? "Loading" : 
                        <PropFeatures gridItems={data}/>
            }}
        </FirestoreCollection>
    </div>
    
)

export default class PropertiesPage extends Component {
    state={
        city:{},
        propType:{},
        dateStart:"",
        dateFinish:""
    }

    render() {
        return (
            <Layout>  
                <Form>
                    <Form.Check type="checkbox" id="city-checkbox" label="#1"/>
                </Form> 
                    <Router>
                        <Properties path ="/properties" />
                        <PropertyTemplate path="/properties/:id" />
                    </Router>
            </Layout> 
          );
    }
}