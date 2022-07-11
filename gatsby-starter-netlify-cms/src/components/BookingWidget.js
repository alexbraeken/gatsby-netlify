import React, {useState, useEffect} from 'react'
import { Helmet } from 'react-helmet'
import {useTranslation, useI18next} from 'gatsby-plugin-react-i18next';



//Hostfully booking widget
const BookingWidget = (props) => {

    const [calendarCheckIn, setCalendarCheckIn] = useState(null)
    const [calendarCheckOut, setCalendarCheckOut] = useState(null)
    const [widgetLoading, setWidgetLoading] = useState(1)

    const {t} = useTranslation(['property', 'translation']);
    const { language } = useI18next()

const lang = language === 'en' || language === 'fr' || language === 'es' ? `"${language.toUpperCase()}"` : `{
    "placeholder" : {
        "checkIn" : "${t("checkIn")}",
        "checkOut" : "${t("Checkout")}",
        "guests" : "${t("guests")}",
        "email" : "${t("email")}",
        "name" : "${t("name")}",
        "phone" : "${t("phone")}",
        "notes" : "${t("Booking-notes")}"
    },
    "label" : {
        "stay" : "${t("Booking-stay")}",
        "guests" : "${t("guests")}",
        "nights" : "${t("nights")}",
        "thanks" : "${t("thanks")}"
    },
    "i18n": {
        "previousMonth" : "${t("previousMonth")}",
        "nextMonth"     : "${t("nextMonth")}",
        "months"        : ["${t("january")}", "${t("february")}", "${t("march")}", "${t("april")}", "${t("may")}", "${t("june")}", "${t("july")}", "${t("august")}", "${t("september")}", "${t("october")}", "${t("november")}", "${t("december")}"],
        "weekdays"      : ["${t("Sunday")}", "${t("Monday")}", "${t("Tuesday")}", "${t("Wednesday")}", "${t("Thursday")}", "${t("Friday")}", "${t("Saturday")}"],
        "weekdaysShort" : ["${t("Sun")}", "${t("Mon")}", "${t("Tue")}", "${t("Wed")}", "${t("Thu")}", "${t("Fri")}", "${t("Sat")}"]
    }
}`

    //On props change, set default date used in widget url
    useEffect(() => {
        setCalendarCheckIn(props.dateRange.from ? formatDate(props.dateRange.from) : 'From')
        setCalendarCheckOut(props.dateRange.to ? formatDate(props.dateRange.to) : 'To')

        return () => {
            setCalendarCheckIn(null)
            setCalendarCheckOut(null)
        }
    }, [props])

    useEffect(() => {
        if(widgetLoading > 0){
            setTimeout(()=>{
                if(document.getElementsByClassName("orbirental-capture-widget-form").length > 0){
                    setWidgetLoading(0)
                    document.getElementById("leadWidget").classList.remove("blink")
                }else{
                    setWidgetLoading(widgetLoading+1)
                }
            }, 1000)
        }
    }, [widgetLoading])

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
        <script type="text/javascript" src="https://platform.hostfully.com/assets/widgets/searchwidget/searchwidget.js" />
        <script type="text/javascript" src="https://platform.hostfully.com/assets/js/pikaday.js"/>

<script type="text/javascript" src="https://platform.hostfully.com/assets/js/leadCaptureWidget_2.0.js"/>
<script>
{`var widget = new Widget('leadWidget', '${props.id}', {
"maximun_availability":"2024-04-11T12:55:08.095Z",
"type":"agency",
"fields":["phone","notes"],
"showAvailability":true,
"lang":${lang},
"minStay":true,
"price":true,
"cc":false,
"emailClient":true,
"saveCookie":true,
"showDynamicMinStay":true,
"backgroundColor":"#FFFFFF",
"buttonSubmit":{
    "backgroundColor":"#f5821e"
    },
"showPriceDetailsLink":true,
"showGetQuoteLink":true,
"labelColor":"#f5821e",
"showTotalWithoutSD":true,
"redirectURL":false,
"showDiscount":true,
"includeReferrerToRequest":true,
"customDomainName":null,
"source":null,
"aid":"ORB-49587220416635719",
"clickID":null,
"valuesByDefaults":{
    "checkIn":{
        "value":"${calendarCheckIn}"},
        "checkOut":{
            "value":"${calendarCheckOut}"
            },
        "guests":{
            "value":""
            },
        "discountCode":{
            "value":""
            }
        },
    "pathRoot":"https://platform.hostfully.com/"
    }
);`}
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
    .orbirental-capture-widget-details-link{
        text-align: center !important;
        box-shadow: 7px 7px 20px #d9d9d9, -8px -9px 20px #ffffff;
        border-radius: 5px;
        padding: 5px;
        margin-bottom: 5px;
        transition: all 0.3s;
    }
    .orbirental-capture-widget-details-link:hover{
        box-shadow: inset 5px 5px 10px #d9d9d9,
            inset -5px -5px 10px #ffffff;
    }
    `}
</style>
        </Helmet>
        
<div id="leadWidget" className="blink"></div>


        </>
    )
}

export default BookingWidget