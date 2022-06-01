import React from 'react'
import Container from 'react-bootstrap/Container'
import { Helmet } from 'react-helmet'

const Newsletter = (props) => (
        <Container style={{margin:"50px auto"}}>
            <Helmet>
            <script>{`(function(m,a,i,l,e,r){ m['MailerLiteObject']=e;function f(){
var c={ a:arguments,q:[]};var r=this.push(c);return "number"!=typeof r?r:f.bind(c.q);}
f.q=f.q||[];m[e]=m[e]||f.bind(f.q);m[e].q=m[e].q||f.q;r=a.createElement(i);
var _=a.getElementsByTagName(i)[0];r.async=1;r.src=l+'?v'+(~~(new Date().getTime()/1000000));
_.parentNode.insertBefore(r,_);})(window, document, 'script', 'https://static.mailerlite.com/js/universal.js', 'ml');

var ml_account = ml('accounts', '2710252', 's7t2o9x9p0', 'load');`}
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
            <div className="ml-form-embed" style={{minHeight:"270px"}}
                data-account="2710252:s7t2o9x9p0"
                data-form={props.lang === "pt" ? "4594648:g2t5i3" : "3228322:d1b6m6"}
                id="subscribe-form">
            </div>
        </Container>

)

export default Newsletter