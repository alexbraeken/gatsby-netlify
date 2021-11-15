import React, {useState, useEffect } from 'react'
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import hostfully from '../img/Hostfully-Blue-Green-Icon.png'
import logo from '../img/smartavillas logo.png'
import Container from 'react-bootstrap/Container'
import { FirestoreDocument } from "@react-firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select'


const PropertiesDropDown = React.memo((props) => {

  const [data, setData] = useState(null)
  const [options, setOptions] = useState([])

  const {t} = useTranslation();

  const customStyles = {
    menu: () => ({
      width: "100%",
      overflowX: "hidden"
    })
  }
  
  useEffect(() => {
    if(data){
      let propArray= data.PropNames.map(prop => {
        return {value: prop.uid, label: prop.name, city: prop.city }
      })
      setOptions(propArray)
    }
  }, [data])
  

  const CustomOption = props => {
    const { data, innerRef, innerProps } = props;
    return (
      <Link to={`/properties/${data.value}`}>
      <div ref={innerRef} {...innerProps} className="nav-name-search">
        <div  className="nav-prop-name">
        <div>{data.label}</div>
        </div>
        <div className="nav-prop-location-container">
          <div  className="nav-prop-location">
            {data.city}
          </div>
        </div>
        </div> 
      </Link>
    );
  };

  const onInputChange = (inputValue) => {
    if(window)window.location.href = `/properties/${inputValue}`
  }


  return(
    <>
  <div className="nav-column-1">
    <div className="navbar-item" style={{
      backgroundColor:"#f5821e", 
      boxShadow:"0 3px 1px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.02)"}}>
      <h4 className="dropdown-title" style={{color:"#fff"}}>{t("All")}</h4>
    </div>
          <Link to={`/properties`}>
            <div  className="navbar-item drop-item">
            {t("All Properties")}
            </div>
          </Link>
          <Select 
          options={options}
          onChange={(e)=>onInputChange(e.value)}
          closeMenuOnSelect={true}
          components={{ Option: CustomOption}}
          placeholder="Properties"
          styles={customStyles}/>
          </div>
          <FirestoreDocument path="/Navbar/Nav">
                      {d => {
                                return (!d.isLoading && d.value) ?  
                                <>
                                {setData(d.value)}
                                <div className="nav-column-2">
                                  <div className="navbar-item" style={{backgroundColor:"#f5821e", boxShadow:"0 3px 1px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.02)"}}>
                                    <h4 className="dropdown-title" style={{color:"#fff"}}>{t("Location")}</h4>
                                  </div>
                                  
                                  {d.value.Locations.map((city, index)=>(
                                    <Link to={`/properties?city=${city}`} key={index}>
                                      <div  className="navbar-item drop-item">
                                        {city}
                                      </div>
                                    </Link>
                                    ))
                                  }
                                  </div>
                                  <div className="nav-column-3">
                                  <div className="navbar-item" style={{backgroundColor:"#f5821e", boxShadow:"0 3px 1px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.02)"}}>
                                    <h4 className="dropdown-title" style={{color:"#fff"}}>{t("Property Type")}</h4>
                                  </div>
                                  {d.value.Types.map((type, index)=>(
                                    <Link to={`/properties?type=${type}`} key={index}>
                                      <div  className="navbar-item drop-item">
                                        {type[0].toUpperCase() + type.slice(1).toLowerCase()}
                                      </div>
                                    </Link>
                                    ))
                                  }
                                  </div>
                                  </>
                                  : null 
                                
                            }}
                      
          </FirestoreDocument>
          </>
          )
})

const LanguageChange = (props) => {

  const {languages, changeLanguage} = useI18next();
  

  return (
    <ul className="sub-menu">
      {languages.map((lng) => (
        <li key={lng} className="languages-item">
          <Link
            to="#"
            className="languages-sub-item"
            onClick={(e) => {
              e.preventDefault();
              changeLanguage(lng);
            }}>
            {lng.toUpperCase()} 
          </Link>
        </li>
      ))}
    </ul>
  )
}



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
      burgerStyle: {},
      lang: 'en'
    }
    this.checkPathForNav = this.checkPathForNav.bind(this)
    this.componentGracefulUnmount = this.componentGracefulUnmount.bind(this)
  }

  checkPathForNav = () => {

    const isTabletOrMobile = window.matchMedia("(max-width: 900px)").matches
    const padding =  isTabletOrMobile ? "10px" : `${this.nav.current.getBoundingClientRect().height}px`
    const top = document.getElementsByClassName("newsAlert")?.[0].getBoundingClientRect().height || 0
    
    const {originalPath} = this.props.useI18next;
    const propPage = originalPath.match(/(?:\/properties\/)([^\?]+)(?=\?*)/)

    if(window && originalPath === "/"){
      this.setState({style: {
        position: 'absolute',
        width: '100%',
        background: 'transparent'},
        menuPadding: {
          paddingTop: padding
        }
    })
  }else if(propPage?.[1].length > 1){
        this.setState({
          style: {
            position: 'absolute',
            width: '100%',
            background: 'linear-gradient(180deg, #00000073, transparent)'
          },
          navClass:'absolute',
          menuPadding: {
            paddingTop: padding
          },
          burgerStyle: isTabletOrMobile ? {color: "#fff"} : {color : "#000"}
        })
  }else{
    this.setState({
      style: {
       
      },
      navClass:'',
      menuPadding: {
      },
      burgerStyle: {}
    })
  }

  if(isTabletOrMobile) this.setState((state, props)=>({
    ...state,
    menuPadding:{
        ...state.menuPadding,
        top: `${top}px`
    }
    }), ()=>{
  }); 

  this.setState({isTabletOrMobile: isTabletOrMobile})
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
    this.checkPathForNav();
    const { language } = this.props.useI18next;
    this.setState({lang: language})
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
      arrow.style.transform = (arrow.style.transform === 'rotateZ(180deg)') ? 'rotateZ(0deg)' : 'rotateZ(180deg)'
      this.setState({
        subNav: subNavLinks,
        activeSubnav: index},
        () => {
          arrow = document.getElementById(`arrow-${this.state.activeSubnav}`)
          arrow.style.transform = (arrow.style.transform === 'rotateZ(180deg)') ? 'rotateZ(0deg)' : 'rotateZ(180deg)'
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
     if(arrow)arrow.style.transform = (arrow.style.transform === 'rotateZ(180deg)') ? 'rotateZ(0deg)' : 'rotateZ(180deg)'
    }
  }

  filterList = (props, type) => {
    let filter = new Set()
    props.forEach(prop => {
        filter.add(prop[`${type}`])
    })
    
    return [...filter].sort()
}


hoverArrow = () => {
  let arrow = document.getElementById(`arrow-language`)
  arrow.style.transform = (arrow.style.transform === 'rotateZ(0deg)') ? 'rotateZ(180deg)' : 'rotateZ(0deg)'
}



  render() {

    const { data } = this.props
    const {language} = this.props.useI18next;
    const links = data.site.siteMetadata.menuLinks
    


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
              role="button"
              tabIndex="0"
              aria-label="Menu"
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
              onKeyDown={() => this.toggleHamburger()}
              style={this.state.burgerStyle}
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
              {links && links.length > 0 &&
          links.map((link, index) => {
            return link.subNav  ? 
            <div className="navbar-item" role="button" tabIndex="0" onClick={()=>this.toggleDropDown(link.subNav, index)} onKeyDown={(e)=>{if(e.key === 'Enter'){this.toggleDropDown(link.subNav, index)}}} style={{cursor:"pointer"}} key={index}>
                {link.name[this.state.lang]} <div className="dropdown-arrow" id={`arrow-${index}`}><FontAwesomeIcon icon={faChevronDown}/></div>
            </div>
            :
            <>
            <Link to={`${link.link}`} key={index}>
                                      <div  className="navbar-item">
                                      {link.name[this.state.lang]}
                                      </div>
                                    </Link> 
            </>
            })}
            </div>
            <div className="languages navbar-end has-text-centered">
              <ul>
                <li style={{display: "flex"}}>
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
                </li>
                <li className="languages-item">
                    <a role="button" tabIndex="0" className="navbar-item language-anchor" onMouseEnter={()=> {this.hoverArrow()}} onMouseLeave={()=>this.hoverArrow()}>{language.toUpperCase()}<div className="dropdown-arrow" id={`arrow-language`} ><FontAwesomeIcon icon={faChevronDown}/></div></a>
                    <LanguageChange getPath={this.getOriginalPath}/>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className={`dropdown-submenu ${this.state.dropdownClass}`} style={this.state.menuPadding} 
      onMouseLeave={!this.state.isTabletOrMobile ? ()=>this.toggleDropDown() : null}>
        <Container style={{display:"grid"}}>
          {this.state.isTabletOrMobile && <FontAwesomeIcon icon={faArrowLeft} onClick={()=>this.toggleDropDown()} className="submenu-return-arrow"/>}
          {this.state.subNav && this.state.subNav[0].name.en !== "propertiesList" ? 
          <>
          {this.state.subNav.map((link, index)=>{
            return link ? 
            <Link to={`${link.link}`} key={index}>
              <div  className="navbar-item drop-item">
                {link.name[this.state.lang]}
              </div>
            </Link>
            : null }
          )}
          </>
          :
          <>
            {this.state.subNav && this.state.subNav[0].name.en === "propertiesList" ?
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

export default (props) => {

  return(
  <StaticQuery
    query={graphql`
      query NavbarQuery {
        site {
          siteMetadata {
            menuLinks {
              link
              name{
                en
                pt
              }
              subNav {
                link
                name {
                  en
                  pt
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <Navbar data={data} count={count} useI18next={useI18next()} useTranslation={useTranslation()}/>}
  />
)}
