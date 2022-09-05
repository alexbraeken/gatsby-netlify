import React, {useState, useEffect} from 'react'
import {useTranslation} from 'gatsby-plugin-react-i18next';
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
    const [fetching, setFetching] = useState(false)
    const [paymentInfo, setPaymentInfo] = useState(null)
    const [propInfo, setPropInfo] = useState(null)
    const [initial, setInitial] = useState(true)

    const {t} = useTranslation();

    useEffect(() => {
        const path = props.location
        const leadDetails = path.search ? queryString.parse(path.search) : null;
        if(leadDetails.uid && leadDetails.propId && leadDetails.orderId){
            setLeadInfo({
                leadId: leadDetails.uid,
                propId: leadDetails.propId,
                orderId: leadDetails.orderId,
            })
        }else{
            setFetching(false)
        }

        return () => {
            setLeadInfo(null)
            setBalance(null)
            setFetching(false)
            setPaymentInfo(null)
        }
    }, [props.location])

    useEffect(() => {
       
    }, [leadInfo])



    const getMultibanco = () => {
        if(leadInfo && leadInfo.leadId && leadInfo.propId && leadInfo.orderId){
            setFetching(true)
            const uri = `https://us-central1-gatsby-test-286520.cloudfunctions.net/widgets/balancecheck`
            const reqBody = JSON.stringify({
                "type": "balance_check",
                "leadId": leadInfo.leadId,
                "propId": leadInfo.propId,
                "orderId": leadInfo.orderId,
              })


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
                        return null
                    }
                    return  response.text()
                })
                .then(data => {
                    if(data){
                        setFetching(false)
                        setInitial(false)
                        let details = JSON.parse(data)
                        console.log(details)
                        if(details.balance >= 0){
                            setBalance(details.balance)
                            if(details.balance !== 0){
                                console.log(details.expire)
                                setPaymentInfo({redirectUrl: details.redirectUrl, reference: details.reference, entity: details.entity, expire: details.expire, amount: details.amount, status: details.status})
                                setPropInfo({img: details.propImg, link: details.propLink, name: details.propName}) 

                            }
                        }else if(details.balance < 0 || details.status === "cancelled"){
                            setBalance(-1)
                        }
                    } 
                })
        }
    }

    return (
        <Layout  propTitle="Balance & Payments" propDescription="Smartavillas.com specialise in helping Property Owners to provide their guests with good quality accommodation - at affordable prices - in the Eastern Algarve, with Tavira being the focal point. With dozens of properties, from Villas to seaside Apartments, Smartavillas offers the best the Algarve has to offer.">
            <div>
                <Container>
                <small>{t("To pay by Multibanco, click the button below. If the property has not been booked yet, it will be put on hold for 24 hours which can be extended upon request.")}</small>
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
                                    {initial &&
                                        <div role="button" className="submit-search-btn" onClick={()=> getMultibanco()} onKeyDown={()=> getMultibanco()} tabindex="0">
                                        <a id="enquiry-button">
                                            <svg className="icon-arrow before">
                                                <use xlinkHref="#arrow" />
                                            </svg>
                                            <span className="label">{t("Pay By Multibanco")}</span>
                                            <svg className="icon-arrow after">
                                                <use xlinkHref="#arrow"/>
                                            </svg>
                                        </a>
                                        <svg style={{display: "none"}}>
                                        <defs>
                                            <symbol id="arrow" viewBox="0 0 35 15">
                                                <title>Arrow</title>
                                                <path d="M27.172 5L25 2.828 27.828 0 34.9 7.071l-7.07 7.071L25 11.314 27.314 9H0V5h27.172z "/>
                                            </symbol>
                                        </defs>
                                        </svg>
                                    </div>
                                    }
                                    {balance && 
                                        <>
                                        {balance >= 0 ?
                                        <div style={{flex: "1 1 100%"}} className="balance-text">
                                            <ul>
                                                <li className="outer-list-item">
                                                    <b>{t("Balance remaining")}: <span className="right-align">{balance}€</span></b>
                                                </li>
                                                {paymentInfo &&
                                                    <li className="outer-list-item">
                                                        {!paymentInfo.status.includes("BOOKED") &&
                                                            <p> 
                                                                <b>{t("Deposit Amount (30%)")}: <span className="right-align">{`${paymentInfo.amount.slice(0,-2)}.${paymentInfo.amount.slice(-2)}€`}</span></b>
                                                            </p>
                                                        }
                                                        <b>{t("Multibanco Information")}</b>
                                                        <ul className="inner-list">
                                                            <li>{t("Reference")}: <span className="right-align">{paymentInfo.reference}</span></li>
                                                            <li>{t("entity")}: <span className="right-align">{paymentInfo.entity}</span></li>
                                                            <li><a href={paymentInfo.redirectUrl} target="_blank" className="orangeText">{t("Payment Link")} <FontAwesomeIcon icon={faExternalLinkAlt} style={{margin:"auto 5px", height: "0.8rem"}} /></a></li>
                                                        </ul>
                                                <b>{t("Valid until")}: <span className="right-align">{paymentInfo.expire}</span></b>
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