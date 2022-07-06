import React from 'react'
import {Link} from 'gatsby-plugin-react-i18next';
import logo from '../img/logo.svg'
import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'

const Footer = class extends React.Component {
  render() {

    const t = this.props.useTranslation.t
    const language = this.props.useI18next.language

    return (
      <footer className="footer has-background-black has-text-white-ter">
        <div className="content has-text-centered">
          <img
            src={logo}
            alt="Smarta"
            style={{width:"50px", height:"50px"}}
          />
        </div>
        <div className="content has-text-centered has-background-black has-text-white-ter">
          <div className="container has-background-black has-text-white-ter">
            <div style={{ maxWidth: '100vw' }} className="columns">
              <div className="column is-4">
                <section className="menu">
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
                  </ul>
                </section>
              </div>
              <div className="column is-4">
                <section>
                  <ul className="menu-list">
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
              <div className="column is-4 social">
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
}

export default Footer
