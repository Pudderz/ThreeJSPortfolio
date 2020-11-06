import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import ReactDOM from "react-dom";
import picture from "../images/elite.png";
import { TweenMax } from "gsap/gsap-core";
import { TimelineMax, Power3, Power4 } from "gsap";
const fragmentShader = `
    uniform float isMiddle;
    uniform float uTime;
    uniform float distanceFromCenter;
    uniform sampler2D texture1;
    uniform vec4 resolution;
    varying vec2 vUv;
    varying vec3 vPosition;
    float PI = 3.141592653589793238;
    void main(){

          vec4 t = texture2D(texture1, vUv);
          float bw = (t.r + t.b + t.g )/3.;
          vec4 another = vec4(bw,bw,bw,1);
           gl_FragColor = mix(another,t,distanceFromCenter);
           gl_FragColor.a = clamp(distanceFromCenter, 0.8, 1.);
  
       
  
    }
        
    `;


    const vertexShader = `
    uniform float uTime;
    uniform float uAspectRatio;
    uniform float uFrameRotation;
    uniform float uFrameScale;
    uniform float uBend;
    uniform float uFloating;
    varying vec2 vUv;
    const float PI = 3.141592653589793;
    mat2 scale(vec2 value) {
        return mat2(value.x, 0.0, 0.0, value.y);
    }
    vec2 scaleUv(vec2 uv, float scaleFactor) {
        float parsedScaleFactor = 1.0 - (scaleFactor - 1.0);
        return uv * scale(vec2(parsedScaleFactor)) + vec2((1.0 - parsedScaleFactor) * 0.5);
    }
    mat2 rotate(float angle) {
        return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    }
    vec2 rotateUv(vec2 uv, float angle) {
        uv -= 0.5;
        uv.y *= uAspectRatio;
        uv *= rotate(angle);
        uv.y /= uAspectRatio;
        uv += 0.5;
        return uv;
    }
    void main() {
        vec3 pos = position;
        vUv = uv;
        /**
        * bend
        */
        pos.y -= uBend * (1.0 - sin(uv.x * PI));
        pos.x += uBend * (uv.y * 2.0 - 1.0) * (uv.x * 2.0 - 1.0) * 0.5;
        /**
        * scaling
        */
        vUv = scaleUv(vUv, 1.0 + (1.0 - uFrameScale));
        /**
        * rotation
        */
        vUv = rotateUv(vUv, uFrameRotation);
        /**
        * floating
        */
        float reducedTime = uTime * 0.35;
        float floatingWave = sin(reducedTime * PI) * uFloating;
        float yShift = 0.028;
        float xShift = -0.007;
        pos.y += floatingWave * yShift;
        pos.x += floatingWave * xShift;
        vUv.y += floatingWave * yShift;
        vUv.x += floatingWave * xShift;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

    

export default function Picture(props) {
 const lastScrollHeight = useRef(0)
  const mesh = useRef();
  const group = useRef();

  const texture1 = new THREE.TextureLoader().load(picture);
  const material = useRef();
  const value = window.innerWidth/1900;
  const size = useRef( (value>1)? 1: value);
  const uniforms = useRef({
    uFrameRotation: {type:"f", value: 0},
    uFrameScale: {type:"f", value:1.},
    uBend: {type: "f", value: 0},
    uAspectRatio: {type:"f", value:1.7},
    uFloating: {type:"f", value:2},
    isMiddle:{type:"f", value:0.},
    distanceFromCenter: { type: "f", value: 1. },
    uTime: { type: "f", value: 0. },
    texture1: { type: "t", value: texture1 },
    resolution: { type: "v4", value: new THREE.Vector4() },
    uvRate1: {
      value: new THREE.Vector2(1, 1),
    },
    
  });

  useEffect(() => {
    window.addEventListener('resize', ()=>{
      const value = window.innerWidth/1500;
        size.current= (value>1)? 1: value;
    })

    window.addEventListener('scroll',(e)=>{
        console.log(e)
        console.log(e.target)
        const difference = lastScrollHeight.current -window.scrollY
        console.log(typeof group)
        console.log(typeof group.current)
        if(group.current != null && difference!= 0){
            group.current.rotation.z+= (difference/document.documentElement.scrollHeight)
            group.current.position.y+= (difference/document.documentElement.scrollHeight)*10
            size.current+= (difference/document.documentElement.scrollHeight)
            console.log(document.documentElement.scrollHeight)
            lastScrollHeight.current =  window.scrollY
        }
        
        
    })

    return () => {
      window.removeEventListener('resize', ()=>{
        const value = window.innerWidth/700;
        size.current= (value>1)? 1: value;
      })
      window.removeEventListener('scroll',(e)=>{
        console.log(e)
        console.log(e.target)
        const difference = lastScrollHeight.current -window.scrollY
        if(group.current != null && difference!= 0){
            group.current.rotation.z+= (difference/document.documentElement.scrollHeight)
            group.current.position.y+= (difference/document.documentElement.scrollHeight)*10
            size.current+= (difference/document.documentElement.scrollHeight)
            console.log(document.documentElement.scrollHeight)
            lastScrollHeight.current =  window.scrollY
        }
        
        
    })
    };


    
  }, []);

  useFrame(() => {
    let scale = 4.5*size.current;

    group.current.scale.set(scale, scale, scale);
 
    // }
  });
  

  const goToPicture = () =>{
    if(props.displayNumber == props.index){
      let tl = new TimelineMax({onComplete:()=>props.linkTo() });
      TweenMax.to(group.current.position,{
        duration:1,
        x:-0,
        y: 0,
        z: -0.,
      })
    }
    
  }
const onPointerEnter=()=>{
  document.body.style.cursor = "pointer"
}
const onPointerLeave=()=>{
  document.body.style.cursor = "default"
}
  return (
    <group {...props} ref={el=>group.current=el}>
      <mesh
        ref={mesh}
        //  scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        onClick={goToPicture}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        // doubleSided = {true}
      >
        <planeBufferGeometry args={[1.5, 1, 20, 20]} />
        <shaderMaterial
          ref={material}
          attach="material"
          uniforms={uniforms.current}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          side= {THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
