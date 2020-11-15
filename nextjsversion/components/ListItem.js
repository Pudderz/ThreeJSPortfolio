import React from 'react'

export default function ListItem(props) {
    console.log(props.whiteOrBlack)
    const select= ()=>{
        props.select(props.number)
    }
    return (
        <div  onPointerOver={select} className="flexItems" style={{
            opacity: (props.number ===props.display)? '1': '0.4',
            flex: '0 0 auto'
        }}>
          <div className="visHide">
            <p style={{whiteSpace: 'nowrap'}}>{props.name}</p>
          </div>
          <div className="marker"
          style={{
            background:(props.number ===props.display)?props.color: (props.whiteOrBlack==='White')?'white':'black',
          }}></div>
        </div>
    )
}
