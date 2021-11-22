import React, {useState, useEffect} from 'react'
import {useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import queryString from 'query-string';
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons';

export default function Balance(props) {
    const [leadInfo, setLeadInfo] = useState(null)
    const [balance, setBalance] = useState(null)
    const [fetching, setFetching] = useState(true)
    const [paymentInfo, setPaymentInfo] = useState(null)
    const [propInfo, setPropInfo] = useState(null)

    const {t} = useTranslation();

    useEffect(() => {
        const path = props.location
        const leadDetails = path.search ? queryString.parse(path.search) : null;
        console.log(path)
        if(leadDetails){
            console.log(leadDetails)
            setLeadInfo({
                leadId: leadDetails.uid,
                propId: leadDetails.propId,
                orderId: leadDetails.orderId,
            })
        }

        return () => {
            setLeadInfo(null)
            setBalance(null)
            setFetching(true)
            setPaymentInfo(null)
        }
    }, [props.location])

    useEffect(() => {
        if(leadInfo && leadInfo.leadId && leadInfo.propId && leadInfo.orderId){
         
            const uri = `https://us-central1-gatsby-test-286520.cloudfunctions.net/widgets/balancecheck`
            const reqBody = JSON.stringify({
                "type": "balance_check",
                "leadId": leadInfo.leadId,
                "propId": leadInfo.propId,
                "orderId": leadInfo.orderId,
              })

            console.log(reqBody)

            fetch(uri, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: reqBody
            })
                .then(response => {
                    if(!response.ok){
                        setFetching(false)
                        console.log("error")
                        return null
                    }
                    return  response.text()
                })
                .then(data => {
                    if(data){

                        let details = JSON.parse(data)
                        if(details.balance >= 0){
                            setBalance(details.balance)
                            if(details.balance !== 0){
                                setPaymentInfo({redirectUrl: details.redirectUrl, reference: details.reference, entity: details.entity, expire: details.expire})
                                setPropInfo({img: details.propImg, link: details.propLink, name: details.propName}) 
                            }
                        }else if(details.balance < 0 || details.status === "cancelled"){
                            setBalance(false)
                        }
                    } 
                })
        }else{
            setFetching(false)
        }
    }, [leadInfo])

    useEffect(() => {
        setFetching(false)
    }, [paymentInfo, propInfo, balance])

    return (
        <Layout  propTitle="Balance & Payments" propDescription="Smartavillas.com specialise in helping Property Owners to provide their guests with good quality accommodation - at affordable prices - in the Eastern Algarve, with Tavira being the focal point. With dozens of properties, from Villas to seaside Apartments, Smartavillas offers the best the Algarve has to offer.">
            <div>
                <Container>
                    <Row style={{display:"flex"}}>
                        <div className="Balance-card" >
                            <div className="balance-card-img" style={{backgroundImage:`${propInfo && propInfo.img ? `url(${propInfo.img})` : 'url(https://res.cloudinary.com/smartavillas-com/image/upload/v1615366925/Ambience_Mood/Hero_Family_efmsd3.jpg)'}`}}>
                            </div>
                            <div className="balance-card-content">
                                {fetching ? 
                                <div style={{textAlign:"center"}}>
                                    <p>
                                        {t("Retrieving Balance Information")}
                                    </p>
                                    <p>
                                        {t("Please wait while we retreive your balance information...")}
                                    </p>
                                    <Loading />
                                </div>
                                :
                                <>
                                    {balance && balance >= 0 ? 
                                        <div style={{flex: "1 1 100%"}} className="balance-text">
                                            <ul >
                                                <li className="outer-list-item">
                                                    <b>{t("Balance remaining")}: {balance}€</b>
                                                </li>
                                                {paymentInfo &&
                                                    <li className="outer-list-item">
                                                        <b>{t("Multibanco Information")}</b>
                                                        <ul className="inner-list">
                                                            <li>{t("Reference")}: {paymentInfo.reference}</li>
                                                            <li>{t("entity")}: {paymentInfo.entity}</li>
                                                            <li><a href={paymentInfo.redirectUrl} target="_blank" className="orangeText">{t("Payment Link")} <FontAwesomeIcon icon={faExternalLinkAlt} style={{margin:"auto 5px", height: "0.8rem"}} /></a></li>
                                                        </ul>
                                                <b>{t("Valid until: ")}{paymentInfo.expire}</b>
                                                    </li> 
                                                }
                                                {propInfo &&
                                                    <li className="outer-list-item">
                                                        <a href={propInfo.link} target="_blank" style={{display: "flex"}} className="orangeText"><b>{propInfo.name}</b><FontAwesomeIcon icon={faExternalLinkAlt} style={{margin:"auto 5px", height: "0.8rem"}} /></a>
                                                    </li>
                                                }
                                            </ul>
                                        </div>
                                    :
                                    <p>
                                        {t("No Balance Information Found")}
                                    </p>
                                    }
                                </>
                                }
                            </div>
                        </div>
                    </Row>
                </Container>
            </div>
        </Layout>
    )
}


export const pageQuery = graphql`
query BalancePage ($language: String!) {
    locales : allLocale(filter: {ns: {in: ["translation"]},language: {eq: $language}}) {
        edges {
          node {
            ns
            data
            language
          }
        }
    }
}`