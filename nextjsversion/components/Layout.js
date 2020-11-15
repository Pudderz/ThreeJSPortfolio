import { Transition, TransitionGroup } from "react-transition-group";
import Link from "next/link";
import gsap from "gsap";
import { GlobalProvider } from "../src/contexts/GlobalContext";
import { useContext } from "react";
import { GlobalContext } from "../src/contexts/GlobalContext";
// import Test from "./canvas";

const Layout = ({ path, children }) => {
const {animation} = useContext(GlobalContext)
let location = (path =='/')? 'canvas': (path=='/about')? 'about':'project';
  return (
    <div>
      <div className="layout-content">
       
        <TransitionGroup>
          <Transition
            onEntering={(node) => {
              gsap.killTweensOf(node);
              console.log('playing')
              console.log(node)
              
              gsap.set(node, { clearProps: "all" });
              node.classList.add("absolute");
              gsap.fromTo(node,{
                autoAlpha: 1,
              }, {
                duration: 1,
                 x: 0,
                autoAlpha: 1,
                onComplete(e) {
                  node.classList.remove("absolute");
                }
              });
              animation.current[location].play()
            }}
            onExiting={(node) => {
              console.log('back')
              console.log(node)
              node.classList.add("absolute");
              gsap.to(node, {
                duration: 1,
                 x: -200,
                 autoAlpha: 0,
                onComplete() {
                  console.log('running')
                  node.classList.remove("absolute");
                }
              });
              if(!animation.current[location].isActive()){
                 animation.current[location].reverse()
              }
             
            }}
            key={path}
            appear={true}
            timeout={1000}
            unmountOnExit
            mountOnEnter
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

export default Layout;
