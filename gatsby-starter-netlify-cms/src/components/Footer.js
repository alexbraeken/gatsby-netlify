import React, {useRef} from 'react'
import logo from '../img/logo.svg'
import {Link, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'
import SubmitButton from'./SubmitButton'
import twitter from '../img/social/twitter.svg'

const Footer = () =>{


    const {t} = useTranslation();

    const footer = useRef(null)


    return (
      <footer className={`footer black-bg has-text-white-ter`} style={{overflow:"hidden"}}>
        <div className="content has-text-centered">
          <img
            src={logo}
            alt="Smarta"
            style={{width:"50px", height:"50px"}}
          />
        </div>
        <div className="content has-text-centered black-bg has-text-white-ter">
          <div className="container black-bg has-text-white-ter">
            <div style={{ maxWidth: '100vw' }} className="columns">
              <div className="column is-4">
                <section className="menu" style={{position: "relative"}}>
                <h2 className="prop-section-title" style={{overflow:"visible", left:"0", transform:"translateY(0)"}}>{t("explore")}</h2>
                  <ul className="menu-list">
                    <li>
                      <Link to="/" className="navbar-item">
                        {t("Home")}
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/team">
                      {t("About")}
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/about/booking-terms-conditions">
                      {t("Booking Terms & Conditions")}
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/about/privacy-policy">
                      {t("Privacy Policy")}
                      </Link>
                    </li>
                    <li>
                    <Link className="navbar-item" to="/about/health-and-safety">
                    {t("Health & Safety")}
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/properties">
                      {t("Properties")}
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/about/sustainability">
                      {t("Sustainability")}
                      </Link>
                    </li>
                    <li>
                    <Link className="navbar-item" to="/about/Covid-faq">
                    {t("COVID-19 FAQ")}
                      </Link>
                    </li>
                     <li>
                    <Link className="navbar-item" to="/about/sustainability">
                    {t("Sustainability")}
                      </Link>
                    </li>
                    <li>
                    <Link className="navbar-item" to="/about/hiring">
                    {t("Hiring")}
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/contact">
                      {t("Contact")}
                      </Link>
                    </li>
                    <li>
                      <a
                        className="navbar-item"
                        href="/admin/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t("Admin")}
                      </a>
                    </li>
                    <li>
                      <a className="navbar-item"
                      href="www.smartamoves.pt"
                      target="_blank"
                      >
                        Smartamoves
                      </a>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="column social" >
                <section style={{}}>
                  <h2 className="prop-section-title">{t("get in touch")}</h2>
                  <ul className="menu-list">
                    <li>
                      <div style={{width:"fit-content"}}>
                        <SubmitButton text={t('Contact')} link={`/contact`}/>
                      </div>
                    </li>
                    <br />
                    <li>
                      <h4 style={{color:"whitesmoke", fontWeight:"unset"}}><a href="mailto:reservas@smartavillas.com" style={{background: "none", padding: "unset", width: "unset", height: "unset", margin: "unset"}}>reservas@smartavillas.com</a></h4>
                    </li>
                    <li>
                      <h4 style={{color:"whitesmoke", fontWeight:"unset"}}>+351 281027089 / +351 913692170</h4>
                    
                    </li>
                    <li>
                      <h4 style={{color:"whitesmoke", fontWeight:"unset"}}>Rua Maria Helena Viera da Silva, 15-C Mato Santo Espirito Tavira 8800-601 Portugal</h4>
                    </li>
                  </ul>
                  <div style={{margin:"auto 0 auto 1.5em"}}>
                    <a className="social-hover fb-icon" title="facebook" href="https://facebook.com/smartavillas">
                      <img
                        className="fas fa-lg"
                        src={facebook}
                        alt="Facebook"
                        style={{ width: '1em', height: '1em' }}
                      />
                    </a>
                    <a className="social-hover twitter-icon" title="twitter" href="https://twitter.com/smartavillas">
                      <img
                        className="fas fa-lg"
                        src={twitter}
                        alt="Twitter"
                        style={{ width: '1em', height: '1em' }}
                      />
                    </a>
                    <a className="social-hover insta-icon" title="instagram" href="https://instagram.com/smartavillas">
                      <img
                        className="fas fa-lg"
                        src={instagram}
                        alt="Instagram"
                        style={{ width: '1em', height: '1em' }}
                      />
                    </a>
                  </div>
                </section>
              </div>
            </div>
            <div className="trustpilot-widget" style={{margin:"20px auto"}} data-locale="en-US" data-template-id="5419b6a8b0d04a076446a9ad" data-businessunit-id="6269454aa9c09b59bf311cdf" data-style-height="24px" data-style-width="100%" data-theme="dark" data-min-review-count="10" data-without-reviews-preferred-string-id="1">
  <a href="https://www.trustpilot.com/review/smartavillas.com" target="_blank" rel="noopener">Trustpilot</a>
</div>
            <div style={{ maxWidth: '100vw' }}>
              <center>
              &#169; Smartavillas.com - {t("All Rights Reserved")}
              </center>
            </div>
          </div>
        </div>
      </footer>
    )
}


export default Footer