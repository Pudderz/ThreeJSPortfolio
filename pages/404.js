import React from 'react'

export default function Custom404() {
    const divStyles ={
        position: 'absolute',
        top:0,
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
        margin: 'auto',
        maxWidth:'700px',
        height: '300px',
        padding:'20px',
        boxSizing:'border-box',
        
    }
    return (
        <div style={{backgroundColor:'#191c1d', minHeight:'100vh'}}>
            {/* <h1 style={{color:'white', margin:'auto', paddingTop:'50px', width:'fit-content'}}>404 - Page Not Found</h1> */}
            <div style={divStyles}>
            <h2 style={{color: 'white', margin: '0', fontSize: '3em'}}> Resource not found</h2>
            <h3 style={{color: 'grey', margin: '0', fontSize: '3em'}}> Error 404</h3>
            <p style={{color: 'white'}}>The requested resource could not be found</p>
        </div>
        </div>
    )
}
