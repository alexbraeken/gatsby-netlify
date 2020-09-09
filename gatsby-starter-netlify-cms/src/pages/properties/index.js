import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import * as firebase from 'firebase';
import 'firebase/firestore';
import { FirestoreProvider, FirestoreCollection } from "@react-firebase/firestore";
import { config } from "../../firebase-config";

import Layout from '../../components/Layout'
import PropFeatures from '../../components/PropFeatures'

const PropertiesPage = () => {
    return (
        <Layout>
                <FirestoreCollection path="/Properties/">
                    {d => {
                        return d.isLoading ? "Loading" : 
                                <PropFeatures gridItems={d.value} />
                    }}
                </FirestoreCollection>
        </Layout> 
      );
}

export default PropertiesPage;