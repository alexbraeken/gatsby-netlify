import React from 'react'
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
        <meta property="og:url" content="/" />
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
      </Helmet>
      <FirestoreProvider {...config} firebase={firebase}>
      <Navbar />
      <div>{children}</div>
      <BackToTop />
      <Footer />
      </FirestoreProvider>
    </div>
  )
}

export default TemplateWrapper
