import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Title() {
    return (
        <div className="top">
            <h2 style={{color:'white'}}>Matthew Pudney</h2>
            <NavLink  style={{color:'white'}} to="/about">About</NavLink>
        </div>
    )
}
