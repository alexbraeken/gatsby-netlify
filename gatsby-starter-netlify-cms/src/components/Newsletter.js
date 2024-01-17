import React from 'react'
import Container from 'react-bootstrap/Container'
import { Helmet } from 'react-helmet'

const Newsletter = (props) => (
        <Container style={{margin:"50px auto"}}>
            <Helmet>
            <script>{`
    (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
    .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
    n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
    (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
    ml('account', '335588');`}
</script>
            <style>
                {`
                ${props.transparent ? 
                    `
                    #subscribe-form .ml-form-embedContainer .ml-form-align-center .ml-form-embedWrapper{
                        background-color: transparent;
                    }
                    #subscribe-form .ml-form-embedContainer .ml-form-align-center .ml-form-embedWrapper.embedForm .horizontal.privacy-policy p{
                        color: #fff
                    }
                    #subscribe-form .ml-form-embedContainer .ml-form-align-center .ml-form-embedWrapper.embedForm strong span{
                        color: #fff
                    }
                    ` 
                : ''}
                #subscribe-form .ml-form-embedContainer .ml-form-align-center .ml-form-embedWrapper.embedForm{
                max-width:80%
                }
                @media only screen and (max-width: 900px){
                #subscribe-form .ml-form-embedContainer .ml-form-align-center .ml-form-embedWrapper.embedForm{
                    max-width:400px
                }
                }`}
                
            </style>
            </Helmet>
            <div className="ml-embedded" style={{minHeight:"270px"}}
                data-form={props.lang === "pt" ? "Sv1Js3" : "mRUri0"}
                id="subscribe-form">
            </div>
        </Container>

)

export default Newsletter