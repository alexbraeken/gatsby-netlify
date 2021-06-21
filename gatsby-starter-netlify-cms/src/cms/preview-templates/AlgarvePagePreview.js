import React from 'react'
import PropTypes from 'prop-types'
import { AlgarvePageTemplate } from '../../templates/algarve-page'

const AlgarvePagePreview = ({ entry, widgetFor }) => (
  <AlgarvePageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
)

AlgarvePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default AlgarvePagePreview
