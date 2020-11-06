import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Title() {
    return (
        <div className="top">
            <h2 >Matthew Pudney</h2>
            <NavLink  to="/about">About</NavLink>
        </div>
    )
}
