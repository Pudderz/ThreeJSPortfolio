import React from 'react'

export default function ListItem(props) {
    const select= ()=>{
        props.select(props.number)
    }
    return (
        <div  onPointerOver={select} className="flexItems" style={{
            opacity: (props.number ===props.display)? '1': '0.4',
            flex: '0 0 auto'
        }}>
          <div className="visHide"
          style={{margin: '20px 50px 20px 0',
            width: 'fit-content',}}
          >
            <p style={{whiteSpace: 'nowrap'}}>{props.name}</p>
          </div>
          <div className="marker"
          style={{
            background:(props.number ===props.display)?props.color: (props.whiteOrBlack==='White')?'white':'black',
            position:'absolute'
          }}></div>
        </div>
    )
}
