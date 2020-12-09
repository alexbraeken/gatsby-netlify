import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import github from '../img/github-icon.svg'
import logo from '../img/logo.svg'
import Loading from '../components/Loading'
import Container from 'react-bootstrap/Container'
import { FirestoreCollection } from "@react-firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown} from '@fortawesome/free-solid-svg-icons';


const PropertiesDropDown = React.memo((props) => {
  return(
    <>
  <div style={{gridColumn: 1}}>
          <a href={`/properties`}>
            <div  className="navbar-item">
              All Properties
            </div>
          </a>
          </div>
          <FirestoreCollection path="/Properties/">
                      {d => {
                                return (!d.isLoading && d.value) ?  
                                <>
                                {console.log(d.value)}
                                <div style={{gridColumn:2}}>
                                  <h4>City</h4>
                                  <hr />
                                  {props.filterList(d.value, "city").map((city, index)=>(
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
                                  {props.filterList(d.value, "type").map((type, index)=>(
                                    <a href={`/properties?type=${type}`} key={index}>
                                      <div  className="navbar-item">
                                        {type[0].toUpperCase() + type.slice(1).toLowerCase()}
                                      </div>
                                    </a>
                                    ))
                                  }
                                  </div>
                                  </>
                                  : <Loading /> 
                                
                            }}
                      
          </FirestoreCollection>
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

  toggleDropDown = (subNavLinks, index) => {
    console.log(subNavLinks)
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
    
    return [... new Set(filter)]
}

  render() {

    const { data } = this.props
    const Links = data.site.siteMetadata.menuLinks

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
              {console.log(Links)}
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
          {this.state.subNav && this.state.subNav[0].name !== "propertiesList" ? 
          <>
          {this.state.subNav.map((link, index)=>{
            return link ? 
            <a href={`${link.link}`} key={index}>
              <div  className="navbar-item">
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
