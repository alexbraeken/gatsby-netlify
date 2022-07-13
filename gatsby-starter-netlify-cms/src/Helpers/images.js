// Helper functions.
const getBgImageType = imageData => imageData.layout === 'fixed' ? 'fixed' : 'fluid'
const getAspectRatio = imageData => imageData.width / imageData.height
const getPlaceholder = imageData => {
  if (imageData.placeholder) {
    return imageData.placeholder.fallback.includes(`base64`) ?
      { base64: imageData.placeholder.fallback }
      : { tracedSvg: imageData.placeholder.fallback }
  }
  return {}
}

const convertToBgImage = imageData => {
  if (imageData && imageData.layout) {
    const returnBgObject = {}
    const bgType = getBgImageType(imageData)
    const aspectRatio = getAspectRatio(imageData)
    const placeholder = getPlaceholder(imageData)

    returnBgObject[bgType] = {
      ...imageData.images.fallback,
      ...placeholder,
      aspectRatio,
    }
    return returnBgObject
  }
  return {}
}

export default convertToBgImage