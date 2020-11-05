import React from "react";
import { NavLink } from "react-router-dom";
import Title from "./Title";

export default function About() {
  return (
    <div className="about">
        <Title/>
      <div className="textContainer">
        <h2>Hey, I'm Matthew</h2>
        <p>
          I'm a front-end web developer based in UK and looking for a full-time
          role
        </p>
      </div>
      <div className="textContainer">
        <h2>...</h2>
        <p>
          I'm a front-end web developer based in UK and looking for a full-time
          role
        </p>

        <p>
          I love learning the massive scope of computer science which I find
          incredibly rewarding and exciting as there's always something more you
          can learn and improve on.
        </p>

        <p>
        I'm currently looking for an opportunity to work on a JavaScript framework and hope to learn and move to a full-stack position in the future.
        </p>

        <p>Thank you for checking out my portfolio and if you'd like to learn more about what makes me tick or if you have knowledge of any exciting opportunities feel free to let me know by visiting the contact section</p>
      </div>
    
      <NavLink to="/"  className="button">
            Home
          </NavLink>
    </div>
  );
}
