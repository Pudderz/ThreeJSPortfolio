import React from 'react'
import { Link } from "react-router-dom";
export default function HtmlText(props) {
    console.log(props.number)
    const linkToContacts = (e)=>{
        e.preventDefault()
        props.linkTo()
    };
    return (
        <div 
        // style={{display: `${(props.attractMode)?'none':'block'}`,}}
        >
            {props.number==0 &&
            (<h1>0</h1>)
            }
            {props.number==1 &&
            (<h1>1</h1>)
            }
            {props.number==2 &&
            (<h1>2</h1>)
            }
            {props.number==3 &&
            (<h1>3</h1>)
            }
            <Link to="/contact" onClick={linkToContacts} className="button">Contact</Link>
        </div>
    )
}
