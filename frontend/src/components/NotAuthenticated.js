import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../style/NotFound.css'

export default class NotAuthenticated extends Component {
  render() {
    return (
      <div id='containerNotFound'>
        <div className="container-fluid mt-5">
            <h5 className="text-center">
                Please, login or register!
            </h5>
        </div>
      </div>
    )
  }
}