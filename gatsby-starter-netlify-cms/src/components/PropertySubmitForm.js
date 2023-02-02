import React, {useState} from 'react'
import 'react-day-picker/lib/style.css'
import emailjs from 'emailjs-com';


//Property submission form
const PropertySubmitForm = (props) => {

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
    <>
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
              <input
                className="input"
                type={'text'}
                name={'location'}
                onChange={(e) => handleChange(e)}
                id={'location'}
                required={true}
                placeholder=" "
              />
               <label className="label" htmlFor={'email'}>
              Post-code
            </label>
            </div>
          </div>
          <div className="field">
           
           <div className="control">
             <input
               className="input"
               type={'text'}
               name={'rooms'}
               onChange={(e) => handleChange(e)}
               id={'rooms'}
               required={true}
               placeholder=" "
             />
              <label className="label" htmlFor={'email'}>
             Rooms
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
          <div className="field" style={{textAlign:"center"}}>
            <button className="submit-search-btn"  type="submit" style={{border:"none", backgroundColor:"transparent"}}>
              <a>
                  <svg className="icon-arrow before">
                      <use xlinkHref="#arrow" />
                  </svg>
                  <span className="label">Submit</span>
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
    </>
    )
}

export default PropertySubmitForm