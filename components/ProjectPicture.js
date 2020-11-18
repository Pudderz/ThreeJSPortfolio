import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame} from "react-three-fiber";
// import { TweenMax } from "gsap/gsap-core";
// import { TimelineMax } from "gsap";
import {fragmentShader} from '../src/Shaders/fragmentShader';
import {vertexShader} from '../src/Shaders/vertexShader'
import { TweenMax } from "gsap/dist/gsap";
import { TimelineMax } from "gsap/dist/gsap";

export default function Picture(props) {
 const lastScrollHeight = useRef(0)
  const mesh = useRef();
  const group = useRef();
  const imageDimensions = useRef();
  const [aspectRatio, setAspectRatio] = useState(1.5) 
  const texture1 = new THREE.TextureLoader().load(props.src, tex => {
    uniforms.current.uAspectRatio.value = tex.image.height/ tex.image.width
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.needsUpdate = true;
    setAspectRatio(tex.image.width/tex.image.height)
  });
  const material = useRef();
  const value = window.innerWidth/1900;
  const size = useRef( (value>1)? 1: value);
  const shrink = useRef(1)

  
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
        const difference = lastScrollHeight.current -window.scrollY;
        if(group.current != null && difference!= 0){
            //  group.current.rotation.z += (difference/document.documentElement.scrollHeight)
            group.current.position.y += (difference/document.documentElement.scrollHeight)*30;
            shrink.current+= (difference/document.documentElement.scrollHeight);
            lastScrollHeight.current =  window.scrollY;
        }
        
        
    })
    return () => {
      window.removeEventListener('resize', ()=>{
        const value = window.innerWidth/700;
        size.current= (value>1)? 1: value;
      })
      window.removeEventListener('scroll',(e)=>{
        const difference = lastScrollHeight.current -window.scrollY;
        if(group.current != null && difference!= 0){
            // group.current.rotation.z+= (difference/document.documentElement.scrollHeight);
            group.current.position.y+= (difference/document.documentElement.scrollHeight)*30;
            shrink.current+= (difference/document.documentElement.scrollHeight);
            console.log(document.documentElement.scrollHeight)
            lastScrollHeight.current =  window.scrollY
            
        }

    })
    };


    
  }, []);

  useFrame(() => {
    let scale = 4.5*size.current*shrink.current;
    group.current.scale.set(scale, scale, scale);

  });
  


const onPointerEnter=()=>{
  document.body.style.cursor = "pointer"
}
const onPointerLeave=()=>{
  document.body.style.cursor = "default"
}


  return (
    <group {...props} ref={group}>
      <mesh
        ref={mesh}
        //  scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      >
        <planeBufferGeometry args={[aspectRatio, 1, 20, 20]} />
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
