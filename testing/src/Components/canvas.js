import React, { Component, useRef, useState} from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from 'react-three-fiber'
import ReactDOM from 'react-dom'
import Picture from './Picture';


  export function Test() {
    const [speed,setSpeed]=useState(0);
    window.addEventListener("wheel", (e) => {
      setSpeed(speed+e.deltaY * 0.0003);
      console.log('scroll');
    });
    //  useFrame(()=>{
      // position += speed;
      // speed *= 0.8;
      // rounded = Math.round(position);
      // objs.forEach((o, i) => {
      //   o.dist = Math.min(Math.abs(position - i), 1);
      //   o.dist = 1 - o.dist ** 2;
      //   //  elems[i].style.transform = `scale(${1+0.4*o.dist})`
      //   let scale = 1+0.2*o.dist;
      //   console.log(position)
      //   // sketch.meshes[i].position.y = i * 1.2 - position * 1.2;
      //   // sketch.meshes[i].scale.set(scale,scale,scale)
      //   // sketch.meshes[i].material.uniforms.distanceFromCenter.value = o.dist;
      //   let diff = rounded - position;
        // if(attractMode){
        //   position += -(position- attractTo)*0.05;
        //   console.log(position)
        // }else{
        //   position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.05;

        // }
      // })
      
  
    
      // })
    return (
      <Canvas style={{height:'100vh',width:'100vw'}}  camera={{ fov: 75, position: [0, 0, 1.5] }}>
        <ambientLight intensity={0.5} style={{height:'100vh'}}/>

        <Picture
        index={0}
        />
        <Picture
        index={1}
        />
        <Picture
        index={2}
        />
        <Picture
        index={3}
        />
      </Canvas>
    )
  }
  

export default Test;