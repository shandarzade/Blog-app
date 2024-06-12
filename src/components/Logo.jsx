import React from 'react'
import logo from '../assets/shandar-favicon.png'

function Logo({width = "100px"}) {
  return (
    <img src={logo} alt="Logo" style={{width: "60px"}}/>
  )
}

export default Logo