import React from "react"
import "./SearchError.css"

function SearchError({ textError }) {
  return (
  <p className="searchError">{textError}</p>
  )
}

export default SearchError;