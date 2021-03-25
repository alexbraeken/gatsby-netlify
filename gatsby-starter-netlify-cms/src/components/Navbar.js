import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import hostfully from '../img/Hostfully-Blue-Green-Icon.png'
import logo from '../img/smartavillas logo.png'
import Loading from '../components/Loading'
import Container from 'react-bootstrap/Container'
import { FirestoreCollection, FirestoreDocument } from "@react-firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faArrowLeft} from '@fortawesome/free-solid-svg-icons';

const PropertiesDropDown = React.memo((props) => {
  return(
    <>
  <div style={{gridColumn: 1}}>
    <div className="navbar-item" style={{backgroundColor:"#f5821e", boxShadow:"0 3px 1px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.02)"}}>
      <h4 className="dropdown-title" style={{color:"#fff"}}>All</h4>
    </div>
          <a href={`/properties`}>
            <div  className="navbar-item drop-item">
              All Properties
            </div>
          </a>
          </div>
          <FirestoreDocument path="/Navbar/Nav">
                      {d => {
                                return (!d.isLoading && d.value) ?  
                                <>
                                <div style={{gridColumn:2}}>
                                  <div className="navbar-item" style={{backgroundColor:"#f5821e", boxShadow:"0 3px 1px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.02)"}}>
                                    <h4 className="dropdown-title" style={{color:"#fff"}}>City</h4>
                                  </div>
                                  
                                  {d.value.Locations.map((city, index)=>(
                                    <a href={`/properties?city=${city}`} key={index}>
                                      <div  className="navbar-item drop-item">
                                        {city}
                                      </div>
                                    </a>
                                    ))
                                  }
                                  </div>
                                  <div style={{gridColumn:3}}>
                                  <div className="navbar-item" style={{backgroundColor:"#f5821e", boxShadow:"0 3px 1px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.02)"}}>
                                    <h4 className="dropdown-title" style={{color:"#fff"}}>Lodging Type</h4>
                                  </div>
                                  {d.value.Types.map((type, index)=>(
                                    <a href={`/properties?type=${type}`} key={index}>
                                      <div  className="navbar-item drop-item">
                                        {type[0].toUpperCase() + type.slice(1).toLowerCase()}
                                      </div>
                                    </a>
                                    ))
                                  }
                                  </div>
                                  </>
                                  : <Loading /> 
                                
                            }}
                      
          </FirestoreDocument>
          </>
          )
})


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
      subNav: null,
      activeSubnav: null,  
      style: {
      
      },
      navClass: '',
      menuPadding:{},
      isTabletOrMobile: false
    }
    this.checkPathForNav = this.checkPathForNav.bind(this)
    this.componentGracefulUnmount = this.componentGracefulUnmount.bind(this)
  }

  checkPathForNav = () => {
    const path = window.location.pathname
    const propPage = path.match(/(?<=\/properties\/).*$/)
    if(window && path === "/"){
      this.setState({style: {
        position: 'absolute',
        width: '100%',
        background: 'transparent'},
        menuPadding: {
          paddingTop:`${this.nav.current.getBoundingClientRect().height}px`
        }
    })
  }else if(propPage && propPage[0].length > 1){
        this.setState({
          style: {
            position: 'absolute',
            width: '100%',
            background: 'linear-gradient(180deg, #00000073, transparent)'
          },
          navClass:'absolute',
          menuPadding: {
            paddingTop:`${this.nav.current.getBoundingClientRect().height}px`
          }
        })
  }
  this.setState({isTabletOrMobile: window.matchMedia("(max-width: 900px)").matches})
  }


  componentGracefulUnmount(){
    this.setState({
      active: false,
      navBarActiveClass: '',
      dropdown: false,
      dropdownClass: '',
      subNav: null,
      activeSubnav: null,  
      style: {
      
      },
      navClass: '',
      menuPadding:{},
      isTabletOrMobile: false
    });

    window.removeEventListener('beforeunload', this.componentGracefulUnmount);
}


  componentDidMount(){
    this.checkPathForNav()
    window.addEventListener('beforeunload', this.componentGracefulUnmount);
  }

  componentDidUpdate(prevProps){
    if(this.props !== prevProps){
      this.checkPathForNav()
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

  toggleDropDown = (subNavLinks, index) => {
    if(index && this.state.activeSubnav && this.state.activeSubnav !== index){
      let arrow = document.getElementById(`arrow-${this.state.activeSubnav}`)
      arrow.style.transform = (arrow.style.transform == 'rotateZ(180deg)') ? 'rotateZ(0deg)' : 'rotateZ(180deg)'
      this.setState({
        subNav: subNavLinks,
        activeSubnav: index},
        () => {
          arrow = document.getElementById(`arrow-${this.state.activeSubnav}`)
          arrow.style.transform = (arrow.style.transform == 'rotateZ(180deg)') ? 'rotateZ(0deg)' : 'rotateZ(180deg)'
        })
    }
    else{
      let arrow = this.state.activeSubnav ? document.getElementById(`arrow-${this.state.activeSubnav}`) : document.getElementById(`arrow-${index}`)
      this.setState({
        dropdown: !this.state.dropdown,
        subNav: subNavLinks || null,
        activeSubnav: index || null
      },
      () => {
        this.state.dropdown?
        this.setState({dropdownClass: 'dropdown-active'})
        : this.setState({dropdownClass: ''});
      })
      arrow.style.transform = (arrow.style.transform == 'rotateZ(180deg)') ? 'rotateZ(0deg)' : 'rotateZ(180deg)'
    }
  }

  filterList = (props, type) => {
    let filter = []
    props.map(prop => {
        filter.push(prop[`${type}`])
    })
    
    return [... new Set(filter)].sort()
}

  render() {

    const { data } = this.props
    const Links = data.site.siteMetadata.menuLinks


    return (
      <>
      <nav
        className={`navbar ${this.state.navClass}`}
        role="navigation"
        aria-label="main-navigation"
        style={this.state.style}     
        ref={this.nav}>
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item" title="Logo">
              <img src={logo} alt="Smarta" />
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
              {Links && Links.length > 0 &&
          Links.map((Link, index) => {
            return Link.subNav  ? 
            <div className="navbar-item" onClick={()=>this.toggleDropDown(Link.subNav, index)} style={{cursor:"pointer"}} key={index}>
                {Link.name} <div className="dropdown-arrow" id={`arrow-${index}`}><FontAwesomeIcon icon={faChevronDown}/></div>
            </div>
            :
            <>
            <a href={`${Link.link}`} key={index}>
                                      <div  className="navbar-item">
                                      {Link.name}
                                      </div>
                                    </a> 
            </>
            })}
            </div>
            <div className="navbar-end has-text-centered">
              <a
                className="navbar-item"
                href="https://platform.hostfully.com/login.jsp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <img src={hostfully} alt="Hostfully" /> 
                </span>
                Login
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className={`dropdown-submenu ${this.state.dropdownClass}`} style={this.state.menuPadding} onMouseLeave={!this.state.isTabletOrMobile ? ()=>this.toggleDropDown() : null}>
        <Container style={{display:"grid"}}>
          {this.state.isTabletOrMobile && <FontAwesomeIcon icon={faArrowLeft} onClick={()=>this.toggleDropDown()} className="submenu-return-arrow"/>}
          {this.state.subNav && this.state.subNav[0].name !== "propertiesList" ? 
          <>
          {this.state.subNav.map((link, index)=>{
            return link ? 
            <a href={`${link.link}`} key={index}>
              <div  className="navbar-item drop-item">
                {link.name}
              </div>
            </a>
            : null }
          )}
          </>
          :
          <>
            {this.state.subNav && this.state.subNav[0].name == "propertiesList" ?
            <> 
              <PropertiesDropDown filterList={this.filterList}/>
            </>
            : 
            null}
          </>
          }
        </Container>
      </div>
      </>
    )
  }
}

Navbar.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default (props) => (
  <StaticQuery
    query={graphql`
      query NavbarQuery {
        site {
          siteMetadata {
            menuLinks {
              link
              name
              subNav {
                link
                name
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <Navbar data={data} count={count}/>}
  />
)
