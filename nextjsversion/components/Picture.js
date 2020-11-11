import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";
import picture from "../images/elite.png";
// import { TweenMax } from "gsap/gsap-core";
// import { TimelineMax, Power4 } from "gsap";
import { fragmentShader } from "../src/Shaders/fragmentShader";
import { vertexShader } from "../src/Shaders/vertexShader";
import { TweenMax } from "gsap/dist/gsap";
import { TimelineMax } from "gsap/dist/gsap";
import { Power4 } from "gsap/dist/gsap";

export default function Picture(props) {
  const speed = useRef(0);
  const rounded = useRef(0);
  const position = useRef(0);
  const distance = useRef(0);
  const firstTime = useRef(1);

  const size = useRef(
    window.innerWidth / 1900 > 1 ? 1 : window.innerWidth / 1900
  );

  const rotationAnimatation = useRef();
  const positionAnimatation = useRef();

  const mesh = useRef();
  const group = useRef();
  const texture1 = new THREE.TextureLoader().load(picture);
  const material = useRef();
  const scaleMultiplier = useRef({ value: 1 });

  const uniforms = useRef({
    uFrameRotation: { type: "f", value: 0 },
    uFrameScale: { type: "f", value: 1 },
    uBend: { type: "f", value: 0.021 },
    uAspectRatio: { type: "f", value: 1.7 },
    uFloating: { type: "f", value: 1 },
    isMiddle: { type: "f", value: 0 },
    distanceFromCenter: { type: "f", value: 1 },
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
      console.log(firstTime.current)
    }

  }, [props.rotating]);

  useEffect(() => {

    if (firstTime.current > 2) {
      
      if (props.positioning === "middle") {
        uniforms.current.isMiddle.value = -1;
        positionAnimatation.current.play();
      } else {
        uniforms.current.isMiddle.value = 0;
        positionAnimatation.current.reverse();
      }
      group.current.position.x = props.positioning.x;
    } else {
      firstTime.current++;
      console.log(firstTime.current)
    }


  }, [props.positioning]);

  useEffect(()=>{
    if(!props.isVisible){
      uniforms.current.visibility.value += 0.01;
    }

  },[props.isVisible])
  useFrame(() => {
    const startRound = rounded.current;
    //checks to make sure users dont scroll out of the list
    if (position.current < -0 || position.current > 3) {
      speed.current *= 0.25;
    }
    if (position.current < -0.3 || position.current > 3.3) {
      speed.current = 0;
    }

    if (speed.current !== 0 || props.attractTo.shouldJump) {
      uniforms.current.uTime.value += 0.01;
      position.current = speed.current + position.current;
      speed.current = speed.current * 0.8;
      rounded.current = Math.round(position.current);
    }
    distance.current =
      1 - Math.min(Math.abs(position.current - props.index), 1) ** 2;
    const newPosition = props.index * 1.2 - position.current * 1.2;
    mesh.current.position.y = newPosition;

    const sizing = props.attractMode ? size.current : size.current;
    const fromCenter = props.attractMode ? 1 : distance.current;
    let scale =
      (1 + 0.08 * fromCenter) * sizing * 1.3 * scaleMultiplier.current.value;

    group.current.scale.set(scale, scale, scale);
    uniforms.current.distanceFromCenter.value = distance.current;

    if (props.index == 0 && startRound !== rounded.current) {
      props.displayDom(rounded.current);
    }
    let diff = rounded.current - position.current;

    if (props.attractMode || props.attractTo.shouldJump) {
      //speeds up selection with attractmode is true
      position.current -= props.attractMode
        ? (position.current - props.attractTo.goTo) * 0.1
        : (position.current - props.attractTo.goTo) * 0.05;
      console.log(position.current);

      //cancels jumps once picture is mostly at the center
      if (
        props.attractTo.shouldJump &&
        Math.round(position.current * 2) / 2 == props.attractTo.goTo
      ) {
        props.jumpComplete();
      }
    } else {
      position.current =
        position.current +
        Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.05;
    }
  });

  //Changes orientation of images on click before using the goTo props to navigate to selected page
  const goToPicture = () => {
    if (props.displayNumber == props.index) {
      TweenMax.to(scaleMultiplier.current, {
        value: 1,
        duration: 1,
      });
      TweenMax.to(group.current.position, {
        duration: 1,
        x: -0,
        y: 0,
        z: 1,
      });
      TweenMax.to(group.current.rotation, {
        duration: 1,
        x: 0,
        y: 0,
        z: 0,
      });
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
