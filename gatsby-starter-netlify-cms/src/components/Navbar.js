import React from 'react'
import { Link } from 'gatsby'
import github from '../img/github-icon.svg'
import logo from '../img/logo.svg'
import NavDropdown from 'react-bootstrap/NavDropdown'

import { FirestoreCollection } from "@react-firebase/firestore";




const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  render() {
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item" title="Logo">
              <img src="/img/smartavillas logo.png" alt="Smarta" />
            </Link>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-start has-text-centered">
              <Link className="navbar-item" to="/">
                Home
              </Link>
              <FirestoreCollection path="/Properties/">
              {d => {
                        return d.isLoading ? "Loading" : 
                        <NavDropdown title="Properties" className="navbar-item">
                          <NavDropdown.Item href="/properties">Our Properties</NavDropdown.Item>
                          {
                           d.value.map((item, index)=>(
                             <NavDropdown.Item href="#" key={index} className="navbar-item">
                               {item.name}
                             </NavDropdown.Item>
                           ))
                          }
                        </NavDropdown>
                    }}
              
              </FirestoreCollection>
              <Link className="navbar-item" to="/blog">
                Traveler Tips
              </Link>
              <Link className="navbar-item" to="/">
                Holiday Extras
              </Link>
              <Link className="navbar-item" to="/">
                The Algarve
              </Link>
              <Link className="navbar-item" to="/contact">
                Contact Us
              </Link>
            </div>
            <div className="navbar-end has-text-centered">
              <a
                className="navbar-item"
                href="https://github.com/netlify-templates/gatsby-starter-netlify-cms"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <img src={github} alt="Github" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
