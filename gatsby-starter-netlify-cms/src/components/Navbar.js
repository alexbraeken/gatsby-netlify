import React, {useState, useEffect } from 'react'
import { connect } from "react-redux"
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import hostfully from '../img/Hostfully-Blue-Green-Icon.png'
import logo from '../img/smartavillas logo.png'
import Container from 'react-bootstrap/Container'
import Collapse from 'react-bootstrap/Collapse';
import { FirestoreDocument } from "@react-firebase/firestore";
import { FirestoreCollection } from "@react-firebase/firestore"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import Select, { components } from "react-select";
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Masonry from 'react-masonry-component';
import Loading from './Loading'
import BedBathPax from './BedBathPax'
import backArea from '../img/mobile-back-area.svg'

if (typeof window !== `undefined`) {
  gsap.registerPlugin(ScrollTrigger)
  gsap.core.globals("ScrollTrigger", ScrollTrigger)
}

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <FontAwesomeIcon className={`expand-chevron`} icon={faChevronDown} style={{margin:"auto 0 auto auto"}} />
    </components.DropdownIndicator>
  );
};

const PropertiesDropDown = React.memo((props) => {

  const [data, setData] = useState(null)
  const [options, setOptions] = useState([])
  const [locationsOpen, setLocationsOpen] = useState(false)
  const [typesOpen, setTypesOpen] = useState(false)

  const {t} = useTranslation();

  const customStyles = {
    menu: () => ({
      width: "100%",
      overflowX: "hidden",
      fontSize: "font-size: calc(20px + 30 * (100vw - 320px) / 1080)"
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      borderRadius: 0,
      boxShadow: 'none'
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      "svg": {
        fill: "#f5821e"
      }
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
  <div className="nav-column">
          <Link to={`/properties`}>
            <div  className="navbar-item drop-item">
            {t("All Properties")}
            </div>
          </Link>
          <Select 
          options={options}
          onChange={(e)=>onInputChange(e.value)}
          closeMenuOnSelect={true}
          components={{ Option: CustomOption, DropdownIndicator }}
          placeholder={t('Or Search By Name...')}
          styles={customStyles}/>
          </div>
          <FirestoreDocument path="/Navbar/Nav">
                      {d => {
                                return (!d.isLoading && d.value) ?  
                                <>
                                {setData(d.value)}
                                <div className="nav-column">
                                  <div className="navbar-item" onClick={()=>setLocationsOpen(!locationsOpen)}>
                                    <h4 className="dropdown-title" >{t("Location")}</h4><FontAwesomeIcon className={`expand-chevron ${locationsOpen ? "visible" : ""}`} icon={faChevronDown} style={{margin:"auto 0 auto auto"}} />
                                  </div>
                                  <Collapse in ={locationsOpen}>
                                    <div>
                                    {d.value.Locations.map((city, index)=>(
                                      <Link to={`/properties?city=${city}`} key={index}>
                                        <div  className="navbar-item drop-item">
                                          {city}
                                        </div>
                                      </Link>
                                      ))
                                    }
                                    </div>
                                  </Collapse>
                                  </div>
                                  <div className="nav-column">
                                  <div className="navbar-item" onClick={()=>setTypesOpen(!typesOpen)}>
                                    <h4 className="dropdown-title" >{t("Property Type")}</h4><FontAwesomeIcon className={`expand-chevron ${typesOpen ? "visible" : ""}`} icon={faChevronDown} style={{margin:"auto 0 auto auto"}} />
                                  </div>
                                  <Collapse in ={typesOpen}>
                                    <div>
                                    {d.value.Types.map((type, index)=>(
                                      <Link to={`/properties?type=${type}`} key={index}>
                                        <div  className="navbar-item drop-item">
                                          {type[0].toUpperCase() + type.slice(1).toLowerCase()}
                                        </div>
                                      </Link>
                                      ))
                                    }
                                    </div>
                                  </Collapse>
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

const mapStateToProps = (state) => {
  return  {featuredProps: state.featuredProps}
}

const ConnectedFeaturedPropertyComp = (props) => {
  const {t} = useTranslation();
  const {language} = useI18next();
  const lang = language === "en" ? "en_US" : `${language}_${language.toUpperCase()}`

  return(
  <FirestoreCollection path="/Properties/">
      {data => {
          return (!data.isLoading && data.value) ?
          <>
          {props.featuredProps && props.featuredProps.length > 0 && 
            <div>
              {data.value?.map((prop, index)=>{
                  return (props.featuredProps.indexOf(prop.uid)!== -1) && 
                  <li class="featured-card" key={index}>
                    <Link to={`/properties/${prop.uid}`} target="_blank" rel="noopener noreferrer">
                      <div className="featured-wrap">
                        <div className="featured-image-wrap">
                          <img src={prop.picture} alt="artist headshot" />
                        </div>
                        <div className="featured-text-wrap">
                          <BedBathPax bedrooms={prop.bedrooms} bathrooms={prop.bathrooms} baseGuests={prop.baseGuests} color="rgba(256,256,256)"/>
                        </div>
                        <div className="featured-overlay"></div>
                      </div>
                      <div className='featured-description'>
                        <h4>{prop.name}</h4>
                        <span>{prop.shortDescriptions ? prop.shortDescriptions[lang] : prop.shortDescription}</span>
                      </div>
                    </Link>
                  </li>
                })
              }
            </div>
          }
            </>
          : <Loading />
        }
      }
    </FirestoreCollection>)
}

const FeaturedPropertyComp = connect(mapStateToProps)(ConnectedFeaturedPropertyComp)

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.nav = React.createRef();
    this.dropdownArrow = React.createRef();
    this.mainLinks = React.createRef();
    this.subLinks = React.createRef();
    this.logoContainer = React.createRef();
    this.navMenu = React.createRef();
    this.tl = gsap.timeline({
      scrollTrigger: {
        start: 50,
        end: 100, 
        scrub: 1, 
      }
    });
    this.state = {
      active: false,
      rightMenuActive: false,
      linkContentActive: false,
      staticContent: true,
      subLinks: [],
    }
    this.handleNav = this.handleNav.bind(this)
    this.handleRightMenu = this.handleRightMenu.bind(this)
    this.handleLinkContent = this.handleLinkContent.bind(this)
    this.handleSubLinks = this.handleSubLinks.bind(this)
  }


  componentDidMount(){
    this.tl.to(this.logoContainer.current, {
      ease: "Power2.easeOut",
      width: "55px",
      duration: 0.5,
    })
  }

  componentDidUpdate(){

  }

  handleNav = () => {
    if(this.state.active){
      if(typeof window !== `undefined` && window.scrollY > 100){
        gsap.to(this.logoContainer.current, {
          ease: "Power2.easeOut",
          width: "55px",
          duration: 0.5,
        });
      }
      this.setState({active: !this.state.active, rightMenuActive: false, linkContentActive: false, subLinks : []})
      setTimeout(()=>{this.navMenu.current.style.width = "0"}, 500)
    }else{ 
      this.navMenu.current.style.width = "100%"
      if(typeof window !== `undefined` && window.scrollY > 100){
        gsap.to(this.logoContainer.current, {
          ease: "Power2.easeOut",
          width: "200px",
          duration: 0.5,
        });
      }

      this.setState({active: !this.state.active, staticContent: true, })
    }
  }

  handleRightMenu = () => {
    this.setState({rightMenuActive: !this.state.rightMenuActive})
  }

  handleLinkContent = () => {
    this.setState({linkContentActive: !this.state.linkContentActive})
  }

  handleSubLinks = (links) => {
    this.setState({subLinks : []}, ()=>{
      this.setState({subLinks : links, rightMenuActive: true, staticContent: false})
    })
  }


  filterList = (props, type) => {
    let filter = new Set()
    props.forEach(prop => {
        filter.add(prop[`${type}`])
    })
    
    return [...filter].sort()
}

  render() {

    const { data } = this.props
    const {language} = this.props.useI18next;
    const links = data.site.siteMetadata.menuLinks
    


    return (
      <header>
        <div className='hl'>
          <Link to="/">
            <div className={`header-logo`} ref={this.logoContainer}>
              <img src={logo} alt="Smarta logo" width="200" />
            </div>
          </Link>
        </div>
        <div className='hr'>
          <div className={`menu-btn ${this.state.active ? 'active': ''}`} onClick={()=>this.handleNav()}>
            <svg height="80" width="80">
              <defs>
                <linearGradient id="gradient">
                  <stop offset="0%"  stopColor="#ffa600"/>
                  <stop offset="100%" stopColor="#ff6200"/>
                </linearGradient>
              </defs>
              <circle id="firstCircle" cx="40" cy="40" r="25" stroke="url(#gradient)" fill="transparent" strokeDasharray="200" strokeDashoffset="0" strokeWidth="2"></circle>
            </svg>
            <div>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div className={`nav-menu ${this.state.active ? 'active': ''}`} ref={this.navMenu}>
          <div className='lm'>
            <div className='nav-container'>
            {this.state.active &&
              <nav>
                <ul ref={this.mainLinks}>
                {links && links.length > 0 &&
                  links.map((link, index) => {
                    return link.subNav ? (
                      <li key={`list-item-${index}`}>
                        <a className='nav-main-link' role="button" tabIndex="0" onClick={()=>this.handleSubLinks(link.subNav)} key={`list-item-link-${index}`}>{link.name[language]}</a>
                      </li>
                    )
                    :
                    <li key={index}>
                      <Link to={`${link.link}`}>
                        {link.name[language]}
                      </Link>
                    </li>
                  })
                }
                </ul>
              </nav>}
            </div>
          </div>
          <div className={`rm ${this.state.active && this.state.rightMenuActive ? 'active': ''}`}>
            <div className='back-btn-container' onClick={()=>this.handleRightMenu()}>
              <img src={backArea} />
              <div className='back-btn'>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className='r-content'>
              <div className='r-featured'>
                <div className={`link-content ${this.state.active && this.state.linkContentActive ? 'active': ''}`}>
                </div>
                {this.state.staticContent && 
                <>
                  <h2 style={{textAlign:"center", fontSize: "3rem", fontWeight:"bold"}}><div dangerouslySetInnerHTML={{__html: this.props.useTranslation.t('featured')}} /></h2>
                  <div className='rm-static-content'>
                  <FeaturedPropertyComp />
                  </div>
                </>
                }
                {this.state.subLinks.length > 0 && 
                <div className="sub-menu-links-container">
                  <ul id="sublinks-ul" ref={this.subLinks}>
                    {this.state.subLinks && this.state.subLinks[0].name.en !== "propertiesList" && this.state.subLinks.map((link, index) => {
                      return <li key={`sublink-${index}`}><Link to={link.link}>{link.name[language]}</Link></li>
                    })}
                    {this.state.subLinks && this.state.subLinks[0].name.en === "propertiesList" && 
                    <PropertiesDropDown filterList={this.filterList}/>
                    }
                  </ul>
                </div>
                }
              </div>
            </div>  
          </div>
        </div>
      </header>
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
                fr
                es
              }
              subNav {
                link
                name {
                  en
                  pt
                  fr
                  es
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <Navbar data={data} count={count} useI18next={useI18next()} useTranslation={useTranslation()} navClass={props.navClass}/>}
  />
)}
