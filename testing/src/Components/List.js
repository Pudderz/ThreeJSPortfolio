import React from "react";
import gsap from "gsap";

export default function List(props) {

  const pointerOver = () => {
    props.attractMode(true);
    gsap.to(document.body, {
      duration: 0.3,
      background: "#1b1f25",
    });
  };
  const pointerLeave = () => {
    props.attractMode(false);
    gsap.to(document.body, {
      duration: 0.3,
      background: "#ffffff",
    });
  };
  const select = e => {
    props.goTo(Number(e.target.getAttribute("data-nav")));
  };

  return (
    <div>
      <ul
        className="nav"
        onPointerEnter={pointerOver}
        onPointerLeave={pointerLeave}
      >
        <li data-nav="3" onPointerOver={select}>
          1
        </li>
        <li data-nav="2" onPointerOver={select}>
          1
        </li>
        <li data-nav="1" onPointerOver={select}>
          1
        </li>
        <li data-nav="0" onPointerOver={select}>
          1
        </li>
      </ul>
    </div>
  );
}
