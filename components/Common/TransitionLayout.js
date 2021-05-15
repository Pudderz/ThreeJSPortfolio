import { Transition, TransitionGroup } from "react-transition-group";
import gsap from "gsap";
import { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../../src/contexts/GlobalContext";

const TransitionLayout = ({ path, children }) => {
  const { animation } = useContext(GlobalContext);
  let location =
    path == "/" ? "canvas" : path == "/about" ? "about" : "project";
  const height = useRef(0);

  const changeHeight = () => {
    height.current =
      window.pageYOffset ||
      (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;
  };

  useEffect(() => {
    window.addEventListener("scroll", () => changeHeight());
    return () => {
      window.removeEventListener("scroll", () => changeHeight());
    };
  }, []);

  const handleEntering = (node) => {
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
  };

  const handleExiting = (node) => {
    if (location == "canvas") {
      node.classList.add("relative");
      node.classList.add("behind");
    } else {
      node.style.position = "fixed";
      node.style.top = `${height.current * -1}px`;
      height.current = 0;
    }

    if (!animation.current[location].isActive() && location !== "canvas") {
      animation.current[location].reverse();
    }
  };

  return (
    <TransitionGroup>
      <Transition
        onEntering={handleEntering}
        onExiting={handleExiting}
        key={path}
        appear={true}
        timeout={1000}
      >
        <div className="container">
          <div className="content">{children}</div>
        </div>
      </Transition>
    </TransitionGroup>
  );
};

export default TransitionLayout;
