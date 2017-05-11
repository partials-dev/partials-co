import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return <nav>
    <NavLink to='/'>Home</NavLink>
    <NavLink to='/glossolalia'>The New EP</NavLink>
    <NavLink to='/about'>About</NavLink>
  </nav>
}

export default Navigation
