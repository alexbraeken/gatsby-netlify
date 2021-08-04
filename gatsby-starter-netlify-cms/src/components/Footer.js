import React from 'react'
import { Link } from 'gatsby'

import logo from '../img/logo.svg'
import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'

const Footer = class extends React.Component {
  render() {
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
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/team">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/about/booking-terms-conditions">
                        Booking Terms & Conditions
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/about/privacy-policy">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                    <Link className="navbar-item" to="/about/health-and-safety">
                        Health & Safety
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
                        Properties
                      </Link>
                    </li>
                    <li>
                    <Link className="navbar-item" to="/about/Covid-faq">
                       COVID-19 FAQ
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/contact">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <a
                        className="navbar-item"
                        href="/admin/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Admin
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
            <div style={{ maxWidth: '100vw' }}>
              <center>
              &#169; Smartavillas.com - All Rights Reserved
              </center>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
