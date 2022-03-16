import React from 'react'
import Layout from '../../components/Layout'
import { Helmet } from 'react-helmet'
import Newsletter from '../../components/Newsletter'
import emailjs from 'emailjs-com';
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import GoogleMapComponent from '../../components/GoogleMapComponent';

const Contact = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { sent: false }
    this.handleChange = this.handleChange.bind(this)
    this.sendEnquiry = this.sendEnquiry.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  sendEnquiry = (formInfo) => {
    if (this.state.sent) {
      return false;
    }
  
    emailjs.sendForm(process.env.GATSBY_EMAILJS_SERVICE_KEY, process.env.GATSBY_EMAILJS_GENERAL_TEMPLATE_KEY, formInfo, process.env.GATSBY_EMAILJS_USER)
    .then((result)=> {
      return true;
    }, (error)=> {
      return false;
    })
        
    
    }

  handleSubmit = (e) => {
      e.preventDefault()
      const form = e.target

      let enquiryResult = this.sendEnquiry(form);
      console.log(enquiryResult)

      if(!enquiryResult){
        this.setState({sent: !this.state.sent})
      }
    }

  render() {

    const t = this.props.useTranslation.t
    const language = this.props.useI18next.language

    return (
      <>
      <Helmet>
  <script type="application/ld+json">
    {`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "url": "https://www.smartavillas.com",
          "name": "Smartavillas.com",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+351 281 027 089",
            "contactType": ${t("Reservations & Customer Support")}
          }
        }
      `}
  </script>
</Helmet>
      <Layout propTitle="Smartavillas - Contact Us" >
        <section className="section contact-section" style={{padding: 0, position: "relative"}}>
          <div className='bg-map' style={{position: "absolute", width: "100vw", height: "100%"}}>
            <GoogleMapComponent 
            isMarkerShown="true" 
            zoom={15} 
            lat={37.1391462} 
            lng={-7.6286182} 
            activities={false} 
            height="100%" 
            width="100vw" 
            position="absolute" 
            tilt={45} 
            saturation={-100} 
            visibility={"off"} 
            roadStroke={"#302822"} 
            roadFill={"#564638"} 
            lightness={-60}/>
            <div style={{backgroundColor:"rgba(0,0,0,0.2)", position: "absolute", width: "100%", height: "100%", left:0, top: 0, pointerEvents: "none"}}>
            </div>
          </div>

          <div className="container contact-form">
            <div className="content">
              <h1  className="orangeText" style={{color: "#f5821e"}}>{t("Contact")}</h1>
              {this.state.sent ? 
              <div>
                <h3 className="orangeText" style={{color: "#f5821e"}}>{t("thanks")}!</h3>
                <p>{t("We'll get back to you as soon as possible")}.</p>
              </div>: 
              <>
              <p style={{color: "#fff"}}>
                {t("Get in touch with our team here")}!
              </p>
              <form
                name="contact"
                method="post"
                action="/contact/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={(e)=>this.handleSubmit(e)}
              >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                  <label>
                    Don’t fill this out:{' '}
                    <input name="bot-field" onChange={(e)=>this.handleChange(e)} />
                  </label>
                </div>
                <div className="field">
                  <label className="label orangeText" htmlFor={'name'}>
                    {t("Your name")}
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type={'text'}
                      name={'name'}
                      onChange={(e)=>this.handleChange(e)}
                      id={'name'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label orangeText" htmlFor={'email'}>
                    {t("email")}
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type={'email'}
                      name={'email'}
                      onChange={(e)=>this.handleChange(e)}
                      id={'email'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label orangeText" htmlFor={'message'}>
                    {t("Message")}
                  </label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      name={'message'}
                      onChange={(e)=>this.handleChange(e)}
                      id={'message'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <button className="button is-link" type="submit" style={{backgroundColor:"#f5821e"}}>
                    {t("Send")}
                  </button>
                </div>
              </form>
              </>}
              <br />
              <Newsletter lang={language} transparent={true}/>
              <br />
              <div>
              <h3 className="orangeText" style={{color: "#f5821e"}}>Smartavillas.com {t("Algarve Holiday Rentals")}</h3>
              <ul style={{listStyle:"none", color: "#fff"}}>
                <li>
                <b style={{color: "#f5821e"}}>{t("Phone")}:</b> +351 281027089 / +351 913692170
                </li>
                <li>
                <b style={{color: "#f5821e"}}>{t("email")}:</b> <a href="mailto:reservas@smartavillas.com">reservas@smartavillas.com</a>
                </li>
                <li>
                <b style={{color: "#f5821e"}}>{t("Address")}:</b> Smartavillas Unipessoal Lda (513548211) Rua Maria Helena Viera da Silva, 15-C Mato Santo Espirito Tavira 8800-601 Portugal
                </li>
              </ul>
              </div>
            </div>
          </div>
        </section>
      </Layout>
      </>
    )
  }
}


const Index = (props) => {
  return (
      <Contact props={props} useI18next={useI18next()} useTranslation={useTranslation()}/>
  )
}

export default Index

export const pageQuery = graphql`
query ContactPage ($language: String!) {
  locales : allLocale(filter: {ns: {in: ["translation"]},language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
  }
}`