import React,{useState, useRef} from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useLoader} from 'react-three-fiber'
import ReactDOM from 'react-dom'
import picture from '../images/elite.png'
const vertexShader=`
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

const fragmentShader= `
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
        gl_FragColor.a = clamp(distanceFromCenter, 0.6, 1.);
    }
        
    `;

export default function Picture(props) {
  const mesh = useRef();
  const group = useRef();
 const texture1 = new THREE.TextureLoader().load(picture);
  const material = useRef();
  const uniforms= useRef({
    distanceFromCenter: { type: "f", value: 0 },
    time: { type: "f", value: 0 },
    texture1: { type: "t", value: texture1},
    resolution: { type: "v4", value: new THREE.Vector4() },
    uvRate1: {
      value: new THREE.Vector2(1, 1),
    },
  })
  

    useFrame(() => {
      
      group.current.rotation.x = -0.3;
      group.current.rotation.y = -0.5;
      group.current.rotation.z = -0.1;
      uniforms.current.time.value +=0.05;
      mesh.current.position.y = props.index * 1.2;
    })
      
      

    return (
        <group 
        {...props} 
        ref={group}
        >
          <mesh
          ref={mesh}
          //  scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
          //  onClick={(e) => setActive(!active)}
          >
          <planeBufferGeometry args={[1.5,1,20,20]} />
          <shaderMaterial
          ref={material}
          attach="material"
          uniforms={uniforms.current}
          

          vertexShader={vertexShader}
        fragmentShader={fragmentShader}
          />
        </mesh>
      </group>
    )
}

