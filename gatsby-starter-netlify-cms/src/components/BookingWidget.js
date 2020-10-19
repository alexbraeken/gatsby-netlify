import React from 'react'
import { Helmet } from 'react-helmet'
const BookingWidget = (props) => {
    const calendarCheckIn = (props.dateRange) ? formatDate(props.dateRange.from) : null;
    const calendarCheckOut = (props.dateRange.to) ? formatDate(props.dateRange.to) : null;

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        return [year, month, day].join('-');
    }

    return(
        <>
        <Helmet>
        <script type="text/javascript" src="https://platform.hostfully.com/assets/js/pikaday.js"/>

<script type="text/javascript" src="https://platform.hostfully.com/assets/js/leadCaptureWidget_2.0.js"/>
<script>
{`var widget = new Widget('leadWidget', '${props.id}', {"type":"agency","fields":[],"showAvailability":true,"lang":"US","minStay":true,"price":true,"cc":false,"emailClient":true,"saveCookie":true,"showDynamicMinStay":true,"backgroundColor":"#FFFFFF","buttonSubmit":{"backgroundColor":"#ff6600"},"showPriceDetailsLink":false,"showGetQuoteLink":false,"labelColor":"#ff6600","showTotalWithoutSD":true,"redirectURL":false,"showDiscount":true,"includeReferrerToRequest":true,"customDomainName":null,"source":null,"aid":null,"clickID":null,"valuesByDefaults":{"checkIn":{"value":"${calendarCheckIn}"},"checkOut":{"value":"${calendarCheckOut}"},"guests":{"value":""}},"pathRoot":"https://platform.hostfully.com/"});`}
</script>
        </Helmet>
        
<div id="leadWidget"></div>


        </>
    )
}

export default BookingWidget