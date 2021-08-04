import React, {useState, useEffect} from 'react'
import queryString from 'query-string';
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

export default function Balance() {
    const [leadInfo, setLeadInfo] = useState(null)
    const [balance, setBalance] = useState(null)
    const [fetching, setFetching] = useState(true)
    const [paymentInfo, setPaymentInfo] = useState(null)

    useEffect(() => {
        const path = window.location
        const leadDetails = path.search ? queryString.parse(path.search) : null;
        console.log(leadDetails.uid, leadDetails.propId, leadDetails.orderId, leadDetails.fullName, decodeURI(leadDetails.email))
        if(leadDetails){
            console.log(leadDetails)
            setLeadInfo({
                leadId: leadDetails.uid,
                propId: leadDetails.propId,
                orderId: leadDetails.orderId,
                name: leadDetails.fullName,
                email: decodeURI(leadDetails.email)
            })
        }

        return () => {
            setLeadInfo(null)
            setBalance(null)
            setFetching(true)
            setPaymentInfo(null)
        }
    }, [])

    useEffect(() => {
        if(leadInfo && leadInfo.leadId && leadInfo.propId && leadInfo.orderId && leadInfo.name && leadInfo.email){
         
            const uri = `https://us-central1-gatsby-test-286520.cloudfunctions.net/widgets`
            const reqBody = JSON.stringify({
                "type": "balance_check",
                "leadId": leadInfo.leadId,
                "propId": leadInfo.propId,
                "orderId": leadInfo.orderId,
                "name": leadInfo.name,
                "email": leadInfo.email
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
                        let details = JSON.parse(data)
                        if(details.balance >= 0){
                            setBalance(details.balance)
                            if(details.balance !== 0){
                                setPaymentInfo({redirectUrl: details.redirectUrl, reference: details.reference, entity: details.entity})
                            }
                        }
                        if(details.balance < 0){
                            setBalance(false)
                        }
                        setFetching(false)
                    } 
                })
            
        }else{
            setFetching(false)
        }
    }, [leadInfo])

    return (
        <Layout  propTitle="Balance & Payments" propDescription="Smartavillas.com specialise in helping Property Owners to provide their guests with good quality accommodation - at affordable prices - in the Eastern Algarve, with Tavira being the focal point. With dozens of properties, from Villas to seaside Apartments, Smartavillas offers the best the Algarve has to offer.">
            <div>
                <Container>
                    <Row style={{display:"flex"}}>
                        <div className="Balance-card" style={{display: "flex", flexWrap:"wrap", margin: "50px auto",borderRadius:"5px", boxShadow:  "20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff", minHeight:"400px"}}>
                            <div style={{height:"20%", flex:"1 1 100%", width:"100%", backgroundSize:"cover", backgroundPosition:"center", backgroundImage:"url(https://orbirental-images.s3.amazonaws.com/48d3598a-066b-4ecb-8aaa-6d46cbf1231f)"}}>
                            </div>
                            <div style={{margin: "auto"}}>
                                {fetching ? 
                                <div style={{textAlign:"center"}}>
                                    <h3>
                                        Retreiving Balance Information
                                    </h3>
                                    <p>
                                        Please wait while we retreive your balance information...
                                    </p>
                                    <Loading />
                                </div>
                                :
                                <div>
                                    {balance && balance >= 0 ? 
                                    <div>
                                        
                                            <h3>
                                                Balance remaining: {balance}
                                            </h3>
                                            {paymentInfo && 
                                            <ul>
                                                <li>Multibanco Information</li>
                                                <li>Reference: {paymentInfo.reference}</li>
                                                <li>entity: {paymentInfo.entity}</li>
                                                <li><a href={paymentInfo.redirectUrl}>Payment Link</a></li>
                                            </ul>
                                            }
                                    </div>
                                    :
                                    <h3>
                                        No Balance Information Found
                                    </h3>
                                    }
                                </div>
                                }
                            </div>
                        </div>
                    </Row>
                </Container>
            </div>
        </Layout>
    )
}
