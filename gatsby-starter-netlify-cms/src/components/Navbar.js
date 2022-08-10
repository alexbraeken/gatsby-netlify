import React, {useState, useEffect } from 'react'
import { connect } from "react-redux"
import {Link, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import hostfully from '../img/Hostfully logo.webp'
import logo from '../img/smartavillas logo.png'
import Collapse from 'react-bootstrap/Collapse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown} from '@fortawesome/free-solid-svg-icons';
import Select, { components } from "react-select";
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Loading from './Loading'
import BedBathPax from './BedBathPax'
import backArea from '../img/mobile-back-area.svg'
import * as firebase from 'firebase';
import 'firebase/firestore';

if (typeof window !== `undefined`) {
  gsap.registerPlugin(ScrollTrigger)
  gsap.core.globals("ScrollTrigger", ScrollTrigger)
}


const PropertiesDropDown = React.memo((props) => {

  const [options, setOptions] = useState(null)
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

    if(typeof window !== `undefined`){
      try{
        const db = firebase.firestore()
        let propData = {}
        const getFireData = async () => {
          const snapshot = await db
                                  .collection('/Navbar')
                                  .doc('Nav')
                                  .get();
          Object.keys(snapshot.data()).forEach(key=>{
            if(key === 'PropNames'){
              propData.propNames = snapshot.data().PropNames.map(prop => {
                return {value: prop.uid, label: prop.name, city: prop.city }
              })
            }else{
              propData[key] = snapshot.data()[key]
            }
          })
          setOptions(propData)
        }
        getFireData()
      }catch(e){
    
      }
    }
    
    return () => {
      setOptions([])
    }
  }, [])
  

  
  const CustomOption = props => {
    const { data, innerRef, innerProps } = props;
    return (
      <a href={`/properties/${data.value}`}>
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
      </a>
    );
  };

  const onInputChange = (inputValue) => {
    if(window)window.location.href = `/properties/${inputValue}`
  }


  return(
      <>
        <div className="nav-column">
          <a href={`/properties`}>
            <div  className="navbar-item drop-item">
            {t("All Properties")}
            </div>
          </a>
          {options &&
            <Select 
          options={options.propNames}
          onChange={(e)=>onInputChange(e.value)}
          closeMenuOnSelect={true}
          components={{ Option: CustomOption}}
          placeholder={t("Enter Property Name...")}
          styles={customStyles}/>
          }
        </div>
        <div className="nav-column">
          <div className="navbar-item" onClick={()=>setLocationsOpen(!locationsOpen)}>
            <h4 className="dropdown-title" >{t("Location")}</h4><FontAwesomeIcon className={`expand-chevron ${locationsOpen ? "visible" : ""}`} icon={faChevronDown} style={{margin:"auto 0 auto auto"}} />
          </div>
          <Collapse in ={locationsOpen}>
            <div>
            {options && options.Locations.map((city, index)=>(
              <a href={`/properties?city=${city}`} key={index}>
                <div  className="navbar-item drop-item">
                  {city}
                </div>
              </a>
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
            {options &&  options.Types.map((type, index)=>(
              <a href={`/properties?type=${type}`} key={index}>
                <div  className="navbar-item drop-item">
                  {type[0].toUpperCase() + type.slice(1).toLowerCase()}
                </div>
              </a>
              ))
            }
            </div>
          </Collapse>
        </div>                      
      </>
          )
})

const LanguageChange = (props) => {

  const [langs, setLangs] = useState([])

  const {languages, changeLanguage} = useI18next();
  const {t} = useTranslation();

  useEffect(() => {
    let langList = [{name: {en:'languages'}, link:''}]
    languages.map((lng) => {
      let langName = lng
      switch(lng){
        case "en": 
          langName = 'English'
          break;
        case "pt":
          langName = 'Português'
          break;
        case "fr":
          langName = 'Français'
          break;
        case "es":
          langName = 'Español'
          break;
      }
      langList.push({name:langName, link:lng})
    })
    setLangs(langList)
  }, []);

  return (
        <li key={'language-link'} className="">
          <a className='nav-main-link' role="button" tabIndex="0" 
            onClick={() => {
              props.handleSubLinks(langs)
            }}>
            {t('Language')} 
          </a>
        </li>
  )
}

const mapStateToProps = (state) => {
  return  {featuredPropsData: state.featuredPropsData}
}

const ConnectedFeaturedPropertyComp = (props) => {
  const {language} = useI18next();
  const lang = language === "en" ? "en_US" : `${language}_${language.toUpperCase()}`

  return(
        <>
          {props.featuredPropsData ? 
            <div>
              {props.featuredPropsData.map((prop, index)=>{
                  return (
                  <li className="featured-card" key={index}>
                    <Link to={`/properties/${prop.uid}`} target="_blank" rel="noopener noreferrer">
                      <div className="featured-wrap">
                        <div className="featured-image-wrap">
                          <img src={prop.pictitureReducedCloudUrl || prop.picture} alt="artist headshot" />
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
                  )
                })
              }
            </div>
            : <Loading />
          }
        </>
        )
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
    this.menuContainer = React.createRef();
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
      this.tl.fromTo(this.logoContainer.current, 
        {
          width: "200px",
        },
        {
        ease: "Power2.easeOut",
        width: "55px",
        duration: 0.5,
      }).fromTo(this.menuContainer.current, 
        {
          width: "50px",
        },
        {
        ease: "Power2.easeOut",
        width: "0px",
        duration: 0.5,
      },
      "<"
      )
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
    const {language, changeLanguage} = this.props.useI18next;
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
            <div className='menu-tag' ref={this.menuContainer}>
              <h4 style={{paddingBottom:"6px", color: "#000", filter: "drop-shadow(0px 0px 0px black)"}}>menu</h4>
            </div>
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
                    <li key={`list-item-${index}`}>
                      <Link to={`${link.link}`}>
                        {link.name[language]}
                      </Link>
                    </li>
                  })
                }
                <LanguageChange handleSubLinks={this.handleSubLinks}/>
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
                    {this.state.subLinks && this.state.subLinks[0].name.en !== 'languages' && this.state.subLinks[0].name.en !== "propertiesList" && this.state.subLinks.map((link, index) => {
                      return <li key={`sublink-${index}`}><Link to={link.link}>{link.name[language]}</Link></li>
                    })}
                    {this.state.subLinks && this.state.subLinks[0].name.en === "propertiesList" && 
                    <PropertiesDropDown filterList={this.filterList}/>
                    }
                    {this.state.subLinks && this.state.subLinks[0].name.en === "languages" && 
                    this.state.subLinks.map((lng, index)=>{
                      return  index > 0 && <li key={lng.link} className="">
                                <Link
                                  to="#"
                                  className=""
                                  onClick={(e) => {
                                    e.preventDefault();
                                    changeLanguage(lng.link);
                                  }}>
                                  {lng.name} 
                                </Link>
                              </li>
                    })
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
