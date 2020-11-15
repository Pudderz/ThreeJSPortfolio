import Link from 'next/link'
import React from 'react'

export default function Title(props) {
    console.log(props.path)
    return (
        <div className="top">
            {props.path !== '/' && props.path !=='/about' &&(
                <div className="top">
                <Link  href="/">
                <a> <h2 style={{ color: props.primaryColour}}>Matthew Pudney</h2></a>
                </Link>
                
                <Link  href="/about">
                    <a style={{ color: props.primaryColour}}>About</a>
                </Link>
                </div>
            )}
          
        </div>
    )
}
