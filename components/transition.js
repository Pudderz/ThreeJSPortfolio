import { Button } from "@material-ui/core"
import gsap from "gsap/dist/gsap"
import { useContext, useRef, useState,useEffect } from "react"
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group"
import { GlobalContext } from "../src/contexts/GlobalContext"

const TIMEOUT = 200

export const Transition = ({ children, location }, props) => {
    console.log(props.children)
    const currentStatus = useRef()
    const {animation} = useContext(GlobalContext);

    
const homeTransition = (_, node, done) => {
  console.log("homeTransition");
  animation.current.eventCallback("onComplete", done);
  animation.current.eventCallback("onReverseComplete", done);
  console.log(currentStatus.current, done)
};

useEffect(() => {
    console.log('The transition is mounted')
    console.log(props.children)
    return () => {
        console.log('The Transition is unmounted')
    }
}, [])

const [load, setLoad] = useState(false)

  return (
    <TransitionGroup style={{ position: "relative" }}>
             <ReactTransition
        timeout={500}
        mountOnEnter
        unmountOnExit
           onEnter={(node) => {
               console.log('onEnter')
              gsap.killTweensOf(node);
              gsap.set(node, { clearProps: "all" });
              node.classList.add("absolute");
              gsap.fromTo(node,{
                autoAlpha: 0,
              }, {
                duration: 1,
                x: 0,
                autoAlpha: 1,
              });
            }}
            onExit={(node) => {
                console.log('onExit')
              gsap.to(node, {
                onStart:()=>node.classList.add("absolute"),
                onComplete:()=>node.classList.add("absolute"),
                duration: 1,
                x: -200,
                autoAlpha: 0,
              });
            }}
            key={location}
            appear={true}
        // onEntering={()=>{currentStatus.current= 'entering'}}
        // onExiting={()=>{currentStatus.current= 'exiting'}}
      >

        {/* {status => {
            currentStatus.current= status
            console.log(status);
            return(
          <div
            style={{
              ...getTransitionStyles[status],
            }}
          > */}
          <div>
              {children}
          </div>
            
            
          {/* </div> */}
        {/* )}} */}
      </ReactTransition>
        {/* )}} */}
     
      {/* <Button onClick={()=>{setLoad(!load)}}>Load/unload</Button> */}
    </TransitionGroup>
  )
}
export default Transition
// {/* <TransitionGroup>
//           <Transition
           
//             timeout={300}
//           >
//      */}
// const aboutRef = useRef(null)
// console.log(props)
// const tl = useRef();
// const {animation} = useContext(GlobalContext)
// console.log(animation.current)
// //   useEffect(()=>{
// //     tl.current = new TimelineMax({ paused: true });
// //   },[])
// console.log(location)
// console.log(show)
// console.log(children)
// useEffect(()=>{
//     console.log(animation)
// })

// //   const loadIn = (e)=>{
// //     console.log(e)
// //     console.log('loaded in');
// //     TweenMax.fromTo(e,
// //       {         
// //         width:'100%',
// //         right:'-100%',
// //         fontSize: '12px'
// //       },{
// //         duration:2,
// //         width:'100%',
// //         right:'0',
// //         ease: Power4.easeInOut
// //       })
// //   }
// //   const loadOut = (e)=>{
// //     console.log(e)
// //     console.log('loaded Out');
// //     TweenMax.fromTo(e,
// //       {    width:'100%',
// //         right:'0',     
// //         fontSize: '12px'
// //       },{
// //         duration:2,
// //         width:'100%',
// //         right:'-100%',
// //         ease: Power4.easeInOut
// //       })
// //   }


