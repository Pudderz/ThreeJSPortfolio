import React, {useState, useRef} from "react";
import Picture from './Picture';
import { Canvas, useFrame } from 'react-three-fiber'
export default function Group() {
  const [attractMode, setAttractMode] = useState(false);
 
   const [propsPosition, setPosition] = useState(0);
  const displayNumber = useRef(0);

  const group = useRef();
  const material = useRef();

  const displayDom=(num)=>{
        displayNumber.current= num;
        console.log(num)
  }  


  return (
    <
    >
      <Picture index={0} attract={attractMode} position={propsPosition} displayDom={e=>displayDom(e)}/>
      <Picture index={1} attract={attractMode} position={propsPosition} displayDom={displayDom}/>
      <Picture index={2} attract={attractMode} position={propsPosition} displayDom={displayDom}/>
      <Picture index={3} attract={attractMode} position={propsPosition} displayDom={displayDom}/>
    </>
  );
}
