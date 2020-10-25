import React from 'react'
import { Link } from 'gatsby'
import github from '../img/github-icon.svg'
import logo from '../img/logo.svg'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Loading from '../components/Loading'

import { FirestoreCollection } from "@react-firebase/firestore";




const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
      style: {
        
      }
    }
  }

  componentDidMount(){
    if(window.location.pathname === "/")this.setState({style: {
      position: 'absolute',
      width: '100%',
      background: 'transparent'}
    })
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

  filterList = (props, type) => {
    let filter = []
    props.map(prop => {
        filter.push(prop[`${type}`])
    })

    return [... new Set(filter)]

}

  render() {
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
        style={this.state.style}     >
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
              <NavDropdown title="Properties" className="navbar-item">
                <NavDropdown.Item href="/properties" className="navbar-item">Our Properties</NavDropdown.Item>
                <FirestoreCollection path="/Properties/">
                {d => {
                          return d.isLoading ? <Loading /> : 
                          <>
                            {this.filterList(d.value, "city").map((city, index)=>(
                              <NavDropdown.Item href={`/properties?city=${city}`} key={index} className="navbar-item">
                                {city}
                              </NavDropdown.Item>
                              ))
                            }
                            </>
                          
                      }}
                
                </FirestoreCollection>
              </NavDropdown>
              <Link className="navbar-item" to="/blog">
                Traveler Tips
              </Link>
              <Link className="navbar-item" to="/">
                Holiday Extras
              </Link>
              <Link className="navbar-item" to="/algarve">
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
