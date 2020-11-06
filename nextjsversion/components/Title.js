import React from 'react'
import { Link } from 'next/link'

export default function Title() {
    return (
        <div className="top">
            <h2 >Matthew Pudney</h2>
            <Link  to="/about">About</Link>
        </div>
    )
}
