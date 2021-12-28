import React, {useState} from 'react'
import 'react-day-picker/lib/style.css'
import { Modal } from 'react-bootstrap'
import emailjs from 'emailjs-com';
import {useTranslation, useI18next} from 'gatsby-plugin-react-i18next';


//Enquiry modal on property page
const CarEnquiryModal = (props) => {

    const [info, setInfo] = useState(null)
    const [sent, setSent] = useState(false)

    const {t} = useTranslation(['translation']);
    const { language } = useI18next()

    const sendEnquiry = (formInfo) => {
      if (sent) {
        return false;
      }
    
      emailjs.sendForm(process.env.GATSBY_EMAILJS_SERVICE_KEY, process.env.GATSBY_EMAILJS_TEMPLATE_KEY_CAR_HIRE, formInfo, process.env.GATSBY_EMAILJS_USER)
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

      const handleChange = (e) => {
          setInfo({ [e.target.name]: e.target.value })
      }


    return (
        <Modal show={props.show} onHide={props.handleClose} centered dialogClassName="modal-container enquiry-modal">
        <Modal.Header closeButton style={{background: "#3f3f3f"}}>
          <Modal.Title style={{display: "flex", flexWrap:"nowrap"}}>
              <div className="orangeText" style={{margin: "auto"}}>
                <span>{t("Book")} {props.carClass} {t("vehicle")}</span>
              </div>
              <div className="modal close modal-content modal-header enquiry-modal" style={{display: "none"}}>
              </div>
          </Modal.Title>
        </Modal.Header>
    <Modal.Body className="calendar-modal">
        {sent ? 
          <div style={{display:"flex"}}>
            <h4 style={{margin:"auto", textAlign:"center"}}>{t("Thank you for getting in touch! We'll get back to you as soon as possible.")}</h4>
          </div> :
          <form
          name="CarInquiry"
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
          <small>{props.from} - {props.to}</small>
          <br />
          <small>{t("Price")}: {props.price}€</small>
          </div>
          <input type="hidden" name={'price'} id={'price'} value={props.price}/>
          <input type="hidden" name={'from'} id={'from'} value={props.from}/>
          <input type="hidden" name={'to'} id={'to'} value={props.to}/>
          <imput type="hidden" name={'lang'} id={'lang'} value={language} />
          <div className="field">
            <label className="label" htmlFor={'from_name'}>
              {t("Your name")}
            </label>
            <div className="control">
              <input
                className="input"
                type={'text'}
                name={'from_name'}
                onChange={(e) => handleChange(e)}
                id={'from_name'}
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={'email'}>
              Email
            </label>
            <div className="control">
              <input
                className="input"
                type={'email'}
                name={'email'}
                onChange={(e) => handleChange(e)}
                id={'email'}
                required={true}
              />
            </div>
          </div>
          <h4>Travel Details</h4>
          <div className="field">
            <label className="label" htmlFor={'flight_number'}>
              In Flight Number
            </label>
            <div className="control">
              <input
                className="input"
                type={'text'}
                name={'flight_number'}
                onChange={(e) => handleChange(e)}
                id={'flight_number'}
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={'arrival_date'}>
              Arrival Date
            </label>
            <div className="control">
              <input
                className="input"
                type={'text'}
                name={'arrival_date'}
                onChange={(e) => handleChange(e)}
                id={'arrival_date'}
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={'departing_from'}>
              Departing From
            </label>
            <div className="control">
              <input
                className="input"
                type={'text'}
                name={'departing_from'}
                onChange={(e) => handleChange(e)}
                id={'departing_from'}
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={'time_of_arrival'}>
              Time of Arrival
            </label>
            <div className="control">
              <input
                className="input"
                type={'text'}
                name={'time_of_arrival'}
                onChange={(e) => handleChange(e)}
                id={'time_of_arrival'}
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={'out_flight_number'}>
              Out Flight Number
            </label>
            <div className="control">
              <input
                className="input"
                type={'text'}
                name={'out_flight_number'}
                onChange={(e) => handleChange(e)}
                id={'out_flight_number'}
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={'departure_date'}>
              Departure Date
            </label>
            <div className="control">
              <input
                className="input"
                type={'text'}
                name={'departure_date'}
                onChange={(e) => handleChange(e)}
                id={'departure_date'}
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={'going_to'}>
              Going To
            </label>
            <div className="control">
              <input
                className="input"
                type={'text'}
                name={'going_to'}
                onChange={(e) => handleChange(e)}
                id={'going_to'}
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={'time_of_departure'}>
              Time of Departure
            </label>
            <div className="control">
              <input
                className="input"
                type={'text'}
                name={'time_of_departure'}
                onChange={(e) => handleChange(e)}
                id={'time_of_departure'}
                required={true}
              />
            </div>
          </div>
          <h4>
            Driving Licence & Passport Details
          </h4>
          <div className="field">
            <label className="label" htmlFor={'full_name'}>
              Lead Drive Full Name
            </label>
            <div className="control">
              <input
                className="input"
                type={'text'}
                name={'full_name'}
                onChange={(e) => handleChange(e)}
                id={'full_name'}
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={'home_address'}>
              Home Address
            </label>
            <div className="control">
              <input
                className="input"
                type={'text'}
                name={'home_address'}
                onChange={(e) => handleChange(e)}
                id={'home_address'}
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={'dob'}>
              Date of Birth
            </label>
            <div className="control">
              <input
                className="input"
                type={'date'}
                name={'dob'}
                onChange={(e) => handleChange(e)}
                id={'dob'}
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={'portugal_address'}>
              Local Address in Portugal
            </label>
            <div className="control">
              <input
                className="input"
                type={'text'}
                name={'portugal_address'}
                onChange={(e) => handleChange(e)}
                id={'portugal_address'}
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={'contact_number'}>
              Contact Number
            </label>
            <div className="control">
              <input
                className="input"
                type={'tel'}
                name={'contact_number'}
                onChange={(e) => handleChange(e)}
                id={'contact_number'}
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={'license_number'}>
              Driving License Number
            </label>
            <div className="control">
              <input
                className="input"
                type={'text'}
                name={'license_number'}
                onChange={(e) => handleChange(e)}
                id={'license_number'}
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={'issue_date'}>
              Issue Date
            </label>
            <div className="control">
              <input
                className="input"
                type={'text'}
                name={'issue_date'}
                onChange={(e) => handleChange(e)}
                id={'issue_date'}
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={'expiry_date'}>
              Expiry Date
            </label>
            <div className="control">
              <input
                className="input"
                type={'text'}
                name={'expiry_date'}
                onChange={(e) => handleChange(e)}
                id={'expiry_date'}
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={'passport_number'}>
              Passport Number
            </label>
            <div className="control">
              <input
                className="input"
                type={'text'}
                name={'passport_number'}
                onChange={(e) => handleChange(e)}
                id={'passport_number'}
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={'passport_issue_date'}>
              Passport Issue Date
            </label>
            <div className="control">
              <input
                className="input"
                type={'text'}
                name={'passport_issue_date'}
                onChange={(e) => handleChange(e)}
                id={'passport_issue_date'}
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={'passport_expiry_date'}>
              Passport Expiry Date
            </label>
            <div className="control">
              <input
                className="input"
                type={'text'}
                name={'passport_expiry_date'}
                onChange={(e) => handleChange(e)}
                id={'passport_expiry_date'}
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={'message'}>
              {t("Questions or extra information")}
            </label>
            <div className="control">
              <textarea
                className="textarea"
                name={'message'}
                onChange={(e) => handleChange(e)}
                id={'message'}
                required={true}
                placeholder={t("Let us know here!")}
              />
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
                  <span className="label">{t("Book")}</span>
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

export default CarEnquiryModal