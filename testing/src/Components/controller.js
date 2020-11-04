// import React, {useRef} from 'react'

// export default function controller(props) {
//     let speed = 0;
// let position = 0;
// let rounded = 0;
// let block = document.getElementById("block");


// window.addEventListener("wheel", (e) => {
//   speed += e.deltaY * 0.0003;
// });

// var sketch = new Sketch();

// let objs = Array(5).fill({ dist: 0 });
// let attract = useRef({mode:false, to: 0});

// const raf = () => {
//   position += speed;
//   speed *= 0.8;
//   rounded = Math.round(position);
//   objs.forEach((o, i) => {
//     o.dist = Math.min(Math.abs(position - i), 1);
//     o.dist = 1 - o.dist ** 2;
//     let scale = 1+0.2*o.dist;
//     sketch.meshes[i].position.y = i * 1.2 - position * 1.2;
//     sketch.meshes[i].scale.set(scale,scale,scale)
//     sketch.meshes[i].material.uniforms.distanceFromCenter.value = o.dist;
//   });
//   let diff = rounded - position;
  
//     if(attract.current.mode){
//       position += -(position- attract.current.to)*0.05;
//       console.log(position)
//     }else{
//       position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.05;
//     }
//   window.requestAnimationFrame(raf);
// };

// raf();

// let navs = [...document.querySelectorAll('.nav li')]
// let nav= document.querySelector('.nav');
// let rots = sketch.groups.map(e=>e.rotation)

// nav.addEventListener('mouseleave',()=>{
  
// })

// const mouseOver=e=>{
//     attractTo= Number(e.target.getAttribute('data-nav'));
// }
// const mouseEnter=()=>{
//     attract.current.mode = true;
//   gsap.to(document.body,{
//     duration:0.3,
//     background: '#1b1f25'
//   })
//   gsap.to(rots,{
//     duration:0.3,
//     x:-0.7,
//     y:0,
//     z:0,
//   })
// }
// const mouseleave=()=>{
//     attract.current.mode = false;
//     gsap.to(rots,{
//       duration:0.3,
//       x:-0.3,
//       y:-0.5,
//       z:-0.1,
//     })
//     gsap.to(document.body,{
//       duration:0.3,
//       background: '#ffffff'
//     })
// }

//     return (
//         <div>
//             <ul class="nav" onMouseEnter={mouseEnter} onMouseLeave={mouseleave}>
//                     <li data-nav="4" onMouseOver={mouseOver}>1</li>
//                     <li data-nav="3" onMouseOver={mouseOver}>2</li>
//                     <li data-nav="2" onMouseOver={mouseOver}>3</li>
//                     <li data-nav="1" onMouseOver={mouseOver}>4</li>
//                     <li data-nav="0" onMouseOver={mouseOver}>5</li>
//                 </ul>
//         </div>
//     )
// }


