import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { PortfolioCanvas } from "../components/canvas";
import SmallFrontPage from "../components/smallFrontPage";
import { HomeProvider } from "../src/contexts/HomeContext";
import { getAllPostsForHome } from "../helpers/api";

export default function FrontPage(props) {
  console.log("typeof window " + typeof window);
  console.log(typeof window != "undefined");
  const [windowWidth, setWindowWidth] = useState({
    size:
      typeof window != "undefined"
        ? window.innerWidth < 900
          ? "small"
          : "large"
        : "large",
  });
  const isSmall = useRef(false);
  const changeSize = (width) => {
    if (width <= 900 && isSmall.current === false) {
      setWindowWidth({ size: "small" });
      isSmall.current = true;
      console.log("going to small");
    } else if (width > 900 && isSmall.current === true) {
      setWindowWidth({ size: "large" });
      isSmall.current = false;
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 900) {
      setWindowWidth({ size: "small" });
      isSmall.current = true;
    } else {
      setWindowWidth({ size: "large" });
      isSmall.current = false;
    }
    console.log("index mounted");
    window.addEventListener("resize", (e) => {
      changeSize(e.target.innerWidth);
    });
    return () => {
      console.log("index unmounted");
      window.removeEventListener("resize", (e) => {
        changeSize(e.target.innerWidth);
      });
    };
  }, []);
  return (
    <HomeProvider>
      <div>
        {windowWidth.size === "large" ? (
          <PortfolioCanvas data={props.post} />
        ) : (
          <SmallFrontPage data={props.post} />
        )}
      </div>
    </HomeProvider>
  );
}

export async function getStaticProps() {
  const data = await getAllPostsForHome();
  return {
    props: {
      post: data ?? null,
    },
  };
}
