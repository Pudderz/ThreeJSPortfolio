//Web worker to handle the maths for the positions of the images


//Will use sharedArrayBuffer so that as post message is too slow for reliable rendering.
//However I will also create a seperate worker for postmessage due to the lack of support that
//sharedArray buffer has.
//https://caniuse.com/sharedarraybuffer

const workerCode =()=>{
    let position = 0;
    let startRound = position;
    let rounded = 0;

    self.onmessage=(speed)=>{

    let newPosition = position;
    //checks to make sure users dont scroll out of the list
    if (position< -0 || position > maxNumber) {
      if (position < -0.3 || position > maxNumber + 0.3) {
        speed = 0;
      } else {
        speed *= 0.25;
      }
    }

    if (speed!== 0 || props.attractTo.shouldJump) {
      //   uniforms.current.uTime.value += 0.01;
      newPosition = speed+ position;
      speed = speed * 0.8;
      rounded = Math.round(position);
    }
    distance.current =
      1 - Math.min(Math.abs(newPosition - props.index), 1) ** 2;

    // mesh.current.position.y = props.index * 1.2 - newPosition * 1.2;

    // if ( startRound !== rounded) {
    //   props.displayDom(rounded);
    // }

    let diff = rounded - newPosition;

    if (props.attractMode || props.attractTo.shouldJump) {
      //speeds up selection with attractmode is true
      newPosition -= props.attractMode
        ? (newPosition - props.attractTo.goTo) * 0.1
        : (newPosition - props.attractTo.goTo) * 0.05;

      //cancels jump too once picture is mostly at the center
      if (
        props.attractTo.shouldJump &&
        Math.round(newPosition * 2) / 2 == props.attractTo.goTo
      ) {
        props.jumpComplete();
      }
    } else {
      newPosition =
        newPosition + Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.05;
    }

    position = newPosition;
    }
}
