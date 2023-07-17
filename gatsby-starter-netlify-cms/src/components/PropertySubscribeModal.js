import React, {useState} from 'react'
import 'react-day-picker/lib/style.css'
import { Modal } from 'react-bootstrap'
import {useTranslation, useI18next} from 'gatsby-plugin-react-i18next';


//Enquiry modal on property page
const PropertySubscribeModal = (props) => {

    const [sent, setSent] = useState(false)
    const [info, setInfo] = useState(null)
    const [error, setError] = useState(false)

    const {t} = useTranslation(['translation']);
    const {language} = useI18next();

    const sendSubscription = (form) => {
        const uri = "https://us-central1-gatsby-test-286520.cloudfunctions.net/widgets/external"

        fetch(uri, 
            {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(
                {
                    source: "mailer",
                    email: form.email,
                    id: props.propId
                })
              })
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        let subscriptionResult = sendSubscription(info);
        if(!subscriptionResult){
            setSent(true)
        }

    }

    const handleChange = (e) => {
        setInfo({ [e.target.name]: e.target.value })
    }


    return(
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
                <span>{t("Subscribe for notifications and deals about")} {props.propName}</span>
            </div>
            <div className="modal close modal-content modal-header enquiry-modal" style={{display: "none"}}>
            </div>
        </Modal.Title>
    </Modal.Header>
    <Modal.Body className="">
    {sent ? 
          <div style={{display:"flex"}}>

              {error ? 
    <h4 style={{margin:"auto", textAlign:"center"}}>We had some trouble processing your request. Please try again later.</h4>          
:
<h4 style={{margin:"auto", textAlign:"center"}}>{t("Thank you for subscribing! Please check your email to confirm and start receiving the latest news and promotions about this property.")}</h4>

              }
            
          </div> :
          <div>
                <form
                    name="Subscription"
                    method="post"
                    action="#"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={(e)=>handleSubmit(e)}
                    >
                    <input type="hidden" name="form-name" value="Subscription" />
                    <div hidden>
                        <label>
                            Don’t fill this out:{' '}
                            <input name="bot-field" onChange={(e) => handleChange(e)}/>
                        </label>
                    </div>
                    <input type="hidden" name={'property_name'} id={'property_name'} value={props.propName}/>
                    <input type="hidden" name={'property_id'} id={'property_id'} value={props.propId}/>
                    <div className="field">
                        
                        <div className="control">
                        <input
                            className="input"
                            type={'email'}
                            name={'email'}
                            id={'email'}
                            required={true}
                            onChange={(e) => handleChange(e)}
                            placeholder=" "
                        />
                        <label className="label" htmlFor={'email'}>
                        Email
                        </label>
                        </div>
                    </div>
                    <div className="field">
                    <button className="submit-search-btn"  type="submit" style={{border:"none", backgroundColor:"transparent"}}>
                    <a>
                        <svg className="icon-arrow before">
                            <use xlinkHref="#arrow" />
                        </svg>
                        <span className="label">{t("Subscribe")}</span>
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
                <small>{t("Receive the latest offers and news about this property. You can unsubscribe anytime. For more details, review our Privacy Policy.")}</small>
            </div>
        }
    </Modal.Body>
</Modal>
)
}

export default PropertySubscribeModal