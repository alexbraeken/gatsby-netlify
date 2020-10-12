import React from 'react'
import { Helmet } from 'react-helmet'
const BookingWidget = (props) => {
    return(
        <>
        <Helmet>
        <script type="text/javascript" src="https://platform.hostfully.com/assets/js/pikaday.js"/>

<script type="text/javascript" src="https://platform.hostfully.com/assets/js/leadCaptureWidget_2.0.js"/>
<script>
{`var widget = new Widget('leadWidget', '${props.id}', {"type":"agency","fields":[],"showAvailability":true,"lang":"US","minStay":true,"price":true,"cc":false,"emailClient":true,"saveCookie":true,"showDynamicMinStay":true,"backgroundColor":"#FFFFFF","buttonSubmit":{"backgroundColor":"#F8981B"},"showPriceDetailsLink":false,"showGetQuoteLink":false,"labelColor":"#F8981B","showTotalWithoutSD":true,"redirectURL":false,"showDiscount":true,"includeReferrerToRequest":true,"customDomainName":null,"source":null,"aid":null,"clickID":null,"valuesByDefaults":{"checkIn":{"value":""},"checkOut":{"value":""},"guests":{"value":""}},"pathRoot":"https://platform.hostfully.com/"});`}
</script>
        </Helmet>
        
<div id="leadWidget"></div>


        </>
    )
}

export default BookingWidget