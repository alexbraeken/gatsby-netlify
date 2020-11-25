import React from 'react'
import { Link } from 'gatsby'
import github from '../img/github-icon.svg'
import logo from '../img/logo.svg'
import Loading from '../components/Loading'
import Container from 'react-bootstrap/Container'
import { FirestoreCollection } from "@react-firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown} from '@fortawesome/free-solid-svg-icons';



const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.nav = React.createRef();
    this.dropdownArrow = React.createRef();
    this.state = {
      active: false,
      navBarActiveClass: '',
      dropdown: false,
      dropdownClass: '',  
      style: {
      
      },
      menuPadding:{}
    }
  }

  componentDidMount(){
    if(window.location.pathname === "/"){
      this.setState({style: {
      position: 'absolute',
      width: '100%',
      background: 'transparent'}
    })
    this.setState({menuPadding: {paddingTop:`${this.nav.current.getBoundingClientRect().height}px`}})
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

  toggleDropDown = () => {
    this.setState({
      dropdown: !this.state.dropdown
    },
    () => {
      this.state.dropdown?
      this.setState({dropdownClass: 'dropdown-active'})
      : this.setState({dropdownClass: ''});
    })
    this.dropdownArrow.current.style.transform = (this.dropdownArrow.current.style.transform == 'rotateZ(180deg)') ? 'rotateZ(0deg)' : 'rotateZ(180deg)'
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
      <>
      <nav
        className="navbar"
        role="navigation"
        aria-label="main-navigation"
        style={this.state.style}     
        ref={this.nav}>
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
              <div className="navbar-item" onClick={()=>this.toggleDropDown()} style={{cursor:"pointer"}}>
                Our Properties <div ref={this.dropdownArrow} className="dropdown-arrow"><FontAwesomeIcon icon={faChevronDown}/></div>
              </div>
              <Link className="navbar-item" to="/team/">
                Our Business
              </Link>
              <Link className="navbar-item" to="/travelerTips/">
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
      <div className={`dropdown-submenu ${this.state.dropdownClass}`} style={this.state.menuPadding} onMouseLeave={()=>this.toggleDropDown()}>
        <Container style={{display:"grid"}}>
          <div style={{gridColumn: 1}}>
          <a href={`/properties`}>
            <div  className="navbar-item">
              All Properties
            </div>
          </a>
          </div>
          <FirestoreCollection path="/Properties/">
                      {d => {
                                return d.isLoading ? <Loading /> : 
                                <>
                                {console.log(d.value)}
                                <div style={{gridColumn:2}}>
                                  <h4>City</h4>
                                  <hr />
                                  {this.filterList(d.value, "city").map((city, index)=>(
                                    <a href={`/properties?city=${city}`} key={index}>
                                      <div  className="navbar-item">
                                        {city}
                                      </div>
                                    </a>
                                    ))
                                  }
                                  </div>
                                  <div style={{gridColumn:3}}>
                                  <h4>Lodging Type</h4>
                                  <hr />
                                  {this.filterList(d.value, "type").map((type, index)=>(
                                    <a href={`/properties?type=${type}`} key={index}>
                                      <div  className="navbar-item">
                                        {type[0].toUpperCase() + type.slice(1).toLowerCase()}
                                      </div>
                                    </a>
                                    ))
                                  }
                                  </div>
                                  </>
                                
                            }}
                      
          </FirestoreCollection>
          </Container>
      </div>
      </>
    )
  }
}

export default Navbar
