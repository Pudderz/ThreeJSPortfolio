import { Transition, TransitionGroup } from "react-transition-group";
import Link from "next/link";
import gsap from "gsap";
import { GlobalProvider } from "../src/contexts/GlobalContext";
import { useContext } from "react";
import { GlobalContext } from "../src/contexts/GlobalContext";
// import Test from "./canvas";

const TransitionLayout = ({ path, children }) => {
const {animation} = useContext(GlobalContext)
let location = (path =='/')? 'canvas': (path=='/about')? 'about':'project';
  return (
    <div>
      <div className="layout-content">
       
        <TransitionGroup>
          <Transition
            onEntering={(node) => {
              gsap.killTweensOf(node);
              
              gsap.set(node, { clearProps: "all" });
              // node.classList.add("absolute");
              node.style.position = "fixed";
              if(location =="about" || location =="project"){
                node.style.zindex = "100";
              }else{
                node.style.zindex = "0";
              }
              console.log('entering', node, location);
              animation.current[location].play()
              gsap.fromTo(node,{
                autoAlpha: 1,
                x: 0,
              }, {
                duration: 1,
                   x: 0,
                autoAlpha: 1,
                onComplete(e) {
                  node.classList.remove("absolute");
                  node.style.position = "";
                }
              });
              
            }}
            onExit={node => {
             
            }}
            onExiting={(node) => {
              console.log('exiting', node, location);
              if(location=="canvas"){
                 node.classList.add("relative");
               node.classList.add("behind");
              }else{
              //    console.log(node)
              // console.log(window.scrollY);
              node.style.position = "fixed";
              node.style.top = -1 * window.scrollY + "px";
              }
              

              // gsap.to(node, {
              //   duration: 1,
              //   autoAlpha: 1,
              //   onComplete() {
              //   }
              // });
              if(!animation.current[location].isActive() && location!=='canvas'){
                 animation.current[location].reverse()
              }
             
            }}
            key={path}
            appear={true}
            timeout={1000}
            // unmountOnExit
            // mountOnEnter
          >
            <div className="container">
              <div className="content">{children}</div>
            </div>
          </Transition>
        </TransitionGroup>
      </div>
    </div>
  );
};

export default TransitionLayout;
