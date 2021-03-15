import { Transition, TransitionGroup } from "react-transition-group";
import gsap from "gsap";
import { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../src/contexts/GlobalContext";


const TransitionLayout = ({ path, children }) => {
  const { animation } = useContext(GlobalContext);
  let location =
    path == "/" ? "canvas" : path == "/about" ? "about" : "project";
  let height = useRef(0);

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      height.current =
        window.pageYOffset ||
        (document.documentElement || document.body.parentNode || document.body)
          .scrollTop;
    });
    return () => {
      window.removeEventListener("scroll", (e) => {
        height.current =
          window.pageYOffset ||
          (
            document.documentElement ||
            document.body.parentNode ||
            document.body
          ).scrollTop;
      });
    };
  }, []);
  return (
    <div>
      <div className="layout-content">
        <TransitionGroup>
          <Transition
            onEntering={(node) => {
              gsap.killTweensOf(node);

              gsap.set(node, { clearProps: "all" });

              node.style.position = "fixed";
              if (location == "about" || location == "project") {
                node.style.zindex = "100";
              } else {
                node.style.zindex = "-1";
              }
              animation.current[location].play();
              gsap.fromTo(
                node,
                {
                  autoAlpha: 1,
                  x: 0,
                },
                {
                  duration: 1,
                  x: 0,
                  autoAlpha: 1,
                  onComplete(e) {
                    node.classList.remove("absolute");
                    node.style.position = "";
                    node.style.zindex = "";
                  },
                }
              );
            }}
            onExiting={(node) => {
              if (location == "canvas") {
                node.classList.add("relative");
                node.classList.add("behind");
              } else {
                node.style.position = "fixed";
                node.style.top = `${height.current * -1}px`;
                height.current = 0;
              }

              if (
                !animation.current[location].isActive() &&
                location !== "canvas"
              ) {
                animation.current[location].reverse();
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
