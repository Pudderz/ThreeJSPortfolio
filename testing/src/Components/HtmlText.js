import React from 'react'

export default function HtmlText(props) {
    console.log(props.displayNumber)
    return (
        <div>
            {props.displayNumber==0 &&
            (<h1>Test</h1>)
            }
            
        </div>
    )
}
