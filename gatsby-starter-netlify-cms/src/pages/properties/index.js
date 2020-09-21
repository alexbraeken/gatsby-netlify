import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import * as firebase from 'firebase';
import 'firebase/firestore';
import { FirestoreCollection } from "@react-firebase/firestore";
import { config } from "../../firebase-config";
import { Router } from "@reach/router"
import PropertyTemplate from "../../templates/property-page"

import Layout from '../../components/Layout'
import PropFeatures from '../../components/PropFeatures'


const Properties = () => (
    <FirestoreCollection path="/Properties/">
        {data => {
            return data.isLoading ? "Loading" : 
                    <PropFeatures gridItems={data}/>
        }}
    </FirestoreCollection>
)

const PropertiesPage = () => {

    return (
        <Layout>   
                <Router>
                    <Properties path ="/properties" />
                    <PropertyTemplate path="/properties/:id" />
                </Router>
        </Layout> 
      );
}

export default PropertiesPage;