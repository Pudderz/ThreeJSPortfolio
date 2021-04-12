import React, { useRef, useEffect, useContext } from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";
import { fragmentShader } from "../../../src/Shaders/fragmentShader";
import { vertexShader } from "../../../src/Shaders/vertexShader";
import { TimelineMax, Power4, TweenMax } from "gsap/dist/gsap";
import { GlobalContext } from "../../../src/contexts/GlobalContext";
import HomeContext from "../../../src/contexts/HomeContext";
import { imagePositionAnimation, imageRotationAnimation } from "../../../animations/ProjectAnimations";
import { canvasPictureLoadInDefault, canvasPictureLoadInStart } from "../../../animations/loadinAnimations";

export function ProjectCanvasPicture(props) {

  const { fastTravelMode } = useContext(HomeContext);
  const { PreviousLocation } = useContext(GlobalContext);

  const distance = useRef(0);
  const firstTime = useRef(1);

  
  //ref containers to hold gsap animations
  const rotationAnimatation = useRef();
  const positionAnimatation = useRef();


  const mesh = useRef();
  const group = useRef();
  const material = useRef();
  const scaleMultiplier = useRef({ value: 1 });

  const uniforms = useRef({
    uFrameRotation: { type: "f", value: 0 },
    uFrameScale: { type: "f", value: 1 },
    uBend: { type: "f", value: 0.021 },
    uAspectRatio: { type: "f", value: 1.7 },
    uFloating: { type: "f", value: 1 },
    distanceFromCenter: { type: "f", value: 1 },
    uTime: { type: "f", value: 0 },
    texture1: { type: "t", value: new THREE.TextureLoader().load(props.image) },
    resolution: { type: "v4", value: new THREE.Vector4() },
    uvRate1: {
      value: new THREE.Vector2(1, 1),
    },
  });

  useEffect(() => {
    const tl = new TimelineMax();

    //Animations for if no PreviousLocation
    if (PreviousLocation === null) {
      canvasPictureLoadInStart(tl, group.current, 0);
    } else {
      canvasPictureLoadInDefault(tl, group.current, 0);
    }

    positionAnimatation.current = imagePositionAnimation(group.current);
    rotationAnimatation.current = imageRotationAnimation(group.current);
    
    return () => {
      tl.clear();
    };
  }, []);

  useEffect(() => {

    if (firstTime.current > 1) {

      if (fastTravelMode) {
        positionAnimatation.current.play();
        rotationAnimatation.current.play();
      } else {
        positionAnimatation.current.reverse();
        rotationAnimatation.current.reverse();
      }
      // group.current.position.x = props.position.current;
    } else {
      firstTime.current++;
    }
  }, [fastTravelMode]);


  useFrame(() => {
    uniforms.current.uTime.value += 0.01;
    distance.current =
      1 - Math.min(Math.abs(props.position.current - props.index), 1) ** 2;

    mesh.current.position.y = props.index * 1.2 - props.position.current * 1.2;

    const sizing = props.size.current;

    const fromCenter = fastTravelMode ? 1 : distance.current;

    let scale =
      (1 + 0.08 * fromCenter) * sizing * 1.3 * scaleMultiplier.current.value;

    group.current.scale.set(scale, scale, scale);

    uniforms.current.distanceFromCenter.value = distance.current;
  });

  //Creates pointer events for the images
  const onPointerEnter = () => (document.body.style.cursor = "pointer");
  const onPointerLeave = () => (document.body.style.cursor = "default");

  const goToPicture = () => {
    props.goTo(props.index);
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

export default ProjectCanvasPicture;
