import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import ReactDOM from "react-dom";
import picture from "../images/elite.png";
import { TweenMax } from "gsap/gsap-core";
const vertexShader = `
        uniform float time;
        uniform float distanceFromCenter;
      varying vec2 vUv; 
      varying vec3 vPosition;
      varying vec2 pixels;
      float PI = 3.141592653589793238; 
      void main() {
        vUv = (uv-vec2(0.5))*(0.8-0.2*distanceFromCenter*(2. - distanceFromCenter))+ vec2(0.5); 
        vec3 pos = position;
        pos.y+= sin(PI*uv.x)*0.01;
        pos.y += sin(time*0.3)*0.02;
        vUv.y += sin(time*0.3)*0.02;
        gl_Position = projectionMatrix * modelViewMatrix* vec4(pos,1.0); 
      }
    `;

const fragmentShader = `
    uniform float time;
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

export default function Picture(props) {
  const speed = useRef(0);
  const rounded = useRef(0);
  const position = useRef(0);
  const distance = useRef(0);

  const mesh = useRef();
  const group = useRef();
  const texture1 = new THREE.TextureLoader().load(picture);
  const material = useRef();
  const size = useRef(window.innerWidth/1900);
  const uniforms = useRef({
    distanceFromCenter: { type: "f", value: 1 },
    time: { type: "f", value: 0 },
    texture1: { type: "t", value: texture1 },
    resolution: { type: "v4", value: new THREE.Vector4() },
    uvRate1: {
      value: new THREE.Vector2(1, 1),
    },
  });

  useEffect(() => {
    uniforms.current.distanceFromCenter.value = 1;
    // return () => {
    window.addEventListener("wheel", (e) => {
      speed.current += e.deltaY * 0.0003;
      console.log("scroll");
      console.log(speed.current);
    });
    window.addEventListener('resize', ()=>{
      size.current = window.innerWidth/2000;

    })

    // }
    return () => {
      window.removeEventListener("wheel", (e) => {
        speed.current += e.deltaY * 0.0003;
        console.log("scroll");
        console.log(speed.current);
      });
      window.removeEventListener('resize', ()=>{
        const value = window.innerWidth/1900;
        size.current= (value>1)? 1: value;
      })
    };
  }, []);
  useEffect(() => {
    if(props.rotating=== 'middle'){
      TweenMax.to(group.current.rotation,1,{
        duration:1,
        x:-0.7,
        y: 0,
        z: 0,
      })
    }else{
      TweenMax.to(group.current.rotation,{
        duration:1,
        x:-0.3,
        y: -0.5,
        z: 0,
      })
    }

    // group.current.rotation.x = props.rotating.x;
    // group.current.rotation.y = props.rotating.y;
    // group.current.rotation.z = props.rotating.z;
    return () => {};
  }, [props.rotating]);
  useEffect(() => {
    if(props.positioning=== 'middle'){
      TweenMax.to(group.current.position,1,{
        duration:1,
        x:0,
        y: 0,
        z: 0,
      })
    }else{
      TweenMax.to(group.current.position,{
        duration:1,
        x:0.4,
        y: 0,
        z: 0,
      })
    }
    group.current.position.x = props.positioning.x;

    return () => {};
  }, [props.positioning]);

  useFrame(() => {
    const startRound = rounded.current;
    if(speed.current!==0 || props.attractTo.shouldJump){
      uniforms.current.time.value += 0.05;
      position.current = speed.current + position.current;
      speed.current = speed.current * 0.8;
      rounded.current = Math.round(position.current);
 }   
      distance.current = Math.min(Math.abs(position.current - props.index), 1);
      distance.current = 1 - distance.current ** 2;

      mesh.current.position.y = props.index * 1.2 - position.current * 1.2;
      const sizing = (props.attractMode)?size.current: size.current;
      let scale = (1+ 0.2 * distance.current)* sizing;
      group.current.scale.set(scale, scale, scale);
      uniforms.current.distanceFromCenter.value = distance.current;
 

  
    if (props.index == 0 && startRound !== rounded.current) {
      props.displayDom(rounded.current);
    }
    let diff = rounded.current - position.current;

    if (props.attractMode || props.attractTo.shouldJump) {
      position.current += -(position.current - props.attractTo.goTo) * 0.05;

      if(props.attractTo.shouldJump && Math.round(position.current*2)/2== props.attractTo.goTo){
        console.log('cancelJump')
        props.jumpComplete();
      }
    } else {
      position.current =
        position.current +
        Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.05;
    }
 
    // }
  });
  

  const goToPicture = () =>{
    props.goTo(props.index)
  }

  return (
    <group {...props} ref={group}>
      <mesh
        ref={mesh}
        //  scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        onClick={goToPicture}
      >
        <planeBufferGeometry args={[1.5, 1, 20, 20]} />
        <shaderMaterial
          ref={material}
          attach="material"
          uniforms={uniforms.current}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    </group>
  );
}
