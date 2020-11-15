import Link from 'next/link'
import React, {useEffect, useRef} from 'react'
import Buttons from "./Buttons";
import { Button, duration, Fab, Tooltip } from "@material-ui/core";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { TweenMax } from 'gsap/dist/gsap';

export default function Title(props) {
    const arrow= useRef()
    const animation = useRef(null)
    useEffect(()=>{
        if(arrow.current!== null){
                animation.current = TweenMax.fromTo(arrow.current, {
                rotationZ : '0deg',
            }, {
                rotationZ :'-45deg',
                duration:0.3,
                paused:true,
            })
        }
        return()=>{
            animation.current.kill();

        }
    },[])
    console.log(props.path)
    const pointerOver=e=>{
        //  arrow.current.style.transform= "rotateZ(-45deg)"
        animation.current.play()
    }
    const pointerLeave=e=>{
        //  arrow.current.style.transform= "rotateZ(0deg)"
         animation.current.reverse()
    }
    if(props.path !== '/' && props.path !=='/about'){
        return(
            <>
            <div className="top">
                <Link  href="/">
                    <Tooltip title="Home page">
                    <a style={{ color: props.primaryColour}}> Matthew Pudney</a>    
                    </Tooltip>
                
                </Link>
                
                <Link  href="/about">
                    <Tooltip title="About page">
                     <a style={{ color: props.primaryColour}}>About</a>   
                    </Tooltip>
                    
                </Link>
            </div>
            
                <Link href="/">
                    <Tooltip title="Go Home">
                    <Fab style={{position:'fixed', bottom:'10px', right:'10px', zIndex:'2'}} onPointerEnter={pointerOver} onPointerLeave={pointerLeave}>
                    <ArrowForwardIcon ref={arrow}/>
                    </Fab>
                    </Tooltip>
                </Link>    
            
            
            
            </>
        )
    }else{
      return (
        <div className="top"></div>
        )  
    }
    
}
