import React from "react"
import { Router } from "@reach/router"
import PropertyTemplate from "../templates/property-page"

const Property = () => {
  return (
      <Router>
        <PropertyTemplate path="/property:id" />
      </Router>
  )
}
export default Property