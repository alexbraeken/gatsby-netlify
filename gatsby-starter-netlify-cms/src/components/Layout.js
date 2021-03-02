import React, {useState, useEffect} from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from 'gatsby'
import * as firebase from 'firebase';
import 'firebase/firestore';
import { FirestoreProvider, FirestoreCollection } from "@react-firebase/firestore";
import { config } from "../firebase-config";
import 'bootstrap/dist/css/bootstrap.min.css';
import './all.sass';
import BackToTop from '../components/BackToTop';
import 'react-bnb-gallery/dist/style.css'
import NewsAlert from '../components/newsAlert'



const TemplateWrapper = ({ children }) => {

  const { title, description } = useSiteMetadata()

  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

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
        <meta property="og:title" content={title} />
        <meta property="og:url" content="http://www.smartavillas.com" />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/og-image.jpg`}
        />
        <link href="https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap" 
        rel="stylesheet" 
        />
                  <script type="text/javascript" src="https://platform.hostfully.com/assets/js/pikaday.js"/>

<script type="text/javascript" src="https://platform.hostfully.com/assets/js/leadCaptureWidget_2.0.js"/>
        <script type="text/javascript" src="https://platform.hostfully.com/assets/widgets/searchwidget/searchwidget.js" />
<script>{`(function(m,a,i,l,e,r){ m['MailerLiteObject']=e;function f(){
var c={ a:arguments,q:[]};var r=this.push(c);return "number"!=typeof r?r:f.bind(c.q);}
f.q=f.q||[];m[e]=m[e]||f.bind(f.q);m[e].q=m[e].q||f.q;r=a.createElement(i);
var _=a.getElementsByTagName(i)[0];r.async=1;r.src=l+'?v'+(~~(new Date().getTime()/1000000));
_.parentNode.insertBefore(r,_);})(window, document, 'script', 'https://static.mailerlite.com/js/universal.js', 'ml');

var ml_account = ml('accounts', '2710252', 's7t2o9x9p0', 'load');`}
</script>


    
      </Helmet>
      <FirestoreProvider {...config} firebase={firebase}>
      <NewsAlert />
      <Navbar />
      <div>{children}</div>
      <BackToTop />
      <Footer />
      </FirestoreProvider>
    </div>
  )
}

export default TemplateWrapper
