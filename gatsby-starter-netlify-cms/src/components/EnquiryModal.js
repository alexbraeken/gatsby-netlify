import React, {useState} from 'react'
import 'react-day-picker/lib/style.css'
import { Modal } from 'react-bootstrap'
import emailjs from 'emailjs-com';


//Enquiry modal on property page
const EnquiryModal = (props) => {

    const [info, setInfo] = useState(null)
    const [sent, setSent] = useState(false)

    const sendEnquiry = (formInfo) => {
      if (sent) {
        return false;
      }
    
      emailjs.sendForm(process.env.GATSBY_EMAILJS_SERVICE_KEY, process.env.GATSBY_EMAILJS_TEMPLATE_KEY, formInfo, process.env.GATSBY_EMAILJS_USER)
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
              <div style={{
                height:"50px", 
                width:"50px", 
                borderRadius:"50%", 
                backgroundImage:`url('${props.img}')`, 
                backgroundPosition:"center", 
                backgroundSize:"cover",
                margin: "auto 20px auto auto",
                flex:"none"}}>
              </div>
              <div className="orangeText" style={{margin: "auto"}}>
                Ask us about {props.propName}:
              </div>
              <div className="modal close modal-content modal-header enquiry-modal" style={{display: "none"}}>
              </div>
          </Modal.Title>
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
              Your name
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
              Email
            </label>
            </div>
          </div>
          <div className="field">
            
            <div className="control">
              <select
                className="input"
                name={'topic'}
                onChange={(e) => handleChange(e)}
                id={'topic'}
                required={true}
                style={{appearance:"auto"}}
              >
                <option disabled selected value="" hidden> </option>
                <option value="General">General</option>
                <option value="Facilities">Facilities</option>
                <option value="Booking Related">Booking Related</option>
                <option value="Accessibility">Accessibility</option>
                <option value="Accessibility">Winter Let</option>
                <option value="Other">Other</option>
              </select>
              <label className="label" htmlFor={'topic'}>
              Topic
            </label>
            </div>
          </div>
          <div className="field">
          
            <div className="control">
              <textarea
                className="textarea"
                name={'message'}
                onChange={(e) => handleChange(e)}
                id={'message'}
                required={true}
                placeholder=" "
              />
                <label className="label" htmlFor={'message'}>
              Message
            </label>
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

export default EnquiryModal