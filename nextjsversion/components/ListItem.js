import React from 'react'

export default function ListItem(props) {

    const select= ()=>{
        props.select(props.number)
    }
    return (
        <div  onPointerOver={select} className="flexItems" style={{
            opacity: (props.number ===props.display)? '1': '0.4',
        }}>
          <div className="visHide">
            <p>{props.name}</p>
          </div>
          <div className="marker"
          style={{
            background:(props.number ===props.display)?props.color: 'white'
          }}></div>
        </div>
    )
}