import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../style/NotFound.css'

export default class NotFound extends Component {
  render() {
    return (
      <div id='containerNotFound'>
        <div className="container-fluid mt-5">
            <h5 className="text-center">
                No match for {window.location.pathname}
            </h5>
            <h5 className="text-center">
                <Link to='/'> Redirect to the main page </Link> ?
            </h5>
        </div>
      </div>
    )
  }
}