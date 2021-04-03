import React, {useState, useEffect} from 'react'
import Loading from '../components/Loading';
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import { Helmet } from 'react-helmet'
import { formatDate, parseDate } from 'react-day-picker/moment'
import { Modal, Button } from 'react-bootstrap'
import emailjs from 'emailjs-com';


function encode(data) {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }

const addArgumentToURL = (url, field, data) => {

  if (typeof data !== "undefined" && data != "") {
      url += "&" + field + "=" + encodeURIComponent(data);
  }

  return url;
};


const CalendarModal = (props) => {

    const [info, setInfo] = useState(null)
    const [propId, setPropId] = useState(null)
    const [propName, setPropName] = useState(null)
    const [sent, setSent] = useState(false)

    useEffect(() => {
      setPropId(props.propId)
      setPropName(props.propName)
      return () => {
        setPropId(null)
        setPropName(null)
      }
    }, [])


    const sendEnquiry = (formInfo) => {
      if (sent) {
        return false;
      }
    
      emailjs.sendForm(process.env.GATSBY_EMAILJS_SERVICE_KEY, process.env.GATSBY_EMAILJS_TEMPLATE_KEY, formInfo, process.env.GATSBY_EMAILJS_USER)
      .then((result)=> {
        console.log(result.text)
        return true;
      }, (error)=> {
        console.log(error.text)
        return false;
      })
          
      
      }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target

        console.log(form)

        let enquiryResult = sendEnquiry(form);

        if(!enquiryResult){
          console.log('success')
          setSent(true)
        }
      }

      const handleChange = (e) => {
          setInfo({ [e.target.name]: e.target.value })
          console.log(info)
      }


    return (
        <Modal show={props.show} onHide={props.handleClose} centered dialogClassName="modal-container">
        <Modal.Header closeButton>
          <Modal.Title>Ask us about {props.propName}:</Modal.Title>
        </Modal.Header>
    <Modal.Body className="calendar-modal">
        <br />
        {sent ? 
          <div style={{display:"flex"}}>
            <h4 style={{margin:"auto", textAlign:"center"}}>Thank you for getting in touch! We'll get back to you as soon as possible.</h4>
          </div> :
          <form
          name="Inquiry"
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
          <input type="hidden" name={'property_name'} id={'property_name'} value={props.propName}/>
          <input type="hidden" name={'property_id'} id={'property_id'} value={props.propId}/>
          <div className="field">
            <label className="label" htmlFor={'from_name'}>
              Your name
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
          <div className="field">
            <label className="label" htmlFor={'message'}>
              Message
            </label>
            <div className="control">
              <textarea
                className="textarea"
                name={'message'}
                onChange={(e) => handleChange(e)}
                id={'message'}
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <button className="submit-search-btn"  type="submit" style={{border:"none", backgroundColor:"transparent"}}>
              <a>
                  <svg className="icon-arrow before">
                      <use xlinkHref="#arrow" />
                  </svg>
                  <span className="label">Enquire</span>
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

export default CalendarModal