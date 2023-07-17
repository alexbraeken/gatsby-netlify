import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { IndexPageTemplate } from '../../templates/index-page'

const IndexPagePreview = (props) => {
  const data = props.entry.getIn(['data']).toJS()


  useEffect(() => {
    console.log(props.entry)

  }, [props])

  if (data) {

    console.log(data.title)
    return (
      <IndexPageTemplate
        image={props.getAsset(data.image)}
        title={data.title}
        heading={data.heading}
        subheading={data.subheading}
        mainpitch={data.mainpitch}
        pitchImage={props.getAsset(data.pitchImage)}
        news={data.news}
        langTitles={data.langTitles}
        clipPathImage={props.getAsset(data.clipPathImage)}
        tripImage={props.getAsset(data.tripImage)}
        listImage={props.getAsset(data.listImage)}
        trustedImage={props.getAsset(data.trustedImage)}
        locationImage={props.getAsset(data.locationImage)}
        accommodationsImage={props.getAsset(data.accommodationsImage)}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default IndexPagePreview
