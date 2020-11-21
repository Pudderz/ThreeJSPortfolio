import React, { useRef, useEffect, useState, useContext } from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";
import { fragmentShader } from "../src/Shaders/fragmentShader";
import { vertexShader } from "../src/Shaders/vertexShader";
import { TimelineMax, Power4, TweenMax } from "gsap/dist/gsap";
import { useRouter } from 'next/router';
import { HomeContext } from "../src/contexts/HomeContext";
import { GlobalContext } from "../src/contexts/GlobalContext";

export default function Picture(props) {
  // const {position} = useContext(GlobalContext);


  const speed = useRef(0);
  // const position = useRef(0);
  const distance = useRef(0);
  const firstTime = useRef(1);
  const {
    PreviousLocation
  } = useContext(GlobalContext);
  const size = useRef(
    window.innerWidth / 1900 > 1 ? 1 : window.innerWidth / 1900
  );

  const rotationAnimatation = useRef();
  const positionAnimatation = useRef();
  const mesh = useRef();
  const group = useRef();
  const texture1 = new THREE.TextureLoader().load(props.image, (tex)=>{
    uniforms.current.uAspectRatio.value =  tex.image.width/tex.image.height
  });

  const material = useRef();
  const scaleMultiplier = useRef({ value: 1 });

  const uniforms = useRef({
    uFrameRotation: { type: "f", value: 0 },
    uFrameScale: { type: "f", value: 1 },
    uBend: { type: "f", value: 0.021 },
    uAspectRatio: { type: "f", value: 1.7 },
    uFloating: { type: "f", value: 1 },
    distanceFromCenter: { type: "f", value: 0 },
    uTime: { type: "f", value: 0 },
    texture1: { type: "t", value: texture1 },
    resolution: { type: "v4", value: new THREE.Vector4() },
    uvRate1: {
      value: new THREE.Vector2(1, 1),
    },
  });

  useEffect(() => {
    uniforms.current.distanceFromCenter.value = 1;

    window.addEventListener("wheel", (e) => {
      speed.current += e.deltaY * 0.0003;
    });
    window.addEventListener("resize", () => {
      const value = window.innerWidth / 1900;
      size.current = value > 1 ? 1 : value;
    });

    //Load in animatations
    console.log(PreviousLocation);
    //  if(PreviousLocation!=='home' ||PreviousLocation!=='about'){
    let tl = new TimelineMax();
    tl.to(group.current.rotation, {
      duration: 0,
      x: 0,
      z: 0,
      y: 0,
    });

    tl.fromTo(
      group.current.position,
      {
        x: 0,
        z: 2,
        y: -10,
        ease: Power4.easeInOut,
      },
      {
        duration: 3,
        x: 0,
        y: 0,
        z: 0,
        ease: Power4.easeInOut,
      }
    );
    tl.add(
      group.current.rotation,
      {
        duration: 0.8,
        x: -0.3,
        y: -0.35,
        z: -0.12,
        ease: Power4.easeInOut,
      },
      "-=0.8"
    );
    tl.to(
      group.current.position,
      {
        duration: 0.8,
        x: 0.8,
        y: 0,
        z: 0.1,
        ease: Power4.easeInOut,
      },
      "-=0.8"
    );
    //  }
    rotationAnimatation.current = TweenMax.fromTo(
      group.current.rotation,
      1,
      {
        x: -0.3,
        y: -0.35,
        z: -0.12,
      },
      {
        duration: 1,
        x: -0.5,
        y: 0,
        z: 0,
        paused: true,
      }
    );

    positionAnimatation.current = TweenMax.fromTo(
      group.current.position,
      1,
      {
        x: 0.8,
        y: 0,
        z: 0.1,
      },
      {
        duration: 0.5,
        x: 0,
        y: 0.3,
        z: 0,
        paused: true,
      }
    );
    return () => {
      window.removeEventListener("wheel", (e) => {
        speed.current += e.deltaY * 0.0003;
      });
      window.removeEventListener("resize", () => {
        const value = window.innerWidth / 700;
        size.current = value > 1 ? 1 : value;
      });
    };
  }, []);

  useEffect(() => {
    if (firstTime.current > 2) {
      if (props.rotating === "middle") {
        rotationAnimatation.current.play();
      } else {
        rotationAnimatation.current.reverse();
      }
    } else {
      firstTime.current++;
    }
  }, [props.rotating]);

  useEffect(() => {
    if (firstTime.current > 2) {    
      if (props.positioning === "middle") {
        positionAnimatation.current.play();
      } else {
        positionAnimatation.current.reverse();
      }
      group.current.position.x = props.positioning.x;
    } else {
      firstTime.current++;
    }

  }, [props.positioning]);

  // useEffect(()=>{
  //   if(!props.isVisible){
  //     uniforms.current.visibility.value += 0.01;
  //   }

  // },[props.isVisible])
  useFrame(() => {
    uniforms.current.uTime.value += 0.01;
    distance.current =
      1 - Math.min(Math.abs(props.position.current - props.index), 1) ** 2;

    mesh.current.position.y = props.index * 1.2 - props.position.current * 1.2;

    const sizing = props.attractMode ? size.current : size.current;
    const fromCenter = props.attractMode ? 1 : distance.current;
    let scale =
      (1 + 0.08 * fromCenter) * sizing * 1.3 * scaleMultiplier.current.value;

    group.current.scale.set(scale, scale, scale);

    uniforms.current.distanceFromCenter.value = distance.current;

  });

  //Changes orientation of images on click before using the goTo props to navigate to selected page
  
  const goToPicture = () => {
    if (props.displayNumber == props.index) {
      // TweenMax.to(scaleMultiplier.current, {
      //   value: 1,
      //   duration: 1,
      // });
      // TweenMax.to(group.current.position, {
      //   duration: 1,
      //   x: -0,
      //   y: 0,
      //   z: 1,
      // });
      // TweenMax.to(group.current.rotation, {
      //   duration: 1,
      //   x: 0,
      //   y: 0,
      //   z: 0,
      // });
      // router.push(props.slug)
    }
    props.goTo(props.index);
  };

  //Creates pointer events for the images
  const onPointerEnter = () => {
    document.body.style.cursor = "pointer";
  };
  const onPointerLeave = () => {
    document.body.style.cursor = "default";
  };

  return (
    <group {...props} ref={group}>
      <mesh
        ref={mesh}
        onClick={goToPicture}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
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
