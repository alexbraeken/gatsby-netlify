import React, {useState, useEffect} from 'react'
import { connect } from "react-redux"
import { Helmet } from 'react-helmet'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from 'gatsby'
import {useTranslation, useI18next, Link} from 'gatsby-plugin-react-i18next';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { FirestoreProvider } from "@react-firebase/firestore";
import { config } from "../firebase-config";
import 'bootstrap/dist/css/bootstrap.min.css';
import './all.sass';
import BackToTop from '../components/BackToTop';
import 'react-bnb-gallery/dist/style.css'
import NewsAlert from '../components/newsAlert'
import CookieBannerCookieHub from '../components/CookieBannerCookieHub'
import ConnectedFavourites from '../components/Favourites';
import PropTypes from "prop-types"

const mapStateToProps = (state) => {
    return  {featuredProps: state.featuredProps}
  }

const ConnectedHelmetComp = (props) => {

  const [featuredIds, setFeaturedIds] = useState([])
  const uri = "https://api.hostfully.com/v2/properties?tags=featured&agencyUid=ab8e3660-1095-4951-bad9-c50e0dc23b6f"
  const {t} = useTranslation();

useEffect(() => {
  if(!props.featuredProps || props.featuredProps?.length < 1 && typeof window !== `undefined`){
    fetch(uri, {
      headers:{
        "X-HOSTFULLY-APIKEY": process.env.GATSBY_HOSTFULLY_API_KEY
      }
    })
          .then(response => {
              
              return response.text()
          })
          .then(data => {
            props.dispatch({type: 'ADD_FEATURED', propIds: JSON.parse(data).propertiesUids})
            setFeaturedIds(JSON.parse(data).propertiesUids)
          })
  }
  
  return () => {
    setFeaturedIds([])
  }
}, [])

useEffect(() => {
  if(featuredIds && featuredIds.length > 0 && featuredIds !== props.featuredIds && typeof window !== `undefined`){
    try{
      const db = firebase.firestore()
      let featuredPropsList = []
  
      const getFireData = async () => {
        const snapshot = await db
                                .collection('Properties')
                                .where(firebase.firestore.FieldPath.documentId(), 'in', featuredIds)
                                .get();
        snapshot.docs.forEach((doc) => {
          featuredPropsList.push(doc.data())
        })
        props.dispatch({type: 'ADD_FEATURED_DATA', featuredPropsData: featuredPropsList})
      }
      
      getFireData()
    }catch(e){
  
    }
  
  }

  return () => {
    
  }
}, [featuredIds])


return (
<Helmet>
        <html lang="en" />
        <title>{props.title}</title>
        <meta name="description" content={props.description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/logo.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/logo.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/logo.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/logo.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={props.title} />
        <meta property="og:url" content="http://www.smartavillas.com" />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/og-image.jpg`}
        />
        <link href="https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap" 
        rel="stylesheet" 
        />
        <script type="application/ld+json">
    {`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "url": "https://www.smartavillas.com",
          "name": "Smartavillas.com",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+351 281 027 089",
            "contactType": "${t("Reservations & Customer Support")}"
          }
        }
      `}
  </script>      
<script type="text/javascript" src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" async></script>
<script type="text/javascript" src="https://platform.hostfully.com/assets/js/pikaday.js" />
        
<script type="text/javascript" src="https://platform.hostfully.com/assets/js/leadCaptureWidget_2.0.js"/>

    
      </Helmet>
)
}

const HelmetComp = connect(mapStateToProps)(ConnectedHelmetComp)

const TemplateWrapper = ({ children, pathKey, propTitle, propDescription, navFill, navClass }) => {

  let { title, description } = useSiteMetadata()

  title = propTitle || title
  description = propDescription || description

  const [path, setPath] = useState('')

  const {t} = useTranslation();

useEffect(() => {
  setPath(pathKey)
  return () => {
    setPath('')
  }
}, [pathKey])


  return (
    <div>
      <HelmetComp title={title} description={description}/>
      <FirestoreProvider {...config} firebase={firebase}>
      <NewsAlert/>
      <Navbar key={path} navClass={navClass}/>
      <div className="layout-children">{children}</div>
      <BackToTop />
      <Footer useTranslation={useTranslation(["translation"])} useI18next={useI18next()}/>
      <ConnectedFavourites useTranslation={useTranslation(["translation"])} useI18next={useI18next()}/>
      <CookieBannerCookieHub googleTrackingId={process.env.GATSBY_GOOGLE_TRACKING_ID} cookieHubId={process.env.GATSBY_COOKIEHUB_ID} />
      </FirestoreProvider>
    </div>
  )
}

export default TemplateWrapper
