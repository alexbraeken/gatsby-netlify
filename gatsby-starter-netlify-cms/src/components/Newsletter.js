import React from 'react'
import Container from 'react-bootstrap/Container'
import { Helmet } from 'react-helmet'

const Newsletter = () => (
        <Container style={{margin:"50px auto"}}>
            <Helmet>
            <style>
                {`
                #subscribe-form #mlb2-3228322.ml-form-embedContainer .ml-form-embedWrapper.embedForm{
                max-width:80%
                }
                @media only screen and (max-width: 900px){
                #subscribe-form #mlb2-3228322.ml-form-embedContainer .ml-form-embedWrapper.embedForm{
                    max-width:400px
                }
                }`}
            </style>
            </Helmet>
            <div className="ml-form-embed"
                data-account="2710252:s7t2o9x9p0"
                data-form="3228322:d1b6m6"
                id="subscribe-form">
            </div>
        </Container>

)

export default Newsletter