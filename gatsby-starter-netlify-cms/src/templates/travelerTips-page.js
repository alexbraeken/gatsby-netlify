import React from 'react'
import Layout from '../components/Layout'
import {useTranslation, useI18next} from 'gatsby-plugin-react-i18next';

export const TravelerTipsPageTemplate = () => (
  <div className="content">
    
  </div>
)


const TravelerTipsPage = () => {

  return (
    <Layout>
      <TravelerTipsPageTemplate useTranslation={useTranslation()} useI18next={useI18next()}/>
    </Layout>
  )
}


export default TravelerTipsPage
