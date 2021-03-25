import React, {useState, useEffect} from 'react'
import { Helmet } from 'react-helmet'


const BookingWidget = (props) => {

    const [calendarCheckIn, setCalendarCheckIn] = useState(null)
    const [calendarCheckOut, setCalendarCheckOut] = useState(null)

    useEffect(() => {
        setCalendarCheckIn((props.dateRange.from) ? formatDate(props.dateRange.from) : '')
        setCalendarCheckOut((props.dateRange.to) ? formatDate(props.dateRange.to) : '')

        return () => {
            setCalendarCheckIn(null)
            setCalendarCheckOut(null)
        }
    }, [props])

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
{`var widget = new Widget('leadWidget', '${props.id}', {"type":"agency","fields":["phone","notes"],"showAvailability":true,"lang":"US","minStay":true,"price":true,"cc":false,"emailClient":true,"saveCookie":true,"showDynamicMinStay":true,"backgroundColor":"#FFFFFF","buttonSubmit":{"backgroundColor":"#f5821e"},"showPriceDetailsLink":true,"showGetQuoteLink":true,"labelColor":"#f5821e","showTotalWithoutSD":true,"redirectURL":false,"showDiscount":true,"includeReferrerToRequest":true,"customDomainName":null,"source":null,"aid":"ORB-49587220416635719","clickID":null,"valuesByDefaults":{"checkIn":{"value":"${calendarCheckIn}"},"checkOut":{"value":"${calendarCheckOut}"},"guests":{"value":""},"discountCode":{"value":""}},"pathRoot":"https://platform.hostfully.com/"});`}

</script>
<style>
    {`
    .orbirental-capture-widget-quote-link{
        text-align: center;
        border: 1px solid rgb(245, 130, 30);
        border-radius: 5px;
        padding: 5px;
        transition: all 0.3s
    }
    .orbirental-capture-widget-quote-link:hover{
      color: #fff;
      background-color: rgb(245, 130, 30);
    }
    `}
</style>
        </Helmet>
        
<div id="leadWidget"></div>


        </>
    )
}

export default BookingWidget