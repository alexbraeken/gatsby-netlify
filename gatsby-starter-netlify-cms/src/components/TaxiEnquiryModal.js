import React, {useState, useEffect} from 'react'
import 'react-day-picker/lib/style.css'
import { Modal } from 'react-bootstrap'
import emailjs from 'emailjs-com';
import {useTranslation, useI18next} from 'gatsby-plugin-react-i18next';


//Enquiry modal on property page
const TaxiEnquiryModal = (props) => {

    const [info, setInfo] = useState()
    const [sent, setSent] = useState(false)
    const [inflight, setInflight] = useState(true)
    const [arrivalGroup, setArrivalGroup] = useState(null)
    const [departureGroup, setDepartureGroup] = useState(null)

    const {t} = useTranslation(['translation']);
    const { language } = useI18next()


    useEffect(() => {
      if(props.show){
        console.log(props.price)
        setArrivalGroup(
          Array.from(document.querySelectorAll('.arrival'))
        )
        setDepartureGroup(
          Array.from(document.querySelectorAll('.departure'))
        )
      }
      
      return () => {
        setArrivalGroup(null)
        setDepartureGroup(null)
      }
    }, [props.show])


    const sendEnquiry = (formInfo) => {
      if (sent) {
        return false;
      }
    
      
      emailjs.sendForm(process.env.GATSBY_EMAILJS_SERVICE_KEY, process.env.GATSBY_EMAILJS_TEMPLATE_KEY_AIRPORT_TRANSFER, formInfo, process.env.GATSBY_EMAILJS_USER)
      .then((result)=> {
        return true;
      }, (error)=> {
        return false;
      })
          
      
      }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target

        let enquiryResult = sendEnquiry(form);

        if(!enquiryResult){
          setSent(true)
        }
      }

      const handleChange = (e, type) => {
          setInfo({ [e.target.name]: e.target.value })
         
        
      }


    return (
        <Modal show={props.show} onHide={props.handleClose} centered dialogClassName="modal-container enquiry-modal">
        <Modal.Header closeButton style={{background: "#3f3f3f"}}>
          <Modal.Title style={{display: "flex", flexWrap:"nowrap"}}>
              <div className="orangeText" style={{margin: "auto"}}>
                <span>{t("Get a Quote")}</span>
                <br />
              </div>
              <div className="modal close modal-content modal-header enquiry-modal" style={{display: "none"}}>
              </div>
          </Modal.Title>
        </Modal.Header>
    <Modal.Body className="calendar-modal scroll-modal">
        {sent ? 
          <div style={{display:"flex"}}>
            <h3 style={{margin:"auto", textAlign:"center"}}>{t("Thank you for getting in touch! We'll get back to you as soon as possible.")}</h3>
          </div> :
          <form
          name="AirportTransfer"
          method="post"
          action="#"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={(e)=>handleSubmit(e)}
        >
          {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
          <input type="hidden" name="form-name" value="Inquiry" />
          <div hidden>
            <label>
              Don’t fill this out:{' '}
              <input name="bot-field" onChange={(e) => handleChange(e)} />
            </label>
          </div>
          <div>
          <small className="orangeText">{props.date}</small>
          <br />
          <small><span className="orangeText">{t("Estimated Price")}:</span> {props.price}€</small>
          </div>
          <input type="hidden" name={'price'} id={'price'} value={props.price}/>
          <input type="hidden" name={'from'} id={'from'} value={props.date}/>
          <input type="hidden" name={'pickUp'} id={'pickUp'} value={props.pickUp}/>
          <input type="hidden" name={'destination'} id={'destination'} value={props.destination}/>
          <input type="hidden" name={'lang'} id={'lang'} value={language} />
          <div className="field">
           
            <div className="control">
              <input
                className="input"
                type={'text'}
                name={'from_name'}
                onChange={(e) => handleChange(e)}
                id={'from_name'}
                required={true}
                placeholder=" "
              />
               <label className="label" htmlFor={'from_name'}>
              {t("Your name")}
            </label>
            </div>
          </div>
          <div className="field">
           
            <div className="control">
              <input
                className="input"
                type={'email'}
                name={'email'}
                onChange={(e) => handleChange(e)}
                id={'email'}
                required={true}
                placeholder=" "
              />
               <label className="label" htmlFor={'email'}>
              {t("Email")}
            </label>
            </div>
          </div>
          <div className="field">
            
            <div className="control">
              <input
                className="input"
                type={'tel'}
                name={'phone'}
                onChange={(e) => handleChange(e)}
                id={'phone'}
                required={true}
                placeholder=" "
              />
              <label className="label" htmlFor={'phone'}>
              {t("phone")}
            </label>
            </div>
          </div>
          {props.pickUp === "airport" &&
          <>
            <h3 className="orangeText">{t("Travel Details")}</h3>
            <div className="field">
              
              <div className="control">
                <input
                  className="input arrival"
                  type={'text'}
                  name={'flight_number'}
                  onChange={(e) => handleChange(e, "arrival")}
                  id={'flight_number'}
                  required={inflight ? true : false}
                  placeholder=" "
                />
                <label className="label" htmlFor={'flight_number'}>
                {t("In Flight Number")}
              </label>
              </div>
            </div>
            <div className="field">
            
              <div className="control">
                <input
                  className="input arrival"
                  type={'date'}
                  name={'arrival_date'}
                  onChange={(e) => handleChange(e, "arrival")}
                  id={'arrival_date'}
                  required={inflight ? true : false}
                  placeholder=" "
                />
                <label className="label" htmlFor={'arrival_date'}>
                {t("Arrival Date")}
              </label>
              </div>
            </div>
            <div className="field">
            
              <div className="control">
                <input
                  className="input arrival"
                  type={'text'}
                  name={'departing_from'}
                  onChange={(e) => handleChange(e, "arrival")}
                  id={'departing_from'}
                  required={inflight ? true : false}
                  placeholder=" "
                />
                  <label className="label" htmlFor={'departing_from'}>
                {t("Departing From")}
              </label>
              </div>
            </div>
            <div className="field">
            
              <div className="control">
                <input
                  className="input arrival"
                  type={'text'}
                  name={'time_of_arrival'}
                  onChange={(e) => handleChange(e, "arrival")}
                  id={'time_of_arrival'}
                  required={inflight ? true : false}
                  placeholder=" "
                />
                <label className="label" htmlFor={'time_of_arrival'}>
                {t("Time of Arrival")}
              </label>
              </div>
            </div>
            </>
            }
            {props.destination === "airport"  &&
            <>
            <h3 className="orangeText">{t("Travel Details")}</h3>
            <div className="field">
            
              <div className="control">
                <input
                  className="input departure"
                  type={'text'}
                  name={'out_flight_number'}
                  onChange={(e) => handleChange(e, "departure")}
                  id={'out_flight_number'}
                  required={inflight ? false : true}
                  placeholder=" "
                />
                <label className="label" htmlFor={'out_flight_number'}>
                {t("Out Flight Number")}
              </label>
              </div>
            </div>
            <div className="field">
            
              <div className="control">
                <input
                  className="input departure"
                  type={'date'}
                  name={'departure_date'}
                  onChange={(e) => handleChange(e, "departure")}
                  id={'departure_date'}
                  required={inflight ? false : true}
                  placeholder=" "
                />
                <label className="label" htmlFor={'departure_date'}>
                {t("Departure Date")}
              </label>
              </div>
            </div>
            <div className="field">
            
              <div className="control">
                <input
                  className="input departure"
                  type={'text'}
                  name={'going_to'}
                  onChange={(e) => handleChange(e, "departure")}
                  id={'going_to'}
                  required={inflight ? false : true}
                  placeholder=" "
                />
                  <label className="label" htmlFor={'going_to'}>
                {t("Going To")}
              </label>
              </div>
            </div>
            <div className="field">
            
              <div className="control">
                <input
                  className="input departure"
                  type={'text'}
                  name={'time_of_departure'}
                  onChange={(e) => handleChange(e, "departure")}
                  id={'time_of_departure'}
                  required={inflight ? false : true}
                  placeholder=" "
                />
                  <label className="label" htmlFor={'time_of_departure'}>
                {t("Time of Departure")}
              </label>
              </div>
            </div>
          </>
          }
          <div className="field">
         
            <div className="control">
              <textarea
                className="textarea"
                name={'message'}
                onChange={(e) => handleChange(e)}
                id={'message'}
                required={false}
                placeholder={" "}
              />
                 <label className="label" htmlFor={'message'}>
              {t("Questions or extra information")}
            </label>
            </div>
          </div>
          <div>
              <p>
                  {t("We'll get back to you with availability and a confirmed quote as soon as possible!")}
              </p>
          </div>
          <div className="field">
            <button className="submit-search-btn"  type="submit" style={{border:"none", backgroundColor:"transparent", marginLeft: "0",
    paddingLeft: "0"}}>
              <a>
                  <svg className="icon-arrow before">
                      <use xlinkHref="#arrow" />
                  </svg>
                  <span className="label">{t("Get a Quote")}</span>
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
            </button>
          </div>
        </form>
          }
        
        </Modal.Body>
      </Modal>
    )
}

export default TaxiEnquiryModal